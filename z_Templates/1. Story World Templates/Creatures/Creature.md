---
type: Creature
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
summary:
status:
tags:
---
# [[<% tp.file.title %>]]
*`=this.summary`*

## Overview 
![Placeholder Iconography|200x140](ImagePlaceholder.png)

**Status**: `INPUT[text:status]`
**Attitude**: `INPUT[inlineSelect(option(Helpful), option(Friendly), option(Indifferent), option(Unhelpful), option(Hostile)):attitude]`
**Alignment**: `INPUT[inlineSelect(option(Chaotic Evil), option(Chaotic Good), option(Chaotic Neutral), option(Lawful Evil), option(Lawful Good), option(Lawful Neutral), option(Neutral), option(Neutral Evil), option(Neutral Good), option(Unaligned)):alignment]`
**Summary**: `INPUT[text:summary]`

## Sheet
```statblock  
name: string  
size: string  
type: string  
subtype: string  
alignment: Chaotic Chaos  
ac: number  
hp: number  
hit_dice: string  
speed: string  
stats: [number, number, number, number, number, number]  
fage_stats: [number, number, number, number, number, number, number, number, number]  
saves:  
- <ability-score>: number  
skillsaves:  
- <skill-name>: number  
damage_vulnerabilities: string  
damage_resistances: string  
damage_immunities: string  
condition_immunities: string  
senses: string  
languages: string  
cr: number  
spells:  
- <description>  
- <spell level>: <spell-list>  
traits:  
- [<trait-name>, <trait-description>]  
- ...  
actions:  
- [<trait-name>, <trait-description>]  
- ...  
legendary_actions:  
- [<legendary_actions-name>, <legendary_actions-description>] 
- [<legendary_actions-name>, <legendary_actions-description>]  
- ...  
reactions:  
- [<reaction-name>, <reaction-description>]  
- ...  
```
## Notes 

