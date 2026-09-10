# Linux Migration Handoff — Windows v1.06.00-beta.87

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint` and the Linux repository was not modified.

- Beta version: `v1.06.00-beta.87`
- Authoritative Windows source commit SHA: `37ea53360c01f48fd0164206b7c298659396cb38`
- Exact source archive: `Chess-Publisher-Windows-v1.06.00-beta.87-AUTHORITATIVE-SOURCE.tar.gz`
- Source archive SHA256: `5e450965ef1e151e174c642f281a5a7e6015188374bd0398e4964a08048fbd1b`
- Changed shared files: `webview/CloudWorkspaceRedesign.js`, `ChessPublisher.html`, `VERSION.txt`, `WEBVIEW-VERSION.txt`
- Changed protected files: none
- Approved protected-core changes: none
- Cumulative regression: `PASS=75 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=79`
- Targeted beta.87 stress regression: `11 PASS / 0 FAIL`
- New Cloud/SYNC schema changes: none; fingerprint content schema remains `7`
- Cloud API/Worker changes: none
- Linux platform adapter change required: none identified for this beta

## Functional delta to migrate later
1. Preserve beta.86 rename/metadata sync hardening.
2. In the shared three-way merger, treat `schedule.rows` as stable rows keyed by logical row number when all three sides preserve the same unique row sequence.
3. Allow independent edits to different Schedule rows and independent fields of the same row to merge.
4. Keep concurrent add/remove/reorder and same-field disagreements fail-closed.
5. Preserve revision-race protection and existing result/pairing merge behavior.

When explicitly instructed `align Linux to current Windows beta`, use the exact authoritative SOURCE archive above directly from Linux beta.81; do not recreate intermediate Windows betas.
