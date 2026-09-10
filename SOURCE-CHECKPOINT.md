# Chess-Publisher v1.06.00-beta.89 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.88
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.89 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `1d73f82978ec4d1cd8cd12e641f168dc3ee83547`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta89.json`
- Drive file ID: `1vbiNhqexQIii6TssWFneoX1rKDwiw3he`
- Drive folder ID: `1LntQ_bQofsleS9hvVnixrDOYA4INGG7S`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.89-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28100286` bytes
- Archive SHA256: `8f48363628325bc88efe0f117092ff4b773d48342c2610ab0250e44cbac40ad0`
- Internal manifest: `AUTHORITATIVE-SOURCE-MANIFEST-beta89.txt`
- Internal manifest SHA256: `848ef426dd182c5fadabdeae1453327a7509a7924ade63cb0db5c665fc203eef`

Never reconstruct beta.89 from GitHub evidence files alone. Fetch the exact Drive object and verify SHA256 first.

## TEC Q144
- Start test remains non-mutating.
- Detected rating-list changes can be selected per player by FIDE ID.
- Start update changes only checked detected players.
- Unchecked players remain unchanged.
- Changed list/field options after preview invalidate the subset and fail closed.
- Empty selection performs no mutation.
- Legacy all-player update remains available without preview.
- Automatic beta.56 consistency evaluation is not filtered by the manual subset session.

## Gates
- Targeted Q144: `23 PASS / 0 FAIL`
- Rating-list stack: `15 PASS / 0 FAIL`
- Cumulative: `PASS=77 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=81`
- Static audit: PASS
- Protected core: `70/70 byte-identical`, 0 changed, 0 missing
- TEC matrix: `163 PASS / 10 PARTIAL / 0 FAIL / 21 CONDITIONAL / 1 NEEDS TEC / 30 N/A`
- Cloud/SYNC schema/API: unchanged; beta.87 behavior retained

## Shared/application delta
- `ChessPublisher-Beta89-Compliance.js` — additive Q144 workflow
- `ChessPublisher.html` — beta.89 marker + script include
- `VERSION.txt`, `WEBVIEW-VERSION.txt`, `ChessPublisher-WebView.ps1` — version markers
- beta.88 test version assertion updated to accept later versions
- beta.89 targeted regression added

Protected core changes: NONE.
