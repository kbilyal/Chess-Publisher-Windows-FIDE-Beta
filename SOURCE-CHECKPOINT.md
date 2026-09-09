# beta.73 Source Checkpoint

Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-08

The Git repository stores the auditable checkpoint metadata/specifications while the exact Windows TEST CANDIDATE and corrected source archive are archived in Google Drive.

## Exact parent
- Parent Windows checkpoint: `v1.06.00-beta.72 — Windows Integrated Rating Lists / Directional Cloud Sync`
- Parent permanent Git checkpoint: `8ad71fd4ed14550f5cc4434d500f7c9dc9af2a42`
- Parent beta.72 source SHA256: `f354cc779cadbf514c326229b4a55043f02dfc9b159018491b68abddc21e2284`

## Canonical beta.73 artifacts
- TEST CANDIDATE: `Chess-Publisher-v1.06.00-beta.73-TEC-Q214-Q216-Rating-Policy-TEST-CANDIDATE-2026-09-08.zip`
- TEST CANDIDATE SHA256: `3f7791429f86e3cb3c871f4669bc0071691692a5899a83d76232dd00a0da5e2a`
- Corrected source archive: `Chess-Publisher-Windows-FIDE-Beta73-SOURCE.tar.gz`
- Corrected source SHA256: `bfeaa55e2e70d14009396efa31aa906d578db633ec854c7810b995ff4c6d0d7d`
- Reproducible beta.72→beta.73 overlay: `beta73-tec-q214-q216-rating-policy.patch`
- Overlay SHA256: `383f390c729eda22d9f9c809a1ab47491dd1a1344f9e48fdbc1f66437aa6b00f`
- Drive checkpoint folder: `https://drive.google.com/drive/folders/1SaeKhXBW2rJllLmWUASwwoFBb_p6AwUZ`
- Living TEC VCL Drive ID: `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`

## Important source-archive correction
An earlier Library artifact named `Chess-Publisher-Windows-FIDE-Beta73-SOURCE.tar.gz` had SHA256 `ad1d1e7581bee67ed103354c2e73c65fd2e475380148f34aa8bb6f840055c52a` but its internal `VERSION.txt` was still `1.06.00-beta.72` and it did not contain the beta.73 module. **Do not use that artifact as the beta.73 parent.** It is superseded by the corrected source archive above.

The corrected source was regenerated from the exact validated beta.73 TEST CANDIDATE and contains source/tests/evidence only; compiled runtime binaries and packaged binary artifacts are intentionally excluded. Its `VERSION.txt` is `1.06.00-beta.73`, `ChessPublisher-Beta73-Compliance.js` SHA256 is `6b6bb38edee338717c7941376be35225fe3954034e5aad666d0640e9f413b6b6`, and the dedicated regression SHA256 is `239aac4acd0bddceb27aa59eb317d5605bc256f98efe6fbe873e22bfb680905b`.

## Implemented
- Q215 `FIDE_FIRST`: first official rating is the default for Article-10 rating-based tie-breaks.
- Q214 `ROUND_EFFECTIVE`: encounter ratings are resolved through beta.70 `ratingForRound(player, round)`.
- Q216 `USER_SELECTED`: explicit per-player official rating period, fail-closed on missing/stale selections.
- Article-10 coverage: ARO including cut/median forms, TPR, PTP, APRO, APPO, RTNG and RTNG/R.
- `tournament.tieBreakRatingPolicy` is portable tournament-rule state; derived beta.73 caches are non-serializable `WeakMap` state.
- Existing protected Tie-Break source is unchanged; beta.73 integrates through public calculation/value seams.

## Verified gates
- Q214–Q216 dedicated: 34/34 PASS (re-run against exact TEST CANDIDATE)
- Chromium policy editor evidence: 8/8 PASS in packaged regression log; current container could not independently re-run Chromium because its headless runtime stalls before DOM output
- Cumulative JS: 59 PASS + 3 approved historical exceptions + 1 designated browser-runner skip; unexpected 0 (re-run)
- Static audit: PASS (re-run)
- Protected core: 70/70 byte-identical (re-run)
- Gacrux 1.9.57 protected subset: 61/61 byte-identical
- Windows Fluidity v2: 60/60 PASS
- Integrated Rating Lists: 34/34 PASS
- Directional Desktop/Web Cloud: 33/33 PASS
- TRF export reliability: PASS
- TRF26 completeness: 49/49 PASS
- Swiss pairing integrity: 25/25 PASS
- Mandatory Swiss tie-break regression: 35/35 PASS
- Chess-Results Pairings publish regression: PASS

## VCL state
Working VCL Q214/Q215/Q216 are YES/PASS based on beta.73 implementation evidence. Working totals: PASS 147 / PARTIAL 22 / FAIL 0 / CONDITIONAL 21 / NEEDS TEST 4 / NEEDS TEC 1 / N/A 30. This is not a FIDE TEC certification result.
