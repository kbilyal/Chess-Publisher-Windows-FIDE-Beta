# TEC Q117 — Custom Rating Lists — beta.98 staging gate

Base: Windows `v1.06.00-beta.97` repository checkpoint `fea4e27877bf9cc5d30db03a910b863c33a83be3`.

Status: **STAGING ONLY — NOT A RELEASE, NOT MERGED TO MAIN.** The authoritative beta.97 source archive remains the only valid integration base. The Drive archive cannot currently be materialized through the connected tooling, so this staging branch contains the additive Q117 design/evidence and must not be promoted until it is applied to the exact authoritative beta.97 source and the full Windows gates pass.

## TEC requirement

Q117 asks whether the THP supports Custom Rating Lists. TEC Manual 2.0 allows national, regional, club, historical or other Custom Rating Lists. Custom lists may be Type-B; their source is not known to the THP and the user is responsible for supplying updates. If supported, they must be usable in the tournament Rating List Sequence, including as the Main Rating List.

## Implementation contract

The Q117 implementation must reuse the existing beta.81 Type-B data store. It must **not** introduce a parallel player-rating database. A small custom-role registry may classify selected Type-B lists as Custom and store only metadata: stable list ID, user label, category, rating type and source/import metadata. Rating rows remain in beta.81 storage and lookup continues through `cpBeta81.findRating()`.

Required behavior:
- named Custom Type-B lists for Standard/Rapid/Blitz;
- categories National, Regional, Club, Historical and Other;
- persistent custom-list catalogue metadata;
- add/remove/reorder and Set as Main on the existing `tournament.settings.ratingListSequence`;
- sequence resolution that combines official/effective FIDE lists and Custom lists;
- Custom-list Tournament Rating application with explicit source provenance;
- retained original Custom source/value after a later manual rating override;
- fail-closed deletion while a Custom list is referenced by a tournament sequence;
- no change to default FIDE Rating List Sequences;
- no replacement of ordinary Type-A or ordinary Type-B behavior.

## Final integration on exact beta.97 source

1. Load the Q117 module after beta.81 Type-B and the existing rating-sequence/provenance modules.
2. Wire the existing player-add/rating-selection path to custom-aware sequence resolution so a Main Custom-list hit is assigned automatically and later Custom-list hits are offered as alternatives exactly like later official lists.
3. Keep beta.52 provenance untouched; retain custom list ID/label/source value in additive metadata and preserve it after manual edits.
4. Make Custom lists visible in the existing beta.62 Rating List Sequence editor rather than creating a second tournament-sequence system.
5. Guard Custom-list deletion if any tournament sequence still references it.
6. Update VCL Q117 only after runtime integration and every release gate passes.

## Staging regression target

The isolated design regression target is `38 PASS / 0 FAIL`, covering custom descriptor semantics, Type-B reuse, source-unknown semantics, categories, persistence, FIDE-ID lookup, sequence add/remove/reorder/Main, custom-main hit, fallback to later official list, provenance retention, manual override retention, duplicate rejection, referenced-delete blocking, safe deletion, ordinary Type-B preservation, and unchanged default sequences.

## Protected boundaries

Do not modify Gacrux 1.9.57, Swiss Dutch pairing, TRF pairing path, BBP checker, protected Tie-Break formulas, Chess-Results core/protocol, rating-calculation core, Cloud/SYNC schema 7, or the active beta.96 r4 SYNC freeze. Linux remains frozen at beta.81.

## Promotion gate

A real beta.98 candidate requires the exact beta.97 authoritative source, point integration only, dedicated Q117 regression, cumulative JS regression, static audit, protected-core byte/hash comparison, Gacrux runtime checks, TRF16/TRF26 regression, Desktop-Web/Cloud SYNC freeze gate, package manifest/hash verification, and real Windows smoke testing before any new frozen baseline.
