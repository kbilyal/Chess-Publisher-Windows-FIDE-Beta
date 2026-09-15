# Chess-Publisher v1.06.00-beta.98-r12 — Pre-FIDE Bug Hunt

Date: 2026-09-15
Candidate: `v1.06.00-beta.98-r12`
Branch: `fide-pre-release-v1.06.00-beta.98-r12-tec-review`
Release intent: public **Pre-FIDE / TEC review candidate**. This is not a claim of FIDE approval or certification.

## Independent rerun from the exact portable package

- Full JavaScript regression corpus: **111 scenarios total**
  - **108 PASS**
  - **2 approved historical exceptions**
  - **1 designated browser-only skip**
  - **0 unexpected failures**
- Dedicated r12 Late Entry regression: **23/23 PASS**
- Static audit: **PASS**
- Protected-core integrity gate: **70/70 byte-identical**
- Packaged Windows executable SHA-256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`
- Full portable ZIP SHA-256: `e33ed93e1b81af83fa1d1b17fcc4dfaeec2daec73b89aa9d5ba6ebee3310ce5b`

## Critical-path coverage retained

The existing release gate remains green for TRF, BBP, Tie-Break, Chess-Results, SYNC, Gacrux 1.9.57, Rating/VCL, New Tournament and Pairing UI/Baku checks. Protected pairing, TRF, BBP, Tie-Break, Chess-Results, SYNC and rating-calculation cores remain unchanged.

## Manual code-risk review

The r12 Late Entry double-click delta was reviewed separately. The persistence path was checked against the established Manual Add and FIDE Add mutation contract. A managed-storage write failure intentionally leaves the mutation in the active session while surfacing a critical warning; this behavior is shared by the existing add-player workflows and is therefore not an r12 regression.

## Gate decision

**PASS — no release-blocking defect found.**

The stable release remains untouched. r12 is suitable to publish only as a clearly labeled Pre-FIDE / TEC review candidate.
