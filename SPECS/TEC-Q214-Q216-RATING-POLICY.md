# TEC Q214–Q216 — Rating-based tie-break policy layer

Status: **QUEUED INTEGRATION / NOT A BETA CANDIDATE / VCL Q214–Q216 REMAIN OPEN**

Parent checkpoint: `v1.06.00-beta.72 — Integrated Rating Lists`
Protected boundary: do not modify Gacrux, Swiss Dutch, TRF16/TRF26, BBP, Tie-Break core/checker, Chess-Results protocol/core, or player/pairing identity semantics.

## FIDE rule baseline

FIDE Handbook C.07, Play-Off and Tie-Break Regulations, effective 1 March 2026, Article 10 states that rating-based tie-breaks are not recommended when a player may receive more than one rating during the tournament. If they are nevertheless used, **the first rating is used unless the specific tournament regulations state otherwise**.

Authoritative source:
https://handbook.fide.com/chapter/TieBreakRegulations032026

Therefore:

- `FIDE_FIRST` is the mandatory default policy (Q215 target).
- `ROUND_EFFECTIVE` is an explicit accurate per-round policy consuming beta.70 `ratingForRound()` (Q214 target).
- `USER_SELECTED` is an explicit tournament-rule override and must never silently guess a rating (Q216 target).

## Additive architecture

Do not build a second rating model. The new layer consumes the existing beta.70 long-event rating history and the existing current tie-break rating getter as dependencies.

Pure resolver contract:

```text
resolveTieBreakRating(player, context)

context.policy:
  FIDE_FIRST       # default
  ROUND_EFFECTIVE  # requires round
  USER_SELECTED    # requires validated per-player period selection

context.ratingForRound(player, round)
  adapter to beta.70 ratingForRound()

context.getBaseRating(player)
  adapter to the existing current tie-break rating source/fallback semantics
```

The resolver must be non-mutating. It may return rating/provenance only. It must not change:

- Official Rating
- Tournament Rating
- Starting Number
- pairingNumber
- player IDs/localKey
- pairings
- existing rounds
- TRF state

## Policy persistence

The policy is tournament-rule state and therefore portable tournament state:

```js
tournament.tieBreakRatingPolicy = {
  mode: 'FIDE_FIRST' | 'ROUND_EFFECTIVE' | 'USER_SELECTED',
  selections: {
    '<stable-player-key>': '<stable-history-period-key>'
  }
}
```

`selections` is used only for `USER_SELECTED`. Invalid or stale selections are a hard validation error. Never fall back silently to a different rating in USER_SELECTED mode.

## Integration boundary

The existing protected tie-break implementations must not be rewritten merely to close the VCL. Integrate through the narrowest available rating-access seam, e.g. a dependency/callback used whenever Article-10 rating data is requested.

Rating-based tie-break families requiring audit after integration include at least the C.07 Article 10 family used by Chess-Publisher (for example ARO/TPR/PTP/APRO/APPO/RTNG where implemented). Each opponent-rating access must receive the encounter round when `ROUND_EFFECTIVE` is active.

## Required UI

In Tie-Break settings for long/multi-rating events:

```text
Rating policy for rating-based tie-breaks

(*) FIDE default — First rating
( ) Rating valid for each round
( ) Explicit rating selection per player
```

For `USER_SELECTED`, show FIDE ID, player name, available official rating periods, list period and round range. Apply is blocked until every multi-rating player required by the calculation has a valid selection.

The UI should explain that C.07:10 defaults to the first rating unless tournament regulations state otherwise.

## Deterministic pure-layer gate already executed

`TEC-Q214-Q216-RatingPolicy.test.js` currently verifies 20/20 PASS:

- default is FIDE_FIRST
- first rating is based on earliest round period, not array order
- correct ROUND_EFFECTIVE resolution
- beta.70 ratingForRound adapter consumption
- missing round blocked
- valid explicit period selection
- missing/stale explicit selections blocked
- unknown policy blocked
- base-rating fallback delegated to existing semantics
- non-mutation
- encounter rating averages differ deterministically by policy
- USER_SELECTED configuration completeness validation
- deterministic period keys

This is **not** sufficient to mark Q214/Q215/Q216 PASS. Full integration requires the exact beta.72 source tree, actual calculator adapter wiring, UI, persistence, and the complete Windows protected regression gate.

## Full application gate before any VCL PASS

1. Exact beta.72 source parent loaded.
2. Add policy module without modifying protected Tie-Break core/checker.
3. Wire every implemented rating-based tie-break to the resolver.
4. Default policy with no user setting = FIDE_FIRST.
5. ROUND_EFFECTIVE passes a round for every opponent-rating access.
6. USER_SELECTED requires explicit valid selection, no silent fallback.
7. Existing current single-rating tournaments remain byte/behavior compatible.
8. Long-event player history remains unchanged by calculations.
9. Starting numbers/pairings remain unchanged by policy changes.
10. Dedicated integration tests PASS for Q214, Q215, Q216.
11. Fluidity v2 60/60 PASS.
12. Directional Desktop/Web Cloud regression PASS.
13. TRF16/TRF26 PASS.
14. Gacrux/Swiss/BBP/Tie-Break core/Chess-Results protected hashes unchanged.
15. Only then update VCL Q214–Q216 to PASS based on actual evidence.
