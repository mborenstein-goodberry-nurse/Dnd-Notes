---
type: Quest Board
date: 11-29-2025
campaign: Adamarte and Adventurers
world: Lily's World
banner: z_Assets/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
![[Campaigns/Adamarte and Adventurers/Quest Board/Adamarte and Adventurers Setup Quest]]

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
### Active
```dataview
TABLE summary as "Summary" from "Campaigns/Adamarte and Adventurers/Quest Board"
where contains(type,"Quest") AND contains(status, "Active")
where file.name != "Quest Board"
```

### Completed
```dataview
TABLE summary as "Summary" from "Campaigns/Adamarte and Adventurers/Quest Board"
where contains(type,"Quest") AND contains(status, "Completed")
where file.name != "Quest Board"
```

