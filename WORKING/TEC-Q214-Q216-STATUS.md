# TEC Q214–Q216 Working State

Date: 2026-09-08
Status: **QUEUED INTEGRATION — BLOCKED FROM FULL WINDOWS INTEGRATION; NOT A BETA CANDIDATE**

## Exact parent

- Accepted Windows TEST CANDIDATE: `v1.06.00-beta.72 — Integrated Rating Lists`
- Permanent beta.72 checkpoint commit: `8ad71fd4ed14550f5cc4434d500f7c9dc9af2a42`
- beta.72 implementation/artifact commit: `5a68e2ecbdf371f6cdbf6b935c0ca9dc30017512`
- beta.72 Drive folder: `https://drive.google.com/drive/folders/15wsY3-iqyV2V5TuRsQajMPDhTFDdEi2a`
- beta.72 source archive SHA256: `f354cc779cadbf514c326229b4a55043f02dfc9b159018491b68abddc21e2284`
- beta.72 portable SHA256: `ff193f5c803460afb9dd8f59980724cbf54023eb3b42248e67f9add6876f1bd5`

## FIDE rule verified

Current FIDE Handbook C.07 Article 10 (effective 1 March 2026) states that rating-based tie-breaks are not recommended when a player can receive more than one rating during the tournament; if used, the **first rating** is the default unless the specific tournament regulations state otherwise.

Source: `https://handbook.fide.com/chapter/TieBreakRegulations032026`

Policy mapping:

- Q215 target: `FIDE_FIRST` — default.
- Q214 target: `ROUND_EFFECTIVE` — consume beta.70 `ratingForRound(player, round)`.
- Q216 target: `USER_SELECTED` — explicit validated per-player rating-period selection; no silent guessing/fallback.

## Additive pure policy layer

Files:

- `WORKING/TEC-Q214-Q216-RatingPolicy.js`
- `WORKING/TEC-Q214-Q216-RatingPolicy.test.js`
- `SPECS/TEC-Q214-Q216-RATING-POLICY.md`

Exact Git blob hashes after push:

- policy module: `4d2654f8c2c9b39b9af84ac891eb1642a602010a`
- unit test: `0626ecb20da0e4028549e82ab1100c547d60c904`
- specification: `d3c29364497541576484d71a153bea77512d48d4`

Executed locally against these exact bytes:

`TEC Q214-Q216 PURE POLICY RESULT: 20 PASS / 0 FAIL`

This proves the pure resolver/policy behavior only. It does **not** prove application integration.

## Living VCL

Living VCL Drive ID remains:

`11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`

Q214/Q215/Q216 descriptions and evidence were corrected to reflect the beta.70 multi-rating foundation and the verified C.07:10 first-rating default.

Their compliance state intentionally remains:

- Q214: `NO / FAIL / P1 / Penalty 3%`
- Q215: `NO / FAIL / P1 / Penalty 18%`
- Q216: `NO / FAIL / P1 / Penalty 10%`

No VCL PASS was claimed.

## Current blocker

The exact beta.72 complete source archive and portable package are present in the beta.72 Drive checkpoint folder, but the Google Drive API currently rejects raw download with provider reason:

`cannotDownloadAbusiveFile` — `This file has been identified as malware or spam and cannot be downloaded.`

Project policy forbids rebuilding from an older GitHub runtime/HTML or another parent. Therefore full Windows integration is intentionally blocked rather than reconstructed from a stale source.

## Next exact action once the source is accessible

1. Load the exact beta.72 source tree.
2. Add the policy layer without modifying protected Tie-Break core/checker.
3. Wire the existing rating access seam for all implemented C.07 Article-10 rating-based tie-break calculations.
4. Add long-event Tie-Break settings UI:
   - FIDE default — First rating
   - Rating valid for each round
   - Explicit rating selection per player
5. Persist policy as portable tournament-rule state only.
6. Run dedicated Q214/Q215/Q216 integration tests.
7. Run full beta.72 protected gate: Fluidity v2, directional Desktop/Web sync, roster parity, TRF16/TRF26, Gacrux, Swiss, BBP, Tie-Break protected hashes, Chess-Results.
8. Only after actual PASS update VCL Q214–Q216 and create the next Windows TEST CANDIDATE version.

Do not call this working state Final/Stable and do not create beta.73 until the real application integration and full gate have passed.
