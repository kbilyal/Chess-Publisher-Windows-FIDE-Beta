# Linux migration handoff — Chess-Publisher v1.06.00-beta.85

- Windows beta: `v1.06.00-beta.85`
- Windows base beta: `v1.06.00-beta.84`
- Linux status: **FROZEN on proven v1.06.00-beta.81 parity checkpoint**
- Linux repository modified: **NO**
- Linux beta created: **NO**
- Authoritative source archive: `Chess-Publisher-Windows-v1.06.00-beta.85-AUTHORITATIVE-SOURCE.tar.gz`
- Source archive SHA256: `2795a0612f56f381b65db0c30c3171ccc5f4e16e9bc0778fa5bc7e61fe430e69`
- Authoritative Windows commit SHA: `PENDING_ATOMIC_GIT_CHECKPOINT`

## Changed shared files
- `ChessPublisher.html` — beta.85 version markers only.
- `webview/CloudWorkspaceRedesign.js` — shared SYNC three-way merge logic; independent Desktop/Web changes merge, real same-field conflicts remain fail-closed.
- `VERSION.txt` — exact beta number.

## Changed protected files
None. Protected-core comparison: **70/70 byte-identical, 0 unexpected**.

## Approved protected-core changes
None.

## Regression
- Cumulative: **PASS=73, approved historical exceptions=3, designated skips=1, unexpected=0**.
- Targeted next-round SYNC: **8/8 PASS**.
- Schema-7 unified SYNC compatibility: **18/18 PASS**.
- Static audit: **PASS**.

## Cloud / SYNC schema or API changes
- Fingerprint content schema remains **7**.
- No Cloud API endpoint/protocol change.
- New behavior inside existing unified SYNC: BOTH_CHANGED first attempts deterministic three-way merge from immutable common-base revision; independent changes publish one merged revision.
- Web result + newly generated Desktop pairing round is a specifically tested safe-merge case.
- Same-field conflict still stops before PUT and requires explicit resolution.

## Linux platform-adapter impact
- No new Windows-only assumption was introduced into shared business logic.
- `ChessPublisher-WebView.ps1` changed only its Windows release marker; no Linux adapter equivalent is required.
- Future Linux alignment must take shared source directly from this authoritative archive (or a later authoritative Windows beta archive), starting from Linux beta.81; do **not** manually recreate intermediate Windows betas.
