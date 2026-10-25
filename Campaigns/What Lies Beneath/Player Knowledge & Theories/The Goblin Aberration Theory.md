---
type: Player Knowledge
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: "Theory that the many-faced aberration formed from the goblins."
people: []
organizations: []
places: []
quests: ["[[The Stolen Artifact]]"]
mysteries: ["[[The Mystery of the Stolen Artifact]]"]
sessions: ["[[Session 1]]"]
tags: []
---

# The Goblin Aberration Theory

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The pale, many-faced creature that appeared during the fight with the goblin leader may have been **formed from or fused out of the goblins** present in the cave, possibly as a consequence of the artifact or the magic used during the confrontation.

## Evidence & Reasoning

- The confrontation was obscured by magical [[Darkness]] and included [[Hunger of Hadar]].
- The party heard cracking bones and tearing flesh.
- When the darkness cleared, the goblins were no longer visible.
- A grotesque creature with multiple faces and eyes was discovered on the ceiling, holding the artifact.
- The temporal sequence and multiple faces are suggestive, but **not proof** that the goblins became the creature.

![[Artifact-Spawned Abberation.png|376]]

## Alternative Explanations

- The creature may have arrived independently or been summoned.
- The goblins may have been consumed, displaced, or otherwise removed without becoming part of it.
- The artifact might have influenced the event, but no causal mechanism is established.

## Open Questions

- Were the creature's faces recognizably goblin-like?
- Did the artifact cause or attract the transformation?
- What happened to the missing goblins?

## Knowledge Boundary

**Player interpretation of witnessed events; unconfirmed.** Do not treat a goblin fusion as an established fact. Athlas's absence was explained out of character by Wiley leaving the table early and is not evidence for this theory.

## Evidence Log

- **Session 1:** the cave encounter, sounds within the darkness, missing goblins, and the creature's appearance.

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
