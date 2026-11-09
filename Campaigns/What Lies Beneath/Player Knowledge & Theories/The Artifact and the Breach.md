---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: The artifact carrier and the party may have entered through a breach connected to Xethra or the artifact.
people:
  - "[[Xethra]]"
  - "[[Ethos]]"
organizations: []
places:
  - "[[The Wasteland]]"
  - "[[Goblin Cave]]"
quests: []
mysteries:
  - "[[Who Created the Cracks]]"
  - "[[The Mystery of the Stolen Artifact]]"
sessions:
  - "[[Through the Eyes of Creation]]"
tags: []
subtype: Theory
---

# The Artifact and the Breach

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

One theory is that Xethra deliberately opened or used an existing crack near the goblins to retrieve Ethos's artifact, that a creature carried it into her prison, and that the party followed through the same opening. Kiara's prayers may then have revealed the visitors as sane mortals deserving rescue. The proposed causal chain is **unconfirmed at every step involving intentionality**.

## Evidence & Reasoning

- In Session 1, the artifact-bearing aberration appeared after strange violent sounds and disappeared toward the route the party pursued.
- In Session 2, a [[Locate Object]] reading briefly showed the artifact moving rapidly toward the spire.
- In Session 3, Xethra had the original and said she had sensed arrivals entering her prison. She helped the party after Kiara's prayers.
- The DM emphasized that the Session 1 carrier was **not** the later Mind Gourger.

## Alternatives & Uncertainties

The aberration may have formed from goblins, come through a crack independently, or followed the artifact without Xethra sending it. Xethra expressed surprise at the number of entrances and did not say she could make new cracks. Someone else made the original cracks, per the DM.

## Open Questions

- Was the creature created in the goblin cave or present beforehand?
- Did it know where it was going, and was it carrying the artifact voluntarily?
- Could Xethra influence the carrier or manipulate an existing crack?

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
