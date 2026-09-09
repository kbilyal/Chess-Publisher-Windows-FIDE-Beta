# Source Checkpoint — Chess-Publisher v1.06.00-beta.78

Parent: `v1.06.00-beta.77`  
Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**

## Scope
- One `↕ SYNC` action for current-tournament Desktop/Web/Cloud synchronization.
- Automatic direction selection: pull, push, no-op, deterministic merge+publish, or fail-closed conflict resolution.
- One Cloud counterpart per current logical tournament; repeated SYNC must never create duplicates.
- `Download Results` retains result-only validation and additionally completes unified SYNC.
- Hide `PUBLIC LIST` from `My Online Tournaments` through the additive layer only.

## Changed source
- `webview/CloudWorkspaceRedesign.js`
- `ChessPublisher.html` — version marker only
- `ChessPublisher-WebView.ps1` — version marker only
- `VERSION.txt`
- beta.78 tests/evidence/docs

## Protected unchanged
`webview/HubAdapter.js` and `webview/CloudWorkspaceAdapter.js` remain byte-identical to the protected manifest. Pairing/TRF/BBP/Tie-Break/Chess-Results cores are untouched.

## Gate
- Unified SYNC 15/15 PASS
- Directional Cloud 33/33 PASS
- Download Results 26/26 PASS
- TEC/UI 29/29 PASS
- Gacrux runtime 31/31 PASS
- Protected core 70/70
- Static audit PASS
- Cumulative 65 PASS / 3 known / 1 skip / 0 unexpected

## Canonical artifacts
- Candidate ZIP SHA256: `ddd4f91bc112a074bbb6d655479af7aded69626cbef2f465e7beeeee2f43b76d`
- Source archive SHA256: `8a6d60e251b9fd3ad41e115c05df32d777f3edd9962901a225c6ce1db12c2918`
- Source patch SHA256: `c1ed050017b7b07bd01d8629e7d98258392be1f2fdfbaa87b27d41f6f45fd9ae`
- ChessPublisher.exe SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`
- Drive folder: `https://drive.google.com/drive/folders/1ryhOsydXyCIZPA0SGpnFRYdvxWjv2SNs`
- GitHub parent: `3f194950582a746b311d730dd89f0538eed01d8f`
