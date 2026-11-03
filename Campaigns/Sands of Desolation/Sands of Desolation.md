---
type: Campaign
date: 12-01-2025
world: Wiley's World
campaign: Sands of Desolation
status: Active
role: player
system: D&D 5e
banner: z_Assets/Sands of Desolation/Sands of Desolation.png
banner-height: 625
content-start: 291
banner-radius: 17
banner-x: 50
banner-y: 70
---
# The Story of Sands of Desolation

## Controls 
--- start-multi-column: Control panel p1\
```column-settings
number of columns: 4
```

```button
name New Session 
type command
action QuickAdd: Macro - New Session Journal Entry
```
```button
name New Incident  
type command
action QuickAdd: Macro - New Event
```

--- end-column ---

```button
name New Person  
type command
action QuickAdd: Macro - New NPC
```
```button
name New Map
type command
action QuickAdd: Macro - New Map
```

--- end-column ---

```button
name New Place  
type command
action QuickAdd: Macro - New Place
```
```button
name New Item  
type command
action QuickAdd: Macro - New Item
```

--- end-column ---

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
```button
name New Note  
type command
action QuickAdd: Macro - New Note
```

--- end-multi-column

## [[Campaigns/Sands of Desolation/Quest Board/Quest Board|Quest Board]] 
### Main Quest 
```dataviewjs 
const quests = dv.pages(`"Campaigns/Sands of Desolation/Quest Board"`)
    .where(q => String(q.type ?? "").toLowerCase() === "quest")
    .where(q => String(q.status ?? "").toLowerCase() === "active")  
    .sort(q => Number(q.questNum ?? 999), "desc")
	.sort(q => Number(q.priority ?? 999), "asc");

if (quests.length > 0) {
    dv.paragraph(`[[${quests[0].file.path}|${quests[0].file.name}]]`);
} else {
    dv.paragraph("*No active quests found.*");
}
```
### Active
```dataview
TABLE summary as "Summary" 
from "Campaigns/Sands of Desolation/Quest Board"
WHERE lower(type) = "quest"
WHERE lower(status) = "active"
where file.name != "Quest Board"
sort questNum DESCENDING 
sort priority ASCENDING
```
## [[Campaigns/Sands of Desolation/Session Journal/Session Journal|Journals]] 
```dataview
TABLE date as "Date", sessionNum as "Session", summary as "Summary" 
from "Campaigns/Sands of Desolation/Session Journal"
where file.name != "Session Journal"
sort sessionNum DESCENDING
LIMIT 10
```

## People

### The Party 
**Me**: 
- [[Weary Quest]]
- [[Diane]]
- [[Waffles]]
**Others**:
```dataview
TABLE attitude as "Attitude", summary as "Summary" 
from "Campaigns/Sands of Desolation/Da Party"
where file.name != "Da Party"
where file.name != "Weary"
where file.name != "Diane"
where file.name != "Waffles"
```

### Other Characters 
```dataview
TABLE status as "Status", attitude as "Attitude", summary as "Summary" 
from "Campaigns/Sands of Desolation/People"
where file.name != "People"
```

## Places 
```dataview
TABLE from "Campaigns/Sands of Desolation/Maps"
where file.name != "Maps"
```
```dataview
TABLE size as "Size", attitude as "Attitude", summary as "Summary" 
from "Campaigns/Sands of Desolation/Places"
where file.name != "Places"
```
