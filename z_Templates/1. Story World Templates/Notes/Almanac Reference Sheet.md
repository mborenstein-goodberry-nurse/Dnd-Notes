---
type: Reference Sheet
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
---
```dataview
TABLE summary as "<% tp.file.title %>" from "Campaigns/<% tp.user.getThisCampaign(tp) %>/World Almanac/<% tp.file.title %>"
where file.name != "<% tp.file.title %>"
sort file.name ASC
```
