# Windows FIDE Beta Checkpoint — v1.06.00-beta.74

Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-09  
Parent: `v1.06.00-beta.73`

## Canonical hashes
- Candidate ZIP: `50aa32d8d2f1c5cec31edc5446d3736ae539a07b092b6abcc56a92c46b39b4d1`
- Source archive: `8809111c77423f28f107dde3baed518e74201d0144265433a6f56480b57f7804`
- Source patch: `e1710f99b9ef9327ef8a0cac2a28960ccb2f4f470a489a0da3d025793b8649dd`

Drive folder: `https://drive.google.com/drive/folders/1jWIsyDctAvbc0ve4wKcsw5IDB2q_okF_`

## Added in beta.74
1. Persistent Pairings Result Entry panel.
2. Pairings PDF Board/SNo/FIDE ID and related tick-box controls.
3. Starting List practical tick-box controls; Name mandatory.
4. Pairings `↓ Download Results` — results-only Web/Cloud → Desktop synchronization.
5. Q62/Q99/Q128/Q209 focused TEC evidence, reducing VCL NEEDS TEST to zero.

## Download Results contract
The action modifies only validated result-state data on an already matching local board. It never downloads a new pairing, player list or tournament setup. A pairing identity mismatch stops the operation. Blank remote results do not erase Desktop results. A conflicting populated result requires confirmation. No automatic Push occurs.

## Gate evidence
- TEC/UI 29/29 PASS
- Web Results 26/26 PASS
- Directional Cloud 33/33 PASS
- Cumulative 61 PASS / 3 known / 1 skip / 0 unexpected
- Static PASS
- Protected 70/70; Gacrux 61/61
- TRF26 49/49; Swiss pairing 25/25; mandatory Swiss TB 35/35

## VCL
PASS 151 / PARTIAL 22 / FAIL 0 / CONDITIONAL 21 / NEEDS TEST 0 / NEEDS TEC 1 / N/A 30. Q18 remains external TEC confirmation.

## Release state
This checkpoint is permanent for beta.74 development continuity but is not a Final/Stable release. Next gate: exact Windows runtime acceptance of the canonical ZIP.
