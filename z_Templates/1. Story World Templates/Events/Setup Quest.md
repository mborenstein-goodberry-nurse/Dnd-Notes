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
tags:
---
### [[<% tp.file.title %>]]
*`=this.summary`*

#### Overview 
**Mission Type**: `INPUT[inlineSelect(option(Lore), option(Errand/Shopping), option(Fetch), option(Delivery), option(Infiltration), option(Investigation), option(Survival), option(Setup), option(Other)):subtype]`
**Priority**: `INPUT[inlineSelect(option(0, Setup), option(1, Time-Critical), option(2, Important), option(3, Scheduled), option(4, Side Quest), option(5, Neutral)):priority]`

This is your first quest: to set up the campaign! 

#### Progression
- [ ] Create a Calendar (Title it the Campaign's Title)
- [ ] Create your Character
	- [ ] Create Character in [[Campaign/<% tp.user.getThisCampaign(tp) %>/Da Party|Da Party]]
	- [ ] Link it in [[Campaign/<% tp.user.getThisCampaign(tp) %>/<% tp.user.getThisCampaign(tp) %>|The Campaign]]
- [ ] If there are any custom rules or modules:
	- [ ] Put them in World Almanac/Other
	- [ ] Link them in [[Campaign/<% tp.user.getThisCampaign(tp) %>/<% tp.user.getThisCampaign(tp) %>|The Campaign]] under Custom Rules
- [ ] If there is a map available, create it in Maps
- [ ] Enjoy!

**Completed**: `INPUT[toggle(offValue(Active), onValue(Completed)):status]`

#### Rewards 
A complete experience
