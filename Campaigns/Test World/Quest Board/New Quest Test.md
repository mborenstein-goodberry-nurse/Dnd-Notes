---
type: Quest
subtype: Other
priority: 5
questNum: 2
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
summary: "Testing the new Quest Template"
questGiver:
assigned:
tags:
---
### [[New Quest Test]]

> [!fas-infobox|right no-title] Quest Overview
> ## ✧ Quest Overview ✧
>
> *`=this.summary`*
>
> > [!blank]
> > **Completed:** `INPUT[toggle(offValue(Active), onValue(Completed)):status]`
> >
> > **Mission Type:** `INPUT[inlineSelect(option(Lore), option(Errand/Shopping), option(Fetch), option(Delivery), option(Infiltration), option(Investigation), option(Survival), option(Other)):subtype]`
> >
> > **Priority:** `INPUT[inlineSelect(option(1, Time-Critical), option(2, Important), option(3, Scheduled), option(4, Side Quest), option(5, Neutral)):priority]`
> 
> > [!todo|brown no-title no-icon]
> > **Quest Giver:** `=this.questGiver`
> >
> > **Assigned:** `=this.assigned`
> >
> > **Quest #:** `=this.questNum`

#### Overview

#### Progression

#### Developments

#### Rewards

#### Additional Details
