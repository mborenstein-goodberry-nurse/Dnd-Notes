# Creating Your First Campaign

**Category:** Core workflow, with recommended setup steps clearly distinguished  
**Audience:** New campaign owners and players  
**Source check:** Development QuickAdd configuration, `prepareNewCampaign.js`, Campaign/Setup Quest/Session 0 templates  
**Verification:** Static source review; the full click-through needs testing in Obsidian

> [!note] Before invoking a little creation magic
> The **Add New Campaign** button creates several folders and notes. Use a new campaign name; it is not intended to update an existing campaign.

## What you need

- The provided vault open in Obsidian.
- The **Campaign Index** and working **QuickAdd** and **Templater** plugins.
- A campaign name and a decision to use an existing world or create a new one.

You do not need to know every character, quest or location yet. Fill in only what is established at the beginning of the campaign.

## Create the campaign

1. Open [[Campaigns/Campaign Index|Campaign Index]].
2. Select **Add New Campaign**.
3. At **New Campaign Name**, enter a name not already present under `Campaigns/`.
4. Select a world from the existing `Worlds/` folders, or choose **+ Create New World** and supply the new world's name.
5. Let the macro complete. It prepares the campaign's directories, creates starter notes and a starter Calendarium calendar (when the plugin is available), and returns you to the new campaign dashboard. Do not press the button again to compensate for slow visual refresh until you've checked whether the notes were created.

**Name restrictions:** The creation script rejects an empty name, `.` or `..`, names ending in a period, and names containing `\\ / : * ? " < > |`. Use simple, descriptive names.

### What the button creates

**For the new campaign:**

```text
Campaigns/<Campaign>/
  <Campaign>.md             (campaign dashboard)
  Character Reference.md   (blank character-focused reference)
  Quest Board/
    <Campaign> Setup Quest.md
    Quest Board.md
  Mysteries/
    Mysteries.md           (mystery viewer)
  Session Journal/
    Session 0.md
    Session Journal.md     (journal viewer)
  The Party/
  Other/
```

**For the selected world, if missing:**

```text
Worlds/<World>/
  People/
  Places/
  Organizations/
  Maps/
```

An existing world's files are reused; the macro creates missing folders rather than duplicating the world. It does not prepopulate every NPC or location.

## Open the Setup Quest

The new campaign dashboard contains a **Main Quest** display. Initially, this should be the automatically created **Setup Quest**. It uses `questNum: 0`, `priority: 0`, and `status: Active`, so it legitimately outranks other active quests until you finish it.

Use its checklist as your guided first-run process. In particular:

1. **Core setup:** Review campaign properties such as name, `world`, `system`, `role` and `status`. The template starts with `status: active`, `role: player`, and `system: D&D 5e`; change them if your campaign differs.
2. **Core requirement for new sessions:** Review the automatically created Calendarium calendar and set its current in-game date. If the calendar was not created, make one named **exactly** the same as your campaign.
3. **Recommended:** Fill in your character and the other known PCs, starting lore, quests and open mysteries.
4. **Recommended:** Turn Session 0 into a concise factual synopsis of what is established before Session 1.
5. Mark the Setup Quest **Completed** after the tasks that apply to your campaign are done. It then stops occupying the Main Quest slot.

## Review the in-game calendar

The creation macro tries to create a **basic editable Calendarium calendar** with the campaign's exact name: seven weekdays, twelve familiar months, normal leap-year rules, and a starting in-game date of **January 1, Year 1**. This date is a placeholder, not a statement about when your campaign begins. If your setting uses different months or years, change the calendar in Calendarium.

1. Open Calendarium and find the calendar named after your campaign.
2. Customize its months and weekdays as needed for the setting, and set its **current in-game date** to the date of the next session.
3. Verify a valid year, month, and day are selected before using **New Session**. Browsing to another visible month does not necessarily change the *current* date.

**If no calendar was created:** Open **Settings → Calendarium**, create a new calendar, and name it **exactly** after the campaign. Set its current date. This may be necessary if the plugin was unavailable, setup failed, or you are updating an older campaign.

**Why this matters:** The ordinary Session Journal template reads Calendarium's *current* date when creating the note. **Session 0** can exist without a matching calendar; normal session creation cannot. The date is recorded once; advancing the calendar later does not rewrite older journals.

## Set up your character reference

The campaign creation macro creates a blank `Character Reference.md` in your campaign folder. The Setup Quest recommends renaming it in Obsidian to `<Character Name> - Character Reference.md` when your character is known. Fill it with useful personal reminders: abilities, reactions, spells and resources, roleplay convictions, bonds and personal questions.

The reference is **not** a replacement for your character sheet or the universal DM Screen. It is a quick-access companion. The framework also has a standalone **New Character Reference** macro, designed for additional named references without overwriting an existing file. We will cover that control in the button-by-button guide.

## Verify your new campaign

- [ ] New campaign appears on the Campaign Index (its session count starts at **0**, because the count uses the highest session number rather than counting Session 0).
- [ ] Its dashboard opens without visibly broken controls.
- [ ] Setup Quest, Quest Board, Mysteries viewer, Session Journal viewer and Session 0 exist.
- [ ] Blank Character Reference exists.
- [ ] Your chosen world has People, Places, Organizations and Maps folders.
- [ ] The generated (or manually created) Calendarium calendar has the correct name and a valid current in-game date **before** you create Session 1.

## If something goes wrong

| Problem | What to check |
|---|---|
| Campaign already exists | Choose a different new name; do not repeatedly run creation on the same path |
| The new campaign is missing from the Index | Reload or reopen the Campaign Index; then check `Campaigns/<Campaign>/<Campaign>.md` and its `type: Campaign`. If still stale, fully restart Obsidian |
| A starter note is missing | Inspect the campaign folder before running any creation macro again; note which file is absent |
| **New Session fails because the calendar is missing** | First inspect `Campaigns/<Campaign>/Session Journal/` for a partial `New Session` note. Then open **Settings → Calendarium**, create a calendar whose name exactly matches the campaign, set its current date, and retry after checking any partial note. This also applies to older campaigns created before automatic calendars were added |
| Current in-game date is invalid | Set the calendar's **current** date (year, month, and day), then try creating a **new** session after inspecting any partial note |
| The Setup Quest remains Main Quest | Check whether its `status` is still Active; while active, it is meant to take priority |

**Next:** [[z_Documentation/05 - Your First Session|Your First Session]].  
**Return:** [[z_Documentation/The Archivist's Handbook|Handbook]]
