# Windows FIDE Beta Checkpoint — v1.06.00-beta.77

Parent: `v1.06.00-beta.76`  
Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-09

## User-reported defect
Desktop tournament `RC beta test (Imported)2` retained Cloud identity from a different `GOLDEN RHODOPES...` Cloud tournament. Because that foreign row existed and had a newer revision, beta.76 incorrectly required `Pull Current` and prevented uploading the Desktop copy as an independent tournament.

## beta.77 fix
- `My Cloud Tournaments` remains the authoritative organizer-scoped Cloud index.
- If the current Desktop name clearly identifies an imported/copy instance and the linked authoritative Cloud row has a different tournament name, the old Cloud linkage is treated as foreign-copy metadata.
- The Desktop copy receives a fresh `localKey` and fresh `internalId`.
- `Upload Current` becomes `Upload as New` for this state and creates exactly one new Cloud tournament from revision 0.
- The foreign Cloud tournament receives zero writes.
- Normal renames without Imported/Copy lineage are not auto-detached; they remain fail-safe and require explicit operator choice.

## Canonical artifacts
- Candidate ZIP SHA256: `7778224721ef22649f84ae7003b2fc20e5f89357815fef1a495686d64a50c672`
- Source archive SHA256: `270511980285ccd4da33d2083fdf0e1a550695d905f31522981d246222ba629c`
- Overlay patch SHA256: `dca36a3ac21ed78922fd3c7ed92d085f51779eafbb660e5566d28f8dda478212`

## Regression gate
- beta.77 copied/imported identity: 18/18 PASS
- beta.76 authoritative list: 26/26 PASS
- directional Cloud: 33/33 PASS
- Download Results: 26/26 PASS
- TEC/UI: 29/29 PASS
- Gacrux runtime: 31/31 PASS
- Protected core: 70/70 byte-identical
- Static audit: PASS
- Cumulative: 64 PASS + 3 known historical exceptions + 1 designated browser skip; unexpected 0
- Packaged ZIP focused re-run: PASS
- ZIP integrity: PASS

## Release state
TEST CANDIDATE only. Next gate is exact Windows runtime acceptance of this candidate and reproduction of the reported upload scenario.
