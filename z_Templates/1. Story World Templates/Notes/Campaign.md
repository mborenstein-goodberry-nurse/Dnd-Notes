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
action QuickAdd: Macro - New NPC
```
```button
name New Place  
type command
action QuickAdd: Macro - New Place
```
```button
name New God/Religion  
type command
action QuickAdd: Macro - New Religion
```
```button
name New Historical Event  
type command
action QuickAdd: Macro - New Event
```
```button
name New Magic Item  
type command
action QuickAdd: Macro - New Magic Item
```
```button
name New Item  
type command
action QuickAdd: Macro - New Item
```
```button
name New Note  
type command
action QuickAdd: Macro - New Note
```

## Custom Rules 


## Journals
```dataview
TABLE summary as "Summary" from "Campaigns/<% tp.file.title %>/Session Journal"
where contains(type,"session")
sort sessionNum ASC
```


## People

### The Party 


### Others 
```dataview
TABLE summary as "Summary" from "Campaigns/<% tp.file.title %>/World Almanac/People"
where contains(type,"people")
sort file.name ASC
```

# Places 
```dataview
TABLE summary as "Summary" from "Campaigns/<% tp.file.title %>/World Almanac/Places"
where contains(type,"place")
sort file.name ASC
```
