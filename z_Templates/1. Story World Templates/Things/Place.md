---
type: Group
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
tags:
---
# [[<% tp.file.title %>]]
*`=this.summary`*

#### Overview 
![Placeholder Iconography|200x140](ImagePlaceholder.png)

**Status**: `INPUT[text:status]`
**Size**: `INPUT[inlineSelect(option(House), option(Shop), option(Manor/Castle), option(Camp/Outpost), option(Small Village), option(Large Village), option(Small Town), option(Large Town), option(City), option(Large City), option(City-State), option(Sub-Kingdom), option(Kingdom), option(Continent)):size]`
**Attitude**: `INPUT[inlineSelect(option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
**Summary**: `INPUT[text:summary]`

#### Description


#### Relationships


### Additional Details 
