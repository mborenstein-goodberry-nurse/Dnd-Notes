# Controls 
```button
name New Session Journal 
type command
action QuickAdd: Template - New Session Journal Entry
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

# Journals
```dataview
TABLE from "Campaigns/Sands of Desolation/Session Journals"
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
