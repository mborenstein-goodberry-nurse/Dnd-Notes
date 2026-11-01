---
type: Player Knowledge
subtype: Theory
date: 10-30-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: "The Wasteland may be a shared psychic environment, or a real supernatural domain with dreamlike effects."
people:
  - "[[The Mind Gourger]]"
  - "[[Athlas]]"
  - "[[Evard Underburrow]]"
  - "[[Fern]]"
organizations: []
places:
  - "[[The Wasteland]]"
quests: []
mysteries:
  - "[[The Mystery of the Wasteland]]"
  - "[[The Visions of the Wasteland]]"
sessions:
  - "[[The Things That Haunt Us]]"
tags: []
---

# The Shared Nightmare Hypothesis

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The party may have entered a **shared constructed nightmare** before the individual visions began. A competing hypothesis is that the [[The Wasteland|Wasteland]] exists physically but allows memories, fears, and psychic effects to influence perception or reality. Neither interpretation has been established.

## Evidence & Reasoning

- The party does not understand its transition from the goblin caves into the Wasteland.
- The sky, light, and apparent passage of time behave strangely. Athlas saw something beyond the clouds that did not resemble an ordinary sky.
- The spire remained distant through repeated travel; its real distance is unknown, so spatial distortion is not confirmed.
- Within individual visions, corridors elongated and routes looped, offering a thematic parallel to the Wasteland.
- The Mind Gourger appeared in the shared landscape when the visions ended.

## Alternative Explanations

- The Wasteland could be a genuine distant region or plane with unusual natural laws.
- The party may have been teleported by the stolen artifact or another unknown effect.
- The visual similarities between environments could be deliberate nightmare imagery, not identical mechanics.
- The Mind Gourger could be manipulating perception of an otherwise real setting.

## Open Questions

- Does the Wasteland remain if the creature is defeated?
- Will objects or injuries from it persist after an escape?
- Do Fern and Evard’s separate routes imply a shared objective location?
- What is beyond the sky, and does the spire become reachable?

## Knowledge Boundary

**Unconfirmed player interpretation.** This is not automatically known to Kiara or the other characters. Vision details and DM mechanics are not evidence that the corresponding nightmare events occurred in world history.

## Evidence Log

- **Session 2 — [[The Things That Haunt Us]]:** the party’s blackouts, visions, and confrontation with [[The Mind Gourger]].
- **After Session 2 (OOC clarification):** survival rolls influenced the order of visions; outcomes may relate to later advantage or disadvantage; certain results remain unconfirmed.

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
