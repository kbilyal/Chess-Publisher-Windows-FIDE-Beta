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
- Internal manifest: `AUTHORITATIVE-SOURCE-MANIFEST-beta91.txt`
- Internal manifest SHA256: `614c4a719e5fccb030a0874ac1b8cc3e782cb5fc51e882b4ca83f7b6670518f3`

Never reconstruct beta.91 from GitHub evidence files alone. Fetch the exact Drive object and verify SHA256 first.

## Defect fixed
After beta.90 restored a Web-deleted tournament from Cloud Trash, the user-facing SYNC action still entered `Download Results` before unified reconciliation. If the archived snapshot contained an older pairing state, the strict result matcher could raise a false `Pairing mismatch on Round 1, Board 1` before schema-7 SYNC had a chance to decide which side changed.

## Recovery contract
1. Trash identity recovery remains unchanged from beta.90.
2. If `reconcileRemoteIdentity()` returns `RESTORED_FROM_TRASH`, `Download Results` does not inspect the stale archived pairing snapshot.
3. Control passes directly to unified schema-7 `syncCurrent()`.
4. The preserved common base decides `push / pull / merge / conflict`.
5. If Desktop is the only changed side, the current Desktop pairing/state is uploaded to the restored same Cloud ID.
6. A normal active-Cloud pairing mismatch still fails closed before any write.
7. No pairing safety guard is removed or weakened.

## Gates
- Mandatory beta.91 orchestration regression: `26 PASS / 0 FAIL`
- Cumulative: `PASS=79 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=83`
- Static audit: PASS
- Protected core vs beta.90: `70/70 byte-identical`
- Fingerprint content schema: `7`, unchanged
- Cloud API transport: unchanged from beta.90
- Gacrux / Swiss Dutch / TRF16 / TRF26 / BBP / Tie-Break / Chess-Results / rating core: unchanged

## Shared/application delta
- `webview/CloudWorkspaceRedesign.js` — restored-from-Trash result-download orchestration delegates directly to unified SYNC.
- `ChessPublisher.html`, `VERSION.txt`, `WEBVIEW-VERSION.txt`, `ChessPublisher-WebView.ps1` — beta.91 version markers.
- `TESTS/BETA91-SYNC-TRASH-PAIRING-MISMATCH-ORCHESTRATION-REGRESSION.js` — targeted regression.
