# TEC Q222 — Chess960

Status: **implemented + dedicated regression PASS in staging; NOT merged into the Windows product and NOT a release candidate yet**.

## VCL target

Q222 asks whether the THP supports Chess960, for example by allowing the user to select a random starting position. The beta.89 matrix records this as `PARTIAL`, P2, draft penalty 15%.

## Rule basis

The current FIDE Laws of Chess Chess960 guideline requires a legal randomized first rank with the king between the rooks, bishops on opposite-coloured squares, and Black opposite White. A computer program may generate the starting position.

## Implemented behavior

- Runtime Tournament Setup control: `Standard Chess` / `Chess960`.
- Explicit Chess960 position number `0..959`.
- `Draw Random` selects uniformly from all 960 legal positions using uint32 rejection sampling when secure randomness is available.
- Standard Chess960/Scharnagl numbering is used; `#518 = RNBQKBNR`.
- Only `settings.chessVariant` and `settings.chess960PositionNumber` are persisted; board layout is derived, avoiding duplicated stale state.
- Merely loading an old tournament does not mutate it.
- Chess960 mode requires an explicit draw/position; no hidden random state is invented.
- Variant/position becomes locked after Round 1 has been paired, including the persistent first-round-history lock.
- Black is always generated opposite White.
- Pairing/scoring/rating/TRF/tie-break/Chess-Results/DGT/Cloud/SYNC/Gacrux logic is not redefined.

## Dedicated regression

`BETA98-TEC-Q222-CHESS960-REGRESSION.js`

**31 PASS / 0 FAIL**

The test exhaustively validates all 960 positions for uniqueness, legal bishops, king-between-rooks, Black mirroring and number/back-rank round trip. It also covers random-draw rejection sampling, legacy non-mutation, state persistence, explicit-position validation, post-Round-1 locking and protected-core sentinels.

## Integrated source-only staging audit

A temporary exact-beta.81 source tree containing the staged Q117 + Q138 + Q222 layers passed `FULL-PROGRAM-STATIC-AUDIT.py` with no static failures. The LocalEngine, WebView adapter, Hub adapter, Cloud adapter, Cloud API client and source `engine/` files remained byte-identical to the exact beta.81 source reference.

A broad source-only Node regression sweep produced **no new unexpected failure attributable to the staged TEC work**. Historical beta.81 exceptions remain historical, the designated browser-only case remains non-Node, and the Gacrux packaged-runtime archive test cannot be reproduced from the source-only recovery archive because that sealed runtime payload is not present there.

## Staging bundle

File: `BETA98-Q222-STAGING-BUNDLE.base64`

Decode:

```bash
base64 -d BETA98-Q222-STAGING-BUNDLE.base64 > BETA98-Q222-STAGING-BUNDLE.tar.gz
tar -xzf BETA98-Q222-STAGING-BUNDLE.tar.gz
```

Hashes:

- decoded tar.gz SHA256: `123832a54cf258e7202cc33f7b824fe1e9aa6bf59e83ea95c689a957ed65b287`
- base64 SHA256: `b01ae6131dbe9f19e64ae00899210bb69cf657aa9ad89911dd8095091e58d46e`
- implementation module SHA256: `9db9b09409934c2d684cfa78eb78e93c976d29448022a54e0d339acb01fade35`
- dedicated regression SHA256: `0fca6205e00ed15f2a96416bf2d0c499dd2749ae3c75d57699706723821d8e24`
- implementation report SHA256: `3d3553c67bc4125a69c9accb33ce540c90393a8dec4ad00e29d3bb1bbd24be40`

## Protected boundary

No intended changes to Gacrux 1.9.57, Swiss Dutch pairing, TRF pairing path, BBP, protected tie-break formulas, Chess-Results core/protocol, Cloud/SYNC or Linux.

Linux remains frozen at `v1.06.00-beta.81`.

## Mandatory release gate

Do **not** mark Q222 production PASS and do **not** publish beta.98 until the exact beta.97 authoritative source is obtained and verified, this additive layer is integrated into that exact source, current full Windows regressions/protected hashes pass, and a real Windows smoke test verifies the Chess960 setup UI and persistence.
