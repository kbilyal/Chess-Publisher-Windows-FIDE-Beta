# Chess-Publisher v1.06.00-beta.98-r12 — FIDE TEC Review Pre-Release

**Status:** PRE-RELEASE / TEC REVIEW CANDIDATE  
**Date recorded:** 2026-09-15  
**Platform:** Windows  
**Frozen recovery checkpoint:** v1.06.00-beta.98-r9  
**Candidate:** v1.06.00-beta.98-r12

> IMPORTANT: This is **not a statement of FIDE approval or certification**. The build is recorded as a pre-release candidate while awaiting further response/guidance from FIDE TEC.

## Purpose of this Git record

This branch exists to preserve an immutable, auditable trace of the exact Windows candidate being reviewed while TEC correspondence is pending. Production development must not rewrite this pre-release record.

## Exact release artifacts

### Full portable program
`Chess-Publisher-v1.06.00-beta.98-r12-FULL-PORTABLE-LATE-ENTRY-DOUBLECLICK-2026-09-14.zip`

SHA256: `e33ed93e1b81af83fa1d1b17fcc4dfaeec2daec73b89aa9d5ba6ebee3310ce5b`

### Windows launcher EXE
`ChessPublisher-v1.06.00-beta.98-r12.exe`

SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`

### Authoritative source archive
`Chess-Publisher-Windows-v1.06.00-beta.98-r12-AUTHORITATIVE-SOURCE.tar.gz`

SHA256: `0bf3306edc386efa39fd9e1a89ce9a1739d3d1408960372b428b1770f4a2fd55`

The exact binary artifacts are archived in Google Drive under:
`ChessPublisher Releases/beta98-r12`

The GitHub connector used to create this evidence record supports text/Git objects but does not expose GitHub Release binary-asset upload. Therefore Git contains the immutable filenames, hashes, verification evidence, and source pointers, while the exact EXE/portable/source binaries are preserved in the release archive above.

## Final verification state

- Portable ZIP authoritative manifest: **1079/1079 PASS**
- Authoritative source manifest: **1079/1079 PASS**
- Dedicated r12 Late Entry double-click regression: **23/23 PASS**
- Chromium runtime smoke: **PASS / 0 page errors**
- Full JS corpus: **108 PASS / 2 approved historical exceptions / 1 browser-only skip / 0 unexpected**
- Static audit: **PASS**
- Protected core: **70/70 byte-identical**
- Frozen r9 recovery checkpoint remains unchanged

## Protected areas unchanged

This candidate does not intentionally modify the protected:
- Gacrux 1.9.57 runtime
- Swiss Dutch pairing core
- TRF pairing/export core path
- BBP checker core
- protected Tie-Break core
- Chess-Results protocol/core
- rating calculation core
- frozen SYNC protected core

## Review policy while waiting for TEC

- Do not represent this candidate as FIDE approved.
- Do not retroactively rewrite this pre-release branch.
- Any subsequent defect correction must become a new point-fix/candidate with its own evidence.
- Otto Milvang/TBS TRF 299 test-branch changes are intentionally excluded until they are stable/finalized.
