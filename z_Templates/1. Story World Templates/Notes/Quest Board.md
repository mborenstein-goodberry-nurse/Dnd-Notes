---
type: Quest Board
world:
campaign: <% tp.user.getThisWorld(tp) %>
date: <% tp.date.now("MM-DD-YYYY") %>
banner: z_Assets/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
![[<% tp.file.folder(true) %>/<% tp.user.getThisWorld(tp) %> Setup Quest]]

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
### Active
```dataview
TABLE summary as "Summary" from "Campaigns/<% tp.user.getThisWorld(tp) %>/Quest Board"
where contains(type,"Quest") AND contains(status, "Active")
where file.name != "Quest Board"
```

### Completed
```dataview
TABLE summary as "Summary" from "Campaigns/<% tp.user.getThisWorld(tp) %>/Quest Board"
where contains(type,"Quest") AND contains(status, "Completed")
where file.name != "Quest Board"
```

