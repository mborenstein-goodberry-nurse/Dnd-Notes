---
world: Campaign
campaign: Campaign
status: active
role: player
system: D&D 5e
type: Campaign
---
## Controls 
```button
name New Session Journal 
type command
action QuickAdd: Macro - New Session Journal Entry
```
```button
name New Person  
type command
action QuickAdd: Macro - New NPC
```
```button
name New Place  
type command
action QuickAdd: Macro - New Place
```

## Custom Rules 


## Journals
```dataview
TABLE summary as "Summary" from "Campaigns/Campaign/Session Journal"
where contains(type,"session")
sort sessionNum ASC
```

## People

### The Party 


### Others 
```dataview
TABLE from "Campaigns/Sands of Desolation/World Almanac/People"
sort file.name asc
```

# Places 
```dataview
TABLE from "/World Almanac/Places"
sort file.name asc
```
