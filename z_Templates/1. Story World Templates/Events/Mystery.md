---
type: Mystery
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
status: Unresolved
summary:
firstSeen:
lastSeen:
tags:
---

# [[<% tp.file.title %>]]

> [!fas-infobox|right no-title] Mystery Overview
> ## ✧ Mystery Overview ✧
> **Status:** `INPUT[inlineSelect(option(Unresolved), option(Partially Answered), option(Resolved)):status]`
>
> **First Discovered:** `=this.firstSeen`
>
> **Last Discovery:** `=this.lastSeen`
#### The Question 

*`=this.summary`*

#### What We Know


#### Discoveries


#### Related Notes

