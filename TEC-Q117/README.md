# TEC Q117 — Custom Rating Lists

Status: **implemented + dedicated regression PASS in staging; NOT merged into the Windows product and NOT a release candidate yet**.

Base used for implementation verification: exact `v1.06.00-beta.81` rating-list architecture, because the current beta.97 authoritative source archive is presently blocked from connector download by Google Drive's executable/archive abuse scan. The Windows `main` product/evidence line remains unchanged by this branch.

## Q117 scope

The implementation closes the functional gap behind VCL Q117 (`Does the THP support the use of Custom Rating Lists?`) without creating a second rating system.

It is an additive extension of the existing:

- beta.52 rating provenance
- beta.57 Official Rating / Tournament Rating separation
- beta.59 Rating List Sequence model
- beta.62 sequence editor
- beta.66 sequence consistency checker
- beta.72 integrated rating-list parser
- beta.81 Type-B Rating Lists

## Implemented behavior

- Named Custom Rating Lists are stored/managed as **Type-B** data sources.
- `originalSourceKnown=false` is retained; Chess-Publisher does not invent source provenance.
- FIDE fixed-width TXT and CSV/TSV (`FIDE ID` + `Rating`, optional Name/FED/Title) are supported.
- Each custom list receives a stable internal ID independent of display label and tournament name.
- Custom list IDs can be added, removed and reordered together with official/effective lists in Rating List Sequence.
- Custom IDs survive tournament save/type-sync paths while default Standard/Rapid/Blitz sequences remain unchanged.
- FIDE search can expose Custom List values from the active sequence.
- A Custom Main Rating List hit may determine the player's Tournament Rating while Official Rating remains separate.
- Tournament-rating provenance retains custom list ID, label, source value, Type-B class and manual-override state.
- Mixed custom + official sequence consistency checking is supported.
- Deleting a Custom Rating List that is referenced by a tournament fails closed.

## Dedicated regression

`BETA98-TEC-Q117-CUSTOM-RATING-LISTS-REGRESSION.js`:

**25 PASS / 0 FAIL**

The existing rating-list regression stack from beta.51 through beta.81 was also re-executed against the exact beta.81 architecture and all selected suites passed.

## Staging bundle

File: `BETA98-Q117-STAGING-BUNDLE.base64`

Decode:

```bash
base64 -d BETA98-Q117-STAGING-BUNDLE.base64 > BETA98-Q117-STAGING-BUNDLE.tar.gz
tar -xzf BETA98-Q117-STAGING-BUNDLE.tar.gz
```

Decoded tar.gz SHA256:

`eda985906f2b9a84cc92910077700dae713d99769dc2f14fd770e3311decd8d5`

Bundle base64 SHA256:

`74e719052de60eed9742feb52659ef5fe66124275a2fbecdc7a24c8890b31ca3`

Contained implementation SHA256:

`971a4bddabbdc5c06d350b9fef560908d8d2531d6611b49c71da332482c43ae6  ChessPublisher-Beta98-CustomRatingLists.js`

Dedicated regression SHA256:

`400410cd082390b9b0433c3272e545bccb5d8921644bdc4f68694d79db9f0e2c  BETA98-TEC-Q117-CUSTOM-RATING-LISTS-REGRESSION.js`

## Protected boundary

No intended changes to Gacrux 1.9.57, Swiss Dutch pairing, TRF pairing path, BBP checker, protected FIDE tie-break formulas, Chess-Results core/protocol, Cloud/SYNC API/schema or Linux.

Linux remains frozen at `v1.06.00-beta.81`.

## Mandatory next gate

Do **not** mark Q117 PASS in the production VCL and do **not** publish beta.98 until the exact beta.97 authoritative source is obtained and verified, the additive module is integrated into that exact source, full current regression/protected hashes are run, and the Windows portable runtime is smoke-tested.
