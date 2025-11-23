---
type: Quest Board
world:
campaign: Campaign
status:
summary:
date: 2025-11-07
banner: z_Assets/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
![[New Quest]]

### Active
```dataview
TABLE summary as "Summary" from "Campaigns/Campaign/Quest Board"
where contains(type,"Quest") AND contains(status, "active")
where file.name != "Quest Board"
```

### Completed
```dataview
TABLE summary as "Summary" from "Campaigns/Campaign/Quest Board"
where contains(type,"Quest") AND contains(status, "completed")
where file.name != "Quest Board"
```

