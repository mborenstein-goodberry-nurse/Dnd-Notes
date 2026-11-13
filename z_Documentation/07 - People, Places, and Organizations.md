# People, Places, and Organizations

**Category:** Core functionality, with recommended recordkeeping practices  
**Audience:** Someone who has used the Campaign Dashboard and wants to build a connected world  
**Where to begin:** Your campaign's dashboard, `Campaigns/<Campaign>/<Campaign>.md`  
**Source check:** Development vault NPC, Party Member, Place, Organization, and Campaign templates; QuickAdd creation scripts (November 10, 2026 snapshot)  
**Verification:** Source-reviewed. The creation and relationship instructions still benefit from a complete live walkthrough in Obsidian.

> [!tip] The archivist's first law of connections
> A town is more useful when its inhabitants can be found. A guild is more useful when its members are known. And a mysterious stranger is considerably easier to investigate when someone remembers where they were last seen.

## What are we connecting?

The vault uses individual notes for **people**, **places**, and **organizations**. Their properties connect those notes and let the dashboard and other notes construct useful lists automatically. You do not need to maintain those lists by hand.

| Record | What it represents | Where it is stored |
|---|---|---|
| **Non-player character (NPC)** | A person or character in the world who is not one of the campaign's player characters | `Worlds/<World>/People/` |
| **Party member (PC)** | A player character belonging to one particular campaign | `Campaigns/<Campaign>/The Party/` |
| **Place** | A region, settlement, building, landmark, or other location | `Worlds/<World>/Places/` |
| **Organization** | A faction, guild, government, faith, company, or other group | `Worlds/<World>/Organizations/` |

The **Worlds** folder holds information that may be useful across several campaigns in the same setting. A town does not become a different town because a second adventuring party visits it. Similarly, an NPC who appears in two campaigns usually needs one world note, not two copies.

The **Party** is different: a PC's note belongs to its particular campaign. The creation buttons account for this distinction.

**Recommended:** Create a record once you have something meaningful to track, even if some details are unknown. Empty fields are preferable to invented information.

## Before you begin: properties and links

A note's **properties** are its structured details, found at the top of the note. The rest of the note holds descriptions, history, and other prose. Some properties also appear as editable dropdowns in the note's overview panel.

There are three kinds of information worth recognizing:

- **Description or summary:** Human-readable information. It helps you remember what matters about the record.
- **Properties such as `world`, `campaigns`, or `status`:** Values the vault uses to organize and display notes.
- **Links to other notes:** Values like `[[Briarford]]`. When placed in the appropriate property, these can build automatic relationship lists.

**The field matters.** Writing “lives in Briarford” in an NPC's description is useful prose, but it does not populate the Place note's **Residents** table. Linking Briarford in the NPC's `home` property does.

For ordinary use, edit properties with Obsidian's Properties interface whenever possible. The more detailed list examples later in this chapter show the underlying format for fields that hold several relationships.

## 1. People: NPCs and party members

### Create a new NPC

1. Open the campaign dashboard in which the NPC is being introduced.
2. Select **New Person**. This creates an **NPC**, not a PC.
3. Enter the NPC's name when prompted.
4. Open the new note in `Worlds/<World>/People/` and write a short `summary` or description.
5. Fill in any details the party has actually established. You can return to the rest later.

The NPC begins with `type: Creature`, `subtype: NPC`, `status: Unknown`, and `attitude: Unknown`. Its `world` and initial `campaigns` association come from the campaign where you created it. A portrait is optional.

The creation script checks for another NPC note with that name in the same world's People folder. Before inventing a different filename for a recurring character, check whether that character already has a note.

### Understand an NPC's important fields

| Property | Meaning | What it affects |
|---|---|---|
| `summary` | Short description or identity reminder | Appears in the NPC overview and applicable dashboard displays |
| `status` | What is currently known about the NPC's condition | Appears on the NPC note and campaign lists |
| `statusAsOf` | A journal reference showing when the recorded status/information was established | Also used by the **Other Characters** dashboard list to order NPCs by session recency |
| `attitude` | The NPC's current disposition toward the party | Shown in the NPC overview |
| `location` | Where the NPC was last known to be | May populate a Place's **Last Known Locations** list |
| `home` | Where the NPC lives or is based | May populate a Place's **Residents** list |
| `origin` | Where the NPC comes from | May populate a Place's **Origins** list |
| `affiliations` | Organizations to which the NPC belongs or is connected | Appears on the NPC and may populate organization membership tables |
| `relations` | Named relationships with other characters | Shows personal relationships and can create reverse references |
| `campaigns` | Campaigns in this world that should list the NPC | Determines which campaign dashboards include the NPC |
| `portrait` | Image associated with the character | Displays an image in the NPC overview when the linked asset resolves |
| `aliases` | Other names or titles | Preserves alternate identities without creating duplicate records |

The NPC status dropdown includes **Unknown, Alive, Undead, Dead, Missing,** and **Presumed Dead**. Its attitude choices are **Unknown, Helpful, Friendly, Indifferent, Mixed, Unhelpful,** and **Hostile**.

**Status is not the same as attitude.** A missing person can still be friendly; a living person can be hostile. If the characters do not know whether someone survived, choose **Unknown**, **Missing**, or **Presumed Dead** as the evidence warrants rather than asserting **Dead** prematurely.

#### How `statusAsOf` works

In this version of the dashboard, NPCs in **Other Characters** are sorted by the session number of the journal linked in `statusAsOf`, newest first. A link to Session 0 sorts above unlinked NPCs; unlinked NPCs sort alphabetically at the bottom.

For example, an NPC whose status or most recently relevant appearance is documented in Session 3 might use a link to that campaign's **Session 3** journal in `statusAsOf`.

**Important:** This field does **not** update itself when you mention the NPC in a journal. Review it when updating the NPC. Its label means “status as of,” so record a journal that actually supports the NPC's documented state, rather than using a later unrelated mention solely to move the NPC higher on the list.

### Create a party member

Party members use a different button and a different note type:

1. Open the campaign dashboard.
2. In **People → The Party**, select **New Party Member**.
3. Provide the **Character Name**, **Player Name**, and **Character Level** when prompted.
4. Open the new note under `Campaigns/<Campaign>/The Party/` and complete its details.

The level prompt offers the highest existing party level as a starting suggestion, or level **1** if the party is empty. It can be changed to the correct positive whole-number level during creation.

A PC starts with `type: Creature`, `subtype: PC`, and `status: Active`. The PC uses a single `campaign` property instead of an NPC's `campaigns` list. It includes player, race, class, level, background, personality, and relationship information.

PCs use this status order on the dashboard: **Active → Unknown → Missing → Departed → Retired → Presumed Dead → Dead**. Names are alphabetized within a status group. Use these standard statuses to keep the display predictable.

**Do not use New Person for a PC**, and do not use New Party Member for an NPC. Their notes have different destinations, metadata, and dashboard behaviors.

## 2. Places: give your world a geography

### Create a new Place

1. Open the campaign dashboard and select **New Place**.
2. Enter the place's name.
3. In the new note, add its description, `locationType`, and any known details.
4. If the place lies within another recorded place, set `parentLocation` to a link to that parent.
5. Add an image, map, or marker type only if appropriate.

A Place is created in `Worlds/<World>/Places/`, initially associated with the campaign that created it. A Place starts with `status: Unknown`, `attitude: Unknown`, and `locationType: Unknown`.

`locationType` describes its scale or nature—for example, **House**, **Shop**, **Small Village**, **City**, **Kingdom**, or **Continent**. **Location Type** and **Status** answer different questions: a ruined castle remains a castle, even if its current status is Ruined.

### Parent locations: the key to geographic nesting

Imagine this fictional world:

```text
Northmarch (Region)
└── Briarford (Town)
    └── Lantern Hall (Building)
```

To create that structure:

1. Create Place notes named **Northmarch**, **Briarford**, and **Lantern Hall**.
2. On Briarford, set `parentLocation` to `[[Northmarch]]`.
3. On Lantern Hall, set `parentLocation` to `[[Briarford]]`.
4. Leave Northmarch's `parentLocation` blank unless it sits within a still-larger recorded area.

The Campaign Dashboard's **Places** section can indent child places beneath parents. A parent's **Notable Locations → Locations Within** section also lists directly linked child places.

**Keep in mind:** The dashboard's hierarchy is built from Places associated with that campaign. If a parent exists in the world but is not associated with the current campaign, the child can still exist and be linked correctly, but may appear as a top-level row in that dashboard's list. Add the parent to the campaign's `campaigns` list if it should appear there too.

Avoid setting a place as its own parent or creating circular chains. Those relationships make a geographic hierarchy difficult to interpret.

### A Place's other important properties

| Property | Use | Visible effect |
|---|---|---|
| `locationType` | Village, town, landmark, region, and so on | Shown in the Place overview and dashboard |
| `parentLocation` | Another Place containing this one | Enables nested places and area-based relationships |
| `map` | The map associated with this Place | Shown on the Place note; may be prefilled when the Place is created from a Map note |
| `mapmarker` | Marker category, such as Settlement, Capital, Landmark, or Danger | Used by the map/marker system |
| `status` | Active, Abandoned, Destroyed, Ruined, Occupied, and similar condition | Shown in the Place overview |
| `attitude` | Disposition of the location or its inhabitants toward the party, when meaningful | Shown in the Place overview |
| `image` | Optional picture of the location | Displays in the Place overview |
| `campaigns` | Which campaigns should display the Place | Controls dashboard inclusion |

A Place's `statusAsOf` can record the journal supporting its current condition. Unlike an NPC's `statusAsOf`, it does not control the Places dashboard's recency order.

### People and organizations appear on Place notes

The **People & Organizations** section can assemble several different views:

| Place-note list | Property to set on another note | Example |
|---|---|---|
| **Last Known Locations** | NPC's `location` | Mira was last seen at `[[Briarford]]` |
| **Residents** | NPC's `home` | Mira lives at `[[Briarford]]` |
| **Origins** | NPC's `origin` | Mira was born in `[[Northmarch]]` |
| **Organizations Based Here** | Organization's `headquarters` | The Lantern Guild is based at `[[Lantern Hall]]` |

These queries can also recognize a **nested** location. For example, when an NPC's `location` is Lantern Hall, Briarford can display that NPC as being **Within Area**, not **Directly Here**.

The automatic people lists currently search **world NPCs**, not campaign PC records. A party member's whereabouts can still be written and linked in their own note, but do not assume they will appear in those NPC-derived Place lists.

**Creating a Place from a Map:** If you use a supported Place-creation control from an existing Map note, the script can fill the new Place's `map` field with that active Map. From a campaign dashboard, the field begins empty. Interactive map setup is a separate procedure.

## 3. Organizations: connect factions and members

### Create an Organization

1. Open the campaign dashboard and select **New Organization**.
2. Enter its name.
3. Add a brief `summary`, choose an `organizationType`, and fill in known status and attitude information.
4. Link its `headquarters` and `leader` to existing notes where possible.
5. If the group belongs to a larger organization, link its `parentOrganization`.

The note is stored in `Worlds/<World>/Organizations/` and initially added to the current campaign's organization list.

The `organizationType` selection includes **Guild, Government, Noble House, Military, Religious, Criminal, Political, Secret Society, Company, Adventuring Party,** and **Other**.

The Organization status choices are **Unknown, Active, Disbanded, Destroyed,** and **Inactive**. Its attitude choices are **Unknown, Friendly, Neutral, Hostile,** and **Complicated**. These are **not** the same choices used for NPCs or Places.

### Leadership, membership, and headquarters

These fields do different jobs:

- **`leader`:** Points to the person who leads the organization. Useful to read directly in the overview, but it does not by itself make that person appear in the Members table.
- **`headquarters`:** Points to the Place where the organization is based. A matching Place note can automatically list the organization under **Organizations Based Here**.
- **`parentOrganization`:** Points to a larger group. Enables **Suborganizations** on the parent and an indented hierarchy on the dashboard.
- **`relations`:** Describes relationships with *other organizations*, such as an alliance or rivalry.

**To populate the Members & Leadership table, add an `affiliations` entry to the person's note.** The organization searches world NPCs and party members of the campaigns associated with that organization. A name written only in its **Members & Leadership** prose is not enough for the automatic member table.

For example, if Mira belongs to the Lantern Guild, record the Lantern Guild in **Mira's `affiliations`**, together with her role and membership status. The organization can then discover her without manually duplicating a roster.

**Campaign association matters here too:** The Organization's automatic member query searches the world's NPCs and the Party folders for its associated campaigns. If a PC's membership isn't appearing, check that the organization's `campaigns` property includes the PC's campaign.

### Parent organizations

Suppose the Lantern Guild is a chapter of the **Wayfarers' Alliance**:

1. Create or locate the Wayfarers' Alliance Organization note.
2. In Lantern Guild, set `parentOrganization` to `[[Wayfarers' Alliance]]`.
3. When both organizations are associated with the campaign, the dashboard can show the Lantern Guild indented beneath its parent.
4. The Wayfarers' Alliance note can list Lantern Guild under **Suborganizations**.

Organization hierarchy is not the same as `relations`. Use `parentOrganization` for a formal parent/child structure; use `relations` for other relationships.

## 4. Putting it all together: one connected example

This walkthrough uses **fictional records**. You can follow it in a practice campaign or apply the same sequence to your actual setting.

### Step A — Create the locations

Create **Briarford** and **Lantern Hall** using **New Place**. On Lantern Hall, set its `parentLocation` to `[[Briarford]]`.

**Expected:** Briarford can list Lantern Hall under **Locations Within**. The dashboard can nest Lantern Hall beneath Briarford.

### Step B — Create the organization

Create **Lantern Guild** using **New Organization**, then set its `headquarters` to `[[Lantern Hall]]`.

**Expected:** The Lantern Hall Place note can show Lantern Guild under **Organizations Based Here**. The Briarford Place note can also recognize that the organization is based **Within Area**.

### Step C — Create the person

Create **Mira Vale** using **New Person**. In Mira's note:

- Write a short `summary`, such as *Courier who knows the northern roads*.
- Set `location` to `[[Lantern Hall]]` if she was last seen there.
- Set `home` to `[[Briarford]]` if she lives in town.
- Add an `affiliations` entry for `[[Lantern Guild]]`, with a role of *Courier*.

**Expected:** Lantern Hall and Briarford can display Mira under the appropriate location views, and Lantern Guild can display Mira in its members table.

### Step D — Verify both directions

Open **Mira Vale**, **Lantern Guild**, **Lantern Hall**, **Briarford**, and your campaign dashboard. The useful test is not simply that their names are linked: each automatically generated table should show the relationship supported by its specific property.

> [!note] If you prefer the Properties editor
> Use the normal Obsidian Properties interface for simple links and single-value properties. The next examples are for fields containing *lists of structured relationships*, which may be easier to edit in Source mode if your Properties editor does not offer a convenient form.

## 5. Relationship lists: the precise format

Some fields contain more than one fact per relationship. They are stored as lists of entries in the note's properties. Use these examples only when you need to edit those lists directly.

### A person's organization affiliations

In an NPC or PC note's properties, an affiliation can look like this:

```yaml
affiliations:
  - organization: "[[Lantern Guild]]"
    status: Active
    certainty: Confirmed
    role: Courier
```

- `organization` should point to the Organization note.
- `status` describes the person's *membership status*, not whether the person is alive.
- `certainty` records how confident you are in the relationship.
- `role` describes the person's position in the organization.

The Organization note reads these entries and constructs its members table. `status`, `certainty`, and `role` are descriptive fields; the provided templates do not require you to use a specific vocabulary for them.

### Personal relationships

In a Person note:

```yaml
relations:
  - person: "[[Tomas Reed]]"
    type: Mentor
    certainty: Confirmed
```

The person's note displays its own **Known Personal Relationships**. A matching person may also show an incoming **Referenced By** entry. You do not have to duplicate every relationship just to make the opposite note aware of the reference, although a genuinely mutual relationship can be documented on both sides when appropriate.

### Relationships between organizations

In an Organization note:

```yaml
relations:
  - organization: "[[Wayfarers' Alliance]]"
    type: Ally
    certainty: Confirmed
```

The Organization note displays **Known Relationships** and can also show organizations that reference it. This is different from a formal `parentOrganization` hierarchy.

### Associate a world record with more than one campaign

A world NPC, Place, or Organization can include multiple campaign names in `campaigns`:

```yaml
campaigns:
  - "The Lantern Road"
  - "Beyond the Vale"
```

Use the actual campaign names exactly as recorded in their Campaign notes. This changes which campaign dashboards show the shared record; it does **not** create separate campaign-specific copies.

**Take care with shared notes:** An edit to the shared NPC, Place, or Organization is visible from every campaign using that record. Put campaign-specific discoveries in the **Campaign History & Knowledge** section and distinguish them clearly. Do not accidentally reveal information learned only in another campaign.

## 6. Keep facts, uncertainties, and history distinct

The templates have room for **Description**, **Campaign History & Knowledge**, and **Additional Details**. NPC, Place, and Organization notes also provide a collapsed **Out-of-Character Knowledge** callout.

Use them for different purposes:

| Information | Where it belongs |
|---|---|
| Established appearance, role, geography, or publicly known facts | Summary, properties, Description, or the appropriate topic section |
| What a particular party learned and when | **Campaign History & Knowledge**, ideally linked to a journal |
| A detail you remember but cannot confidently verify | Clearly marked as uncertain, with its source when available |
| A theory the players are considering | Mark as a theory or track it as a Mystery, not as confirmed metadata |
| Player-only or behind-the-screen knowledge | Collapsed **Out-of-Character Knowledge** section (where available) |

**Recommended:** When a person's status, a location's condition, or an organization's leadership changes, update the appropriate current property and preserve the earlier history in prose. An up-to-date property is useful for lists; a dated narrative preserves *how* it changed.

The note's **Related Quests**, **Related Mysteries**, or relationship tables often appear automatically from links recorded in other notes. Don't assume you must type those headings' contents manually. For instance, placing an NPC link in a Quest's relevant people or quest-giver field can help that NPC's note discover the Quest.

## 7. What will appear automatically?

Here is a quick reference for where to expect results:

| When you set... | Look for... |
|---|---|
| An NPC's `campaigns` | NPC in that campaign's **Other Characters** list |
| A Place's `campaigns` | Place in that campaign's **Places** list |
| An Organization's `campaigns` | Organization in that campaign's **Organizations** list |
| NPC's `location`, `home`, or `origin` | Appropriate **People & Organizations** lists on Place notes |
| Place's `parentLocation` | **Locations Within** on parent Place; nested campaign Places list |
| Organization's `headquarters` | **Organizations Based Here** on Place notes |
| Organization's `parentOrganization` | **Suborganizations** on parent Organization; nested organization list |
| Person's `affiliations` | Organization's **Members & Leadership** table |
| Person's `relations` | Relationship list on that Person; possible reverse **Referenced By** list |
| Organization's `relations` | Relationship and reverse-reference lists on Organization notes |
| NPC's `statusAsOf` | NPC's recorded status reference and dashboard recency order |

Not every list shows every possible record. For example, a dashboard lists world records **associated with that campaign**, while a Place may discover relevant NPCs across its **world**, even if those NPCs aren't associated with the currently open campaign.

Some automatically generated sections remain hidden or empty when no matches exist. That alone is not an error.

## 8. Troubleshooting people, places, and organizations

Start with the simplest checks and avoid changing scripts before checking the record itself.

| Symptom | What to check |
|---|---|
| A newly created NPC, Place, or Organization isn't on the campaign dashboard | Confirm the record is in the correct **world** folder, has the correct `type` (and `subtype` for NPCs), and includes the exact campaign name in `campaigns`. Then reload the dashboard. |
| A PC doesn't appear under **The Party** | Confirm it is under `Campaigns/<Campaign>/The Party/`, with `type: Creature`, `subtype: PC`, and the correct single `campaign` property. |
| A town appears, but not nested beneath its region | Check `parentLocation` points to the correct Place note and that the parent is also associated with this campaign. |
| An NPC is absent from a Place's residents or last-known-location list | Check whether the intended field is `home` or `location`, and whether it links to an existing Place. Those lists read **world NPCs**, not PCs. |
| A guild's member table is empty | Check the person's `affiliations` entry and its `organization` field. A name written only in the guild's prose or `leader` field does not create membership. |
| A guild's PC members are missing | Confirm the organization includes that PC's campaign in its `campaigns` property. |
| An Organization is missing from a Place's list | Check the Organization's `headquarters` is a link to the actual Place (or one of its child Places). |
| NPCs sort unexpectedly in **Other Characters** | Check the journal link in `statusAsOf`. An absent or unresolved session link leaves the NPC among the unreferenced alphabetical entries. |
| A section seems stale even though the properties are correct | **Reload the affected note/page first.** If still stale, fully close and reopen Obsidian. Only after that investigate metadata indexing, link resolution, queries, or scripts. |
| You receive a duplicate-name or incorrect-context creation error | Check the existing world note and confirm that the correct Campaign Dashboard is active before running the creation button again. |

**When in doubt, check the saved property and the file location first.** A visible note title, a link in the prose, and the structured field used by a Dataview query are not interchangeable.

## A short practice checklist

- [ ] Create a Place and give it a parent Place if appropriate.
- [ ] Create an Organization and link its headquarters to the Place.
- [ ] Create an NPC and set their location and home to the appropriate Places.
- [ ] Add the NPC's membership through `affiliations`.
- [ ] Confirm the Place and Organization automatically show the expected relationships.
- [ ] Confirm the NPC, Place, and Organization appear on the intended campaign dashboard.
- [ ] If any table is stale, reload the note before changing its properties or scripts.

> [!note] Concerning the location of important persons
> The records office does not guarantee that a character will remain where the paperwork places them. Adventurers are particularly troublesome in this regard. Update their last known location when the story warrants it.

**Previously:** [[z_Documentation/06 - The Campaign Dashboard|The Campaign Dashboard]]  
**Return:** [[z_Documentation/The Archivist's Handbook|The Archivist's Handbook]]
