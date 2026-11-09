---
type: Player Knowledge
subtype: Theory
date: 10-30-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: "Recurring black ichor may link the Wasteland, the Mind Gourger, and the imagery of multiple nightmares."
people:
  - "[[The Mind Gourger]]"
  - "[[Revelar]]"
  - "[[Nox]]"
  - "[[Kiara Bashara]]"
  - "[[Noctis]]"
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

# The Nature of Black Ichor

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The black ichor may be an actively entrapping or corrupting substance, and possibly a medium associated with the [[The Mind Gourger|Mind Gourger]] or the Wasteland’s abnormal properties. The stronger conjecture—that it can connect psychic experience with physical reality—is **unverified**.

## Evidence & Reasoning

- Outside the visions, a Wasteland river engulfed a rock and clung to Revelar, causing necrotic harm.
- The Mind Gourger physically appeared to emerge from black ichor after the visions.
- In Kiara’s vision, similar substance invaded and destroyed a deer’s flesh; in Noctis’s vision, it streamed from the eyes of apparent divine figures; in Nox’s vision, a sea creature discharged it.
- The same visual motif appears across distinct contexts, but nightmare descriptions are not independent biological evidence.

### Session 3 — Observations

The Mind Gourger's physical wounds released dark ichor. [[Revelar]] examined [[Xethra]] and saw apparently similar ichor inside her, but hers sparkled with a radiant quality. The similarity is direct observation; the explanation that her essence corrupts mortals is a separate unconfirmed theory: [[Corrupted Souls and Xethra]].

## Alternative Explanations

- The nightmare material may borrow the imagery of a recently encountered environmental threat.
- Different effects may come from different substances that simply look alike.
- The substance could be an environmental hazard with no psychic role.
- The visions and the real Wasteland may be connected by the Mind Gourger without ichor being the mechanism.

## Open Questions

- Does the ichor have consistent physical properties outside the visions?
- Can it be safely sampled and examined?
- Is it related to the artifact or spire?
- Does it appear elsewhere in the physical world, particularly the oceans?

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
