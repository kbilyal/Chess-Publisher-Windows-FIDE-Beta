# Linux Migration Handoff — Windows v1.06.00-beta.88

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint` and the Linux repository was not modified.

## Authoritative source locator
- GitHub source-pointer commit: `8c5d92e24021a572e1d01718db3cb5ae14b0a501`
- Pointer file: `AUTHORITATIVE-SOURCE-POINTER-beta88.json`
- Google Drive file ID: `16SKFMLh8_hC3uY4SvxyKOk74pOCsFNGJ`
- Exact archive: `Chess-Publisher-Windows-v1.06.00-beta.88-AUTHORITATIVE-SOURCE.tar.gz`
- Archive SHA256: `d22a5697d7dbef2e6064bd85c88edbcca630e727bcb392934453b7da58771f5f`
- Content manifest SHA256: `fe538e046e257b45d566030c8e4ccab9ea5c9bf055eab11b79e5404ed5a9a81c`

Important: GitHub main is currently an evidence/checkpoint index, not a complete application-source tree. For Linux alignment, fetch the exact archive above and verify SHA256. Do not reconstruct from GitHub evidence files.

## Functional delta since beta.87
1. Explicit tournament status `Expelled` for player records.
2. Existing post-start registration tombstone is displayed as `Withdrawn` in standings.
3. Expelled player may optionally be hidden from final standings; stored results/history are retained.
4. Existing Round Robin <50% withdrawal/result-cancellation rule also recognizes explicit expelled status.
5. Standings text/TXT exports retain Withdrawn/Expelled labels.

## Gates
- Targeted beta.88 TEC: `24 PASS / 0 FAIL`
- Cumulative: `PASS=76 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=80`
- Protected core: `70/70 byte-identical`
- Static audit: PASS
- Cloud/SYNC schema change: none
- Linux platform-adapter change required: none identified

When explicitly instructed `align Linux to current Windows beta`, use this exact authoritative archive directly from Linux beta.81.
