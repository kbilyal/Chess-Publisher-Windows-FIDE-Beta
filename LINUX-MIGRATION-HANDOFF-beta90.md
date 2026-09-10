# Linux Migration Handoff — Windows v1.06.00-beta.90

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint`.

## Authoritative source locator
- Source-pointer GitHub commit: `d8af86fc03f40b6c104e9908890c08b86d9020e2`
- Pointer file: `AUTHORITATIVE-SOURCE-POINTER-beta90.json`
- Google Drive file ID: `1hgGFjrX5wDSLnmLp4Tj-KKhWfXVsuA_S`
- Google Drive folder ID: `1xqQ8fkezSQwUSjFh8_mE4Zyk5iz6UegG`
- Exact archive: `Chess-Publisher-Windows-v1.06.00-beta.90-AUTHORITATIVE-SOURCE.tar.gz`
- Archive SHA256: `111bebf6042160c85e1c9b6233f79d9f30949ca51333eae1e0dfe340f252628c`
- Content manifest SHA256: `6f53afb999c3a3c59f74b54316c33e9797b63cdc047ae65c51434a8112d80fab`

GitHub main is an evidence/checkpoint index, not the complete source tree. Linux alignment must fetch and verify the exact archive above.

## Functional delta since beta.89
1. Desktop Cloud client gains read-only Trash listing and restore transport methods.
2. On active-list miss, Desktop checks Trash before clearing remote identity.
3. Archived tournaments are restored using the same Cloud ID and the existing common-base metadata is preserved.
4. Normal schema-7 three-way SYNC decides whether to no-op, push, pull or conflict after restore.
5. True permanent deletion recreates a clean Cloud row and uploads the current Desktop state.
6. Ambiguous Trash identity fails closed.

## Gates
- Targeted deleted-Web recovery: 19 PASS / 0 FAIL
- Cumulative: PASS=78 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=82
- Static audit: PASS
- Protected comparison: 69/70 byte-identical; 1 approved infrastructure change
- Gacrux / Swiss Dutch: unchanged
- TRF16 / TRF26: unchanged
- BBP: unchanged
- Tie-Break core/checker: unchanged
- Chess-Results protocol/core: unchanged
- Rating calculation core: unchanged
- Fingerprint schema: 7 unchanged
- Linux adapter change required later: expose the same Cloud Trash list/restore transport through the Linux platform adapter if not already shared.

When explicitly instructed `align Linux to current Windows beta`, use this exact archive directly from Linux beta.81.
