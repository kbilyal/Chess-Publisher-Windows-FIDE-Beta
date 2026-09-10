# Linux Migration Handoff — Windows v1.06.00-beta.95

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint`.

## Authoritative source locator
- Source-pointer GitHub commit: `996bc7bc1d867eac89cbc9a6e4c41094171374fd`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta95.json`
- Google Drive source file ID: `1YjCHTIYWx99yzLHyEHwkI9425hNZTMs9`
- Google Drive folder ID: `1nyqxFIiHntK9akX8Gj1HTzvf0dgrLwt0`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.95-AUTHORITATIVE-SOURCE.tar.gz`
- Archive SHA256: `38179aa91f5f696d92f97494e33767b4e23c40828369d821b9ca6f2d3d8f86ee`
- Content manifest SHA256: `ccc0b203d89fd347a4818edaef51a377ed93f2439a084f7cfd1704091bd9975f`

GitHub main is an evidence/checkpoint index, not the complete application source. Linux alignment must fetch and verify the exact archive above.

## Shared functional delta since beta.94
1. Gacrux checker UI provenance stores runtime source/build/timestamp and ignores stale cross-runtime/build FAIL as historical.
2. Swiss pre-Round-1 Absent hard gate: Generate Pairings and Resort are blocked until Present or Remove Absent.
3. Remove Absent before Round 1 physically removes the registration and requires a fresh Starting List Resort.
4. Reset Tournament purges historical `registrationDeleted` tombstones because generated pairing/result history is destroyed.
5. Active registrations survive Reset; active Absent registrations require explicit resolution before new Round 1.
6. TRF Starting List is restricted to active registrations.
7. Post-start Absent / Withdrawn / Late Entry history semantics remain compatible with the existing workflow.

## Gates
- Targeted: 29 PASS / 0 FAIL
- Packaged Gacrux runtime: 31 PASS / 0 FAIL
- Cumulative: PASS=84 KNOWN=2 SKIP=1 UNEXPECTED=0 TOTAL=87
- Static audit: PASS
- Protected core: 70/70 byte-identical vs beta.94
- Fingerprint schema: 7 unchanged
- Cloud API/SYNC contract: unchanged
- Linux adapter change required later: none identified; shared lifecycle/provenance behavior should migrate directly.

When explicitly instructed `align Linux to current Windows beta`, migrate directly from Linux beta.81 using this exact verified archive.
