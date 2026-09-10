# Chess-Publisher v1.06.00-beta.93 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.92
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.93 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `7445c80b9a8ec0ef2ea0a35fd8f206c31b3aba74`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta93.json`
- Drive file ID: `1xm6-p4-Z-9xgNd0YUrIGS4kb6WMXBRjG`
- Drive folder ID: `1fQ_nRZ6JBjpuO0qv16L7hGIOpPejE-bX`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.93-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28200167` bytes
- Archive SHA256: `4f7d4d59534ade1a11a6219828576a6027899736572c31841dae6c9b75557989`

## Runtime defect fixed
The Windows application loads CloudWorkspaceAdapter and CloudWorkspaceRedesign together. beta.93 makes CloudWorkspaceRedesign the single reconciliation authority for the CURRENT open tournament. Legacy adapter startup/autosync/Cloud-open pre-sync paths delegate current-tournament work to unified schema-7 SYNC instead of running a second independent conflict classifier.

## Gates
- Integrated dual-layer runtime regression: `11 PASS / 0 FAIL`
- beta.92 structural preflight: `38 PASS / 0 FAIL`
- beta.91 Trash orchestration: `26 PASS / 0 FAIL`
- Cumulative: `PASS=81 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=85`
- Static audit: PASS
- Protected comparison vs beta.92: `69/70 byte-identical`, one approved orchestration change in `webview/CloudWorkspaceAdapter.js`
- Fingerprint schema: `7`, unchanged
- Cloud API transport: unchanged
- Gacrux/TRF/BBP/Tie-Break/Chess-Results/rating cores: unchanged
