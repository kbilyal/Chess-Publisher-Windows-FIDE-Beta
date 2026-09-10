# Chess-Publisher v1.06.00-beta.95 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.94
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.95 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `996bc7bc1d867eac89cbc9a6e4c41094171374fd`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta95.json`
- Drive file ID: `1YjCHTIYWx99yzLHyEHwkI9425hNZTMs9`
- Drive folder ID: `1nyqxFIiHntK9akX8Gj1HTzvf0dgrLwt0`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.95-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28291655` bytes
- Archive SHA256: `38179aa91f5f696d92f97494e33767b4e23c40828369d821b9ca6f2d3d8f86ee`
- Internal manifest SHA256: `ccc0b203d89fd347a4818edaef51a377ed93f2439a084f7cfd1704091bd9975f`

Never reconstruct beta.95 from GitHub evidence files alone. Fetch the exact Drive object and verify SHA256 first.

## Functional scope
1. Checker provenance: stale cross-runtime/build Gacrux UI states are historical and cannot appear as a current Desktop FAIL.
2. Pre-Round-1 Swiss Absent hard gate: Present or Remove Absent is required before Resort / Generate Pairings.
3. Reset Tournament purges historical `registrationDeleted` tombstones because round/result/colour history is being destroyed.
4. Active registrations are preserved through Reset; active Absent registrations must then be explicitly resolved before the new Round 1.
5. TRF Starting List uses active registrations only and cannot leak historical tombstones.
6. Post-start Absent remains temporary; Withdrawn/Delete remains future-ineligible while historical boards/results/TPNs stay resolvable.
7. Players admitted after Round 1 follow the existing Late Entry + TPN Resort workflow.

## Real defect reproduced
The supplied tournament contained hidden historical entries `.` and `.....`, old pairing numbers 10 and 11, both `registrationDeleted=true` and `attendance=absent`. After Reset they could re-enter fresh Round 1 as `0 BYE`. beta.95 physically removes those obsolete tombstones during Reset.

## Gates
- Targeted lifecycle/provenance: `29 PASS / 0 FAIL`
- Packaged Gacrux runtime: `31 PASS / 0 FAIL`
- Cumulative: `PASS=84 KNOWN=2 SKIP=1 UNEXPECTED=0 TOTAL=87`
- Static audit: PASS
- Protected core: `70/70 byte-identical` vs beta.94
- Fingerprint schema: `7`, unchanged
- Cloud API/SYNC contract: unchanged
- Gacrux/TRF/BBP/Tie-Break/Chess-Results/rating protected cores: unchanged
