(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  if(root) root.cpTecRatingPolicy=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const POLICIES=Object.freeze({
    FIDE_FIRST:'FIDE_FIRST',
    ROUND_EFFECTIVE:'ROUND_EFFECTIVE',
    USER_SELECTED:'USER_SELECTED'
  });

  function finiteRating(value){
    const n=Number(value);
    return Number.isFinite(n)&&n>0?n:null;
  }

  function playerKey(player){
    if(!player||typeof player!=='object') return '';
    const raw=player.fideId||player.fideID||player.id||player.localKey||'';
    return String(raw).trim();
  }

  function ratingValue(value){
    if(value&&typeof value==='object'){
      for(const k of ['rating','value','officialRating','effectiveRating']){
        const n=finiteRating(value[k]);
        if(n!==null) return n;
      }
      return null;
    }
    return finiteRating(value);
  }

  function historyOf(player){
    const src=player&&Array.isArray(player.longEventRatingHistory)?player.longEventRatingHistory:[];
    return src.map((rec,index)=>({rec,index}))
      .filter(x=>ratingValue(x.rec)!==null)
      .sort((a,b)=>{
        const af=Number.isInteger(Number(a.rec.fromRound))?Number(a.rec.fromRound):Number.MAX_SAFE_INTEGER;
        const bf=Number.isInteger(Number(b.rec.fromRound))?Number(b.rec.fromRound):Number.MAX_SAFE_INTEGER;
        if(af!==bf) return af-bf;
        const at=Number.isInteger(Number(a.rec.toRound))?Number(a.rec.toRound):Number.MAX_SAFE_INTEGER;
        const bt=Number.isInteger(Number(b.rec.toRound))?Number(b.rec.toRound):Number.MAX_SAFE_INTEGER;
        if(at!==bt) return at-bt;
        return a.index-b.index;
      });
  }

  function periodKey(rec,index){
    if(!rec||typeof rec!=='object') return `idx:${index}`;
    const explicit=rec.periodId||rec.id||rec.sourcePeriod||rec.periodKey;
    if(explicit!==undefined&&explicit!==null&&String(explicit).trim()) return String(explicit).trim();
    const from=rec.fromRound??'';
    const to=rec.toRound??'';
    const rate=ratingValue(rec)??'';
    const list=rec.listPeriod||rec.listDate||rec.effectiveDate||'';
    return `r:${from}-${to}|v:${rate}|p:${list}`;
  }

  function fallbackRating(player,ctx){
    if(ctx&&typeof ctx.getBaseRating==='function') return ratingValue(ctx.getBaseRating(player));
    for(const k of ['officialRating','rating','tournamentRating']){
      const n=ratingValue(player&&player[k]);
      if(n!==null) return n;
    }
    return null;
  }

  function firstRating(player,ctx){
    const hist=historyOf(player);
    if(hist.length){
      const item=hist[0];
      return {ok:true,rating:ratingValue(item.rec),source:'FIDE_FIRST',periodKey:periodKey(item.rec,item.index)};
    }
    const fb=fallbackRating(player,ctx);
    if(fb!==null) return {ok:true,rating:fb,source:'BASE_RATING'};
    return {ok:false,code:'NO_RATING',message:'No valid rating is available for this player.'};
  }

  function roundEffectiveRating(player,ctx){
    const round=Number(ctx&&ctx.round);
    if(!Number.isInteger(round)||round<1){
      return {ok:false,code:'ROUND_REQUIRED',message:'ROUND_EFFECTIVE requires a positive integer round.'};
    }
    if(ctx&&typeof ctx.ratingForRound==='function'){
      const resolved=ctx.ratingForRound(player,round);
      const n=ratingValue(resolved);
      if(n!==null) return {ok:true,rating:n,source:'ROUND_EFFECTIVE',round};
    }
    const hist=historyOf(player);
    const found=hist.find(({rec})=>{
      const from=Number(rec.fromRound), to=Number(rec.toRound);
      return Number.isInteger(from)&&Number.isInteger(to)&&round>=from&&round<=to;
    });
    if(found) return {ok:true,rating:ratingValue(found.rec),source:'ROUND_EFFECTIVE',round,periodKey:periodKey(found.rec,found.index)};
    const fb=fallbackRating(player,ctx);
    if(fb!==null) return {ok:true,rating:fb,source:'BASE_RATING_FALLBACK',round};
    return {ok:false,code:'NO_RATING_FOR_ROUND',message:`No valid rating is available for round ${round}.`};
  }

  function selectedRating(player,ctx){
    const key=playerKey(player);
    if(!key) return {ok:false,code:'PLAYER_ID_REQUIRED',message:'USER_SELECTED requires a stable player identity.'};
    const selections=ctx&&ctx.selections&&typeof ctx.selections==='object'?ctx.selections:{};
    const wanted=selections[key];
    if(wanted===undefined||wanted===null||String(wanted).trim()===''){
      return {ok:false,code:'SELECTION_REQUIRED',message:`No tie-break rating period is selected for player ${key}.`};
    }
    const wantedKey=String(wanted).trim();
    const hist=historyOf(player);
    const found=hist.find(({rec,index})=>periodKey(rec,index)===wantedKey);
    if(!found){
      return {ok:false,code:'INVALID_SELECTION',message:`Selected tie-break rating period is not valid for player ${key}.`};
    }
    return {ok:true,rating:ratingValue(found.rec),source:'USER_SELECTED',periodKey:wantedKey};
  }

  function normalizePolicy(policy){
    const p=String(policy||POLICIES.FIDE_FIRST).trim().toUpperCase();
    return Object.prototype.hasOwnProperty.call(POLICIES,p)?POLICIES[p]:null;
  }

  function resolveTieBreakRating(player,ctx={}){
    const policy=normalizePolicy(ctx.policy);
    if(!policy) return {ok:false,code:'INVALID_POLICY',message:'Unknown tie-break rating policy.'};
    if(policy===POLICIES.FIDE_FIRST) return firstRating(player,ctx);
    if(policy===POLICIES.ROUND_EFFECTIVE) return roundEffectiveRating(player,ctx);
    return selectedRating(player,ctx);
  }

  function policyFromTournament(tournament){
    const raw=tournament&&tournament.tieBreakRatingPolicy&&tournament.tieBreakRatingPolicy.mode;
    return normalizePolicy(raw)||POLICIES.FIDE_FIRST;
  }

  function validateConfig(tournament,players=[]){
    const policy=policyFromTournament(tournament);
    if(policy!==POLICIES.USER_SELECTED) return {ok:true,policy};
    const selections=(tournament&&tournament.tieBreakRatingPolicy&&tournament.tieBreakRatingPolicy.selections)||{};
    const errors=[];
    for(const p of players){
      if(historyOf(p).length>1){
        const r=selectedRating(p,{selections});
        if(!r.ok) errors.push({playerKey:playerKey(p),code:r.code,message:r.message});
      }
    }
    return errors.length?{ok:false,policy,errors}:{ok:true,policy};
  }

  function averageEncounterRatings(encounters,ctx={}){
    if(!Array.isArray(encounters)||!encounters.length) return {ok:false,code:'NO_ENCOUNTERS'};
    const values=[];
    for(const e of encounters){
      const r=resolveTieBreakRating(e.player,Object.assign({},ctx,{round:e.round}));
      if(!r.ok) return r;
      values.push(r.rating);
    }
    return {ok:true,value:values.reduce((a,b)=>a+b,0)/values.length,ratings:values};
  }

  return Object.freeze({
    POLICIES,
    playerKey,
    periodKey,
    historyOf,
    policyFromTournament,
    validateConfig,
    resolveTieBreakRating,
    averageEncounterRatings
  });
});
