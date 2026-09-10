# Chess-Publisher v1.06.00-beta.92 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.91
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.92 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `e432f625a32ac204100217aada37258b69be1c11`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta92.json`
- Drive file ID: `1DwbIzinbbNa_-MSXBNJbOPS3XSct9Fke`
- Drive folder ID: `18VoRHlGMKyFsSDz540-cDQct33nmr00m`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.92-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28197468` bytes
- Archive SHA256: `47299a387a69efe4882245153648fe49ea0e4a6bd38346ed9a7e93bf297cfe15`
- Internal manifest SHA256: `03c7f4e793343eb13d1dd4f171eb0113593ae85c344d6b49f71d92bbc945b362`

## Defect fixed
The Pairings SYNC result-only stage now performs a common-base structural preflight. If Desktop has changed since the immutable common base — including Reset Tournament, Delete Round, a newly generated round or manual pairing correction — it delegates directly to unified schema-7 SYNC before any result-to-board mapping. Pairing mismatches also delegate to full-state reconciliation. Unsupported remote result encodings remain blocked.

## Gates
- Targeted structural-preflight regression: `38 PASS / 0 FAIL`
- Updated beta.91 orchestration regression: `26 PASS / 0 FAIL`
- Cumulative: `PASS=80 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=84`
- Static audit: PASS
- Protected core vs beta.91: `70/70 byte-identical`
- Fingerprint schema: `7`, unchanged
- Cloud API: unchanged from beta.91
- Linux: unchanged / frozen beta.81
