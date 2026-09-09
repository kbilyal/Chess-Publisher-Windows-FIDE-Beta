# Source checkpoint — v1.06.00-beta.81

Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Parent: `v1.06.00-beta.80`

## TEC scope
Type-B Rating Lists compliance patch for Q120 and Q122.

## Implementation
- Added additive module `ChessPublisher-Beta81-TypeB-RatingLists.js`.
- Type-B Rating Lists are first-class managed objects whose original source is not known/asserted by Chess-Publisher.
- Type-B descriptors retain stable ID, rating type, user label, imported filename metadata, import time, record count and player-rating data.
- Standard/Rapid/Blitz FIDE-format list files can be deliberately imported through the Type-B workflow.
- Type-B imports always retain `originalSourceKnown=false` and remain separate from beta.65 Type-A official-list provenance.
- The Integrated Rating Lists UI exposes Type-B import and catalogue viewing.

## Production-code boundary
Gacrux 1.9.57, Swiss Dutch pairing core, TRF16/TRF26 protected core, BBP checker, Tie-Break protected core, Chess-Results protocol/core and unified Cloud SYNC are unchanged.

## Canonical hashes
- Candidate ZIP: `6268ef9afb14ed90c3c67515f12f27d06d927d52f53c9efded069a2ea4b71362`
- Source archive: `b7b728d3dc545f8cc07abed1580f4b57b151047971ab36438b58be4c1d80fc6b`
- Type-B module: `3d41cee5bafe393b5632f12be8874bdf4e207fab52af36e5391118679478fb96`
- Source patch: `3baad0a3ded7b70db47100591fad04d9291e946ad51b4e7afb201cdca8de06e9`

## Gate
- beta.81 Type-B dedicated: 29/29 PASS
- cumulative: 68 PASS / 3 approved historical exceptions / 1 designated browser-runner skip / 0 unexpected
- static audit: PASS
- protected core: 70/70 byte-identical

## VCL after beta.81
PASS 159 / PARTIAL 14 / FAIL 0 / CONDITIONAL 21 / NEEDS TEST 0 / NEEDS TEC 1 / N/A 30.
The two remaining draft Rating Lists STOP/failure rows Q120/Q122 are closed. Q18 remains the only NEEDS TEC row; Q19–Q39 remain conditional on TEC's Q18 decision.
