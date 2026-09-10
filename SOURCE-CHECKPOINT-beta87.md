# Chess-Publisher v1.06.00-beta.87 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.86 authoritative source
Authoritative Windows source commit: `37ea53360c01f48fd0164206b7c298659396cb38`
Authoritative SOURCE archive: `Chess-Publisher-Windows-v1.06.00-beta.87-AUTHORITATIVE-SOURCE.tar.gz`
SOURCE SHA256: `5e450965ef1e151e174c642f281a5a7e6015188374bd0398e4964a08048fbd1b`
Patch SHA256: `e9d4a86b77a90d1463e567d0c74362540889ab0f20a034c0c6315184b0d1457a`
VERSION.txt: `1.06.00-beta.87`

## Scope
Additional post-beta.86 SYNC stress testing found two real calendar merge gaps. The deterministic three-way merger already had stable identity for players and live pairing boards, but `schedule.rows` was treated as one atomic array whenever both Desktop and Web changed it. beta.87 assigns stable row identity from `row.no` (fallback to round/id only when present), allowing safe element-level merge only when base/local/remote have the same unique row-key sequence in the same order. Add/remove/reorder still fails closed.

## Release gates
- Mandatory beta.87 SYNC stress: 11 PASS / 0 FAIL
- beta.86 tournament metadata regression: 18 PASS / 0 FAIL
- beta.85 next-round regression: 8 PASS / 0 FAIL
- Cumulative: 75 PASS / 3 approved historical exceptions / 1 designated skip / 0 unexpected
- Static audit: PASS
- Protected-core comparison vs beta.86: 70/70 byte-identical, 0 changed, 0 missing
- Fingerprint content schema: 7, unchanged
- Cloud API / Worker contract: unchanged

## Protected/shared changes
Protected core changes: NONE.
Changed shared functional file: `webview/CloudWorkspaceRedesign.js`.
Version/shared marker changes: `ChessPublisher.html`, `VERSION.txt`, `WEBVIEW-VERSION.txt`.
Windows-specific marker change: `ChessPublisher-WebView.ps1`.
See `BETA87-SHARED-PROTECTED-CHANGE-LEDGER.txt` for exact old/new SHA256.

## Linux
Linux repository was NOT modified. Linux remains frozen at proven `v1.06.00-beta.81 parity checkpoint`. Future alignment must use the authoritative beta.87 SOURCE archive directly from the proven Linux checkpoint; do not reconstruct beta.82-beta.86 manually.
