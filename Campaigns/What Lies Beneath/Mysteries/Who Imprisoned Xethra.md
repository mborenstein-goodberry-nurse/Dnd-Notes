---
type: Mystery
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: Which gods imprisoned Xethra, who opposed it, and what happened to those who resisted?
people:
  - "[[Xethra]]"
  - "[[Xurxus]]"
organizations: []
places:
  - "[[The Wasteland]]"
firstSeen: "[[Through the Eyes of Creation]]"
lastSeen: "[[Through the Eyes of Creation]]"
tags:
---

# [[Who Imprisoned Xethra]]

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

- [[Xethra]] described herself as imprisoned by her own divine children; she said some acted willingly, some stayed uninvolved out of fear, and others were compelled.
- She claimed a prison was built out of her and that terrible things were done to siblings who resisted.
- She did not identify which child played which role. Her account is uncorroborated in those details.
- When looking into [[Athlas]]'s mind she reacted angrily to an unrevealed wrong between divine siblings.

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

- Which gods organized the imprisonment, and what did each believe they were achieving?
- Which siblings resisted or were coerced? What was done to them?
- Why does Xurxus want the artifact, and what does he know about Xethra's present condition?
- Is there any connection between Athlas's hidden history and the betrayal?

## Related Notes

- [[Through the Eyes of Creation]] — the encounter with Xethra and her account.
