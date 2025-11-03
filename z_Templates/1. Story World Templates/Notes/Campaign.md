---
world: <% tp.user.getThisWorld(tp) %>
campaign: <% tp.file.folder(false) %>
status: active
role: player
system: D&D 5e
type: Campaign
---
# The Story of <% tp.file.folder(false) %>

## Player Characters

-

## Sessions

*Put your cursor where the session link should be. Then, from the Command Palette (CMD/CTRL+P), select either QuickAdd: Macro - Add session-player or QuickAdd: Macro - Add session-gm*.

```dataview
table summary as "Summary" from "Campaigns/<% tp.file.folder(false) %>/Session Journals"
where contains(type,"session")
SORT sessionNum ASC
```


## Truths about the campaign/world

*Write down some facts about this campaign or the world that the characters find themselves in.*

- 


## Custom rules

- [[Character options]]
- [[ttrpgs/<% tp.file.folder(false) %>/House Rules|House Rules]]

## [[Safety Tools]] 
