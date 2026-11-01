---
type: Mystery
date: 10-30-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: "Why was Noctis imprisoned, why did his restrictions weaken in the Wasteland, and what is his connection to Enos and Zayne?"
people:
  - "[[Noctis]]"
  - "[[Enos]]"
  - "[[Zayne]]"
organizations: []
places:
  - "[[The Wasteland]]"
  - "[[The Banished Lands]]"
firstSeen: "[[The Things That Haunt Us]]"
lastSeen: "[[The Things That Haunt Us]]"
tags: []
---

# [[The Mystery of Noctis's Imprisonment]]

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

- Before the visions, Noctis described a tiefling past, imprisonment in a mechanical body for over a century, and the **Ecclesiarchy** punishing him for coming too close to Enos.
- He appeared able to speak more freely after entering the Wasteland and perceived Enos's voice.
- An apparent Enos and Zayne appeared later in an unreliable vision; their actual involvement was not established.
- The Ecclesiarchy's nature, the reason Noctis was kept alive, and the cause of his apparently weakened programming are unknown.

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

- Was the change in Noctis's programming caused by the Wasteland, the Mind Gourger, or something else?
- Is Enos genuinely bound to or communicating with Noctis, and can he still hear her after the vision?
- Is Zayne a real familiar figure, and what is his relationship to Noctis?
- Why was execution regarded as an inadvisable alternative to imprisonment?

## Related Notes

- [[Noctis]] — character history and testimony.
- [[Enos]], [[Zayne]] — associated figures with important uncertainties.
- [[The Things That Haunt Us]] — scene and source.
- [[The Visions of the Wasteland]] — broader nightmare event.
