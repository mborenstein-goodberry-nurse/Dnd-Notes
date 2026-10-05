---
type: Creature
subtype: Creature
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
summary:
status:
tags:
---

![<% tp.file.title %>|200x140](<% tp.file.title %>.png)

```statblock  
creature: <% tp.file.title %>
dice: false
```

