# Linux Migration Handoff — Windows v1.06.00-beta.91

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint`.

Authoritative source locator:
- Source-pointer commit: `ac87d5e029dfbe7552b3f9fa2f5826bd57a82131`
- Drive file ID: `1bek4S1-WTogR8GNibbeB-KVR2u47aDwo`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.91-AUTHORITATIVE-SOURCE.tar.gz`
- SHA256: `3541386640bb2c90910cb5aee254dc31f923a8017f2ffa429e2d421be0bd5714`
- Manifest SHA256: `614c4a719e5fccb030a0874ac1b8cc3e782cb5fc51e882b4ca83f7b6670518f3`

Functional delta from beta.90: after `RESTORED_FROM_TRASH`, the result-aware SYNC path delegates directly to unified schema-7 reconciliation instead of comparing stale archived pairings first. Normal active-Cloud pairing mismatch protection remains fail-closed.

Gates: targeted 26/26 PASS; cumulative 79 PASS / 3 approved / 1 skip / 0 unexpected; protected core 70/70 byte-identical; static audit PASS; fingerprint schema 7 unchanged; Cloud API unchanged from beta.90.

When explicitly instructed `align Linux to current Windows beta`, use the exact verified source archive above directly from Linux beta.81.
