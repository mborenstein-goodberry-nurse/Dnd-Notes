---
type: Quest
subtype: Other
priority: 3
questNum: 1
date: 10-20-2026
campaign: Test World
world: Test World
fc-calendar: Test World
fc-date:
  year: 0
  month: 0
  day: 0
pixel-banner-flag-color: blue
fc-category: Quests
status: Active
summary: Example of the Quest Type
tags:
---
### [[Example Quest]]
*`=this.summary`*

#### Overview 
**Mission Type**: `INPUT[inlineSelect(option(Lore), option(Errand/Shopping), option(Fetch), option(Delivery), option(Infiltration), option(Investigation), option(Survival), option(Other)):subtype]`
**Priority**: `INPUT[inlineSelect(option(1, Time-Critical), option(2, Important), option(3, Scheduled), option(4, Side Quest), option(5, Neutral)):priority]`

Details 

#### Progression
- [ ] Task

**Completed**: `INPUT[toggle(offValue(Active), onValue(Completed)):status]`

#### Rewards 
- Money 
