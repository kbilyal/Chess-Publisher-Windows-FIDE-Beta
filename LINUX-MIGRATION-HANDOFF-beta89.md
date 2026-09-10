# Linux Migration Handoff — Windows v1.06.00-beta.89

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint`; Linux repository was NOT modified.

## Authoritative source locator
- Source-pointer GitHub commit: `1d73f82978ec4d1cd8cd12e641f168dc3ee83547`
- Pointer file: `AUTHORITATIVE-SOURCE-POINTER-beta89.json`
- Google Drive file ID: `1vbiNhqexQIii6TssWFneoX1rKDwiw3he`
- Exact archive: `Chess-Publisher-Windows-v1.06.00-beta.89-AUTHORITATIVE-SOURCE.tar.gz`
- Archive SHA256: `8f48363628325bc88efe0f117092ff4b773d48342c2610ab0250e44cbac40ad0`
- Content manifest SHA256: `848ef426dd182c5fadabdeae1453327a7509a7924ade63cb0db5c665fc203eef`

Important: GitHub main is an evidence/checkpoint index, not the complete source tree. Linux alignment must fetch and verify the exact archive above; do not reconstruct from evidence files.

## Functional delta since beta.88
1. Additive manual FIDE consistency subset workflow for TEC Q144.
2. Start test captures detected changed players keyed by FIDE ID without mutation.
3. Arbiter can choose exactly which detected players are updated.
4. Unchecked detected players remain unchanged.
5. Preview becomes invalid if rating-list/field options change; update fails closed until a new test.
6. Automatic consistency workflow and legacy all-player update remain unchanged.

## Gates
- Targeted beta.89 Q144: `23 PASS / 0 FAIL`
- Rating-list stack: `15 PASS / 0 FAIL`
- Cumulative: `PASS=77 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=81`
- Protected core: `70/70 byte-identical`
- Static audit: PASS
- Cloud/SYNC schema change: none
- Linux platform-adapter change required: none identified

When explicitly instructed `align Linux to current Windows beta`, use this exact authoritative archive directly from Linux beta.81.
