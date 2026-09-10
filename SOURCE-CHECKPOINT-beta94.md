# Chess-Publisher v1.06.00-beta.94 Source Checkpoint

Status: Windows TEST CANDIDATE
Parent: v1.06.00-beta.93
Linux: FROZEN at v1.06.00-beta.81 parity checkpoint; repository NOT modified.

## Authoritative complete source
GitHub main is the evidence/checkpoint index. The complete beta.94 application source is the immutable Google Drive SOURCE archive identified below.

- Source-pointer GitHub commit: `0d6e67c052f1cec0f6d2fd14e91ceb4a058868ca`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta94.json`
- Drive file ID: `1E19XGBbNjROJ4FZKtkHITACgjCuHd8TT`
- Drive folder ID: `1VjXyc6_AkAyp3VN3OjJI6lofyWlCsijS`
- Archive: `Chess-Publisher-Windows-v1.06.00-beta.94-AUTHORITATIVE-SOURCE.tar.gz`
- Archive size: `28221226` bytes
- Archive SHA256: `00196eb1a7e4e74a8c203e3371b929ee2adbac8fd5b770531113761ce5142c1e`
- Internal manifest: `AUTHORITATIVE-SOURCE-MANIFEST-beta94.txt`
- Internal manifest SHA256: `60ce79a330e8977f3663cf2316ea1c0bd2c6dcd27e3e02d8c4efe4034f42e54e`

Never reconstruct beta.94 from GitHub evidence files alone. Fetch the exact Drive object and verify SHA256 first.

## SYNC defect fixed
Older/upgraded tournaments could have a valid Cloud identity but incomplete common-base metadata. Unified SYNC then could not perform field-level conflict resolution and stopped with a base-revision-unavailable alert.

beta.94 recovers a common base only from provable lineage: stored schema-7 fingerprint, matching current revision, immutable historical base revision, or one unique immutable revision whose raw Cloud checksum exactly matches the saved `lastSyncedHash`.

If no common base can be proved, field-level merge stays disabled. The user instead gets an explicit whole-tournament choice: Keep Desktop, Keep Cloud, or Cancel. Keep Desktop refetches Cloud immediately before the optimistic PUT and refuses if Cloud advanced. Keep Cloud performs zero Cloud writes.

Reset Tournament and Delete Round also store explicit structural intent metadata, without changing schema-7 content.

## Gates
- beta.94 targeted common-base recovery: `28 PASS / 0 FAIL`
- beta.93 single SYNC authority: `11 PASS / 0 FAIL`
- beta.92 structural preflight: `38 PASS / 0 FAIL`
- beta.91 Trash orchestration: `26 PASS / 0 FAIL`
- beta.90 Trash restore/re-upload: `19 PASS / 0 FAIL`
- Cumulative: `PASS=82 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=86`
- Static audit: PASS
- Protected comparison vs beta.93: `69/70 byte-identical`; one approved Cloud-adapter orchestration/base-recovery change
- Fingerprint schema: `7`, unchanged
- Cloud transport API: unchanged from beta.93
- Gacrux/TRF/BBP/Tie-Break/Chess-Results/rating cores: unchanged
