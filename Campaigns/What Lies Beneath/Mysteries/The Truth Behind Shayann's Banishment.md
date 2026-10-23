---
type: Mystery
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: "Who was responsible for Shayann's banishment, what was concealed, and did Xurxus know the truth?"
people:
  - "[[Shayann]]"
  - "[[Kiara Bashara]]"
  - "[[Xurxus]]"
organizations:
  - "[[Church of Xurxus]]"
places:
  - "[[Riverrun]]"
  - "[[Fey Forests]]"
firstSeen:
lastSeen:
tags:
---

# [[The Truth Behind Shayann's Banishment]]

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

- [[Shayann]] is [[Kiara Bashara]]'s brother.
- Shayann killed a priest associated with [[Church of Xurxus]] while protecting Kiara from the priest's predatory intentions.
- Shayann fled and was subsequently banished; speaking his name became forbidden.
- Kiara believes Shayann acted justly, is still alive, and deserves restoration rather than forgiveness for wrongdoing.
- It is **not established** who formally ordered or enforced the banishment, what account was made public, or whether [[Xurxus]] personally knew about it.
- The priest's name may have been Wren, but that name is **unconfirmed**.
- The banishment should **not** be assumed to be part of the separate [[Hell Conflict]].


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

- [[Shayann]] — the banished brother at the center of the mystery.
- [[Kiara Bashara]] — witness, advocate, and investigator.
- [[Church of Xurxus]] — religious institution associated with the priest and the surrounding community.
- [[Xurxus]] — his awareness or involvement is unknown.

