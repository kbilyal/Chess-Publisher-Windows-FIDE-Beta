/* Chess-Publisher v1.06.00-beta.98 — TEC Q117 Custom Rating Lists
 * Additive extension over the existing beta.81 Type-B rating-list store.
 * No pairing/TRF/SYNC/Chess-Results/rating-calculation core changes.
 */
(function(){
'use strict';
const VERSION='1.06.00-beta.98';
const SCHEMA=1;
const ROLE='custom';
const REGISTRY_KEY='rating-lists:custom:registry:v1';
const CATEGORIES=['national','regional','club','historical','other'];
const TYPE_LABELS={std:'Standard',rapid:'Rapid',blitz:'Blitz'};

function clone(value){return value==null?value:JSON.parse(JSON.stringify(value));}
function nowIso(){return new Date().toISOString();}
function clean(value){return String(value??'').trim();}
function slug(value){return clean(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'list';}
function validType(value){const v=clean(value).toLowerCase();return ['std','rapid','blitz'].includes(v)?v:'';}
function validCategory(value){const v=clean(value).toLowerCase();return CATEGORIES.includes(v)?v:'other';}
function typeB(){const api=window.cpBeta81;if(!api)throw new Error('Type-B Rating Lists (beta.81) are not available.');return api;}

function loadRegistry(){
  try{
    const raw=window.localStorage?.getItem(REGISTRY_KEY);
    const parsed=raw?JSON.parse(raw):[];
    if(!Array.isArray(parsed))return [];
    const seen=new Set();
    return parsed.map(normalizeMarker).filter(item=>item.id&&!seen.has(item.id)&&seen.add(item.id));
  }catch(_){return [];}
}
function saveRegistry(items){
  const normalized=[];const seen=new Set();
  for(const raw of Array.isArray(items)?items:[]){const item=normalizeMarker(raw);if(!item.id||seen.has(item.id))continue;seen.add(item.id);normalized.push(item);}
  window.localStorage?.setItem(REGISTRY_KEY,JSON.stringify(normalized));
  return clone(normalized);
}
function normalizeMarker(raw={}){
  return {
    schemaVersion:SCHEMA,
    id:clean(raw.id).toLowerCase(),
    label:clean(raw.label)||'Custom Rating List',
    listRole:ROLE,
    customRatingList:true,
    customCategory:validCategory(raw.customCategory||raw.category),
    ratingType:validType(raw.ratingType)||'std',
    ratingTypeLabel:TYPE_LABELS[validType(raw.ratingType)||'std'],
    originalSourceKnown:false,
    sourceAuthority:'User supplied / not asserted by Chess-Publisher',
    sourceFileName:clean(raw.sourceFileName),
    periodKey:clean(raw.periodKey),
    importedAt:clean(raw.importedAt)||nowIso(),
    recordCount:Math.max(0,Number(raw.recordCount)||0)
  };
}
function markerById(id){const key=clean(id).toLowerCase();return loadRegistry().find(item=>item.id===key)||null;}
function isCustomId(id){return !!markerById(id);}
function generatedId(type,label){
  const entropy=(globalThis.crypto?.randomUUID?.()||`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`).toLowerCase();
  return `custom-${validType(type)||'std'}-${slug(label)}-${slug(entropy)}`;
}

async function markExistingTypeBAsCustom(id,options={}){
  const key=clean(id).toLowerCase();if(!key)throw new Error('Type-B list ID is required.');
  const descriptor=await typeB().describe(key);
  if(!descriptor)throw new Error(`Type-B rating list does not exist: ${key}`);
  const marker=normalizeMarker({
    id:key,label:options.label||descriptor.label,ratingType:options.ratingType||descriptor.ratingType,
    customCategory:options.customCategory||options.category,sourceFileName:descriptor.sourceFileName,
    periodKey:descriptor.periodKey,importedAt:descriptor.importedAt,recordCount:descriptor.recordCount
  });
  const registry=loadRegistry().filter(item=>item.id!==key);registry.push(marker);saveRegistry(registry);updateUi();return clone(marker);
}

async function importCustom(options={}){
  const ratingType=validType(options.ratingType);if(!ratingType)throw new Error('Custom Rating List type is required (Standard, Rapid or Blitz).');
  const label=clean(options.label);if(!label)throw new Error('Custom Rating List name is required.');
  const id=clean(options.id).toLowerCase()||generatedId(ratingType,label);
  if(loadRegistry().some(item=>item.id===id))throw new Error(`Custom Rating List ID already exists: ${id}`);
  const descriptor=await typeB().importTypeB({...options,id,label,ratingType});
  const marker=normalizeMarker({
    id:descriptor.id,label:descriptor.label,ratingType:descriptor.ratingType,
    customCategory:options.customCategory||options.category,sourceFileName:descriptor.sourceFileName,
    periodKey:descriptor.periodKey,importedAt:descriptor.importedAt,recordCount:descriptor.recordCount
  });
  const registry=loadRegistry();registry.push(marker);saveRegistry(registry);updateUi();return clone({...descriptor,...marker});
}

async function listCustom(){
  const catalog=await typeB().listCatalog();
  const byId=new Map((Array.isArray(catalog)?catalog:[]).map(item=>[clean(item.id).toLowerCase(),item]));
  return loadRegistry().filter(marker=>byId.has(marker.id)).map(marker=>clone({...byId.get(marker.id),...marker}));
}
async function describe(id){const marker=markerById(id);if(!marker)return null;const base=await typeB().describe(marker.id);return base?clone({...base,...marker}):null;}
async function findRating(id,fideId){if(!isCustomId(id))return null;return await typeB().findRating(clean(id).toLowerCase(),clean(fideId));}

function sequenceFor(tournament){
  let sequence=[];
  try{if(window.cpBeta66?.sequenceFor)sequence=window.cpBeta66.sequenceFor(tournament)||[];}catch(_){sequence=[];}
  if(!Array.isArray(sequence)||!sequence.length)sequence=Array.isArray(tournament?.settings?.ratingListSequence)?tournament.settings.ratingListSequence:[];
  return sequence.map(x=>clean(x).toLowerCase()).filter(Boolean);
}
function ensureSequence(tournament){
  if(!tournament||typeof tournament!=='object')throw new Error('Tournament is required.');
  tournament.settings=tournament.settings&&typeof tournament.settings==='object'?tournament.settings:{};
  if(!Array.isArray(tournament.settings.ratingListSequence))tournament.settings.ratingListSequence=sequenceFor(tournament);
  return tournament.settings.ratingListSequence;
}
function addToSequence(tournament,id,index=null){
  const key=clean(id).toLowerCase();if(!isCustomId(key))throw new Error(`Custom Rating List does not exist: ${key}`);
  const seq=ensureSequence(tournament);if(seq.map(x=>clean(x).toLowerCase()).includes(key))return sequenceFor(tournament);
  const at=index==null?seq.length:Math.max(0,Math.min(seq.length,Number(index)||0));seq.splice(at,0,key);return sequenceFor(tournament);
}
function setAsMain(tournament,id){
  const key=clean(id).toLowerCase();if(!isCustomId(key))throw new Error(`Custom Rating List does not exist: ${key}`);
  const seq=ensureSequence(tournament);const filtered=seq.filter(x=>clean(x).toLowerCase()!==key);filtered.unshift(key);tournament.settings.ratingListSequence=filtered;return sequenceFor(tournament);
}
function removeFromSequence(tournament,id){
  const key=clean(id).toLowerCase();const seq=ensureSequence(tournament);tournament.settings.ratingListSequence=seq.filter(x=>clean(x).toLowerCase()!==key);return sequenceFor(tournament);
}
function moveInSequence(tournament,id,direction){
  const key=clean(id).toLowerCase();const seq=ensureSequence(tournament);const idx=seq.findIndex(x=>clean(x).toLowerCase()===key);if(idx<0)return sequenceFor(tournament);
  const delta=Number(direction)<0?-1:1;const next=Math.max(0,Math.min(seq.length-1,idx+delta));if(next!==idx){const [item]=seq.splice(idx,1);seq.splice(next,0,item);}return sequenceFor(tournament);
}

function officialResolution(player,listId){
  const id=clean(listId).toLowerCase();
  try{if(typeof window.fideSearchRatingForList==='function')return window.fideSearchRatingForList(player,id);}catch(_){ }
  const std=Math.max(0,Number(player?.std)||0),rapid=Math.max(0,Number(player?.rapid)||0),blitz=Math.max(0,Number(player?.blitz)||0);
  if(id==='fide-standard')return {rating:std,sourceType:'std',fallback:false};
  if(id==='fide-rapid')return {rating:rapid,sourceType:'rapid',fallback:false};
  if(id==='fide-blitz')return {rating:blitz,sourceType:'blitz',fallback:false};
  if(id==='effective-rapid')return rapid>0?{rating:rapid,sourceType:'rapid',fallback:false}:{rating:std,sourceType:'std',fallback:std>0};
  if(id==='effective-blitz')return blitz>0?{rating:blitz,sourceType:'blitz',fallback:false}:{rating:std,sourceType:'std',fallback:std>0};
  return {rating:0,sourceType:null,fallback:false};
}
async function resolveList(player,listId){
  const id=clean(listId).toLowerCase();
  if(isCustomId(id)){
    const row=await findRating(id,player?.fideId);
    const marker=markerById(id);
    return {listId:id,label:marker?.label||id,listRole:ROLE,custom:true,rating:Math.max(0,Number(row?.rating)||0),sourceType:marker?.ratingType||'',fallback:false,row:clone(row),marker:clone(marker)};
  }
  const result=officialResolution(player,id)||{};
  const labels=window.cpBeta66?.LABELS||{'fide-standard':'FIDE Standard','fide-rapid':'FIDE Rapid','fide-blitz':'FIDE Blitz','effective-rapid':'Effective Rapid','effective-blitz':'Effective Blitz'};
  return {listId:id,label:labels[id]||id,listRole:'official',custom:false,rating:Math.max(0,Number(result.rating)||0),sourceType:clean(result.sourceType),fallback:!!result.fallback};
}
async function resolveSequence(tournament,player){
  const sequence=sequenceFor(tournament);const hits=[];
  for(let i=0;i<sequence.length;i++){const resolved=await resolveList(player,sequence[i]);resolved.index=i;if(resolved.rating>0)hits.push(resolved);}
  const selected=hits[0]||null;const main=sequence.length?await resolveList(player,sequence[0]):null;
  return {sequence,main,selected,alternatives:selected?hits.filter(x=>x.listId!==selected.listId):hits,allHits:hits};
}
function retainCustomProvenance(player,resolved,reason='sequence-selection'){
  if(!player||!resolved?.custom||!(Number(resolved.rating)>0))return null;
  const previous=player.customRatingSource&&typeof player.customRatingSource==='object'?clone(player.customRatingSource):null;
  const next={schemaVersion:1,listId:resolved.listId,label:resolved.label,customCategory:resolved.marker?.customCategory||'other',ratingType:resolved.marker?.ratingType||'',sourceValue:Number(resolved.rating)||0,currentValue:Number(resolved.rating)||0,manualOverride:false,selectedAt:nowIso(),reason:clean(reason)||'sequence-selection',history:Array.isArray(previous?.history)?previous.history.slice(-9):[]};
  if(previous)next.history.push({...previous,history:undefined});
  player.customRatingSource=next;return clone(next);
}
function applyResolvedRating(player,resolved,reason='sequence-selection'){
  if(!player||!resolved||!(Number(resolved.rating)>0))throw new Error('A resolved positive rating is required.');
  player.rating=Number(resolved.rating)||0;
  if(resolved.custom)retainCustomProvenance(player,resolved,reason);
  return player.rating;
}
function noteManualOverride(player,newRating){
  const source=player?.customRatingSource;if(!source||typeof source!=='object')return null;
  source.currentValue=Math.max(0,Number(newRating)||0);source.manualOverride=source.currentValue!==Number(source.sourceValue||0);source.manualOverrideAt=source.manualOverride?nowIso():'';return clone(source);
}

function referencedBy(id,tournaments=[]){
  const key=clean(id).toLowerCase();const refs=[];
  const source=Array.isArray(tournaments)?tournaments:[];
  for(const t of source){if(sequenceFor(t).includes(key))refs.push(clean(t?.name||t?.settings?.name||t?.id)||'Tournament');}
  return refs;
}
async function deleteCustom(id,options={}){
  const key=clean(id).toLowerCase();const marker=markerById(key);if(!marker)return false;
  const refs=referencedBy(key,options.tournaments||[]);
  const current=typeof window.getCurrentTournament==='function'?window.getCurrentTournament():null;if(current&&sequenceFor(current).includes(key)&&!refs.includes(clean(current?.name||current?.settings?.name||current?.id)||'Tournament'))refs.push(clean(current?.name||current?.settings?.name||current?.id)||'Current tournament');
  if(refs.length&&!options.force)throw new Error(`Custom Rating List is used by: ${refs.join(', ')}. Remove it from every Rating List Sequence before deleting it.`);
  saveRegistry(loadRegistry().filter(item=>item.id!==key));
  if(options.deleteTypeB!==false)await typeB().deleteList(key);
  updateUi();return true;
}

function persistCurrentTournament(){try{if(typeof window.saveData==='function')window.saveData();else if(typeof window.saveAll==='function')window.saveAll();}catch(_){ }}
async function uiImport(){
  try{
    const file=document.getElementById('cpCustomFile')?.files?.[0];if(!file)throw new Error('Choose a rating-list file first.');
    const label=clean(document.getElementById('cpCustomLabel')?.value);const ratingType=clean(document.getElementById('cpCustomRatingType')?.value);const customCategory=clean(document.getElementById('cpCustomCategory')?.value);const text=await file.text();
    const item=await importCustom({label:label||file.name,ratingType,customCategory,text,fileName:file.name});
    window.appAlert?.(`Custom Rating List imported: ${item.label} (${item.recordCount} records).`,'Custom Rating Lists');
  }catch(error){window.appAlert?.(error?.message||String(error),'Custom Rating Lists','warning');}
}
async function uiManage(){
  const items=await listCustom();const rows=items.length?items.map(x=>`${x.label} | ${x.customCategory} | ${x.ratingTypeLabel} | ${x.recordCount} | ${x.id}`).join('\n'):'No Custom Rating Lists are stored.';
  window.appAlert?.(rows,'Custom Rating Lists');
}
async function uiAddCurrent(main=false){
  try{
    const id=clean(document.getElementById('cpCustomSequenceList')?.value);if(!id)throw new Error('Choose a Custom Rating List.');
    const t=typeof window.getCurrentTournament==='function'?window.getCurrentTournament():null;if(!t)throw new Error('Open a tournament first.');
    if(main)setAsMain(t,id);else addToSequence(t,id);persistCurrentTournament();await refreshSequenceSelect();
    window.setStatus?.(`${main?'Main Rating List set':'Custom Rating List added'}: ${markerById(id)?.label||id}`);
  }catch(error){window.appAlert?.(error?.message||String(error),'Custom Rating Lists','warning');}
}
async function refreshSequenceSelect(){
  const select=document.getElementById('cpCustomSequenceList');if(!select)return;const current=select.value;const items=await listCustom();select.innerHTML='<option value="">-- Custom list --</option>'+items.map(x=>`<option value="${escapeHtml(x.id)}">${escapeHtml(x.label)} (${escapeHtml(x.ratingTypeLabel)})</option>`).join('');if([...select.options].some(o=>o.value===current))select.value=current;
}
function escapeHtml(value){return clean(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function installUi(){
  const host=document.getElementById('integratedRatingListsPanel')||document.getElementById('cpTypeBPanel')?.parentElement;if(!host||document.getElementById('cpCustomRatingListsPanel'))return !!host;
  const box=document.createElement('div');box.id='cpCustomRatingListsPanel';box.className='cp-ratinglist-typeb';box.style.marginTop='10px';
  box.innerHTML=`<div style="font-weight:700;margin-bottom:4px">Custom Rating Lists — TEC Q117</div><div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><select id="cpCustomCategory"><option value="national">National</option><option value="regional">Regional</option><option value="club">Club</option><option value="historical">Historical</option><option value="other">Other</option></select><select id="cpCustomRatingType"><option value="std">Standard</option><option value="rapid">Rapid</option><option value="blitz">Blitz</option></select><input id="cpCustomLabel" type="text" placeholder="Custom list name"><input id="cpCustomFile" type="file" accept=".txt,.lst,.trf,text/plain"><button id="cpCustomImport" type="button">Import Custom</button><button id="cpCustomManage" type="button">View Custom Lists</button></div><div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:6px"><select id="cpCustomSequenceList"><option value="">-- Custom list --</option></select><button id="cpCustomAddSequence" type="button">Add to Rating List Sequence</button><button id="cpCustomSetMain" type="button">Set as Main Rating List</button></div><div style="margin-top:4px">Custom lists reuse the existing Type-B data store and the tournament Rating List Sequence. Their original source is not asserted by Chess-Publisher.</div>`;
  host.appendChild(box);document.getElementById('cpCustomImport')?.addEventListener('click',uiImport);document.getElementById('cpCustomManage')?.addEventListener('click',uiManage);document.getElementById('cpCustomAddSequence')?.addEventListener('click',()=>uiAddCurrent(false));document.getElementById('cpCustomSetMain')?.addEventListener('click',()=>uiAddCurrent(true));refreshSequenceSelect();return true;
}
function updateUi(){try{installUi();refreshSequenceSelect();}catch(_){ }}
function install(){updateUi();if(typeof document!=='undefined'){const timer=setInterval(()=>{if(installUi())clearInterval(timer);},250);setTimeout(()=>clearInterval(timer),10000);}}

window.cpBeta98={VERSION,SCHEMA,ROLE,REGISTRY_KEY,CATEGORIES,validType,validCategory,loadRegistry,saveRegistry,isCustomId,importCustom,markExistingTypeBAsCustom,listCustom,describe,findRating,sequenceFor,addToSequence,setAsMain,removeFromSequence,moveInSequence,resolveList,resolveSequence,applyResolvedRating,retainCustomProvenance,noteManualOverride,referencedBy,deleteCustom,installUi,install};
if(typeof document!=='undefined'&&document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else if(typeof document!=='undefined')install();
})();
