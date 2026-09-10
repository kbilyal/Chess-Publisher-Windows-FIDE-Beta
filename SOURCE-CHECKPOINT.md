# Chess-Publisher v1.06.00-beta.90 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.89
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.90 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `d8af86fc03f40b6c104e9908890c08b86d9020e2`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta90.json`
- Drive file ID: `1hgGFjrX5wDSLnmLp4Tj-KKhWfXVsuA_S`
- Drive folder ID: `1xqQ8fkezSQwUSjFh8_mE4Zyk5iz6UegG`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.90-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28151639` bytes
- Archive SHA256: `111bebf6042160c85e1c9b6233f79d9f30949ca51333eae1e0dfe340f252628c`
- Internal manifest: `AUTHORITATIVE-SOURCE-MANIFEST-beta90.txt`
- Internal manifest SHA256: `6f53afb999c3a3c59f74b54316c33e9797b63cdc047ae65c51434a8112d80fab`

Never reconstruct beta.90 from GitHub evidence files alone. Fetch the exact Drive object and verify SHA256 first.

## Defect fixed
A tournament removed from the Web active `My tournaments` list could disappear from Desktop SYNC because Desktop only checked active Cloud records and did not inspect Cloud Trash before clearing the saved remote link.

## Recovery contract
1. Active Cloud list is checked first.
2. If the saved Cloud identity is missing, Desktop checks Trash by `cloudTournamentId` and `internalId`.
3. If the same tournament is archived, Desktop restores the SAME Cloud row.
4. Existing `baseRevision` / `baseFingerprint` are preserved.
5. Normal schema-7 SYNC resumes: unchanged Desktop -> restore only; changed Desktop -> restore + publish next revision.
6. If absent from both active list and Trash, it is treated as permanently deleted: create a fresh Cloud row and upload the current Desktop state from revision 0.
7. Ambiguous Trash identity fails closed; no create or write is attempted.

## Gates
- Mandatory beta.90 deleted-Web recovery regression: `19 PASS / 0 FAIL`
- Existing SYNC regression family: PASS
- Cumulative: `PASS=78 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=82`
- Static audit: PASS
- Protected-file comparison: `69/70 byte-identical`
- Approved protected infrastructure change: `cloud/client/cloud-workspace-api.js` only
- Missing protected files: `0`
- Fingerprint content schema: `7`, unchanged
- FIDE pairing/TRF/BBP/Tie-Break/Chess-Results/rating cores: unchanged

## Shared/application delta
- `webview/CloudWorkspaceRedesign.js` — Trash identity recovery before stale-link recreation.
- `cloud/client/cloud-workspace-api.js` — existing Worker Trash list/restore endpoints exposed to Desktop.
- version markers and beta.90 regression/evidence only.
