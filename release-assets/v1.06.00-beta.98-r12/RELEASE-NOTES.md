# Chess-Publisher v1.06.00-beta.98-r12 — Pre-FIDE / TEC Review Candidate

This public pre-release is the exact Windows `v1.06.00-beta.98-r12` candidate prepared for technical review.

**Important:** this label does **not** mean that Chess-Publisher is FIDE approved, certified or endorsed. Stable `v1.05.01` remains the recommended production release and is not replaced by this candidate.

## Release gate

- Independent full JavaScript rerun: **108 PASS / 2 approved historical exceptions / 1 browser-only skip / 0 unexpected failures** (111 scenarios total)
- Dedicated r12 Late Entry regression: **23/23 PASS**
- Static audit: **PASS**
- Protected core: **70/70 byte-identical**
- Windows EXE SHA-256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`

## r12 scope

- Late Entry direct double-click workflow for a started Swiss tournament
- explicit confirmation before a late entrant is committed
- existing rating-source/provenance helpers reused
- missed rounds remain unchanged; established late-entry lifecycle is preserved
- no protected pairing, Gacrux 1.9.57, TRF, BBP, Tie-Break, Chess-Results, SYNC or rating-calculation core changes

Use this channel for evaluation and technical review. For production tournament use, keep Stable unless the operator deliberately chooses the Pre-FIDE candidate.
