# Chess-Publisher Windows v1.06.00-beta.96 source checkpoint

Date: 2026-09-10  
Status: PORTABLE TEST CANDIDATE — awaiting user runtime confirmation  
Parent: v1.06.00-beta.95  
Linux: FROZEN at v1.06.00-beta.81; repository not modified.

## Authoritative artifacts

- Source: `Chess-Publisher-Windows-v1.06.00-beta.96-AUTHORITATIVE-SOURCE.tar.gz`
- Source SHA256: `c2d18d4f11d513a056bf7bef889d9250775a18ac38024b5d5952e1a41545c750`
- Source manifest SHA256: `b02f6a1457124d97723ccdf8bd0c62f996ce148dc36842c980ab435ef2d5db08`
- Portable: `Chess-Publisher-v1.06.00-beta.96-SYNC-FREEZE-PORTABLE-TEST-CANDIDATE-2026-09-10.zip`
- Portable SHA256: `6e369e4f11a3245e68d373858bbda00cb3253164679ebc3c10639eea45cdd00d`
- Launcher EXE SHA256: `1e5c93b987e156a81a3b1ca0bb6dc6fe84f97f38477c161b355a75b2c86458c3`

Google Drive folder: `1XegAUsEOwZTuN-gE9CqxklnP46OXNRmG`  
Portable file ID: `1RZDHlDIgpps0FUFPhBk1v2Hhm9GQQfxb`  
Source file ID: `1cvl5EBp8CcWbv7b9me9ilOu0vulbQbVV`

## Gates

- checker-runtime regression: 11/11 PASS
- frozen SYNC contract: 12/12 PASS
- cumulative: 86 PASS / 2 approved historical exceptions / 1 designated skip / 0 unexpected
- static audit: PASS
- protected core: 69/70 identical vs beta.95; only `webview/CloudWorkspaceAdapter.js` changed intentionally for this SYNC repair
- Web Cloud Workspace Integration Gate run `34497370206`: SUCCESS on commit `9dc8a6229a687bd1b78ae1e384ef2c4f9c9f5cf2`

`SYNC-FREEZE-v1.06.00-beta.96.json` is the freeze baseline. After real user runtime confirmation, future TEC/UI work must not modify the frozen SYNC contract without an explicitly reproduced SYNC defect and a new approved checkpoint.
