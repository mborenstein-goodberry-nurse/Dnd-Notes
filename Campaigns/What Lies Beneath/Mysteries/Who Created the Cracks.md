---
type: Mystery
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: Who made the original cracks into Xethra's prison, and why?
people:
  - "[[Xethra]]"
organizations: []
places:
  - "[[The Wasteland]]"
firstSeen: "[[Through the Eyes of Creation]]"
lastSeen: "[[Through the Eyes of Creation]]"
tags:
---

# [[Who Created the Cracks]]

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

- Xethra said cracks had begun to form and that lost souls had entered her prison over roughly the last couple of hundred years.
- The party reached the Wasteland through a poorly understood transition while pursuing an artifact-bearing creature.

> [!warning]- DM-only confirmation, not party knowledge
> Emily confirmed that an unidentified **someone else made the original cracks**, while the Hell Incident later helped **widen** them. She also hinted that someone in the party could explain more if their memories were restored; that character was not named.

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


## Open Questions

- Who made the cracks and what were they trying to accomplish?
- Does every breach happen naturally after their creation, or can new openings be deliberately caused?
- How did the party and the Session 1 aberration pass through?
- What memories could illuminate their origin?

## Related Notes

- [[Through the Eyes of Creation]] — the encounter with Xethra and her account.
