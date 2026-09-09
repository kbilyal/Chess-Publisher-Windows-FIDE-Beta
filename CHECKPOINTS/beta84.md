# Checkpoint — Chess-Publisher v1.06.00-beta.84

Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-09  
Product source parent: `v1.06.00-beta.83` / `f932f9632e588380d1cc91b042ae54d3728191b5`  
Release-line parent before this checkpoint: `91d3526bac6cc1524d13c2cdda16217c44940fb7` (auxiliary beta.84 bootstrap workflow cleanup; source tree equals beta.83 checkpoint tree)

## Purpose
Repair Desktop unified SYNC compatibility with the current Web/Cloud fingerprint-content contract **schema 7** and correct forced managed-file checkpoint durability.

## Product contract
- Existing `syncCurrent()` architecture is preserved; no replacement or always-Desktop/always-Cloud behavior.
- Conflict detection remains enabled and `BOTH_CHANGED` fails closed into explicit conflict resolution.
- Managed LocalEngine/native tournament file is the primary forced-checkpoint durability target.
- IndexedDB/localStorage are secondary recovery shadows only; localStorage quota failure cannot cancel an already-successful managed-file checkpoint.
- `cloud.fingerprintContentSchema = 7` qualifies stored common-base fingerprints.
- Older/missing-schema base fingerprints are reconstructed from immutable `baseRevision`.
- Equal Local/Remote content is NO-OP and repairs stale common-base metadata.
- CLOUD_ONLY pulls; DESKTOP_ONLY pushes; BOTH_CHANGED conflicts.
- Successful PUT response `cloudTournamentId`, `internalId`, `revision`, and `contentFingerprint` establish the new common base.

## Exact source checkpoint
Canonical staged source/evidence bundle in this Git repository:
- file: `BETA84-STAGING-BUNDLE.base64`
- Git blob: `2ccfcccdab66c3b24390e5b9aef9418663d6c65f`
- decoded tar.gz SHA256: `720f6649623a0710fee675d15ddb7ac5052cd404a55db5cd5a0e3ac2db146763`

The bundle contains the beta.84 source overlay/evidence. The normalized reproducible source patch is:
- `PATCHES/beta84-desktop-schema7-sync-compatibility.patch`
- SHA256: `407ab9489d513b1d9ca8a3fa545ee240b7d0361bb236af5eebafe802f019faf0`

## Release artifacts
- Windows portable ZIP SHA256: `0985c71c6c790ed04bf7370eab1d300df8689dbe67c3f7385b72d0e4c513ebff`
- Windows launcher EXE SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`
- Source archive SHA256: `58b58fab5c37d61c85496c398d21e26215c50f39f06011e7041d3002d277e72d`
- Regression report SHA256: `295baa6938500ec085e22c8063533438fe743af8a8277b6577bac9fd65fcb43f`

## Regression gate — re-executed before checkpoint
- beta.84 forced checkpoint persistence: **9/9 PASS**
- beta.84 schema-7 unified SYNC: **18/18 PASS**
- complete cumulative PASS set re-executed: **72/72 PASS**
- approved historical exceptions: **3**
- designated browser-runner skip: **1**
- unexpected: **0**
- static audit: **PASS**
- protected hash comparison: **PASS** — 69 byte-identical + exactly 1 approved requested change (`webview/CloudWorkspaceAdapter.js`) + 0 unexpected

Mandatory scenarios PASS: PERSIST-01, PERSIST-02, FP-01, FP-02, SCHEMA-01, SYNC-A, SYNC-B, SYNC-C, SYNC-D, RECOVERY-01.

## Protected components
Gacrux 1.9.57, Swiss Dutch pairing core, TRF16/TRF26, TRF pairing path, BBP, Tie-Break, FIDE pairing/rating core and Chess-Results protocol/core are unchanged.

## Runtime gate
This is a Windows **TEST CANDIDATE**. Do not call it Final/Stable until actual Windows runtime acceptance after install/start/smoke testing.
