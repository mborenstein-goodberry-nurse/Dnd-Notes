---
type: Quest
subtype: Setup
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
questNum: 0
priority: 0
status: Active
missionType: Setup
summary: Set up the campaign, character, calendar, and supporting notes.
---

### [[<% tp.file.title %>]]

*`=this.summary`*

> [!info] Campaign preparation
> The campaign dashboard, folders, Quest Board, Session 0, and a blank Character Reference are created during campaign setup. This quest tracks **what still needs to be reviewed or filled in**, not what the creation macro has already done.
>
> Complete what is known before the first session. Details the DM hasn't revealed can remain open.

### Progression

#### ✧ Campaign & Calendar
- [ ] Review the **Campaign** note: name, world, system, role, and status; choose a custom banner if wanted.
- [ ] Set up the **Calendarium** calendar using **exactly the campaign's name**.
    - [ ] Set or verify the current **in-game date** (not just the month being viewed).
- [ ] Review the generated **Session 0** note. Set its in-game starting date once the calendar is ready, if known.

#### ✧ Your Character
- [ ] Create or finish your PC note under **The Party**: name, race, class/subclass, level, background, and starting circumstances.
- [ ] Complete the generated **Character Reference**.
    - [ ] Rename it to **Character Name - Character Reference** in Obsidian once your PC is named.
    - [ ] Add useful class/subclass/racial features, spells or resources, and links to the full rules in the Wanderer's Guide.
    - [ ] Record roleplay convictions, important bonds, personal goals, and character-specific questions.
- [ ] Add the other known PCs to **The Party**, with players and starting relationships when known.

#### ✧ World & Starting Story
- [ ] Gather only the **known** starting lore: regions, maps, people, organizations, deities, and important places.
    - [ ] Link existing notes in **Worlds** rather than making duplicate worldbuilding notes in the campaign.
    - [ ] Verify any starting portraits, banners, maps, and other linked assets appear correctly.
- [ ] Review the **Quest Board**. Create or confirm the starting objective and any established personal quests.
- [ ] Add dedicated **Mystery** notes for important open questions, if any. Keep speculation and out-of-character hints in separate Theory notes.
- [ ] Link any applicable homebrew or house rules. Put reusable rules in **The Wanderer's Guide to the Multiverse**; keep campaign-specific rulings with the campaign.

#### ✧ Ready for Session 1
- [ ] Finish **Session 0** as a concise synopsis of the facts, character backgrounds, and circumstances leading into play—not a speculative recap.
- [ ] Confirm the Session Journal workflow is ready: Calendarium configured, journal creation accessible, and the **DM Screen** / **Character Reference** easy to open.
- [ ] If recording sessions, decide how to capture and export transcripts (TXT/SRT) for post-session processing.
- [ ] Begin the adventure! Once setup is complete, mark this quest **Completed**.

> [!tip] After each session
> Review the transcript and referenced assets, write a neutral session chronicle, update affected people/places/quests/mysteries, and keep theories separate. This is an ongoing **post-session workflow**, not a requirement for finishing campaign setup.

---

**Completed:** `INPUT[toggle(offValue(Active), onValue(Completed)):status]`
