# Linux Migration Handoff — Windows v1.06.00-beta.86

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint` and the Linux repository was not modified.

- Beta version: `v1.06.00-beta.86`
- Authoritative Windows source commit SHA: `d224fc6e79d49e3c69b1f161fc2491ef2796854b`
- Exact source archive: `Chess-Publisher-Windows-v1.06.00-beta.86-AUTHORITATIVE-SOURCE.tar.gz`
- Source archive SHA256: `d14e4a5450807be78eade6a29d271e186bf644a5f317bd2742ab8ab640ba61ea`
- Changed shared files: `ChessPublisher.html`, `webview/CloudWorkspaceRedesign.js`, `VERSION.txt`, `WEBVIEW-VERSION.txt`
- Changed protected files: none
- Approved protected-core changes: none
- Cumulative regression: `PASS=74 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=78`
- Targeted beta.86 metadata regression: `18 PASS / 0 FAIL`
- New Cloud/SYNC schema changes: none; fingerprint content schema remains `7`
- Cloud API/Worker changes: none
- Linux platform adapter change required: none identified for this beta

## Functional delta to migrate later
1. Keep portable `tournament.name` aligned with the logical/current tournament name during rename and save.
2. Canonicalize the logical tournament name before schema-7 fingerprint/SYNC reconciliation.
3. Preserve the existing beta.85 deterministic three-way merge: independent result/metadata edits merge; same-field collisions fail closed.
4. Preserve existing tournament Setup, start/end date, Schedule rows/notes and Regulations fields unchanged in the private Cloud snapshot.

When explicitly instructed `align Linux to current Windows beta`, use the exact authoritative SOURCE archive above directly from Linux beta.81; do not recreate intermediate Windows betas.
