# Chess-Publisher Windows FIDE Beta — Source Checkpoint

Current canonical development checkpoint: **v1.06.00-beta.74**  
Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Parent: `v1.06.00-beta.73` (Windows runtime accepted by user)

## Canonical artifacts
- Windows candidate SHA256: `50aa32d8d2f1c5cec31edc5446d3736ae539a07b092b6abcc56a92c46b39b4d1`
- Corrected source/evidence archive SHA256: `8809111c77423f28f107dde3baed518e74201d0144265433a6f56480b57f7804`
- beta.73 → beta.74 source patch SHA256: `e1710f99b9ef9327ef8a0cac2a28960ccb2f4f470a489a0da3d025793b8649dd`
- Drive folder: `1jWIsyDctAvbc0ve4wKcsw5IDB2q_okF_`
- Drive candidate: `1s-R0Z2ESlCBS2ljsq95Tr03CcRANeJAt`
- Drive source archive: `1tadSZwgNkl1pqPu51tyl9__9_xqztKKf`
- Drive beta.74 VCL snapshot: `1DUIUA0-ljc4OZFhWJtBCeJXhbb8tH-9C`
- Living VCL file: `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`

## beta.74 scope
- Persistent Pairings Result Entry panel; board table scrolls independently.
- Pairings PDF practical column tick boxes including Board/SNo/FIDE ID.
- Starting List practical tick boxes; Name remains mandatory.
- `↓ Download Results` in Pairings for Web/Cloud-entered result-state data only.
- Q62/Q99/Q128/Q209 TEC evidence closure; working VCL `NEEDS TEST = 0`.

## Results-only Web download safety
- Does not replace pairings, players, starting numbers or tournament settings.
- Matches existing boards by round and player identity; mismatch fails closed.
- Plain blank Web result never clears Desktop.
- Different populated Desktop/Web result requires explicit confirmation.
- Preserves standard/forfeit/BYE/PAB, unusual OTB metadata and Adjourned state.
- Never performs automatic Cloud Push.

## Regression gate
- beta.74 TEC/UI: 29/29 PASS
- beta.74 Web Result Download: 26/26 PASS
- Directional Cloud: 33/33 PASS
- Fluidity v2: 60/60 PASS
- Integrated Rating Lists: 34/34 PASS
- Q214-Q216 policy: 34/34 PASS
- English manual: 23/23 PASS
- Static audit: PASS
- Cumulative: 61 PASS + 3 approved historical exceptions + 1 browser-runner skip; unexpected 0
- Protected core: 70/70 byte-identical
- Gacrux 1.9.57: 61/61 byte-identical
- TRF26 completeness: 49/49 PASS
- Swiss pairing integrity: 25/25 PASS
- Mandatory Swiss tie-breaks: 35/35 PASS
- Chess-Results Pairings publish: PASS
- Exact exports: PASS

## TEC/VCL state
Working totals: **PASS 151 / PARTIAL 22 / FAIL 0 / CONDITIONAL 21 / NEEDS TEST 0 / NEEDS TEC 1 / N/A 30**. Q18 remains external TEC confirmation and must not be self-certified.

## Next gate
Run the exact beta.74 Windows candidate. Do not create Final/Stable until Windows runtime acceptance and the normal final release gate are complete.
