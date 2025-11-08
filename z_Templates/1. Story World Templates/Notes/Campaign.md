---
world:
campaign: <% tp.file.folder(false) %>
status: active
role: player
system: D&D 5e
type: Campaign
banner: z_Assets/RPG Group.jpg
---
# The Story of <% tp.file.folder(false) %>

## Controls 
--- start-multi-column: Control panel\
```column-settings
number of columns: 3
```

#### Common
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
name New Note  
type command
action QuickAdd: Macro - New Note
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

--- end-column ---

#### Groups
```button
name New Criminal Gang  
type command
action QuickAdd: Macro - New Criminal
```
```button
name New Family  
type command
action QuickAdd: Macro - New Family
```
```button
name New God/Religion  
type command
action QuickAdd: Macro - New Religion
```
```button
name New Government  
type command
action QuickAdd: Macro - New Government
```
```button
name New Militia  
type command
action QuickAdd: Macro - New Militia
```
```button
name New Group  
type command
action QuickAdd: Macro - New Group 
```

--- end-column ---

#### Timeline

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
```button
name New Historical Event  
type command
action QuickAdd: Macro - New Event
```
```button
name New Incident  
type command
action QuickAdd: Macro - New Event
```
```button
name New Scene  
type command
action QuickAdd: Macro - New Scene
```
```button
name New Time Period 
type command
action QuickAdd: Macro - New Time Period
```


--- end-multi-column

## [[<%tp.file.folder(true)%>/Quest Board/Quest Board|Quest Board]] 
![[<%tp.file.folder(true)%>/Quest Board/Quest Board#Main Quest|Quest Board]]

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

## Places 
```dataview
TABLE summary as "Summary" from "Campaigns/<% tp.file.title %>/World Almanac/Places"
where contains(type,"place")
sort file.name ASC
```

## Custom Rules 

