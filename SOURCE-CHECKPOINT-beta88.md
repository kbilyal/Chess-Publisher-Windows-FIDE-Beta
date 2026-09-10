# Chess-Publisher v1.06.00-beta.88 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.87
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; Linux repository NOT modified.

## Authoritative complete source
The complete authoritative application source is the immutable SOURCE archive stored in Google Drive. The GitHub repository main branch is an evidence/checkpoint index and does not contain all large application source files. Therefore beta.88 deliberately does **not** describe a GitHub evidence commit as a full-source commit.

- Source pointer GitHub commit: `8c5d92e24021a572e1d01718db3cb5ae14b0a501`
- Machine-readable pointer: `AUTHORITATIVE-SOURCE-POINTER-beta88.json`
- Drive file ID: `16SKFMLh8_hC3uY4SvxyKOk74pOCsFNGJ`
- Drive folder ID: `1s1NU611MkMZ6sziPl-qz04P0QppQ8vpm`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.88-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `27994674` bytes
- Archive SHA256: `d22a5697d7dbef2e6064bd85c88edbcca630e727bcb392934453b7da58771f5f`
- Internal content manifest: `AUTHORITATIVE-SOURCE-MANIFEST-beta88.txt`
- Internal content manifest SHA256: `fe538e046e257b45d566030c8e4ccab9ea5c9bf055eab11b79e5404ed5a9a81c`

Future migration/rebuild must obtain that exact Drive object and verify the archive SHA256 before use. Never reconstruct beta.88 from GitHub evidence files alone.

## TEC scope
- Q170: Withdrawn marker/status — PASS
- Q197: Expelled flag — PASS
- Q198: optional exclusion of expelled player from standings while retaining historical results — PASS
- Round Robin <50%: reuses existing beta.41 cancellation rule for explicit `tournamentStatus=expelled`.

## Release gates
- beta.88 targeted TEC regression: `24 PASS / 0 FAIL`
- Cumulative: `PASS=76 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=80`
- Static audit: PASS
- Protected core: `70/70 byte-identical`, 0 changed, 0 missing
- Fingerprint content schema: 7 unchanged
- Cloud API / Worker: unchanged
- SYNC logic: beta.87 retained unchanged

## Changed application files
- `ChessPublisher.html` — player tournament status + standings presentation + beta.88 marker
- `ChessPublisher-Beta44-Compliance.js` — existing RR <50% logic recognizes explicit expelled status
- `ChessPublisher-Beta69-Compliance.js` — text/TXT standings exports preserve status labels
- `VERSION.txt`, `WEBVIEW-VERSION.txt`, `ChessPublisher-WebView.ps1` — beta.88 markers
- `TESTS/BETA88-TEC-PLAYER-STATUS-STANDINGS-REGRESSION.js`

Protected core changes: NONE.
