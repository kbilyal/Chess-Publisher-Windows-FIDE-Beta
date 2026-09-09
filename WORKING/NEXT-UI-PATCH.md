# Next UI Patch — Working State

Base: `v1.06.00-beta.73` Windows TEST CANDIDATE
Status: WORKING / NOT RELEASED

## Confirmed Windows acceptance feedback
- beta.73 Pairings PDF export opened and worked correctly in the user's Windows runtime test.

## Requested next-patch UI changes
1. Pairings PDF export: add explicit independent tick boxes for useful printed columns, including SNo. and FIDE ID, while retaining the existing presets and result-area choices.
2. Starting List PDF export: add useful column tick boxes, including SNo., Title, Name, Federation, Rating and FIDE ID. Name remains mandatory so an unusable empty-identity list cannot be produced.
3. Pairings Result Entry panel: keep the right-side pairing/result panel static and visible while the board list scrolls. Do not allow the panel to reflow below the pairing table on normal desktop widths.

## Implemented working patch
- `PATCHES/next-ui-static-pairing-panel.patch`
- UI/CSS only.
- Right-side Result Entry panel uses sticky positioning and its own vertical overflow limit.
- Board table remains the primary scrolling surface.
- Responsive desktop widths preserve a dedicated right-side panel column.
- Pairing data, player identity, Gacrux, Swiss Dutch pairing, TRF16/TRF26, BBP checker, Tie-Break core/checker and Chess-Results core are untouched.
- Full static audit on the patched beta.73 source: PASS.

The export-column changes remain queued for the same next UI patch. Do not promote this working state to Final/Stable.
