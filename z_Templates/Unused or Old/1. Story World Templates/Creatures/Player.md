---
type: Creature
subtype: Player
date: <% tp.date.now("MM-DD-YYYY") %>
Art: "![[ImagePlaceholder.png]]"
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
summary:
status:
aliases: []
tags:
---

# [[<% tp.file.title %>]]
*`=this.summary`*

#### Overview 
![Image Placeholder|200x140](ImagePlaceholder.png)

**Status**: `INPUT[text:status]`
**Aliases**: `INPUT[inlineList:aliases]`
**Attitude**: `INPUT[inlineSelect(option(Mine), option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
**Alignment**: `INPUT[inlineSelect(option(Chaotic Evil), option(Chaotic Good), option(Chaotic Neutral), option(Lawful Evil), option(Lawful Good), option(Lawful Neutral), option(Neutral), option(Neutral Evil), option(Neutral Good), option(Unaligned)):alignment]`
**Summary**: `INPUT[text:summary]`

#### Description


#### Relationships


#### Unique Abilities  


### Inventory 


#### History 


### Additional Details 

