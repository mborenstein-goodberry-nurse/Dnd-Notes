---
type: Quest Board
date: 12-01-2025
campaign: Sands of Desolation
world: WIley's World
banner: z_Assets/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
![[Sands of Desolation Setup Quest]]

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
### Active
```dataview
TABLE summary as "Summary" from "Campaigns/Sands of Desolation/Quest Board"
where contains(type,"Quest") AND contains(status, "Active")
where file.name != "Quest Board"
```

### Completed
```dataview
TABLE summary as "Summary" from "Campaigns/Sands of Desolation/Quest Board"
where contains(type,"Quest") AND contains(status, "Completed")
where file.name != "Quest Board"
```

