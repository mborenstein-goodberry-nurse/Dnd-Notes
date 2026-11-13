# The Campaign Dashboard

**Category:** Core functionality  
**Audience:** Someone who has created or joined a campaign  
**Where to find it:** `Campaigns/<Campaign>/<Campaign>.md`  
**Source check:** Development vault Campaign template, QuickAdd configuration, creation scripts and note templates (November 10, 2026 snapshot)  
**Verification:** Source-reviewed; exact prompts, appearance and refresh behavior should still be tested in Obsidian

> [!tip] The archivist's desk
> The Campaign Dashboard is the place to begin most campaign work. The buttons do not summon the notes into existence from thin air. They consult several small pieces of machinery, which are best left to their mysterious but generally reliable business.

## What is the dashboard?

Open [[Campaigns/Campaign Index|Campaign Index]] and select your campaign. The campaign note is both a **control panel** and a **living overview** of what you've recorded. Use its buttons to create notes; use its linked headings and tables to revisit existing records.

Two kinds of information are intentionally kept separate:

| Campaign-specific information | Shared world information |
|---|---|
| Journals, party members, quests, mysteries, campaign references and miscellaneous notes | Non-player characters, places, maps and organizations |
| Stored in `Campaigns/<Campaign>/` | Stored in `Worlds/<World>/` |

You can run multiple campaigns in the same world without duplicating every town or recurring character. A world note appears on a campaign's dashboard when its properties associate it with that campaign.

**Before using a creation button:** Open the intended **campaign dashboard** as the active note. Creation commands use the active file to identify the campaign and/or world. Some buttons also appear in other sections, but starting from the dashboard is the safest default.

## The eight main controls

The dashboard's **Controls** panel contains these buttons:

| Button | Creates | Location |
|---|---|---|
| **New Session** | A dated Session Journal | `Campaigns/<Campaign>/Session Journal/` |
| **New Person** | A non-player character (NPC) | `Worlds/<World>/People/` |
| **New Place** | A place or location | `Worlds/<World>/Places/` |
| **New Quest** | A campaign quest | `Campaigns/<Campaign>/Quest Board/` |
| **New Mystery** | A campaign mystery | `Campaigns/<Campaign>/Mysteries/` |
| **New Map** | A world map note | `Worlds/<World>/Maps/` |
| **New Organization** | An organization or faction | `Worlds/<World>/Organizations/` |
| **New Note** | A general campaign note | `Campaigns/<Campaign>/Other/` |

The buttons in individual dashboard sections may repeat the same action, so there is no special distinction between **New Mystery** in Controls and **New Mystery** beside the Mysteries list.

### New Session

**Use when:** You are about to record a normal play session.

1. Confirm the campaign's Calendarium calendar exists and its **current in-game date** is correct. Its name must exactly match the campaign's name.
2. Open the campaign dashboard and select **New Session**.
3. The macro creates a Session Journal and the template numbers it using the highest existing `sessionNum` plus one.
4. The new journal opens for editing. Use its **Log**, overview and **Questions & Mysteries** sections as play proceeds.

**Expected result:** A note named `Session <number>.md` under that campaign's `Session Journal` folder. `Session 0` is the pre-campaign synopsis, created separately when the campaign is first made. New ordinary sessions begin at 1.

**Important:** The in-game date is captured when the note is created; later calendar changes do not automatically rewrite it. If creation fails because the calendar/date is missing, inspect the folder for any partial note before trying again.

**Learn more:** [[z_Documentation/05 - Your First Session|Your First Session]].

### New Person

**Use when:** You need a record for a new non-player character.

1. Select **New Person** from the campaign dashboard.
2. Enter the NPC's name when prompted.
3. The created note opens in `Worlds/<World>/People/`.
4. Add a concise summary and any known details, such as attitude, status, last known location, portrait, relationships or affiliations.

**Expected result:** An NPC note identified as `type: Creature` and `subtype: NPC`, initially associated with the current campaign through its `campaigns` property. Its world record can later be associated with another campaign.

**Visibility rule:** Being in the correct `People` folder is not enough to appear in a particular campaign's **Other Characters** list: its `campaigns` property must include that campaign's exact name.

**Avoid:** Creating a second NPC note for the same person just because that NPC appears in another campaign set in the same world.

### New Place

**Use when:** The party learns about a settlement, region, landmark or other location.

1. Select **New Place** and enter its name.
2. The note is created in `Worlds/<World>/Places/` and linked to the current campaign in its `campaigns` property.
3. Fill in the summary, type of place and other established details. Where relevant, link a **Parent Location** so locations can be nested geographically.
4. Add a map and marker type when available; those fields can be completed later.

**Expected result:** A world-level Place note that can appear in the dashboard's **Places** list. The list uses parent-location relationships to display geographic nesting.

**Useful variation:** When creating a Place from an existing **Map note**, the creation script can automatically set that map as its primary map. From the campaign dashboard, the map field starts empty.

### New Quest

**Use when:** The party receives or begins pursuing a concrete objective.

1. Select **New Quest**; supply a name when the note-creation dialog asks for it.
2. Enter the quest's short **headline/summary** if prompted by the configured creation sequence.
3. Open the Quest note and set its **Priority**, mission type and relevant people, places or other relationships.
4. Update its status when the objective changes or is completed.

**Expected result:** A Quest note in `Campaigns/<Campaign>/Quest Board/`, initially **Active** with default priority **5 (Neutral)** and an automatically assigned quest number.

**How the Main Quest is chosen:** The dashboard uses the **active** quest with the lowest numeric `priority`, then lowest `questNum`. This is why the generated **Setup Quest**, with priority 0 and quest number 0, initially appears as Main Quest. Completing it removes it from active selection; it should not be manually excluded.

**Remember:** A Quest represents something the party is trying to accomplish. A Mystery represents an unanswered question. They can be linked, but are not interchangeable.

### New Mystery

**Use when:** There is an important unresolved question worth tracking across sessions.

1. Select **New Mystery** and enter a short, specific name.
2. When prompted, state the question the Mystery is intended to answer.
3. Add what the characters know, related people/places, and a link to the first relevant Session Journal when possible.
4. Record further discoveries as play continues, and change its status when the question is answered.

**Expected result:** A Mystery note in `Campaigns/<Campaign>/Mysteries/`, initially **Unresolved**. Its template offers **Unresolved**, **Partially Answered**, and **Resolved** status choices.

**Dashboard behavior:** The dashboard shows at most **10 unresolved or partially answered mysteries**, prioritizing recently referenced sessions. The **Mysteries** heading links to the fuller Mystery Viewer. A Mystery missing from the short list may simply fall outside that limit, have a resolved status, or have incorrect campaign metadata.

**Recommended practice:** Record an open question without promoting an unconfirmed theory into an answer.

### New Map

**Use when:** You want an interactive map for a location or region in the world.

1. Select **New Map** and enter a map name.
2. The note is created in `Worlds/<World>/Maps/`, initially using a placeholder image.
3. Open the **Map Setup** callout within the new note, select the appropriate image, enter map dimensions and distance scale, and choose marker behavior.
4. Use **Apply Map Settings** in the map note to update its Leaflet block from the selected settings.

**Expected result:** A world-level Map note associated with the current campaign, which can appear in the dashboard's **Maps** list. Maps initially use a template image; creating the note does **not** automatically turn a real map image into a calibrated interactive map.

**Marker discovery:** The Map Setup control supports assigned places, all world places, or manual markers. We'll document calibration and marker setup in a dedicated map chapter.

### New Organization

**Use when:** You need a record for a guild, government, faith, faction, company or other organized group.

1. Select **New Organization** and provide a name.
2. The note opens in `Worlds/<World>/Organizations/`.
3. Set its type, summary, status, attitude and any known parent organization, headquarters or leader.
4. Link members and relevant places as they become known.

**Expected result:** A world-level Organization note with the current campaign in its `campaigns` list. The dashboard can show parent organizations and their subordinate groups in an indented structure.

### New Note

**Use when:** Something belongs to the campaign but is not better represented by a dedicated Person, Place, Quest, Mystery, Organization or Map note.

1. Select **New Note**.
2. Provide its name when prompted by note creation.
3. The note opens in `Campaigns/<Campaign>/Other/` with basic campaign/world metadata and an editable summary.

**Expected result:** A general-purpose campaign note. It does not automatically join a specialized tracker merely because it is stored in `Other/`.

## Other controls and useful links

### New Party Member

The **People → The Party** section has a separate **New Party Member** button. This is not the same as **New Person**.

1. With the campaign dashboard open, select **New Party Member**.
2. Supply the **Character Name** and **Player Name**, then confirm a **Character Level**. The level prompt suggests the highest existing party level or **1** for an empty party.
3. The new PC note appears in `Campaigns/<Campaign>/The Party/`.
4. Edit its race, class, history, relationships and current status as they become known.

**Expected result:** A party note (`type: Creature`, `subtype: PC`) in the campaign rather than the world's NPC directory.

The Party table orders characters by status: **Active → Unknown → Missing → Departed → Retired → Presumed Dead → Dead**, alphabetically within each group. Statuses outside these values appear after the standard statuses, making them easier to spot and normalize.

### Character Reference

Under **People → Character Reference**, use **My Character Reference** to open the campaign's personal quick-reference note. This is designed for a character's abilities, important spells or powers, convictions, bonds and open questions—not the complete character sheet or universal combat rules.

A blank reference is created when the campaign is created. A separate QuickAdd command, **Macro - New Character Reference**, can make additional named references in the campaign without overwriting an existing one. That command is not one of the eight main dashboard buttons.

**Note:** The dashboard link initially targets the generic `Character Reference` filename. The Setup Quest recommends renaming that note after choosing a character; confirm that your link remains valid after any rename. Obsidian's automatic internal-link updating can help when enabled.

## Reading the dashboard

The sections beneath Controls are automatically generated from your notes and metadata:

| Dashboard section | What it displays | Where to go for more |
|---|---|---|
| **Quest Board** | One Main Quest plus other active quests | Click its heading to open the full Quest Board, including completed quests |
| **Mysteries** | Up to 10 unresolved or partially answered questions | Click its heading to open the full Mystery Viewer |
| **Journals** | The 10 most recent Session Journals, newest session number first | Click **Journals** to open the complete Session Journal viewer |
| **The Party** | PCs of this campaign, grouped by status | Open each party member's note |
| **Other Characters** | NPCs associated with this campaign, most recently referenced appearance first | Open the NPC note; `statusAsOf` provides the reference used for sorting |
| **Organizations** | Associated organizations with parent/child hierarchy | Open an organization note |
| **Maps** | Maps for the campaign's world that are associated with the campaign | Open the map note |
| **Places** | Associated places organized by parent location | Open a Place note |

**Why some lists are short:** Journals and Mysteries deliberately show concise dashboard previews. A note missing from those previews is not necessarily missing from the vault. Open the corresponding viewer before investigating.

**Why some lists are empty:** World records are associated with campaigns through properties. If a world-level NPC, Place or Organization should appear but does not, confirm its `world`, `type` and `campaigns` fields before changing any scripts. A Map uses its campaign association similarly.

## A short practice run

After creating your first campaign and configuring its calendar:

1. Create a practice NPC with **New Person** and add a brief summary.
2. Create a relevant **Place** and associate the NPC's location with it.
3. Create a **Mystery** that involves the NPC and link both notes as appropriate.
4. Return to the dashboard and confirm those records appear in the expected sections.
5. Open the Quest Board, Mystery Viewer and Session Journal viewer to learn the difference between a quick dashboard preview and a full listing.

If this is a campaign you intend to use, choose real starting information. Otherwise, perform the exercise in a disposable test campaign rather than creating meaningless records in your main world.

## If a button or list misbehaves

| Symptom | Start here |
|---|---|
| A creation button fails or saves in the wrong campaign | Open the correct Campaign Dashboard as the active note and try again **only after checking whether a file was already created** |
| The NPC/Place/Organization/Map doesn't appear in the dashboard | Check its `type`, `world` and association with the current campaign; then reload the dashboard |
| A Quest doesn't appear as Main Quest | Check that it is Active and its numeric priority/quest number relative to other active quests |
| The latest session does not appear | Check `type: Session Journal`, `sessionNum` and the correct campaign folder; then reload the dashboard |
| **New Session cannot be created because its calendar is missing** | Check for a partial `New Session` note. In **Settings → Calendarium**, create a calendar named exactly after the campaign (or correct its name), set its current date, then retry only after checking for duplicates. Newly created campaigns normally receive a starter calendar automatically |
| Mysteries seem to have vanished | Open the full Mystery Viewer; the dashboard shows only the first 10 unresolved/partially answered mysteries |
| Data appears old despite correct note properties | **Reload the affected note first** (reopen it or run **Reload Page**). If still stale, **fully close and reopen Obsidian**. Only then inspect indexing, queries or scripts |
| A button appears as code rather than a button | Check that the Buttons and QuickAdd plugins are available and enabled |

> [!note] A final warning from the records office
> Pressing a creation button repeatedly because the table has not refreshed is an excellent way to create confusing duplicates. Check the file explorer first. The archivists have enough mysteries already.

**Previously:** [[z_Documentation/05 - Your First Session|Your First Session]]  
**Return:** [[z_Documentation/The Archivist's Handbook|The Archivist's Handbook]]
