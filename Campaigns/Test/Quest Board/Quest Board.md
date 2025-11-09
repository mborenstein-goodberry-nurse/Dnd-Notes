---
type: Quest Board
world:
campaign: Test
date: 11-08-2025
banner: z_Assets/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
![[Campaigns/Test/Quest Board/Test Setup Quest]]

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
### Active
```dataview
TABLE summary as "Summary" from "Campaigns/Test/Quest Board"
where contains(type,"Quest") AND contains(status, "active")
where file.name != "Quest Board"
```

### Completed
```dataview
TABLE summary as "Summary" from "Campaigns/Test/Quest Board"
where contains(type,"Quest") AND contains(status, "completed")
where file.name != "Quest Board"
```

