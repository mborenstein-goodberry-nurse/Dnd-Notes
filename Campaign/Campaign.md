# Controls 
```button
name Create New Session Journal 
type command
action QuickAdd: Session Journal
```
Create New Person 
Create New Place 

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
TABLE from "Campaigns/Sands of Desolation/World Almanac/Places"
sort file.name asc
```
