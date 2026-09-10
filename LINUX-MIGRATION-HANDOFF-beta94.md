# Linux Migration Handoff — Windows v1.06.00-beta.94

Do not migrate yet. Linux remains frozen at `v1.06.00-beta.81 parity checkpoint`.

## Authoritative source locator
- Source-pointer GitHub commit: `0d6e67c052f1cec0f6d2fd14e91ceb4a058868ca`
- Pointer: `AUTHORITATIVE-SOURCE-POINTER-beta94.json`
- Google Drive file ID: `1E19XGBbNjROJ4FZKtkHITACgjCuHd8TT`
- Google Drive folder ID: `1VjXyc6_AkAyp3VN3OjJI6lofyWlCsijS`
- Exact archive: `Chess-Publisher-Windows-v1.06.00-beta.94-AUTHORITATIVE-SOURCE.tar.gz`
- Archive SHA256: `00196eb1a7e4e74a8c203e3371b929ee2adbac8fd5b770531113761ce5142c1e`
- Content manifest SHA256: `60ce79a330e8977f3663cf2316ea1c0bd2c6dcd27e3e02d8c4efe4034f42e54e`

GitHub main is an evidence/checkpoint index, not the complete application source. Linux alignment must fetch and verify the exact archive above.

## Functional delta since beta.93
1. Common-base recovery can prove lineage from exact saved Cloud checksum against immutable revision history.
2. Recovered historical revision becomes the effective schema-7 three-way merge base.
3. Reset Tournament and Delete Round store explicit local structural-intent metadata.
4. If a common base cannot be proved, field-level merge remains disabled and only whole-tournament recovery is offered.
5. Keep Desktop refetches Cloud before optimistic PUT and fails closed on a race.
6. Keep Cloud performs zero Cloud writes and establishes a fresh local base.
7. Opening a different Cloud tournament avoids legacy non-current reconciliation.

## Gates
- Targeted: 28 PASS / 0 FAIL
- Cumulative: PASS=82 KNOWN=3 SKIP=1 UNEXPECTED=0 TOTAL=86
- Static audit: PASS
- Protected comparison: 69/70 byte-identical; approved changed file `webview/CloudWorkspaceAdapter.js`
- Cloud API transport: unchanged
- Fingerprint schema: 7 unchanged
- FIDE protected cores: unchanged

When explicitly instructed `align Linux to current Windows beta`, migrate directly from Linux beta.81 using this exact verified archive.
