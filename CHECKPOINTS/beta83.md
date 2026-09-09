# Checkpoint — v1.06.00-beta.83

Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-09  
Source parent: `v1.06.00-beta.82` / `cfec937ebb5f9f5c809c91a6a81d175281a6b063`  
Remote metadata parent before this atomic checkpoint: `dec4929088d31cde55ddd37998b9b105f5cb0507`

## Scope
Cloud-only Desktop workspace cleanup. The duplicate visible `My Online Tournaments` surface is hidden, and the `Open My Online Tournaments` chooser/panel is hidden from New Tournament. `My Cloud Tournaments` remains the only private/working Desktop ↔ Web Cloud tournament list. Public Tournament Hub remains a separate publishing workflow.

## Exact production delta
- `webview/CloudWorkspaceRedesign.js`: additive CSS-only hiding of `.hub-online-list-compact`, `.cp-new-tournament-online`, and `#cpNewTournamentOnlinePanel`.
- `ChessPublisher.html`: version marker only (`beta.82` → `beta.83`).
- `ChessPublisher-WebView.ps1`: version marker only (`beta.82` → `beta.83`).
- `VERSION.txt`: `1.06.00-beta.83`.
- No business-core or SYNC algorithm change.

## Protected / unchanged
No change to unified `syncCurrent()`, Web-results download, Cloud tournament identity, pairing/player identity semantics, HubAdapter, Gacrux 1.9.57, Swiss Dutch pairing, TRF16/TRF26, TRF pairing path, BBP, Tie-Break core/checker, or Chess-Results protocol/core.

## Canonical artifacts
- Windows candidate ZIP: `Chess-Publisher-v1.06.00-beta.83-Cloud-Only-Workspace-TEST-CANDIDATE-2026-09-09.zip`
- ZIP SHA256: `7fb92867e1d054c3d2f8be52b85215488bae7d0c0abcd02c6de1924540f7b2f6`
- Windows launcher EXE SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`
- Exact beta.82→beta.83 source overlay patch: `PATCHES/beta83-cloud-only-workspace.patch`
- Patch SHA256: `71821f9ade87663bd7dac26c131bbb1867796f04b901d927eb85c62a457532c0`
- beta.82 `webview/CloudWorkspaceRedesign.js` SHA256: `acdb987198a77399783956295117e8ce30f9972d89b143698c48a48b3ebde699`
- beta.83 `webview/CloudWorkspaceRedesign.js` SHA256: `3ed59894320b7efc186d85ae2557b2875e475cf5423b57f626d04cbc6887b1a5`

## Regression gate
- beta.83 targeted Cloud-only workspace: **7/7 PASS**.
- Full cumulative PASS set re-executed against the exact beta.83 candidate: **70/70 PASS**.
- Approved historical exceptions: **3**.
- Designated browser-runner skip: **1**.
- Unexpected: **0**.
- Static audit: **PASS**.
- Protected core: **70/70 byte-identical** against the beta.82 protected baseline.
- TRF regression coverage remains PASS, including TRF export reliability and TRF26 completeness tests.

## TEC / VCL baseline
Unchanged from beta.81/beta.82:
- PASS 159
- PARTIAL 14
- FAIL 0
- CONDITIONAL 21
- NEEDS TEST 0
- NEEDS TEC 1
- N/A 30

Q18 remains an external FIDE TEC decision and is not self-marked PASS.

## Cross-platform gate
This checkpoint establishes the Windows beta.83 source delta. Before the next common version advances with new TEC functionality, the same shared-source behavior must be carried to the Linux line. Windows and Linux remain two runtime targets of one source/version line.

## Next TEC workstream
After this checkpoint is verified on remote `main`, continue with **Q117 — Custom Rating Lists** as an additive extension of the existing Type-A, Type-B, Rating List Sequence, and effective-rating/provenance architecture. Do not create a parallel rating system and do not touch protected core without evidence.
