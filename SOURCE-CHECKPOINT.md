# beta.72 Source Checkpoint

The Git repository stores the auditable checkpoint metadata/specifications while the exact complete Windows source/runtime package is archived in Google Drive.

- Parent Windows checkpoint: `v1.06.00-beta.71 — Windows Fluidity v2`
- Parent Git HEAD: `58ab9aa2fdbc72ac5188272279750319a805e95d`
- beta.72 full source archive: `Chess-Publisher-Windows-FIDE-Beta72-SOURCE.tar.gz`
- Source archive SHA256: `f354cc779cadbf514c326229b4a55043f02dfc9b159018491b68abddc21e2284`
- beta.72 TEST CANDIDATE: `Chess-Publisher-v1.06.00-beta.72-Windows-Integrated-Rating-Lists-TEST-CANDIDATE-2026-09-08.zip`
- Portable SHA256: `ff193f5c803460afb9dd8f59980724cbf54023eb3b42248e67f9add6876f1bd5`
- Reproducible source overlay patch: `beta72-windows-rating-lists-cloud.patch`
- Patch SHA256: `d123162f0dcb5f02fa3d9c1de5549cd86d070126ae46829621909a2cabce0d04`
- Drive checkpoint folder: https://drive.google.com/drive/folders/15wsY3-iqyV2V5TuRsQajMPDhTFDdEi2a
- Living TEC VCL ID remains `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`; beta.72 does not change TEC/VCL answers.

Source overlay changed files:
- `ChessPublisher.html`
- `ChessPublisher-WebView.ps1`
- `FIDE-Update.ps1`
- `VERSION.txt`
- `ChessPublisher-Beta72-RatingLists.js` (new)
- `webview/CloudWorkspaceRedesign.js` (new)
- `TESTS/BETA71-WINDOWS-FLUIDITY-V2-REGRESSION.js`
- `TESTS/BETA72-WINDOWS-INTEGRATED-RATING-LISTS-REGRESSION.js` (new)
- `TESTS/BETA72-DESKTOP-WEB-DIRECTIONAL-CLOUD-SYNC-REGRESSION.js` (new)

Protected-core verification recorded in the beta.72 package: 70/70 byte-identical; Gacrux 1.9.57 subset 61/61 byte-identical. beta.72 is a Windows TEST CANDIDATE only, never Final/Stable.
