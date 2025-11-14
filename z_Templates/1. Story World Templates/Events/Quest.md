---
type: Quest
campaign: <% tp.user.getThisWorld(tp) %>
world:
questNum: <% tp.user.getThisQuestNum(tp) %>
location:
date: <% tp.date.now("MM-DD-YYYY") %>
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
Placeholder

#### Progression
- [ ] Task

**Completed**: `INPUT[toggle(offValue(Active), onValue(Completed)):status]`

#### Rewards 
Money

#### Additional Details 
