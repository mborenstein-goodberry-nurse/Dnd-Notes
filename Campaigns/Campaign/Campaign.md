---
world: Campaign
campaign: Campaign
status: active
role: player
system:
type: world
---
# Controls 
```button
name New Session Journal 
type command
action QuickAdd: Macro - New Session Journal Entry
```
```button
name New Person  
type command
action QuickAdd: Template - New NPC
```
```button
name New Place  
type command
action QuickAdd: Template - New Place
```

# Journals[[001_20251103]]
```dataview
TABLE from "Campaign/Session Journals"
sort file.ctime asc
```

# People
```dataview
TABLE from "Campaigns/Sands of Desolation/World Almanac/People"
sort file.name asc
```

# Places 
```dataview
TABLE from "/World Almanac/Places"
sort file.name asc
```
