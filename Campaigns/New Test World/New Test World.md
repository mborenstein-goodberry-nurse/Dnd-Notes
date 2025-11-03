---
world: New Test World
campaign: New Test World
status: active
role: player
system:
type: world
---
# The World of New Test World

## Player Characters

-

## Sessions

*Put your cursor where the session link should be. Then, from the Command Palette (CMD/CTRL+P), select either QuickAdd: Macro - Add session-player or QuickAdd: Macro - Add session-gm*.




```dataview
table summary as "Summary" from "ttrpgs/New Test World"
where contains(type,"session")
SORT sessionNum ASC
```


## Truths about the campaign/world

*Write down some facts about this campaign or the world that the characters find themselves in.*

- 


## Factions

```dataview
TABLE description as "Description" from "ttrpgs/New Test World"
WHERE contains(lower(type),"faction")
```

## Custom rules

- [[Character options]]
- [[ttrpgs/New Test World/House Rules|House Rules]]

## [[Safety Tools]]