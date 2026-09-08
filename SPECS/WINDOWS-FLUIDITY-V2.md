# Windows Fluidity v2 — Required Desktop Integration

Continue development of the CURRENT Chess-Publisher Windows Desktop version.

Implement the tested Chess-Publisher Fluidity v2 UI changes from the
Windows Fluidity v2 preview and Linux dev21 into the REAL Windows Desktop
application.

IMPORTANT PROTECTED COMPONENTS — DO NOT MODIFY:
- Gacrux 1.9.57
- Swiss Dutch pairing logic
- TRF16 core
- TRF26 core
- BBP checker / bbpPairings core
- Tie-Break core/checker
- Chess-Results protocol/core
- pairingNumber / player IDs / starting-number semantics
- tournament calculations or pairing algorithms

This is primarily a UI/performance/refinement change.

==================================================
1. SINGLE FLUID WORKSPACE
==================================================

The main Chess-Publisher tabs must behave as one stable desktop workspace.

Do NOT open normal working tabs as movable/resizable pseudo-windows.

The content area must fill the application client area and remain stable
while switching between:

- Tournament Setup
- Lists & Players / Registration
- Pairings
- Standings
- Other / Export
- Tournament Schedule
- Chess-Results
- DGT

Use the real Windows desktop window/chrome for the application.
Do not create an additional fake movable application window inside it.

Avoid layout jumping when switching tabs.

==================================================
2. ALL MAIN TABS MUST ALWAYS BE VISIBLE
==================================================

Chess-Results must NOT disappear.

The Windows application must display all 8 primary tabs simultaneously,
including:

DGT
Tournament Setup
Lists & Players
Pairings
Standings
Other / Export
Tournament Schedule
Chess-Results

Make the tab row responsive so all tabs remain visible on normal Windows
desktop resolutions.

Do not solve this by hiding Chess-Results.

At 1366x768, 1920x1080 and typical maximized laptop resolutions:
- Chess-Results must be visible
- no tab should be outside the viewport
- avoid horizontal scrolling where practical
- reduce tab font/padding slightly on narrower windows instead

==================================================
3. PAIRINGS RESULT DESK MUST BE FIXED
==================================================

This is mandatory.

Inside Pairings, the right Result Desk must stay visually fixed.

The following controls must NOT move up/down when the board list is scrolled:

Current
1-0
1/2-1/2
0-1
Administrative
Swap Colors
All boards / Missing
Clear all results
Generate Pairings

The Result Desk itself must have NO vertical scrollbar.

The only scrolling surface in the Pairings working area should be the
BOARD TABLE / board list.

Required concept:

Pairings workspace
┌──────────────────────────────┬─────────────────────┐
│                              │ RESULT DESK         │
│ Board table                  │                     │
│                              │ [1-0] [1/2] [0-1]   │
│ ↑                            │ Administrative      │
│ │ THIS AREA SCROLLS          │ Swap Colors         │
│ ↓                            │ Clear               │
│                              │ Generate Pairings   │
│                              │                     │
└──────────────────────────────┴─────────────────────┘

The Result Desk must remain fixed even on narrower desktop window sizes.
Do NOT fall back to position:static at approximately 900 px width.

Generate Pairings must always remain visible with the Result Desk.

Keep the board-table column header sticky if possible.

Do not modify pairing-generation logic.

==================================================
4. PAIRINGS ACTION TOOLBAR
==================================================

The Pairings action toolbar should remain available while scrolling within
the Pairings page.

Keep actions such as the Chess-Results publish/action button visible.

Do NOT remove or hide Chess-Results controls in Pairings.

This is only presentation/sticky behavior; do not change the
Chess-Results protocol.

==================================================
5. FAST TAB NAVIGATION
==================================================

The current UI feels slow because normal tab navigation can perform a full
tournament serialization/save even when nothing has changed.

Implement a safe fast path.

Pseudo logic:

if tournament has NO unsaved changes
and navigation is between normal working tabs
and previous tab is not a special DGT leave case:

    switch page
    perform required UI tab activation/rendering
    DO NOT perform redundant full saveAll()/full serialization merely
    because the active tab changed

else:
    use the existing protected save/navigation path

CRITICAL:

Real edits MUST still be saved.

If stateDirty / equivalent dirty state is true:
- keep the existing saveAll()
- keep the existing saveData()/persistence path
- do not skip any tournament state persistence

A navigation optimization must NEVER cause loss of user data.

DGT enter/leave handling must remain intact.

==================================================
6. CANCEL OBSOLETE VIEW-ONLY WORK
==================================================

Rapid tab switching currently allows delayed rendering from an old tab to
continue after the user has moved somewhere else.

This causes fragmented/redrawing behavior.

Guard ONLY view-rendering work.

Examples of safe VIEW work that may be skipped when its page is no longer
active:

Pairings:
- populatePairingsRoundMenu
- renderLivePairings
- loadPairingEngineSettings
- renderNextRoundPlayerManager
- updateGacruxPanel UI rendering

Standings:
- renderSpecialPrizeSettings
- refreshFinalStandings VIEW rendering
- renderSpecialPrizeResults

Chess-Results:
- refreshChessResultsXmlUi VIEW rendering

Rule:

if scheduled VIEW rendering belongs to page X
and page X is no longer active:
    discard that obsolete rendering task

IMPORTANT:
Do NOT skip:
- pairing calculations
- tournament state mutations
- saves
- cloud synchronization
- Chess-Results upload operations
- TRF generation
- Gacrux execution
- BBP checker execution
- Tie-Break calculations

Only stale VIEW rendering may be discarded.

==================================================
7. REDUCE UI REPAINT COST
==================================================

Make the Windows UI more immediate.

For the main application workspace:

- remove unnecessary transition animations
- avoid expensive blur/backdrop-filter effects
- reduce unnecessary shadows
- avoid repeated whole-page layout changes
- use stable scroll containers
- use scrollbar-gutter: stable where appropriate
- use contain: layout/paint carefully on isolated panels/tables
- do not use smooth scrolling for working tables
- avoid rebuilding unrelated UI when a table scrolls

Do NOT visually redesign Chess-Publisher.
Keep the current professional design.

The objective is:
same design + same functionality + much faster response.

==================================================
8. DO NOT KEEP THE TEST HARNESS IN PRODUCTION
==================================================

The Windows Fluidity Test v2 had an F8 ON/OFF A/B test panel.

That panel is for testing only.

For the real Windows Desktop version:
- Fluidity v2 becomes the normal behavior
- do not show the bottom-right test panel
- do not expose F8 Fluidity ON/OFF in production

A hidden developer diagnostic flag is acceptable if useful.

==================================================
9. REGRESSION TESTS
==================================================

Add deterministic tests.

Required tests:

A. Navigation stress test
Perform at least 100 clean switches:

Setup
→ Players
→ Pairings
→ Standings
→ Export
→ Schedule
→ Chess-Results
→ repeat

EXPECT:
- exactly one active page
- no UI freeze
- no unnecessary full tournament serialization on clean navigation
- no data loss

B. Dirty navigation

Edit tournament data.
Switch tab.

EXPECT:
- protected saveAll/persistence path runs
- changed value survives reload

C. Result Desk

Create enough boards to require scrolling.

EXPECT:
- board table scrolls
- Result Desk does not scroll
- result buttons remain fixed
- Generate Pairings remains visible

D. Chess-Results navigation

EXPECT:
- Chess-Results tab visible at 1366x768
- visible at 1920x1080
- accessible normally
- Pairings Chess-Results action still visible

E. Stale rendering

Rapidly switch Pairings → Standings before delayed Pairings rendering fires.

EXPECT:
- obsolete Pairings VIEW render is discarded
- Standings remains responsive
- no tournament data is changed by this optimization

==================================================
10. FULL PROTECTED REGRESSION GATE
==================================================

Before giving me a new Windows build, require:

Windows build/compile PASS
UI fluidity stress PASS
100-tab-switch test PASS
dirty-save regression PASS
fixed Result Desk PASS
Chess-Results tab visibility PASS
Chess-Results existing functionality PASS
Desktop ↔ Web Cloud synchronization PASS
83-player roster parity PASS
Starting List export PASS
Pairings TXT export PASS
TRF16 PASS
TRF26 PASS
Gacrux 1.9.57 PASS / untouched
Swiss pairing PASS / untouched
BBP checker PASS / untouched
Tie-Break PASS / untouched

Do NOT declare FINAL/RELEASE merely because the UI looks faster.

Give me a TEST CANDIDATE first.

==================================================
11. GIT
==================================================

Commit and push every completed fix automatically.

Do not overwrite concurrent commits.
Always work from the newest branch HEAD.
Use normal fast-forward commits; no force push.

At the end report:

- exact version
- exact Git commit SHA
- files changed
- protected files/core verified untouched
- exact tests and PASS/FAIL status
- Windows test build download/package
- SHA256 of the package

Do not silently remove any existing functionality while doing the
fluidity work.
