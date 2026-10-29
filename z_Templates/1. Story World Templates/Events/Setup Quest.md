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

Your campaign is ready! Complete the remaining preparations before beginning your adventure.

*`=this.summary`*

### Progression
- [ ] Create and configure the campaign calendar in Calendarium.
- [ ] Create your character.
    - [ ] Add your character to **The Party**.
    - [ ] Fill in their character details and portrait.
- [ ] Add any existing world information relevant to the campaign.
    - [ ] Link relevant NPCs, places, organizations, and maps to the campaign.
- [ ] Add any custom rules or homebrew material, if applicable.
- [ ] Begin your adventure!

---

**Completed:** `INPUT[toggle(offValue(Active), onValue(Completed)):status]`
