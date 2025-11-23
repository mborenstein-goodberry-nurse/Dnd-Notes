---
type: Magic Item
subtype: Wondrous Item
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
alignment: Unaligned
rarity: Common
summary:
status:
tags:
attunement: false
---

### [[<% tp.file.title %>]]

**Type**: `INPUT[inlineSelect(option(Armor), option(Potion), option(Ring), option(Rod), option(Scroll), option(Staff), option(Wand), option(Weapon), option(Wondrous Item)):subtype]`
**Rarity**: `INPUT[inlineSelect(option(Common), option(Uncommon), option(Rare), option(Very Rare), option(Legendary), option(Artifact)):rarity]`
**Requires Attunement**: `INPUT[toggle():attunement]`
**Status**: `INPUT[text:status]`
**Summary**: `INPUT[text:summary]`

#### Features/Abilities


### Notes
