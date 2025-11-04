---
world: 
campaign: <% tp.file.folder(false) %>
status: active
role: player
system: D&D 5e
type: Campaign
---
# The Story of <% tp.file.folder(false) %>

## Controls 
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

## Custom Rules 


## Journals
```dataview
TABLE from "Campaigns/<% tp.file.title %>/Session Journals"
sort file.ctime asc
```

## People

### The Party 


### Others 
```dataview
TABLE from "Campaigns/<% tp.file.title %>/World Almanac/People"
sort file.name asc
```

# Places 
```dataview
TABLE from "Campaigns/<% tp.file.title %>/World Almanac/Places"
sort file.name asc
```
