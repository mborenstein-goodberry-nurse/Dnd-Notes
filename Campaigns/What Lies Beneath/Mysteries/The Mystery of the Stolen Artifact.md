---
type: Mystery
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: "What is the artifact stolen from Xurxus, who took it, and why is it dangerous?"
people:
  - "[[Xurxus]]"
  - "[[Kiara Bashara]]"
  - "[[Revelar]]"
organizations:
  - "[[Church of Xurxus]]"
places:
  - "[[Stal'hgite]]"
  - "[[Iron Hills]]"
firstSeen:
lastSeen:
tags:
---

# [[The Mystery of the Stolen Artifact]]

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

- [[Xurxus]] personally charged [[Kiara Bashara]] and [[Revelar]] with recovering a stolen artifact.
- Xurxus warned of dire consequences if it is misused or falls into the wrong hands.
- Their current lead is the **Keeper of Knowledge**, whom they were directed to seek by asking at a tavern in [[Stal'hgite]].
- The artifact's identity, capabilities, current whereabouts, and thief are unknown.
- Goblins have been suggested as suspects, but their involvement has **not** been confirmed.
- Kiara's ideas about the artifact's portability and scale of danger are interpretations, not established facts.


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

- [[The Stolen Artifact]] — the active quest to recover the object.
- [[Xurxus]] — the source of the assignment and warning.
- [[Kiara Bashara]] and [[Revelar]] — tasked with investigating and recovering it.
- [[Stal'hgite]] — the location of their first lead.

