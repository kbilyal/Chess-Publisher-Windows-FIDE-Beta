# Chess-Publisher v1.06.00-beta.98-r1 — Release Gate

Date: 2026-09-12
Status: **WINDOWS TEST CANDIDATE** — real Windows smoke test pending.
Parent candidate: `v1.06.00-beta.98`
Root verified runtime: exact official `v1.06.00-beta.97` portable, SHA256 `c8cde12bcd45706d0aee6375ecec4c72115637a1ecc55f44f36c560a108b7385`.

## Operational correction

beta.98-r1 corrects Q117 around the real arbiter workflow:

- Custom Rating Lists are application-wide reusable libraries, not tournament participant data.
- Importing a federation-sized list adds **0 tournament participants**.
- Normal Add Player search can find imported Custom and existing Type-B records by name / FIDE ID.
- Only the selected player is inserted into the tournament.
- Custom and Type-B lists can be Main/fallback entries in Rating List Sequence.
- Tournament JSON keeps compact stable list references/provenance, not external-list player rows.
- Missing cross-device external data falls through safely to the next sequence source.
- Legacy beta.98 tournament-scoped Custom List data migrates to the global library.
- Global deletion removes dangling local sequence references while preserving historical player provenance.

## Previous-feature operational review

The beta.81 Type-B catalogue was technically present but isolated from registration/sequence workflow. beta.98-r1 integrates it into the same Add Player search and Rating List Sequence while keeping `originalSourceKnown=false` and never promoting Type-B to Type-A.

Inherited release metadata was also refreshed so README/PROJECT-STATE/VERSION/regression manifest identify the actual checkpoint. Frozen WebView/SYNC runtime files were intentionally not edited.

## Gates

- Q117 operational: **58/58 PASS**
- 50,000-player library: **7/7 PASS**, 0 participants added
- cumulative JS: **95 PASS / 2 approved historical exceptions / 1 browser-only skip / 0 unexpected FAIL**
- static audit: **PASS**
- protected core: **70/70 byte-identical**
- TRF16/TRF26: **3/3 PASS**
- BBP / Pairing Checker: **2/2 PASS**
- Tie-Break: **3/3 PASS**
- Chess-Results: **2/2 PASS**
- frozen SYNC contract: **13/13 PASS**
- Gacrux 1.9.57 SHA256 unchanged: `6955c4c1f16425fa662f70d08311cfddeeaf21cca1aee3d04a3a6b0f7bbb45fb`

## Release artifacts

Google Drive folder ID: `1oyfXEAtlRNXk0ZPLuEi06VkaYnwEZAkV`

- Portable ZIP SHA256: `2ca348d695d0b75e1fb4f0ef920bc2818563882a9c33bfd43dc87cdf9b536094`
- Authoritative source SHA256: `a637317288c83073a0091204a50861854e31c7c600aaa4d84d7af29267b4bcc6`
- Launcher SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`
- Source manifest: **905/905 PASS**, SHA256 `b77001a8d447831df72ecc5ae3787d91db1ca08730416e536856e68ac151f536`
- VCL matrix SHA256: `291f102fcb850eb44cd22e8c8373b9e940e8820a4deee28a448bd5eb8f7e7750`
- Source delta SHA256: `45af0a412a2f5490b7b20d886b32c69be303d26e51db8536285179980be41117`

## Frozen boundaries

No Gacrux, Swiss Dutch pairing, TRF core, BBP checker core, protected Tie-Break core, Chess-Results protocol/core, rating calculation core or active beta.96 r4 SYNC core change. Linux remains frozen at `v1.06.00-beta.81`.

The candidate must not be called FROZEN until the real Windows smoke test passes.