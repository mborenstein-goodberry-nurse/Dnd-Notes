---
type: Quest Board
date: 12-02-2025
campaign: The Privy Privateers
world: Andrew's Pirate World
banner: z_Assets/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
![[Campaigns/The Privy Privateers/Quest Board/The Privy Privateers Setup Quest]]

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
### Active
```dataview
TABLE summary as "Summary" from "Campaigns/The Privy Privateers/Quest Board"
where contains(type,"Quest") AND contains(status, "Active")
where file.name != "Quest Board"
```

### Completed
```dataview
TABLE summary as "Summary" from "Campaigns/The Privy Privateers/Quest Board"
where contains(type,"Quest") AND contains(status, "Completed")
where file.name != "Quest Board"
```

