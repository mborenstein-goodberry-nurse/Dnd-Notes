# Feature Catalog — Development Framework

**Evidence:** Source code and Obsidian configuration in `Current State.zip`. Configured features are not necessarily verified as running in Obsidian.

## Entry points and dashboards

| Entry point | Source file | Confirmed purpose |
|---|---|---|
| Campaign Index | `Campaigns/Campaign Index.md` | Homepage; Add New Campaign; lists campaigns by status, calculates displayed sessions from highest `sessionNum` |
| Campaign Dashboard | `z_Templates/1. Story World Templates/Notes/Campaign.md` | Controls and consolidated Quest, Mystery, Journal, Party, NPC, Organization, Place and Map sections |
| Quest Board | `z_Templates/1. Story World Templates/Notes/Quest Board.md` | Main Quest, Active and Completed lists |
| Mystery Viewer | `z_Templates/1. Story World Templates/Notes/Mystery Viewer.md` | Dedicated mystery tracker |
| Session Journal Viewer | `z_Templates/1. Story World Templates/Notes/Session Journal Viewer.md` | Efficient, per-campaign session list with summaries and wikilinks |
| Character Reference | `z_Templates/1. Story World Templates/Notes/Character Reference.md` | Campaign-specific PC abilities, spells, bonds and quick-reference information |
| DM Screen | `DM Screen/DM Screen.md` | Static player-side reference for 2014 D&D 5e gameplay |
| Rules library | `The Wanderer's Guide to the Multiverse` | Campaign-independent rules, spells, monsters and reference content |

## Configured creation buttons

| Visible control | QuickAdd macro | Creates / organizes |
|---|---|---|
| **Add New Campaign** (Campaign Index) | `Macro - New Campaign` | Campaign structure, dashboard, Setup Quest, Quest Board, Session Journal Viewer, Mystery Viewer, Session 0, Character Reference |
| **New Session** | `Macro - New Session Journal Entry` | `Campaigns/<Campaign>/Session Journal/` |
| **New Mystery** | `Macro - New Mystery` | `Campaigns/<Campaign>/Mysteries/` |
| **New Person** | `Macro - New NPC` | `Worlds/<World>/People/` |
| **New Map** | `Macro - New Map` | `Worlds/<World>/Maps/` |
| **New Place** | `Macro - New Place` | `Worlds/<World>/Places/` |
| **New Organization** | `Macro - New Organization` | `Worlds/<World>/Organizations/` |
| **New Quest** | `Macro - New Quest` | `Campaigns/<Campaign>/Quest Board/` |
| **New Note** | `Macro - New Note` | `Campaigns/<Campaign>/Other/` |
| **New Party Member** | `Macro - New Party Member` | `Campaigns/<Campaign>/The Party/` |

Other top-level actions include **Reload Page**, **Apply Map Settings** and **New Character Reference** (automatically generic during new campaign creation, or named when manually invoked). Source: `.obsidian/plugins/quickadd/data.json`.

## Script inventory: 26 files

**Campaign/session/helpers:** `getCampaignList.js`, `getThisCampaign.js`, `getThisWorld.js`, `getThisGameFilename.js`, `getThisGameNum.js`, `getLastGameTitle.js`, `getLastGameTitleAlias.js`, `getSessionDate.js`, `getThisDate.js`, `prepareNewCampaign.js`, `createWorldSessionbtn.js`, `reloadView.js`, `collapseAndReveal.js`.

**Note creation/relationships:** `createPeopleFolder.js`, `createPlaceFolder.js`, `createOrganizationFolder.js`, `createMapFolder.js`, `createMysteriesFolder.js`, `prepareMystery.js`, `prepareNewPartyMember.js`, `createCharacterReference.js`, `getThisQuestNum.js`, `completeQuest.js`.

**Map/asset helpers:** `getCampaignBanner.js`, `applyMapSettings.js`.

**Important:** Some files only prepare variables for QuickAdd, some are Templater helpers and others may be legacy. Do not assume every script has a user-visible button.

## Template inventory: 35 Markdown files

**Story World:** NPC, Party Member, Creature, New Creature, Mystery, Quest, Setup Quest, Organization, Campaign, Character Reference, Mystery Viewer, Note Frontmatter, Quest Board, Session 0 Journal, Session Journal Viewer, Session Journal, Item, Map, Old Place, Place, Vehicle.

**Mechanics:** Feat, Spell, Spell (Paste Template), Creature, Disease, Hazard, Poison, Trap, General Equipment Article, Mundane Armor/Shield, Mundane Item, Mundane Weapon, Vehicle.

**Other:** `Mondster.md`. Determine which older/alternative templates are actively supported before writing end-user instructions.

## Technical behavior worth explaining carefully

- **Campaign Index ordering:** active → planning → on hold → completed/cancelled; session number reflects the largest valid `sessionNum`, not the number of session notes.
- **Quest hierarchy:** Main Quest is the active quest with the numerically lowest `priority`, with `questNum` as tiebreaker. An active Setup Quest with priority `0`, quest `0` intentionally becomes Main Quest.
- **Session 0:** separate template, generated during new campaign creation; standard sessions use a Calendarium calendar named for the campaign and capture its current date once at creation.
- **Character Reference:** not a replacement campaign index; it is a per-PC reference and can be created in named variants without overwriting others.
- **Places, NPCs and Organizations:** primarily organized under a shared World, with campaign references and as-of status tracking.
- **Mysteries:** dedicated notes with statuses, discoveries, first/last seen, associated entities and journal/quest links. Keep theories separate.
- **Maps:** Leaflet with configured categories Capital, Settlement, Landmark, Region/Nature, Danger and Camp/Outpost; map note settings are managed separately.
- **Banner system:** Templater helper and dedicated CSS snippets; campaign banner inheritance has a default-banner special case.
- **Dataview:** used for indexes, lookup and reverse relationships; a stale display is not necessarily wrong metadata—restart Obsidian first.

## Plugins and settings

**28 enabled plugin IDs** in `.obsidian/community-plugins.json`. Prominent framework dependencies are QuickAdd, Templater, Dataview with JS enabled, Meta Bind, Calendarium, Buttons, Homepage, Leaflet and visual/theme plugins. Full enabled list lives in the cited JSON; a fresh installation guide must distinguish essential dependencies from nice-to-have tools.

**Existing settings:** Homepage `Campaigns/Campaign Index.md`; Templater templates folder `z_Templates`, user scripts folder `z_Scripts`, auto-trigger on file creation; attachments under `z_Assets`; Fancy-a-Story theme and custom CSS snippets.

**Hotkeys from config:** `F3` insert template, `Mod+R` reload page macro, `Mod+Shift+P` pin/unpin, `Alt+Mod+B` backlinks, `Alt+Mod+M` maximize pane, `Ctrl+Tab` / `Ctrl+Shift+Tab` switch tabs. `Mod` generally means Control on Windows; verify machine-specific conflicts.

Return to [[z_Documentation/The Archivist's Handbook|Handbook]].
