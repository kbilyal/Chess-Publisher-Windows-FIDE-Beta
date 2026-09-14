# Chess-Publisher v1.06.00-beta.98-r7 — Release Evidence

Status: **WINDOWS TEST CANDIDATE — NOT FROZEN**

Parent: v1.06.00-beta.98-r6
Date: 2026-09-14

Scope: Unified Rating List Manager and non-blocking FIDE/Custom/Type-B player search.

Evidence:
- Rating List Engine dedicated regression: 21/21 PASS
- Full JS corpus: 103 PASS / 2 approved historical exceptions / 1 designated browser-only skip / 0 unexpected
- Static audit: PASS
- Protected core: 70/70 byte-identical
- TRF 3/3; BBP 2/2; Tie-Break 3/3; Chess-Results 2/2; SYNC 13/13; Gacrux 1/1; Rating/VCL 12/12
- Q117 58/58; 50K library 7/7; r5 Setup/Search 19/19; r6 Q50/Q138 28/28
- Post-package portable/source manifests: 997/997 PASS
- Focused Chromium harness: empty focus 0 search calls; FIDE and Custom searches PASS; unified manager PASS

Portable ZIP SHA256: `9e652339f432584632b5ceb7ac183e243b002a9bd0cd64c404918d915d6a49b1`

Authoritative source SHA256: `e43ff0c5d09107c47d871138446b04e6e00e12edc7aeafd867231907b09162f7`

Launcher EXE SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`

Authoritative full source remains in the release archive; this GitHub location is evidence/checkpoint only.

Real Windows smoke is required before freeze.