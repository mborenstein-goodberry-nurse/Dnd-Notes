---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: The creatures may be former mortals altered by exposure to Xethra's imprisoned essence.
people:
  - "[[Xethra]]"
  - "[[The Mind Gourger]]"
organizations: []
places:
  - "[[The Wasteland]]"
quests: []
mysteries:
  - "[[The Mystery of the Wasteland]]"
sessions:
  - "[[Through the Eyes of Creation]]"
tags: []
subtype: Theory
---

# Corrupted Souls and Xethra

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The Wasteland's monstrous inhabitants may be lost mortals who gradually acquire distorted features or abilities resembling Xethra because her prison is made from or permeated by her essence. This does **not** establish that she creates or controls the monsters.

## Evidence & Reasoning

- Xethra said earlier arrivals were sane lost souls who later lost their minds and became contorted monsters; she called the gods, not the monsters, her children.
- Xethra has multiple eyes, shifting forms, tentacle-like anatomy, and a radiantly glimmering ichor.
- The Mind Gourger had twisted anatomy, black ichor, mental powers, and fear-based life draining.
- Xethra healed victims where the Mind Gourger drained vitality. These are suggestive parallels, not proof of one mechanism.

## Alternatives & Uncertainties

The common features may come from the same world, a separate corrupting power, or unrelated motifs. The Session 1 aberration's origin is also unresolved, and Xethra described gradual corruption rather than demonstrated instantaneous fusion.

## Open Questions

- Does exposure to the prison transform mortals?
- What causes the difference between Xethra's radiant ichor and the dark ichor?
- Can transformed inhabitants recover their identity or sanity?

## Knowledge Boundary

**Player-only interpretation.** DM statements outside the session are labeled explicitly. Do not copy conclusions into in-character world or party canon before they are discovered.

## Evidence Log

- **Session 3 — [[Through the Eyes of Creation]]:** Xethra's conversation and the party's experiences.
- **After Session 3 (OOC):** Emily's clarifications, where specifically cited.

## Related Entities

```dataviewjs
// Forward relationships only: read this note's own properties.
// No vault-wide search or reverse lookup.
const current = dv.current();
const groups = [
    ["People", current.people],
    ["Organizations", current.organizations],
    ["Places", current.places],
    ["Quests", current.quests],
    ["Mysteries", current.mysteries],
    ["Sessions", current.sessions]
];
for (const [label, values] of groups) {
    const items = values == null ? [] : Array.isArray(values) ? values :
        typeof values.array === "function" ? values.array() : [values];
    const links = items.map(v => v?.path ? v : dv.parse(String(v))).filter(v => v?.path);
    if (links.length) {
        dv.header(3, label);
        dv.list(links);
    }
}
```
