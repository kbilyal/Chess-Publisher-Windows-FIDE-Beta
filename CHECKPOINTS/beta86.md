# Chess-Publisher v1.06.00-beta.86 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.85 authoritative source
Authoritative Windows source commit: `d224fc6e79d49e3c69b1f161fc2491ef2796854b`
Authoritative SOURCE archive: `Chess-Publisher-Windows-v1.06.00-beta.86-AUTHORITATIVE-SOURCE.tar.gz`
SOURCE SHA256: `d14e4a5450807be78eade6a29d271e186bf644a5f317bd2742ab8ab640ba61ea`
Patch SHA256: `f94a5bd47600217ff4f8efa7559e4f57733ba8a17f990bc50115a92a3372802f`
VERSION.txt: `1.06.00-beta.86`

## Scope
Tournament metadata SYNC hardening. Desktop rename now keeps `data.currentTournament`, tournament map key and portable `tournament.name` consistent. `saveAll()` repairs beta.85-era stale names before unified SYNC. `CloudWorkspaceRedesign.js` canonicalizes the logical tournament name before schema-7 fingerprint/reconciliation/PUT.

The existing portable data contract already carries Tournament Setup, start/end dates, Schedule rows/notes and Regulations. No Cloud schema/API change was required; beta.86 adds explicit bidirectional regression coverage for these fields and mixed Web-result + Desktop-metadata workflows.

## Release gates
- Mandatory beta.86 metadata matrix: 18 PASS / 0 FAIL
- Cumulative: 74 PASS / 3 approved historical exceptions / 1 designated skip / 0 unexpected
- Static audit: PASS
- Protected-core comparison vs beta.85: 70/70 byte-identical, 0 changed, 0 missing
- Fingerprint content schema: 7, unchanged
- Cloud API / Worker contract: unchanged

## Protected/shared changes
Protected core changes: NONE.
Changed shared functional files: `ChessPublisher.html`, `webview/CloudWorkspaceRedesign.js`.
Version/shared marker changes: `VERSION.txt`, `WEBVIEW-VERSION.txt`.
Windows-specific marker change: `ChessPublisher-WebView.ps1`.
See `BETA86-SHARED-PROTECTED-CHANGE-LEDGER.txt` for exact old/new SHA256.

## Linux
Linux repository was NOT modified. Linux remains frozen at proven `v1.06.00-beta.81 parity checkpoint`. Future alignment must use the authoritative beta.86 SOURCE archive directly from the proven Linux checkpoint; do not reconstruct beta.82-beta.85 manually.
