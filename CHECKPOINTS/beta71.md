# Windows FIDE Beta Checkpoint — v1.06.00-beta.71

Parent: accepted `v1.06.00-beta.70` (`69fc07ac27ca5315f7a58c8adf63d358cd5e20efd0413b5b023ed779953a1d58`)
Scope: Windows Fluidity v2 integration before resuming TEC.
Status: ACCEPTED SOURCE CHECKPOINT; not Final/Stable; not yet Windows TEST CANDIDATE.

## Exact checkpoint artifacts
- Portable checkpoint: `Chess-Publisher-v1.06.00-beta.71-Windows-Fluidity-v2-FULL-PORTABLE-CHECKPOINT-2026-09-08.zip`
- Portable SHA256: `58cc991f9272b03028a2bb43bd6994a53287efa41c2ae9ba03257a2093ede1e7`
- Complete source archive: `Chess-Publisher-Windows-FIDE-Beta71-SOURCE.tar.gz`
- Source archive SHA256: `d00924ef58fcd784bf8b68388f780452f42401bae70861d3a77a7eb5c534446e`
- Reproducible source overlay patch: `PATCHES/beta71-windows-fluidity-v2.patch`
- Patch SHA256: `c742857e11c26e9e4a4e5e863451308ba8b432b94006d3dcce481bcf00703672`
- Drive checkpoint folder: `https://drive.google.com/drive/folders/12GMy_qm_oSWp1-yTh_xLxecfETPCvax6`
- Living TEC VCL ID remains `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`; beta.71 is UI-only and does not change TEC answer/status counts.

## Implemented
- Real native Windows host chrome; no in-page fake movable/resizable app window.
- Single client-filling workspace.
- All 8 primary tabs retained and responsive, including DGT and Chess-Results.
- Fixed Pairings Result Desk; only board table scrolls.
- Sticky Pairings action toolbar and preserved Chess-Results action.
- Clean-navigation fast path with no redundant full save/serialization.
- Dirty-navigation protected save path retained.
- Stale VIEW-only Pairings/Standings/Chess-Results work cancellation.
- Reduced repaint/blur/transition cost.
- No F8 Fluidity test harness in production.
- Native WinForms window title follows the loaded tournament/document title.

## Deterministic gates
- Fluidity dedicated: 60/60 PASS
- Static audit: PASS
- Cumulative: 56 PASS + 3 known historical exceptions + 1 browser skip
- Unexpected failures: 0
- Protected core: 70/70 byte-identical to beta.70
- Gacrux 1.9.57: protected; 61/61 runtime files present
- Targeted beta.69: 34/34 PASS
- Targeted beta.70: 37/37 PASS
- beta.29 TRF export reliability: PASS
- beta.26 exact exports: PASS

## Protected carry-forward
Gacrux 1.9.57, Swiss Dutch pairing, TRF16/TRF26 core, BBP checker, Tie-Break core/checker, Chess-Results protocol/core, DGT core, pairingNumber/player IDs/starting-number semantics.

## Windows candidate blockers still open
The Desktop ↔ Web Cloud synchronization redesign and 83-player Desktop/Web parity specification remains mandatory before a full Windows TEST CANDIDATE is declared. beta.71 is therefore a source checkpoint, not a Windows candidate/release.

## Reproduction
Apply `PATCHES/beta71-windows-fluidity-v2.patch` to the exact accepted beta.70 portable source, or use the complete source archive from the Drive checkpoint folder. The patch changes the real Desktop HTML/WebView host and adds the deterministic beta.71 test; it does not modify any protected tournament core.

## Next TEC work
Resume TEC from beta.71 with Q214/Q215/Q216 historical-rating-aware tie-break policy, using this checkpoint as the new exact Windows parent.
