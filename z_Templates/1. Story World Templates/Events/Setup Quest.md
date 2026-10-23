---
type: Quest
subtype: Setup
priority: 0
questNum: 0
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
fc-calendar: <% tp.user.getThisWorld(tp) %>
fc-date:
  year: <% tp.user.getThisDate(tp)[0] %>
  month: <% tp.user.getThisDate(tp)[1] %>
  day: <% tp.user.getThisDate(tp)[2] %>
pixel-banner-flag-color: blue
fc-category: Quests
status: Active
summary: Set up the campaign, character, calendar, and supporting notes.
questGiver:
assigned:
tags:
---
### [[<% tp.file.title %>]]

> [!fas-infobox|right no-title] Quest Overview
> ## ✧ Quest Overview ✧
>
> *`=this.summary`*
>
> > [!blank]
> > **Completed:** `INPUT[toggle(offValue(Active), onValue(Completed)):status]`
> >
> > **Mission Type:** `INPUT[inlineSelect(option(Lore), option(Errand/Shopping), option(Fetch), option(Delivery), option(Infiltration), option(Investigation), option(Survival), option(Setup), option(Other)):subtype]`
> 

#### Overview
This is your first quest: to set up the campaign!

#### Progression
- [ ] Create a Calendar (title it the campaign's title)
- [ ] Create your Character
    - [ ] Create Character in [[Campaigns/<% tp.user.getThisCampaign(tp) %>/The Party|The Party]]
    - [ ] Link it in [[Campaigns/<% tp.user.getThisCampaign(tp) %>/<% tp.user.getThisCampaign(tp) %>|The Campaign]]
- [ ] If there are any custom rules or modules:
    - [ ] Put them in World Almanac/Other
    - [ ] Link them in [[Campaigns/<% tp.user.getThisCampaign(tp) %>/<% tp.user.getThisCampaign(tp) %>|The Campaign]] under Custom Rules
- [ ] If there is a map available, create it in Maps
- [ ] Enjoy!

#### Developments

#### Rewards
A complete experience

#### Additional Details
