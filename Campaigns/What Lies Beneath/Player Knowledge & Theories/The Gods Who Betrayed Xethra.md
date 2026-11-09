---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: Xurxus may have played a leading role in Xethra's imprisonment, but every divine role remains unresolved.
people:
  - "[[Xethra]]"
  - "[[Xurxus]]"
  - "[[Daleketh]]"
  - "[[Ethos]]"
  - "[[Phoerah]]"
  - "[[Nexalus]]"
  - "[[Larien]]"
  - "[[Batholith]]"
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

# The Gods Who Betrayed Xethra

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

A small group of gods may have organized Xethra's imprisonment, with other siblings resisting, staying aside, or complying under duress. [[Xurxus]] is a prominent suspect because of Xethra's fears about the artifact; [[Daleketh]] could have enforced a decision; [[Larien]] may have possessed relevant knowledge. Conversely, [[Ethos]]'s gift may suggest assistance. **None of these assignments is established.**

## Evidence & Reasoning

- Xethra claimed her firstborn Xurxus was powerful, driven, and creative, and suspected he feared her freedom.
- She said the children were divided over the imprisonment and that some were forced to obey.
- Xethra described Daleketh as destructive; the DM noted 'Dalek' in his name was intentional, but offered no role confirmation.
- Xethra called Larien her most intelligent daughter; she said Ethos sent her the artifact.
- Xurxus, Phoerah, and Nexalus are known as close friends in the setting, but friendship is not evidence of a conspiracy.

## Alternatives & Uncertainties

Batholith's devotion to justice could motivate either resistance or support. All deities may have their own views of why the imprisonment occurred. The apparent destructive nature of Daleketh does not prove he committed the betrayal.

## Open Questions

- Who actually orchestrated the imprisonment?
- Were the acts coerced or voluntary?
- What had been done to the siblings who resisted?
- What does Xurxus know about Xethra's condition now?

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
