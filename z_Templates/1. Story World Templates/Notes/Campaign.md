---
type: Campaign
date: <% tp.date.now("MM-DD-YYYY") %>
world: <% tp.system.prompt("What/whose world does this take place in?", "New World") %>
campaign: <% tp.file.folder(false) %>
status: active
role: player
system: D&D 5e
banner: z_Assets/System/RPG Group.jpg
---
# The Story of <% tp.file.title %>

## Controls 
--- start-multi-column: Control panel p1\
```column-settings
number of columns: 4
```

```button
name New Session Journal 
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


## [[<%tp.file.folder(true)%>/Quest Board/Quest Board|Quest Board]]
### Main Quest 
```dataviewjs 
const campaign = dv.current().campaign;

const quests = dv.pages(`"Campaigns/${campaign}/Quest Board"`)
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
from "Campaigns/<% tp.file.title %>/Quest Board"
WHERE lower(type) = "quest"
WHERE lower(status) = "active"
where file.name != "Quest Board"
sort questNum DESCENDING 
sort priority ASCENDING
```
## [[<%tp.file.folder(true)%>/Session Journal/Session Journal|Journals]] 
```dataview
TABLE date as "Date", sessionNum as "Session", summary as "Summary" 
from "Campaigns/<% tp.file.title %>/Session Journal"
where file.name != "Session Journal"
sort sessionNum DESCENDING
LIMIT 10
```


## People

### The Party 
**Me**: [[My Character]]
**Others**:
```dataview
TABLE attitude as "Attitude", summary as "Summary" 
from "Campaigns/<% tp.file.title %>/Da Party"
where file.name != "My Character"
```

### Other Characters 
```dataview
TABLE attitude as "Attitude", summary as "Summary" 
from "Campaigns/<% tp.file.title %>/People"
where file.name != "People"
sort file.name ASC
```

## Places 
```dataview
TABLE from "Campaigns/<% tp.file.title %>/Maps"
where file.name != "Maps"
```
```dataview
TABLE size as "Size", attitude as "Attitude", summary as "Summary" 
from "Campaigns/<% tp.file.title %>/Places"
where file.name != "Places"
sort file.name ASC
```
