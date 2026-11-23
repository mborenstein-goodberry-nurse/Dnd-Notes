---
type: Other
date: 11-14-2026
campaign: Sands of Desolation
world: Astodan
class: '[[Paladin]]'
subclass: 'Modified Oath of Treachery (Unearthed Arcana; homebrew)'
summary: Distinct person sharing a body with Arthur Morgan; privately introduced in Session 12.
aliases:
  - Damien
  - Damian
affiliations: []
relations:
  - person: "[[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]]"
    type: Shares physical body
    certainty: Confirmed
  - person: "[[Campaigns/Sands of Desolation/Other/Soren|Soren]]"
    type: Shares physical body
    certainty: Confirmed
tags: []
---
# Damien Castellanos

> [!note] ✧ Supplemental Character Biography
> This is a separate person's biography, **not another party roster entry**. The shared body's existing mechanical and roster record remains at [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]].

## Overview

Damien is a **distinct person** who shares a single physical body with [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]]. During a private scene in [[We Meet the Fox|Session 12]], Arthur introduced Damien to [[Diane]] and [[Weary]]. The conversation did not establish how this arrangement began or whether the rest of the party knew.

## Description & Personality

Damien briefly appeared and introduced himself during Session 12, but the surviving material does not establish a dependable full description or distinct personality profile **as of Session 15**.

The original [[Blueberry Weary|Session 14]] journal describes Arthur as dark and frightening, and notably friendly with [[Graves Hellborne]]; its author wondered whether this was Damien's form. A later recap describes Arthur as dark-haired. **This identification is not confirmed.**

## Background & History

Damien and Arthur share many experiences by virtue of inhabiting the same body, but they are **not interchangeable people**. Which memories or experiences belong uniquely to Damien has not yet been established in the reconstructed Sessions 1–15.

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

**Session 12 (private introduction):** [[Diane]] and [[Weary]] met Damien; this does not establish a separate personal relationship with either or imply that the rest of the party knows about him.

Damien's individual goals, affiliations, and further relationships remain unconfirmed. His personal connections should be recorded here, not assigned to Arthur merely because they share a body.

## Campaign History & Knowledge

- **[[We Meet the Fox|Session 12]] — Private introduction:** Arthur explained that he and Damien were distinct consciousnesses sharing a body, changed his appearance to present Damien, and Damien briefly introduced himself before Arthur returned. Diane and Weary were present; broader party awareness is unconfirmed.
- **[[Blueberry Weary|Session 14]] — Possible appearance:** Arthur's appearance and familiarity with the Pirate King prompted an OOC suspicion that Damien might have been present. Neither the original notes nor the surviving recap confirms this.

- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** Present with the group that investigated the Caldera obelisk; the figure of light was recovered after the structure was broken.
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]:** Scouted the crater rim while the companions planned a way down. Found a descent structure and communicated his observations.

## Shared Body

The body and its party mechanics are tracked through [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur's Party note]]. Personal history, agency, and relationships should be attributed to Damien here **only when supported by the evidence**, rather than duplicated automatically from Arthur.

> [!warning]- ✧ Reconstruction Provenance (OOC)
> The campaign note-taker confirms that Arthur and Damien are **two full people**, whose histories overlap extensively but not completely. They can share or dispute control of the same body. These broader facts are retrospective OOC context and were **not all disclosed to the party by Session 15**.
>
> Evidence: reconstructed [[We Meet the Fox|Session 12]] and its B22–B23 recording continuation, the original [[Blueberry Weary|Session 14]] note and subsequent recap, and the player's Batch 5 worldbuilding clarifications. The Session 14 Damien identification remains a hypothesis, not a fact.

**OOC character-build confirmation (Emily, November 2026):** Damien is a paladin using a **homebrewed modification of Unearthed Arcana's Oath of Treachery**. Emily corrected her initial recollection of “Trickery” to **Treachery**. The exact homebrew features have not been provided, and this does not identify the controller of the Session 14 New Phyrexia scene or the Session 26 Owlbear attack. Keep all three shared-body identities distinct.
