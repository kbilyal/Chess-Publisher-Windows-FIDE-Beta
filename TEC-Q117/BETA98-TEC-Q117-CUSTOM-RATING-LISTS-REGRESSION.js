const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const source=fs.readFileSync(process.argv[2]||path.join(__dirname,'ChessPublisher-Beta98-CustomRatingLists.js'),'utf8');
const local=new Map();
const typeBData=new Map();
const typeBCatalog=[];
const storage={
  getItem:key=>local.has(key)?local.get(key):null,
  setItem:(key,value)=>local.set(key,String(value)),
  removeItem:key=>local.delete(key)
};
const context={console,setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Map,Set,Promise,localStorage:storage,crypto:{randomUUID:()=> '11111111-2222-4333-8444-555555555555'}};
context.window=context;context.globalThis=context;
context.cpBeta81={
  async importTypeB(options){
    const id=String(options.id||'').toLowerCase();
    const descriptor={id,label:options.label,listClass:'Type-B',ratingType:options.ratingType,ratingTypeLabel:{std:'Standard',rapid:'Rapid',blitz:'Blitz'}[options.ratingType],originalSourceKnown:false,sourceFileName:options.fileName||'',periodKey:options.periodKey||'',importedAt:'2026-09-11T12:00:00.000Z',recordCount:Array.isArray(options.records)?options.records.length:0};
    typeBCatalog.push(descriptor);typeBData.set(id,Array.isArray(options.records)?options.records:[]);return JSON.parse(JSON.stringify(descriptor));
  },
  async listCatalog(){return JSON.parse(JSON.stringify(typeBCatalog));},
  async describe(id){return JSON.parse(JSON.stringify(typeBCatalog.find(x=>x.id===String(id).toLowerCase())||null));},
  async findRating(id,fideId){const row=(typeBData.get(String(id).toLowerCase())||[]).find(x=>String(x.fideId)===String(fideId));return row?JSON.parse(JSON.stringify(row)):null;},
  async deleteList(id){const key=String(id).toLowerCase();const idx=typeBCatalog.findIndex(x=>x.id===key);if(idx>=0)typeBCatalog.splice(idx,1);typeBData.delete(key);return idx>=0;}
};
context.cpBeta66={LABELS:{'fide-standard':'FIDE Standard','fide-rapid':'FIDE Rapid','fide-blitz':'FIDE Blitz','effective-rapid':'Effective Rapid','effective-blitz':'Effective Blitz'},sequenceFor:t=>Array.isArray(t?.settings?.ratingListSequence)?t.settings.ratingListSequence:[]};
vm.createContext(context);vm.runInContext(source,context,{filename:'ChessPublisher-Beta98-CustomRatingLists.js'});
const api=context.cpBeta98;

(async()=>{
  let pass=0;const check=(condition,message)=>{assert.ok(condition,message);pass++;};
  check(api.VERSION==='1.06.00-beta.98','version marker');
  check(api.ROLE==='custom','custom role');
  check(api.CATEGORIES.includes('national')&&api.CATEGORIES.includes('club')&&api.CATEGORIES.includes('historical'),'TEC custom categories');
  check(api.validType('Standard')==='', 'only canonical std/rapid/blitz API values accepted');
  check(api.validType('rapid')==='rapid','rapid type accepted');
  check(api.validCategory('CLUB')==='club','category normalization');
  check(api.validCategory('unknown')==='other','unknown category safe fallback');

  const custom=await api.importCustom({id:'custom-std-bul-club-2026',label:'Bulgarian Club List 2026',ratingType:'std',customCategory:'club',fileName:'clubs.txt',records:[{fideId:'2900001',rating:1875},{fideId:'2900002',rating:2010}]});
  check(custom.id==='custom-std-bul-club-2026','stable explicit custom ID');
  check(custom.customRatingList===true&&custom.listRole==='custom','custom descriptor explicit');
  check(custom.listClass==='Type-B','custom list reuses Type-B data system');
  check(custom.originalSourceKnown===false,'custom Type-B source remains unknown');
  check(custom.customCategory==='club','custom category retained');
  check(custom.recordCount===2,'record count retained');

  const catalog=await api.listCustom();
  check(catalog.length===1&&catalog[0].label==='Bulgarian Club List 2026','custom catalogue persists');
  check(api.isCustomId('CUSTOM-STD-BUL-CLUB-2026')===true,'custom IDs normalized case-insensitively');
  const found=await api.findRating(custom.id,'2900002');
  check(found&&found.rating===2010,'custom FIDE-ID lookup delegates to Type-B data');

  const tournament={name:'Q117 Test',settings:{ratingListSequence:['fide-standard','fide-rapid']}};
  const added=api.addToSequence(tournament,custom.id);
  check(added.join('|')==='fide-standard|fide-rapid|custom-std-bul-club-2026','custom list adds to existing sequence');
  api.addToSequence(tournament,custom.id);
  check(tournament.settings.ratingListSequence.length===3,'duplicate sequence entry rejected');
  const main=api.setAsMain(tournament,custom.id);
  check(main[0]===custom.id,'custom list can become Main Rating List');
  api.moveInSequence(tournament,custom.id,1);
  check(tournament.settings.ratingListSequence[1]===custom.id,'custom list moves down in sequence');
  api.moveInSequence(tournament,custom.id,-1);
  check(tournament.settings.ratingListSequence[0]===custom.id,'custom list moves up in sequence');

  const player={fideId:'2900002',std:2200,rapid:2100,blitz:2000,rating:0};
  let resolved=await api.resolveSequence(tournament,player);
  check(resolved.main.custom===true&&resolved.main.rating===2010,'Main custom-list hit resolved');
  check(resolved.selected.listId===custom.id&&resolved.selected.rating===2010,'first sequence hit selected automatically');
  check(resolved.allHits.some(x=>x.listId==='fide-standard'&&x.rating===2200),'later official alternatives retained');
  api.applyResolvedRating(player,resolved.selected,'registration');
  check(player.rating===2010,'custom Tournament Rating applied');
  check(player.customRatingSource.listId===custom.id&&player.customRatingSource.sourceValue===2010,'custom source provenance retained');
  api.noteManualOverride(player,2050);
  check(player.customRatingSource.sourceValue===2010&&player.customRatingSource.currentValue===2050&&player.customRatingSource.manualOverride===true,'manual override preserves original custom source');

  const missing={fideId:'2999999',std:2200,rapid:0,blitz:0};
  resolved=await api.resolveSequence(tournament,missing);
  check(resolved.main.custom===true&&resolved.main.rating===0,'Main custom miss is explicit');
  check(resolved.selected.listId==='fide-standard'&&resolved.selected.rating===2200,'later sequence rating becomes proposed selection');

  let duplicateError='';
  try{await api.importCustom({id:custom.id,label:'Duplicate',ratingType:'std',records:[]});}catch(e){duplicateError=e.message;}
  check(/already exists/i.test(duplicateError),'duplicate custom ID fails closed');

  let deleteGuard='';
  try{await api.deleteCustom(custom.id,{tournaments:[tournament]});}catch(e){deleteGuard=e.message;}
  check(/used by/i.test(deleteGuard),'deleting referenced custom list fails closed');
  api.removeFromSequence(tournament,custom.id);
  check(!tournament.settings.ratingListSequence.includes(custom.id),'custom list removes from sequence');
  check(await api.deleteCustom(custom.id,{tournaments:[tournament]})===true,'unreferenced custom list deletes safely');
  check((await api.listCustom()).length===0,'custom registry and Type-B catalogue remain consistent after delete');

  const official=await context.cpBeta81.importTypeB({id:'type-b-std-official-copy',label:'Imported FIDE Standard',ratingType:'std',records:[{fideId:'2900001',rating:1900}]});
  check(official.listClass==='Type-B'&&!api.isCustomId(official.id),'ordinary Type-B official import remains non-custom');
  const marked=await api.markExistingTypeBAsCustom(official.id,{label:'Historical Club Snapshot',customCategory:'historical'});
  check(marked.customRatingList===true&&marked.customCategory==='historical','existing Type-B list can be explicitly classified Custom');
  check((await api.describe(official.id)).listClass==='Type-B','classification does not replace Type-B storage model');

  const defaultSequence={settings:{ratingListSequence:['effective-rapid','fide-blitz']}};
  check(api.sequenceFor(defaultSequence).join('|')==='effective-rapid|fide-blitz','existing default sequence remains unchanged');

  console.log(`BETA98 TEC Q117 CUSTOM RATING LISTS: ${pass} PASS / 0 FAIL`);
})().catch(error=>{console.error(error);process.exitCode=1;});
