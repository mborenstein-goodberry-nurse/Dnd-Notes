---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: DM confirms the Hell Incident deepened preexisting cracks; their creator and mechanism remain unknown.
people:
  - "[[Xethra]]"
  - "[[Noctis]]"
organizations: []
places:
  - "[[The Wasteland]]"
  - "[[The Banished Lands]]"
quests: []
mysteries:
  - "[[Who Created the Cracks]]"
sessions:
  - "[[Through the Eyes of Creation]]"
tags: []
subtype: Theory
---

# The Hell Incident and the Cracks

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The historical [[Hell Conflict]] may have widened access between the ordinary world and Xethra's prison, without having created the original openings. Its tie to the original crack-maker or the subsequent arrivals of lost souls remains unknown.

## Evidence & Reasoning

- **Direct DM clarification:** "The hell incident helped widen the cracks - the cracks were made by someone else."
- **Direct DM clarification:** The Hell Incident was not the original cause but helped deepen them.
- **Xethra's statement:** Lost souls began entering the prison a couple of hundred years ago.
- **Historical account:** The conflict involved an alleged attempt to summon or open Hell, a red beacon, and later banishment of hellfolk. Its details and exact date remain uncertain.

## Alternatives & Uncertainties

The red beacon might have resulted from using, discovering, or worsening an earlier tear, but none is established. The approximate timing of lost souls entering the prison is not proof that this conflict first permitted their arrival. Shayann's banishment is a separate event without a demonstrated link.

## Open Questions

- What does summoning Hell mean if the world lacks conventional independent planes?
- Was the widening deliberate, accidental, or an unintended byproduct?
- How did the red beacon relate to the breach?

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
