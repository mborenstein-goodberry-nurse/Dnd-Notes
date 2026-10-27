---
type: Group
subtype: Criminal
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
status:
summary:
attitude: Indifferent
alignment: Unaligned
tags:
---

# [[<% tp.file.title %>]]
*`=this.summary`*

### Overview 
![Placeholder Iconography|200x140](ImagePlaceholder.png)

**Status**: `INPUT[text:status]`
**Attitude**: `INPUT[inlineSelect(option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
**Alignment**: `INPUT[inlineSelect(option(Chaotic Evil), option(Chaotic Good), option(Chaotic Neutral), option(Lawful Evil), option(Lawful Good), option(Lawful Neutral), option(Neutral), option(Neutral Evil), option(Neutral Good), option(Unaligned)):alignment]`
**Summary**: `INPUT[text:summary]`

### Crimes


### Access/Entry


### Involved Persons

#### Relationships


### Additional Details 
