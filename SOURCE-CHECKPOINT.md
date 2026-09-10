# Chess-Publisher v1.06.00-beta.91 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.90
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.91 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `ac87d5e029dfbe7552b3f9fa2f5826bd57a82131`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta91.json`
- Drive file ID: `1bek4S1-WTogR8GNibbeB-KVR2u47aDwo`
- Drive folder ID: `1EWLm4kugk3JNZEhAP4uOrJ5DHMIGMg2W`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.91-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28191142` bytes
- Archive SHA256: `3541386640bb2c90910cb5aee254dc31f923a8017f2ffa429e2d421be0bd5714`
- Internal manifest SHA256: `614c4a719e5fccb030a0874ac1b8cc3e782cb5fc51e882b4ca83f7b6670518f3`

## Defect fixed
After restoring a Web-deleted tournament from Cloud Trash, the result-aware SYNC path no longer compares stale archived pairings before unified reconciliation. `RESTORED_FROM_TRASH` now delegates directly to schema-7 `syncCurrent()`, which decides push/pull/merge/conflict from the preserved common base. Normal active-Cloud pairing mismatches still fail closed before any write.

## Gates
- Targeted: `26 PASS / 0 FAIL`
- Cumulative: `PASS=79 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=83`
- Static audit: PASS
- Protected core vs beta.90: `70/70 byte-identical`
- Fingerprint schema: `7`, unchanged
- Cloud API: unchanged from beta.90
- Linux: unchanged / frozen beta.81
