---
type: Campaign
date: 11-29-2025
world: Lily's World
campaign: Adamarte and Adventurers
status: active
role: player
system: D&D 5e
banner: z_Assets/RPG Group.jpg
---
# The Story of Adamarte and Adventurers

## Controls 
--- start-multi-column: Control panel p1\
```column-settings
number of columns: 3
```

```button
name New Session Journal 
type command
action QuickAdd: Macro - New Session Journal Entry
```

--- end-column ---

```button
name New Person  
type command
action QuickAdd: Macro - New NPC
```

--- end-column ---

```button
name New Place  
type command
action QuickAdd: Macro - New Place
```

--- end-multi-column

### Other Templates:
--- start-multi-column: Control panel p2\
```column-settings
number of columns: 3
```

#### Groups
```button
name New Group  
type command
action QuickAdd: Macro - New Group 
```
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

--- end-column ---

#### Other

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
```button
name New Map
type command
action QuickAdd: Macro - New Map
```
```button
name New God
type command
action QuickAdd: Macro - New God
```

--- end-multi-column

## [[Campaigns/Adamarte and Adventurers/Quest Board/Quest Board|Quest Board]] 
![[Campaigns/Adamarte and Adventurers/Quest Board/Quest Board#Active|Quest Board]]

## Journals
```dataview
TABLE summary as "Summary" from "Campaigns/Adamarte and Adventurers/Session Journal"
where contains(type,"session")
sort sessionNum ASC
```


## People

### The Party 
***Me***: [[Adrian Marmalade]]
***Others***: 
- [[Findy Findabair]]
- [[Marik Faros]] 
- [[Marlus]] 
- [[Scrap]] 

### Others 
```dataview
TABLE attitude as "Attitude", summary as "Summary" from "Campaigns/Adamarte and Adventurers/World Almanac/People"
where file.name != "People"
sort file.name ASC
```

## Places 
```dataview
TABLE size as "Size", attitude as "Attitude", summary as "Summary" from "Campaigns/Adamarte and Adventurers/World Almanac/Places"
where file.name != "Places"
sort file.name ASC
```

## Custom Rules 

