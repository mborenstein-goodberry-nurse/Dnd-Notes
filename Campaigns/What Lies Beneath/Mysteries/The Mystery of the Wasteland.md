---
type: Mystery
date: 10-26-2026
campaign: What Lies Beneath
world: What Lies Beneath
status: Unresolved
summary: Where are we, and how do we get back?
people: []
organizations: []
places:
  - "[[The Wasteland]]"
firstSeen: "[[Leaky Tights to Freaky Fights]]"
lastSeen: "[[The Things That Haunt Us]]"
tags:
---

# [[The Mystery of the Wasteland]]

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

- The party appeared in a barren, unknown landscape after following the stolen artifact’s carrier out of the goblin caves. The exact means of arrival are not established.
- The landscape has slow black ichor, an unusual apparent sky, and a distant spire. The ichor swallowed a rock and injured Revelar with necrotic effects.
- A brief [[Locate Object]] reading placed the stolen artifact moving rapidly toward the spire.
- [[Fern]] and [[Evard Underburrow]] arrived by different routes and joined the group. Evard reported a calling that led him toward the same spire.
- During Session 2, party members experienced successive personal visions before encountering the [[The Mind Gourger|Mind Gourger]]. The environment’s relationship to the creature is unknown.

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
- Is the landscape a physical location, a psychic domain, or a shared nightmare?
- What is beyond the clouds, and why does the spire remain apparently distant?
- What is the black ichor, and is it connected to the Mind Gourger or artifact?
- Why did different routes bring Fern, Evard, and the original group together?

## Related Notes


- [[The Wasteland]] — observed terrain and environmental hazards.
- [[The Things That Haunt Us]] — Session 2 observations.
- [[The Visions of the Wasteland]] — individual blackouts and nightmares.
- [[The Shared Nightmare Hypothesis]] — player-only interpretation.
- [[The Nature of Black Ichor]] — player-only interpretation.
