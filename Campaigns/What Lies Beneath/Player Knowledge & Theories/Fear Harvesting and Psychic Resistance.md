---
type: Player Knowledge
subtype: Theory
date: 10-30-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: "The Mind Gourger may exploit personal fears through responsive nightmares that influence a later mechanical vulnerability."
people:
  - "[[The Mind Gourger]]"
  - "[[Kiara Bashara]]"
  - "[[Noctis]]"
  - "[[Revelar]]"
organizations: []
places:
  - "[[The Wasteland]]"
quests: []
mysteries:
  - "[[The Visions of the Wasteland]]"
sessions:
  - "[[The Things That Haunt Us]]"
tags: []
---

# Fear Harvesting and Psychic Resistance

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

The [[The Mind Gourger|Mind Gourger]] may generate or exploit personalized nightmares, drawing emotional sustenance from fear and/or creating psychic vulnerabilities. The player-described pass/fail results may alter a future encounter through advantage or disadvantage. **Fear as nourishment** and **psychological resistance as the mechanic** are related but distinct hypotheses.

## Evidence & Reasoning

- The creature claimed the party’s fear would fuel its desire to live.
- Its mental speech included familiar voices, matching the nightmares’ repeated use of loved ones, family, and divine figures.
- Each vision targeted recognizable emotional attachments or personal history, but the visions were responsive to character choices rather than fixed cutscenes.
- The DM hinted that results may confer advantage or disadvantage later. Kiara failed, Revelar passed by an unexpected method, Noctis remained uncertain; the rest require confirmation.
- The preceding Survival checks determined order of entry into the visions; this does not establish the nature of the later effect.

## Alternative Explanations

- The visions could be a narrative test or supernatural trial unrelated to the creature’s literal feeding.
- The creature may want information about the party rather than emotional energy.
- Its speech may be designed to terrify rather than accurately describe its powers.
- Success conditions may differ by character; a pass is not evidence of moral virtue.

## Open Questions

- Are failures more vulnerable to psychic effects, or do successes receive a different benefit?
- What was Noctis’s question-mark result?
- Can the creature impersonate voices without access to genuine memories?
- Did the Mind Gourger cause the visions?

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
