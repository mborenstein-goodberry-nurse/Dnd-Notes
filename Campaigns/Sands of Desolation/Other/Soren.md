---
type: Other
date: 11-15-2026
campaign: Sands of Desolation
world: Astodan
summary: A distinct person who shares the body recorded under Arthur Morgan; separate personal history is still being reconstructed.
aliases:
  - Soren Hellborne
  # Existing legacy alias; whether Hellborne is the character's definitive surname remains unverified.
affiliations: []
relations:
  - person: "[[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]]"
    type: Shares physical body
    certainty: Confirmed
  - person: "[[Campaigns/Sands of Desolation/Other/Damien Castellanos|Damien Castellanos]]"
    type: Shares physical body
    certainty: Confirmed
tags: []
---
# Soren

> [!note] ✧ Supplemental Character Biography
> This is a **separate person's biography**, not another Party Member or NPC roster entry. The shared body's mechanical and party record remains at [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]], as it does for [[Campaigns/Sands of Desolation/Other/Damien Castellanos|Damien Castellanos]].

## Overview

Soren is a **third distinct person** sharing one physical body with [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]] and [[Campaigns/Sands of Desolation/Other/Damien Castellanos|Damien Castellanos]]. The player describes this as Arthur's **DID system**. All three should be treated as distinct individuals with their own agency; the existence of a shared body does not make their thoughts, decisions, personal histories, or relationships interchangeable.

Soren's first **significant identified involvement** in the reconstructed campaign chronology relates to events in [[Session of Nat 20s|Session 17]]. The party had not established Soren's role in those events in-character.

## Description & Personality

The source material available through Session 17 does not establish a reliable, independent description of Soren's usual appearance, manner, or personality. Do not equate the appearance of the attacker described in the party's vision with Soren's permanent appearance without confirmation.

## Background & History

How the shared-body arrangement began and what personal history belongs uniquely to Soren have not yet been established from the reconstructed campaign record. The legacy label **“Soren Hellborne”** appears in earlier Arthur note aliases; its use as a definitive surname is unconfirmed and is preserved only for link compatibility.

## Relationships & Motivations

```dataviewjs
const current = dv.current();
const relations = current.relations ?? [];

if (relations.length) {
    dv.table(
        ["Person", "Relationship", "Certainty"],
        relations.map(r => [
            r.person ?? "-",
            r.type ?? "Unknown",
            r.certainty ?? "Unknown"
        ])
    );
}

const affiliations = current.affiliations ?? [];
if (affiliations.length) {
    dv.table(
        ["Organization", "Status", "Certainty", "Role"],
        affiliations.map(a => [
            a.organization ?? "-",
            a.status ?? "Unknown",
            a.certainty ?? "Unknown",
            a.role || "-"
        ])
    );
}
```

Soren's individual relationships, allegiances, and long-term goals remain unverified. No personal animosity or general behavioral profile is inferred from a single retrospective account of violence.

## Campaign History & Knowledge

- **[[Session of Nat 20s|Session 17]] — Devastated Outskirts settlement:** The party encountered the aftermath of an exceptionally violent attack, investigated a suspected killer, and did not establish the attacker's identity. **Soren's involvement is known OOC only**, as described in the collapsed provenance note below.

- **[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]] (Session 27 — likely identification):** The recording names Soren in connection with a summoned-gauntlet counterattack after Jonks tries to seize an engine hemisphere. Jonks is knocked unconscious; the shared body later helps stabilize him. The player considers Soren the likely actor given the violence and gauntlet, but exact moments of control are unverified.

## Shared Body

Arthur's [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Party Member note]] carries the shared body's status, class, level, equipment, and other roster details. Soren's distinct agency and personal experiences belong in this supplemental biography when supported by evidence. Soren does not receive a separate party roster entry.

> [!warning]- ✧ Reconstruction Provenance (OOC spoilers)
> The campaign note-taker confirms that **Soren was responsible for the Session 17 settlement massacre**. This identifies a significant Soren-linked event for the reconstruction; it was not a revelation the party established in-character. Preserve the attacker as unidentified in Session 17's public narrative and mystery tracking.
>
> The note-taker **tentatively** remembers that Soren encountered someone being bullied and responded with disproportionate violence. Who was involved, the precise circumstances, and whether this was the complete motive are unknown. Do not attribute details to Soren beyond that qualified recollection.
>
> Sources: original [[Session of Nat 20s|Session 17]] journal, Zach's two handwritten pages dated January 31, 2025, and the note-taker's Batch 6 clarification. The session's vision of a scarred, red-eyed, red-haired fist fighter describes what the party perceived, **not a confirmed baseline description of Soren**. The legacy name “Soren Hellborne” needs confirmation before treating Hellborne as an established surname.

**Retrospective character-build recollection (unverified):** The player recalls that Soren and Damien may each be paladins with modified oaths. Their exact builds, subclasses and oath mechanics are not confirmed; do not add class/subclass YAML to this supplemental biography until verified.

## Additional Details
> [!warning]- ✧ Session 21 possible appearance — unconfirmed
> Zach's note uses "third personality" during [[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]], and the player believes **Soren** would be the explanation if someone other than Arthur and Damien was involved. No independent recording or in-character introduction confirms Soren appeared at that moment. Do **not** assign his actions or motives based on this uncertain scene.
