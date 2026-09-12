# Chess-Publisher v1.06.00-beta.98-r2 — Release Gate Evidence

Date: 2026-09-12
Status: **WINDOWS TEST CANDIDATE — NOT FROZEN**
Parent evidence commit: `a5f3e94a4f846a951927b20d83c940485f16e726` (beta.98-r1)
Root verified portable: v1.06.00-beta.97, SHA256 `c8cde12bcd45706d0aee6375ecec4c72115637a1ecc55f44f36c560a108b7385`

## Purpose

beta.98-r2 fixes the real Add Player search bridge for imported Custom/Type-B Rating Lists and adds safe duplicate identity consolidation plus explicit rating-source selection.

Operational behaviour:
- importing a federation/custom rating list creates **0 tournament participants**;
- a 50,000-player list remains outside tournament JSON;
- the actual `queueFideSearch()` Add Player workflow searches imported rating lists while preserving FIDE results;
- stale imported results are prevented during fast typing;
- same valid FIDE ID consolidates to one player;
- if FIDE ID is unavailable, exact Name + Federation + full Date of Birth can consolidate to one player;
- same name with different DOB remains separate;
- conflicting valid FIDE IDs never merge;
- Rating List Sequence remains the recommended/default rating source;
- the Add Player modal exposes each valid rating-list source as an explicit alternative;
- explicit source selection retains list ID/value/provenance and is not converted into anonymous manual rating.

## Regression gates

- Q117 Custom Rating Lists: **58/58 PASS**
- 50K Rating Library: **7/7 PASS**
- Add Player search bridge: **10/10 PASS**
- Identity / rating-source choice: **12/12 PASS**
- Cumulative JS: **97 PASS + 2 approved historical exceptions + 1 designated browser-only skip / 0 unexpected FAIL**
- Full static audit: **PASS**
- Protected core: **70/70 byte-identical**, Changed=0, Missing=0
- TRF16/TRF26: **3/3 PASS**
- BBP / Pairing Checker: **2/2 PASS**
- Tie-Break: **3/3 PASS**
- Chess-Results: **2/2 PASS**
- Frozen SYNC contract: **13/13 PASS**
- Gacrux runtime: **1/1 PASS**

Approved historical exceptions remain unchanged:
- `BETA30-ONLINE-HUB-RELIABILITY-REGRESSION.js`
- `CLOUD-WORKSPACE-BETA4-REGRESSION.js`

Designated browser-only skip remains unchanged:
- `BETA29-TRF-EXPORT-BROWSER-RUNTIME-SCENARIOS.js`

## Protected core evidence

Gacrux 1.9.57 SHA256:
`6955c4c1f16425fa662f70d08311cfddeeaf21cca1aee3d04a3a6b0f7bbb45fb`

Windows launcher SHA256:
`1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`

Linux remains **FROZEN at v1.06.00-beta.81** and was not modified.

## VCL

- Q117 remains **PASS** with corrected actual Add Player search, strong identity matching, multi-source rating display and explicit source provenance.
- No other VCL status was changed.
- Q18 remains **NEEDS TEC**.
- Current matrix counts: PASS 164 / PARTIAL 9 / FAIL 0 / CONDITIONAL 21 / NEEDS TEC 1 / N/A 30.

## Artifacts — Google Drive folder

Folder ID: `1BuMSs05FjfsvwpX5tw2VAqgsICWAHZ15`

### Portable
`Chess-Publisher-v1.06.00-beta.98-r2-FULL-PORTABLE-ADD-PLAYER-IDENTITY-2026-09-12.zip`
SHA256: `99e5558ca4057ee40ac3d08ff00bb00381694e66fbe94f583b198fd322b45e46`
Drive file ID: `1vhqrqenZifyYBjfpLGtCZs2Es_XEGnaZ`

### Authoritative source
`Chess-Publisher-Windows-v1.06.00-beta.98-r2-AUTHORITATIVE-SOURCE.tar.gz`
SHA256: `ef7de9a591bdef2895e2645f8fcb47e2d426c68c1f2ae58c11daf9793014a132`
Drive file ID: `112k1z3csU-fgTZ8asANFhWh_eB5Rm0zy`

Source manifest:
`AUTHORITATIVE-SOURCE-MANIFEST-beta98-r2.txt`
SHA256: `97b07684e4ad3480a555b630dcf126ed4a67e824067ac3e59e2c388a5af1a847`
Drive file ID: `17v8mdnNSng0E4OiDfnmrEohqvVgOK_zO`
Manifest listed files: 918; post-package verification: 918/918 PASS for both portable ZIP and source archive.

### EXE
`ChessPublisher-v1.06.00-beta.98-r2.exe`
SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`
Drive file ID: `1Skj7Bcu-EDg4ykWKifsCTJbynwyX8qKl`

### VCL matrix
`Chess-Publisher-FIDE-TEC-VCL-Compliance-Matrix-beta98-r2.xlsx`
SHA256: `e576b9eb89cb61837c658548f74bffcdab5221d26b6931c067062fe42084b4a4`
Drive file ID: `1aCvjud_0sPxseqKrhzYThI8TeK2rkkYB`

### Source delta
`BETA98-R2-SOURCE-DELTA.patch`
SHA256: `826513622061d8b79e5bf4676024f76cc2d4f52a6b0e3ada57663e2d5b23b179`
Drive file ID: `1hVmbicyF11gC3UrEQqsnzD0q0E7wW9KA`

### Regression report
`Chess-Publisher-v1.06.00-beta.98-r2-REGRESSION-REPORT.txt`
SHA256: `96d55bed41cf466f28f921be61f78793f8e1f263f0addcebe290c371850d992e`
Drive file ID: `1LqWcN9nkj6yorw2tqS0ggVlBiG43Ccr3`

### Changelog
`CHANGELOG-v1.06.00-beta.98-r2-ADD-PLAYER-IDENTITY-SOURCE.txt`
SHA256: `3a59e22e63df33c1a6720fc9aabcdc8fe62cf0010128cfc9647f84be6cae57e6`
Drive file ID: `1N72tdkH7Set2VYcrK9AV9q0ch08HZMd_`

### SHA256 sums
`SHA256SUMS-beta98-r2.txt`
Drive file ID: `1AQwO57m7a0Jq5ZKDhrrWmrGxL00vU3VQ`

### Source pointer
`AUTHORITATIVE-SOURCE-POINTER-beta98-r2.json`
SHA256: `28fd44331091d6b1ffe6267a025f705b33dbc91a6c569715be70126a37ba6113`
Drive file ID: `1wwvjc9eqLhjkYbh1FzIT2fZeikHRMF1H`

## Release decision

All automated gates are PASS. beta.98-r2 is ready for a real Windows smoke test but **must not be marked FROZEN until that smoke test is confirmed by the user**.
