
```dataview
TABLE summary as "<% tp.file.title %>" from "Campaigns/<% tp.user.getThisWorld(tp) %>/World Almanac/<% tp.file.title %>"
where file.name != "<% tp.file.title %>"
sort file.name ASC
```
