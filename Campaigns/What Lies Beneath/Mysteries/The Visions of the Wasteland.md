---
type: Mystery
date: 10-30-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: "Who caused the seven personalized visions, and what consequences will their outcomes have?"
people:
  - "[[The Mind Gourger]]"
  - "[[Kiara Bashara]]"
  - "[[Fern]]"
  - "[[Evard Underburrow]]"
  - "[[Revelar]]"
  - "[[Noctis]]"
  - "[[Athlas]]"
  - "[[Nox]]"
organizations: []
places:
  - "[[The Wasteland]]"
firstSeen: "[[The Things That Haunt Us]]"
lastSeen: "[[The Things That Haunt Us]]"
tags: []
---

# [[The Visions of the Wasteland]]

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

- The group became unresponsive in sequence while their bodies continued walking; each experienced a tailored vision with interactive choices and checks.
- The apparent Mind Gourger emerged after the party regained awareness. It claimed to benefit from fear and spoke in a chorus of recognizable voices.
- Familiar people and places inside the visions **cannot be treated as confirmed historical appearances**.
- The DM stated outside play that the repeated Survival checks determined the vision order and that outcomes may cause later advantage or disadvantage. The specific mechanic is unknown.

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

- Did the Mind Gourger create the visions or only exploit them?
- Why did the visions differ so much in form, and what were their individual success conditions?
- Is the Wasteland itself a shared psychic reality or a physical place?
- What is the meaning of Noctis's uncertain outcome?

## Related Notes

- [[The Things That Haunt Us]] — complete Session 2 chronicle.
- [[The Mind Gourger]] — suspected source of the visions.
- [[Fear Harvesting and Psychic Resistance]] — player-only competing hypotheses.
- [[The Mystery of the Wasteland]] — broader environmental question.
