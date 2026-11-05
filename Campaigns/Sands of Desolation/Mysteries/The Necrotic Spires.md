---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: What are the necrotic spires created by Warrick’s failed summoning ritual?
people:
- '[[Warrick]]'
- '[[Wonder]]'
organizations: []
places:
- '[[Resurgence]]'
firstSeen: null
lastSeen: null
tags: []
---

# [[The Necrotic Spires]]

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

- During the original Astodan-series campaign, [[Warrick]] attempted to summon a demon army in [[Resurgence|the Resurgence]].
- Instead, huge necrotic spires appeared across the world.
- The spires seem connected to a growing threat from horrific creatures such as Nightwalkers.
- Their purpose, mechanism, and precise connection to the creatures were unknown at the start of Sands of Desolation.


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
