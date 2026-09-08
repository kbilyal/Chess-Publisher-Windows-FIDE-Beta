# Chess-Publisher Desktop — Desktop ↔ Web Cloud synchronization redesign

**Status:** Mandatory queued redesign specification. Do not treat as implemented until its full regression gate passes.

## Protected core — do not modify

Work on the current Desktop version. Do not modify:

- Gacrux 1.9.57
- Swiss Dutch pairing
- TRF16/TRF26 core
- BBP checker
- Tie-Break core
- Chess-Results protocol/core

## Goal

Desktop and Web must use **the same tournament object**, the same `internalId`, the same `cloudTournamentId`, and the same revision history.

## 1. Remove ambiguous Sync

In `Online & Cloud`, do **not** use a generic `Sync` button.

Use exactly these primary buttons:

- **↓ Pull Cloud → Desktop**
- **↑ Push Desktop → Cloud**

Additional buttons:

- **Check Cloud Status**
- **Resolve Conflict** — visible only during a real conflict
- **Open in Web**

`Autosave ON` means **local autosave only**. Autosave must never automatically Pull and must never overwrite Cloud.

## 2. Pull Cloud → Desktop

Pull is **Cloud → Desktop only**. It must never send Desktop data to Cloud.

```text
read active local tournament
identify cloudTournamentId
GET latest Cloud snapshot
compare:
    localFingerprint
    baseFingerprint
    remoteFingerprint

if local == remote:
    update baseRevision/baseFingerprint only
    status = IN_SYNC

if local == base AND remote != base:
    replace portable tournament data with Cloud version
    preserve installation-local data
    save locally
    update baseRevision/baseFingerprint
    status = IN_SYNC

if local != base AND remote == base:
    DO NOT PUSH
    status = LOCAL_CHANGES
    show:
      "Desktop has unpublished changes. Use Push Desktop → Cloud."

if local != base AND remote != base:
    status = CONFLICT
    DO NOT overwrite either side
    show Resolve Conflict
```

After a successful Pull:

`Pulled Cloud revision rXX → Desktop`

## 3. Push Desktop → Cloud

Push is **Desktop → Cloud only**. It must never download the Cloud version and must never perform a hidden merge.

```text
saveAll()
read active tournament
GET Cloud metadata/snapshot
compare local/base/remote fingerprints

if remote == base:
    PUT complete portable snapshot
    use expectedRevision
    receive newRevision
    save baseRevision/new fingerprint locally
    status = IN_SYNC

if remote != base:
    STOP
    DO NOT upload
    status = REMOTE_CHANGES or CONFLICT
    show:
      "Cloud contains newer changes. Pull Cloud → Desktop first."
```

On success:

`Pushed Desktop → Cloud · revision rXX`

## 4. Resolve Conflict

This button is visible only when:

```text
local != base
remote != base
local != remote
```

Use a real three-way merge:

```text
BASE   = snapshot at baseRevision
LOCAL  = current Desktop tournament
REMOTE = current Cloud tournament
```

For each field:

```text
LOCAL == BASE && REMOTE != BASE
    -> take REMOTE

REMOTE == BASE && LOCAL != BASE
    -> take LOCAL

LOCAL == REMOTE
    -> take either

LOCAL != BASE && REMOTE != BASE && LOCAL != REMOTE
    -> FIELD CONFLICT
```

For a field conflict, never choose automatically. Example:

```text
Conflict: Tournament Name

Desktop:
Tournament Ubuntu

Cloud:
Tournament Test

[Keep Desktop] [Keep Cloud]
```

After every conflict is resolved:

**Save merged version locally**

The user must then separately press:

**Push Desktop → Cloud**

`Resolve Conflict` must never silently publish.

## 5. One tournament object

The Cloud snapshot must contain the full portable state.

Synchronize at minimum:

```text
tournament.name

settings.*
  organizer
  chiefArbiter
  arbiter
  director
  venue
  city
  country
  timeControl
  startDate
  endDate
  rounds
  tournamentFormat
  pairingSystem
  fideRated
  tournamentRatingType
  tournamentType
  fideEventId
  website
  email
  phone
  liveLink
  generalNotes
  registration deadline
  scoring/rating settings

regulations.*
schedule.*
players.*
pairings.*
round lifecycle/finalization state
requested byes
attendance
starting numbers
standings-related portable state
specialPrizeConfig
chessResults.*
online/public Hub metadata
```

Especially important: `tournament.name` must exist **inside the tournament object**, not only as:

```text
data.currentTournament
data.tournaments["Tournament Ubuntu"]
```

When loading an older Desktop snapshot:

```js
if (!tournament.name) {
    tournament.name = currentTournamentMapKey;
}
```

When saving:

```js
clean.name = tournament.name;

snapshot.data.currentTournament = tournament.name;
snapshot.data.tournaments[tournament.name] = clean;
```

This prevents Web from showing `New tournament` when Desktop is actually `Tournament Ubuntu`.

## 6. Do not synchronize installation-local data

These values stay on the local computer:

```text
Organizer Token
Hub manageToken
AES/key/IV
local file paths
Windows/Linux installation paths
DGT physical ports
DGT serial/USB mappings
machine/device secrets
temporary UI state
passwords/tokens
```

On Pull:

```js
const installationLocal = preserveLocalFields(local);
const pulled = hydrate(remote);
return restoreLocalFields(pulled, installationLocal);
```

## 7. Tournament identity is never determined by name

The name is editable. True identity is:

```text
internalId
cloudTournamentId
```

Never create a new Cloud tournament because of rename.

Example:

```text
Tournament Ubuntu
↓ rename
Sofia Open 2026
```

It must retain the same:

```text
internalId
cloudTournamentId
revision history
Chess-Results association
Hub association
```

## 8. UI status must be obvious

In `Online & Cloud`, show a large status badge:

```text
✓ In sync

↑ Desktop changes not pushed

↓ Cloud has newer changes

⚠ Conflict — Desktop and Cloud changed

○ Offline
```

Below it:

```text
Desktop revision base: r18
Cloud revision: r19
Last Pull: 16:24
Last Push: 16:31
```

Never show only `Synced` unless the fingerprints have been confirmed equal.

## 9. Desktop Online & Cloud layout

Recommended normal state:

```text
┌───────────────────────────────────────────────┐
│ ONLINE & CLOUD                               │
│ Tournament Ubuntu                           │
│ ✓ In sync · Cloud revision r19              │
│                                               │
│ [ ↓ Pull Cloud → Desktop ]                   │
│ [ ↑ Push Desktop → Cloud ]                   │
│                                               │
│ [ Check Cloud Status ]  [ Open in Web ]      │
│                                               │
│ Last Pull: 16:24                             │
│ Last Push: 16:31                             │
└───────────────────────────────────────────────┘
```

Conflict state:

```text
┌───────────────────────────────────────────────┐
│ ⚠ SYNC CONFLICT                              │
│ Desktop and Cloud both contain changes.      │
│ Nothing has been overwritten.                │
│                                               │
│ [ Resolve Conflict ]                         │
└───────────────────────────────────────────────┘
```

## 10. Prohibited dangerous behavior

Never allow:

```text
Pull -> Push
Push -> Pull
button "Sync" -> arbitrary direction
focus browser -> automatic Pull
startup -> overwrite local with Cloud
local autosave -> automatic Cloud overwrite
conflict -> Last Write Wins
rename -> new cloudTournamentId
```

## 11. Publish workflow

Before Chess-Results or Hub publish:

```text
saveAll()
Check Cloud status

if IN_SYNC:
    publish

if LOCAL_CHANGES:
    Push Desktop → Cloud
    verify fingerprints equal
    publish

if REMOTE_CHANGES:
    STOP
    "Cloud has newer changes. Pull Cloud → Desktop first."

if CONFLICT:
    STOP
    "Resolve synchronization conflict before publishing."
```

Publish must not create hidden Pull/Push operations.

## 12. Players

Desktop and Web must synchronize the same `players[]`.

UI sorting by:

```text
Starting #
Rating ↓
Name A-Z
```

is **view sorting only**.

It must never change:

```text
pairingNumber
id
localKey
starting rank
pairings
```

The real `Resort Starting List` remains a separate official operation.

## 13. Mandatory regression tests

Test fixture:

```text
Desktop:
Name = Tournament Ubuntu
Chief Arbiter = Kyamran Bilyal
City = Sofia
Country = BUL
Time Control = 90+30
Rounds = 7
Mode = Test
83 players

Push Desktop → Cloud
Open Web

EXPECT:
exact same tournament name
exact 83 players
exact officials
exact dates
exact settings
exact regulations
exact schedule
exact tournament mode
same internalId
same cloudTournamentId
```

Non-overlapping change test:

```text
Web changes Venue = Hall B
Desktop changes Organizer = Chess Club

Desktop Pull

EXPECT:
both non-overlapping changes survive
```

Conflict test:

```text
Desktop changes City = Sofia
Web changes City = Plovdiv

EXPECT:
no overwrite
status = CONFLICT
Resolve Conflict required
```

Final gate:

```text
TypeScript PASS
Desktop-Web full snapshot parity PASS
83-player roster parity PASS
Pull-only regression PASS
Push-only regression PASS
conflict regression PASS
Chess-Results regression PASS
TRF16 PASS
TRF26 PASS
Gacrux untouched
Swiss pairing untouched
```

**Do not make a release/final before all of these checks are PASS.**

## 14. Protected Pairings → Result Desk regression state

In **Pairings → Result Desk**, the following behavior is already fixed and must remain protected in all future Desktop, Cloud-sync, UI, packaging, and regression work:

- `Current`, the result actions **1:0 / ½:½ / 0:1**, Administrative, **Swap Colors**, **All boards / Missing**, **Clear all results**, and **Generate Pairings** are fixed in position.
- The right-hand panel must **not** have its own vertical scrollbar.
- The action buttons must **not** move up or down when the board list scrolls.
- Only the **board table on the left** is vertically scrollable.
- Preserve the existing **dev16 fixes** for:
  - blank Print/PDF output;
  - window darkening/dimming when switching between windows.
- Do **not** modify pairing logic, Gacrux integration/core, or TRF logic as part of Result Desk UI work.

### Mandatory regression assertions

Any Desktop UI, Cloud synchronization, layout, or Result Desk change must keep these checks PASS:

```text
Result Desk fixed action controls PASS
Right panel no vertical scrollbar PASS
Buttons remain stationary while board table scrolls PASS
Only left board table scrolls PASS
dev16 Print/PDF regression PASS
dev16 window-dimming regression PASS
Pairing logic untouched PASS
Gacrux untouched PASS
TRF16/TRF26 logic untouched PASS
```

This protected Result Desk state is a release blocker: a regression in any item above blocks release/final.
