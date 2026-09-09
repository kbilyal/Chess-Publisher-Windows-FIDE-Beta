# Windows FIDE Beta Checkpoint — v1.06.00-beta.80

Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-09  
Parent: `v1.06.00-beta.79`

## Scope
TEC evidence-only closure patch. No pairing, Gacrux, Swiss Dutch, TRF16/TRF26, BBP, protected Tie-Break, Chess-Results, or unified Cloud SYNC algorithm changed.

## Canonical hashes
- Candidate ZIP: `d9c3a24c71a87d216b0f5658a52b4a37a77ceee649ab2d710655238c17a00c12`
- Source archive: `b027ce2442459cc7dedaa8fd99c0b4a38cc30d822629318dd4f4341b37784101`
- Source patch: `32086f55bc42095101e6b69b0d30d0b7e8cb4f2b7daeea2cf9599e297ba24b1c`
- Windows EXE carried forward unchanged: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`

## Storage
- Drive folder: `https://drive.google.com/drive/folders/1Wn2Zzq6FVpWDYMqeY5FqNBkhwBQrmoTn`
- Living VCL file ID: `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`

## VCL closures
- Q98 — PASS: deterministic even-field double-Berger round-order behavior already verified; no reverse selector exposed.
- Q125 — PASS: ordered multi-list Rating List Sequence operation is implemented and persistent.
- Q218 — PASS: Level-2 warnings cannot be globally disabled.
- Q219 — PASS: Level-3 confirmation cannot be globally disabled.
- Q220 — PASS: Level-4 warnings cannot be disabled.
- Q221 — PASS: Level-4 warnings cannot be downgraded to Level-3.

## Gate evidence
- Dedicated beta.80 TEC evidence: **15/15 PASS**
- Cumulative Node regression: **67 PASS / 3 known / 1 skip / 0 unexpected**
- Static audit: **PASS**
- Protected core: **70/70 byte-identical**

## VCL state after beta.80
PASS 157 / PARTIAL 16 / FAIL 0 / CONDITIONAL 21 / NEEDS TEST 0 / NEEDS TEC 1 / N/A 30.

Q18 remains the only `NEEDS TEC` item and requires external FIDE TEC confirmation. Conditional Q19–Q39 remain dependent on that decision.

## Next TEC target
Q170 — add an explicit withdrawn-player marker in standings/export presentation without altering pairing eligibility/history semantics.
