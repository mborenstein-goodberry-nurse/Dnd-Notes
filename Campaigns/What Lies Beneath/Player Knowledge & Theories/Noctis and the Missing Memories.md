---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: Noctis may be the party member whose inaccessible memories relate to the Hell Incident and the cracks.
people:
  - "[[Noctis]]"
  - "[[Enos]]"
organizations: []
places:
  - "[[The Banished Lands]]"
  - "[[The Wasteland]]"
quests: []
mysteries:
  - "[[Who Created the Cracks]]"
  - "[[The Mystery of Noctis's Imprisonment]]"
sessions:
  - "[[Through the Eyes of Creation]]"
tags: []
subtype: Theory
---

# Noctis and the Missing Memories

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

Emily hinted that a member of the party could explain something about the cracks and Hell Incident **if they had their memories**. The player suspects this describes [[Noctis]], given his tiefling origins, long imprisonment, and imperfect access to his history. **The DM did not identify the character.**

## Evidence & Reasoning

- Noctis described being a tiefling prior to his mechanical imprisonment by the Ecclesiarchy for over a century.
- He has incomplete control and unresolved history, while regaining some freedom in Xethra's prison.
- Emily's missing-memories remark came in the context of the **Hell Incident**, not the separate comment about what Xethra saw in Athlas's mind.

## Alternatives & Uncertainties

Athlas or another party member may be the one Emily meant. Noctis's documented imprisonment duration does not prove he lived through the Hell Conflict or participated in it. There is no established causal connection between the Ecclesiarchy and the original cracks.

## Open Questions

- Which character has the relevant missing memories?
- Do they concern the Hell Incident, the original cracks, or a later development?
- How might that character recover them?

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
