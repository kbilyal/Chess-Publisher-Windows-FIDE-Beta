const assert=require('assert');
const api=require('./TEC-Q214-Q216-RatingPolicy.js');
const {POLICIES}=api;

let pass=0;
function test(name,fn){fn(); pass++; console.log('PASS',name);}
const clone=x=>JSON.parse(JSON.stringify(x));

const p={
  fideId:'2912345', name:'Example, Player', officialRating:1790, rating:1790,
  longEventRatingHistory:[
    {fromRound:4,toRound:7,rating:1817,listPeriod:'2026-10'},
    {fromRound:1,toRound:3,rating:1802,listPeriod:'2026-09'}
  ]
};
const secondKey=api.periodKey(p.longEventRatingHistory[0],0);

test('default policy is FIDE_FIRST',()=>assert.equal(api.policyFromTournament({}),POLICIES.FIDE_FIRST));
test('FIDE_FIRST uses earliest applicable rating, not array order',()=>assert.equal(api.resolveTieBreakRating(p,{}).rating,1802));
test('FIDE_FIRST reports provenance',()=>assert.equal(api.resolveTieBreakRating(p,{}).source,'FIDE_FIRST'));
test('ROUND_EFFECTIVE resolves first period',()=>assert.equal(api.resolveTieBreakRating(p,{policy:POLICIES.ROUND_EFFECTIVE,round:2}).rating,1802));
test('ROUND_EFFECTIVE resolves later period',()=>assert.equal(api.resolveTieBreakRating(p,{policy:POLICIES.ROUND_EFFECTIVE,round:5}).rating,1817));
test('ROUND_EFFECTIVE can consume beta.70 ratingForRound adapter',()=>{
  const r=api.resolveTieBreakRating(p,{policy:POLICIES.ROUND_EFFECTIVE,round:6,ratingForRound:(_p,r)=>({rating:r<=3?1802:1817})});
  assert.equal(r.rating,1817);
});
test('ROUND_EFFECTIVE requires a round',()=>assert.equal(api.resolveTieBreakRating(p,{policy:POLICIES.ROUND_EFFECTIVE}).code,'ROUND_REQUIRED'));
test('USER_SELECTED accepts a valid player-period key',()=>{
  const r=api.resolveTieBreakRating(p,{policy:POLICIES.USER_SELECTED,selections:{'2912345':secondKey}});
  assert.equal(r.rating,1817);
});
test('USER_SELECTED never guesses when selection is missing',()=>assert.equal(api.resolveTieBreakRating(p,{policy:POLICIES.USER_SELECTED,selections:{}}).code,'SELECTION_REQUIRED'));
test('USER_SELECTED rejects stale/foreign selection',()=>assert.equal(api.resolveTieBreakRating(p,{policy:POLICIES.USER_SELECTED,selections:{'2912345':'foreign'}}).code,'INVALID_SELECTION'));
test('invalid policy is rejected',()=>assert.equal(api.resolveTieBreakRating(p,{policy:'LAST_WRITE_WINS'}).code,'INVALID_POLICY'));
test('no history safely uses caller/base rating',()=>assert.equal(api.resolveTieBreakRating({fideId:'1',rating:1666},{}).rating,1666));
test('caller base-rating resolver remains authoritative for fallback semantics',()=>assert.equal(api.resolveTieBreakRating({fideId:'1'},{getBaseRating:()=>1777}).rating,1777));
test('resolver is non-mutating',()=>{
  const before=clone(p); api.resolveTieBreakRating(p,{policy:POLICIES.ROUND_EFFECTIVE,round:5}); assert.deepStrictEqual(p,before);
});
test('FIDE_FIRST encounter average is deterministic',()=>{
  const q={fideId:'2',rating:1900,longEventRatingHistory:[{fromRound:1,toRound:4,rating:1900},{fromRound:5,toRound:7,rating:1910}]};
  const r=api.averageEncounterRatings([{player:p,round:2},{player:q,round:5}],{policy:POLICIES.FIDE_FIRST});
  assert.equal(r.value,1851); // (1802+1900)/2
});
test('ROUND_EFFECTIVE encounter average changes only through per-round ratings',()=>{
  const q={fideId:'2',rating:1900,longEventRatingHistory:[{fromRound:1,toRound:4,rating:1900},{fromRound:5,toRound:7,rating:1910}]};
  const r=api.averageEncounterRatings([{player:p,round:2},{player:q,round:5}],{policy:POLICIES.ROUND_EFFECTIVE});
  assert.equal(r.value,1856); // (1802+1910)/2
});
test('USER_SELECTED configuration validates all multi-rating players',()=>{
  const cfg={tieBreakRatingPolicy:{mode:POLICIES.USER_SELECTED,selections:{'2912345':secondKey}}};
  assert.equal(api.validateConfig(cfg,[p]).ok,true);
});
test('USER_SELECTED configuration blocks incomplete selections',()=>{
  const cfg={tieBreakRatingPolicy:{mode:POLICIES.USER_SELECTED,selections:{}}};
  assert.equal(api.validateConfig(cfg,[p]).ok,false);
});
test('single-rating player does not require explicit selection',()=>{
  const s={fideId:'3',longEventRatingHistory:[{fromRound:1,toRound:7,rating:1700}]};
  const cfg={tieBreakRatingPolicy:{mode:POLICIES.USER_SELECTED,selections:{}}};
  assert.equal(api.validateConfig(cfg,[s]).ok,true);
});
test('period key remains data-derived and deterministic',()=>{
  const rec={fromRound:1,toRound:3,rating:1802,listPeriod:'2026-09'};
  assert.equal(api.periodKey(rec,99),api.periodKey(clone(rec),0));
});

console.log(`TEC Q214-Q216 PURE POLICY RESULT: ${pass} PASS / 0 FAIL`);
