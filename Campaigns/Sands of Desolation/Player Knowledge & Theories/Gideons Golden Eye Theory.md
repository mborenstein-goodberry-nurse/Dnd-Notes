---
type: Player Knowledge
date: 11-06-2026
campaign: Sands of Desolation
world: Astodan
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: The small golden eye visible only to Diane may have been a spying device or manifestation operated by Gideon the Judge.
people:
  - "[[Diane]]"
  - "[[Gideon]]"
organizations: []
places:
  - "[[Tower of Icarus]]"
quests: []
mysteries:
  - "[[The Golden Eye of Icarus]]"
sessions:
  - "[[Battle for the Bulge]]"
tags: []
subtype: Theory
---
# Gideon's Golden Eye Theory

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The golden eye trailing the party through the [[Worlds/Astodan/Places/Tower of Icarus|Towers of Icarus]] was probably a watcher controlled by, created by, or otherwise acting for [[Worlds/Astodan/People/Gideon|Gideon the Judge]]. It need not have been literally his own eye.

## Evidence & Reasoning

- [[Campaigns/Sands of Desolation/The Party/Diane|Diane]] alone noticed the eye moving and tracking the party's progress.
- The eye withdrew toward a concealed hatch beside the passage to Gideon's throne chamber.
- Gideon subsequently confronted the intruders as the tower's apparent guardian, providing a plausible reason to surveil them.

## Alternative Explanations

- The eye could have been a separate magical sentinel, not under Gideon's direct control.
- Another being might have been observing the party.
- The eye's nature and Diane's unusual ability to perceive it remain unexplained.

## Knowledge Boundary

**Plausible player inference, not established canon or party knowledge.** Neither the provided B08 recording nor the historical journal explicitly identifies the eye as Gideon's. Keep [[Campaigns/Sands of Desolation/Mysteries/The Golden Eye of Icarus|the mystery]] unresolved until later in-world evidence confirms or refutes it.

## Evidence Log

- **Session 5 (B08, high confidence):** Diane sees the eye; it retreats near the chamber where Gideon is encountered. The retrospective 2026-11-08 player review places B08 in Session 5, though no independent recording date establishes the boundary.
- **Player retrospective (2026-11-06):** proposed the Gideon connection as a strong but unconfirmed hunch.

## Related Entities

```dataviewjs
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
