---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: What happened to Weary’s family after their correspondence stopped?
people:
- '[[Weary]]'
- '[[Diane]]'
organizations: []
places:
- '[[Tangambalanga]]'
firstSeen: null
lastSeen: null
tags: []
---

# [[The Disappearance of Weary's Family]]

> [!fas-infobox|right no-title] Mystery Overview
> ## ✧ Mystery Overview ✧
> **Status:** `INPUT[inlineSelect(option(Unresolved), option(Partially Answered), option(Resolved)):status]`
>
> **First Discovered:** `=this.firstSeen`
>
> **Last Discovery:** `=this.lastSeen`
## The Question

*`=this.summary`*

## What We Know

- [[Weary]] fled his family home after a catastrophic Wild Magic accident involving [[Warrick]], but maintained written contact with his parents, **[[Ernon Quest]]** and **[[Divari Quest]]** (names recovered from the original notes, p. 38).
- During the year after the first campaign, their letters abruptly stopped.
- Weary and [[Diane]] returned to [[Tangambalanga]], found his family missing, and searched unsuccessfully.
- Their fate was unknown when the couple received the summons to [[Isabel's Castle]].
- *Sources: player retrospective account, 2026-11-05; original Google Docs information sheets, p. 38. The resolution belongs to later sessions.*


## Discoveries
```dataviewjs
const current = dv.current();

const matchesLink = (value, target) => {
    if (!value) return false;

    if (value.path) {
        const resolved = dv.page(value.path);
        return resolved?.file.path === target.file.path ||
               value.path === target.file.path;
    }

    const name = String(value)
        .replace(/^\[\[/, "")
        .replace(/\]\]$/, "")
        .split("|")[0];

    const resolved = dv.page(name);

    return resolved?.file.path === target.file.path ||
           name === target.file.name ||
           name === target.file.path;
};

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        Array.from(q.mysteries ?? [])
            .some(m => matchesLink(m, current))
    )
    .sort(q => q.file.name, "asc");

if (quests.length) {
    dv.header(2, "Related Quests");

    dv.table(
        ["Quest", "Campaign", "Status"],
        quests.map(q => [
            q.file.link,
            q.campaign ?? "-",
            q.status ?? "Unknown"
        ])
    );
}
```


## Related Notes

- [[Sands of Desolation - Before Session 1]] — historical setup supplied by the player.

**Reconstruction status:** Open at the start of Session 1. Its later resolution, if any, will be recorded when the relevant session has been processed.

> [!warning]- ✧ Out-of-Character / Future Knowledge
> The player has indicated that some historical questions receive answers later in the campaign. No future revelation has been added to this pre-Session-1 mystery record.
