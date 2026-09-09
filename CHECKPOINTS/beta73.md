# Windows FIDE Beta Checkpoint — v1.06.00-beta.73

Parent: `v1.06.00-beta.72 — Integrated Rating Lists / Directional Cloud Sync`  
Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**  
Date: 2026-09-08

## Scope
- Q214: `ROUND_EFFECTIVE` historical rating policy for rating-based tie-breaks.
- Q215: FIDE C.07 Article 10 `FIDE_FIRST` default.
- Q216: validated `USER_SELECTED` rating-period policy.
- Integration is additive through final public calculation/value seams; protected Tie-Break source remains byte-identical.

## Canonical artifacts
- Candidate SHA256: `3f7791429f86e3cb3c871f4669bc0071691692a5899a83d76232dd00a0da5e2a`
- Corrected source SHA256: `bfeaa55e2e70d14009396efa31aa906d578db633ec854c7810b995ff4c6d0d7d`
- Overlay SHA256: `383f390c729eda22d9f9c809a1ab47491dd1a1344f9e48fdbc1f66437aa6b00f`
- Drive folder: `https://drive.google.com/drive/folders/1SaeKhXBW2rJllLmWUASwwoFBb_p6AwUZ`
- Living VCL: `11P-6T64_fmSHY3WXQSyqAVlVyHxHvCVc`

## Source correction
The earlier artifact SHA `ad1d1e7581bee67ed103354c2e73c65fd2e475380148f34aa8bb6f840055c52a` is **not** a valid beta.73 source parent because its internal version/source remained beta.72. It is superseded and must not be used for future development.

## Regression gates
- Q214-Q216 dedicated: 34/34 PASS
- Chromium policy-editor UI evidence: 8/8 PASS
- Rating Lists: 34/34 PASS
- Directional Desktop/Web Cloud: 33/33 PASS
- Fluidity v2: 60/60 PASS
- English manual: 23/23 PASS
- Static audit: PASS
- Cumulative: 59 PASS + 3 known historical exceptions + 1 designated skip; unexpected 0
- Protected core: 70/70 byte-identical
- Gacrux 1.9.57: 61/61 byte-identical
- TRF26: 49/49 PASS
- Swiss pairing: 25/25 PASS
- Mandatory Swiss tie-breaks: 35/35 PASS
- Chess-Results Pairings publish: PASS

## VCL
Q214/Q215/Q216: YES / PASS. Working totals: PASS 147 / PARTIAL 22 / FAIL 0 / CONDITIONAL 21 / NEEDS TEST 4 / NEEDS TEC 1 / N/A 30. This is implementation evidence, not FIDE TEC certification.

## Next release gate
Do not declare Final/Stable. Next required external gate is Windows installation/runtime acceptance of this exact TEST CANDIDATE, followed by the normal final release gate.
