# Windows FIDE Beta Checkpoint — v1.06.00-beta.72

Parent: `v1.06.00-beta.71 — Windows Fluidity v2`
Parent Git HEAD: `58ab9aa2fdbc72ac5188272279750319a805e95d`
Implementation/artifact commit: `5a68e2ecbdf371f6cdbf6b935c0ca9dc30017512`
Scope: Windows Integrated Rating Lists + Directional Desktop/Web Cloud synchronization.
Status: WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE.

## Exact checkpoint artifacts
- Portable TEST CANDIDATE: `Chess-Publisher-v1.06.00-beta.72-Windows-Integrated-Rating-Lists-TEST-CANDIDATE-2026-09-08.zip`
- Portable SHA256: `ff193f5c803460afb9dd8f59980724cbf54023eb3b42248e67f9add6876f1bd5`
- Complete source archive: `Chess-Publisher-Windows-FIDE-Beta72-SOURCE.tar.gz`
- Source archive SHA256: `f354cc779cadbf514c326229b4a55043f02dfc9b159018491b68abddc21e2284`
- Reproducible source overlay patch: `beta72-windows-rating-lists-cloud.patch`
- Patch SHA256: `d123162f0dcb5f02fa3d9c1de5549cd86d070126ae46829621909a2cabce0d04`
- Drive checkpoint folder: `https://drive.google.com/drive/folders/15wsY3-iqyV2V5TuRsQajMPDhTFDdEi2a`

## Changed source files
- `ChessPublisher.html`
- `ChessPublisher-WebView.ps1`
- `FIDE-Update.ps1`
- `VERSION.txt`
- `ChessPublisher-Beta72-RatingLists.js` (new)
- `webview/CloudWorkspaceRedesign.js` (new)
- `TESTS/BETA71-WINDOWS-FLUIDITY-V2-REGRESSION.js`
- `TESTS/BETA72-WINDOWS-INTEGRATED-RATING-LISTS-REGRESSION.js` (new)
- `TESTS/BETA72-DESKTOP-WEB-DIRECTIONAL-CLOUD-SYNC-REGRESSION.js` (new)

## Integrated Rating Lists state
- FIDE Standard / Rapid / Blitz are installation-local reference data.
- Full list database is not serialized into tournament/cloud/Hub/TRF state.
- Staged all-or-nothing generation update with rollback and atomic activation.
- One logical player keyed by FIDE ID with Standard/Rapid/Blitz values.
- Exact FIDE ID lookup and deterministic normalized token-prefix name search.
- `Review Player Updates` is preview-only until explicit Apply.
- Registered tournament players remain immutable snapshots after local database updates.
- Resort Starting List remains a separate explicit operation.

## Directional Cloud state
- `↓ Pull Cloud → Desktop` only.
- `↑ Push Desktop → Cloud` only.
- Local Autosave performs no Cloud transfer.
- Legacy Cloud autosync disabled.
- Real BASE/LOCAL/REMOTE three-way merge and explicit same-field conflict choices.
- `internalId` / `cloudTournamentId` identity preserved through tournament rename.
- 83-player Desktop/Web portable snapshot parity covered by deterministic fixture.

## Deterministic gates
- Integrated Rating Lists dedicated: 34/34 PASS
- Directional Desktop/Web Cloud dedicated: 33/33 PASS
- Windows Fluidity v2: 60/60 PASS
- Static audit: PASS
- Cumulative regression: 58 PASS + 3 approved historical exceptions + 1 designated browser-runner skip
- Unexpected failures: 0
- TRF export reliability: PASS
- TRF26 completeness: 49/49 PASS
- Swiss pairing integrity: 25/25 PASS
- Mandatory Swiss tie-break regression: 35/35 PASS
- Chess-Results Pairings publish regression: PASS

## Protected core / integrity
- Protected core manifest: 70/70 byte-identical to beta.70
- Gacrux 1.9.57 subset: 61/61 byte-identical
- `ChessPublisher.exe`: unchanged
- `ChessPublisher-LocalEngine.ps1`: unchanged
- Gacrux/Swiss Dutch/TRF16/TRF26/BBP/Tie-Break/Chess-Results protocol cores: unchanged
- pairingNumber/player IDs/localKey/starting-number semantics: unchanged

## VCL state
Living FIDE/TEC VCL Drive ID: `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`
No TEC/VCL answers were changed by beta.72.
Carry-forward state from beta.70:
- PASS 144
- PARTIAL 22
- FAIL 3
- CONDITIONAL 21
- NEEDS TEST 4
- NEEDS TEC 1
- N/A 30

## Unresolved blockers / next actionable task
No Rating Lists or directional Cloud gate blocker is recorded in the beta.72 regression artifacts.
Do not declare Final/Stable.
Next task: TEC Q214–Q216 using an additive tested rating-policy/calculation layer; do not modify protected Tie-Break core merely to close them.
Q214: rating-based tie-break calculations must use the rating valid for the specific round in long events.
Q215: implement/verify the correct default C.07:10 rating policy.
Q216: allow an explicit user-selected valid rating policy.
PTC/RTG Q18–Q39 remain conditional pending TEC clarification.
