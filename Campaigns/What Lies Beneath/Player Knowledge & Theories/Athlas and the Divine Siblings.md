---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: Xethra saw an undisclosed wrong between divine siblings in Athlas's mind; his hostility to Xurxus may matter.
people:
  - "[[Athlas]]"
  - "[[Xethra]]"
  - "[[Xurxus]]"
organizations: []
places:
  - "[[The Wasteland]]"
quests: []
mysteries:
  - "[[Who Imprisoned Xethra]]"
sessions:
  - "[[Through the Eyes of Creation]]"
tags: []
subtype: Theory
---

# Athlas and the Divine Siblings

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

Xethra's reaction to examining Athlas's mind suggests Athlas's hidden past may intersect with an injustice among the gods. His repeated description of Xurxus as false is potentially relevant, but does **not** establish which god was responsible or what actually occurred.

## Evidence & Reasoning

- When Xethra touched Athlas's forehead she reacted angrily: "He did that?" and challenged how divine siblings could harm one another.
- Athlas twice called Xurxus false during the encounter (player attribution).
- Emily later confirmed she deliberately hinted at secret story when Xethra examined Wiley's character, Athlas.

## Alternatives & Uncertainties

The injustice may have no connection to Xurxus's role in Xethra's imprisonment, the cracks, or Athlas's childhood nightmare. The unknown god whom Xethra blamed is not named. The DM's separate missing-memories hint may refer to Noctis or someone else.

## Open Questions

- What did Xethra see in Athlas's mind?
- Why does Athlas denounce Xurxus?
- Was the injustice directed at one of Xethra's divine children?

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
