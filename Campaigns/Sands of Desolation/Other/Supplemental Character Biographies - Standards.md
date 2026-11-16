# Supplemental Character Biographies — Standards

> [!note] ✧ Local Documentation — Sands of Desolation
> A lightweight convention for recording **distinct people who share a party roster/body record**, or another comparably unusual character situation. This is a **campaign-specific note organization practice**, not a new template, macro, metadata feature, or rule that all characters must follow.
>
> **Current example:** [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]] and [[Campaigns/Sands of Desolation/Other/Damien Castellanos|Damien Castellanos]].

## Why We Use This

Arthur and Damien are **two people**, not alternate names or personalities for one person. They share a physical body and much of their history, but do not necessarily share every memory, relationship, decision, or motivation. Their representation should preserve both facts without counting one body as two active party members.

**Rule of thumb:** **One mechanical/roster record for the shared body; one biography for each distinct person.** Create another biography only when their existence has been introduced at the appropriate point in the reconstruction. This arrangement does not imply that one person is less important than another.

## Where Information Lives

| Record | Location | Owns |
| --- | --- | --- |
| **Party anchor** | `The Party/Arthur Morgan.md` | Party status, shared physical/mechanical characteristics, roster and campaign-dashboard representation, and Arthur's *own* biography |
| **Supplemental identity** | `Other/Damien Castellanos.md` | Damien's individual identity, personal history, motivations, relationships, affiliations, and evidenced appearances |
| **Session Journals** | `Session Journal/` | What happened in each scene, including which person was acting **when known** and who learned what |
| **Collapsed OOC/provenance** | Relevant biography or journal | Retrospective confirmation, disputed memories, later knowledge, uncertain identifications, and source notes |

Do **not** duplicate the complete shared history across biographies. Link to the relevant session or party anchor instead. Do **not** attach Damien-only relationships to Arthur just because Arthur's Party note has more automated features.

## File and Metadata Conventions

1. Create a normal Markdown biography inside `Campaigns/Sands of Desolation/Other/`. Use the person's own name for the filename and heading.
2. Use `type: Other`, **not** the Party Member (`Creature` / `PC`) or NPC classification. This keeps the supplementary identity off the existing party roster and NPC indexes without changing queries.
3. Retain the established context fields (`campaign`, `world`, `summary`, `aliases`). Store personal connections with the existing `relations` and `affiliations` shapes. Empty lists are fine.
4. Link to the **one** shared Party anchor in the overview and/or `relations`; do not copy its class, race, level, equipment, status, or other mechanical properties unless an individual-specific fact genuinely requires explanation.
5. Keep the descriptive sections human-readable: Overview; Description & Personality; Background & History; Relationships & Motivations; Campaign History & Knowledge; Shared Body; collapsed OOC Reconstruction Provenance. Omit or adapt empty sections rather than inventing content.

**Example metadata** (replace names and facts; not a new template):

```yaml
---
type: Other
campaign: Sands of Desolation
world: Astodan
summary: Distinct person sharing a body with the party anchor.
aliases: []
affiliations: []
relations:
  - person: "[[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur Morgan]]"
    type: Shares physical body
    certainty: Confirmed
tags: []
---
```

If an individual acquires an affiliation, use the existing keys `organization`, `status`, `certainty`, and `role` within an `affiliations` list entry. A connection should be entered **only when supported**, never simply because the shared body knows someone.

### How the Connections Display

Damien's biography contains a **local DataviewJS table** that reads his `relations` and `affiliations` fields. Edit the metadata once; the local table updates. Empty lists produce no tables. This does **not** add reverse-relationship behavior to the wider vault: Party/NPC reverse queries may not include notes of `type: Other`. Direct wikilinks and backlinks still work.

Do not modify the global Party roster queries, templates, or macros just to make a rare supplementary biography behave like a full Party note. Reconsider that only if an actual recurring use case develops.

## Aliases, Links, and Historical Knowledge

- **An individual owns their own aliases.** The alias `Damien` belongs on Damien's note, not on Arthur's. Avoid duplicate aliases that resolve to the wrong person.
- **Preserve existing links during migration.** Some unreconstructed older journals explicitly link a person's display name to Arthur's file or use combined legacy aliases. Review and correct those links **when reconstructing those sessions**, rather than mass-editing later history now.
- **Chronology comes first.** Record the person who acted only when established; otherwise describe the shared body/observed appearance without guessing who was in control.
- **Knowledge is not universal.** A private disclosure (such as the introduction to [[Diane]] and [[Weary]] in [[We Meet the Fox|Session 12]]) does not mean the whole party knows.
- **Separate IC from OOC.** Later player recollections and information that was not yet disclosed go in a collapsed OOC/provenance callout or a clearly marked uncertainty, never as unquestioned public knowledge.
- **Do not pre-create future identities or retroactively reveal them.** Add their biographies and move their aliases when the reconstruction reaches their introduction.

## Maintenance Checklist

- [ ] Is this a **separate person**, rather than merely another disguise, title, or name?
- [ ] Does the existing Party note still represent **only one roster/body entry**?
- [ ] Are mechanics on the Party anchor and individual memories/relationships on the appropriate biography?
- [ ] Do relationships and affiliations reflect evidence, with uncertainties labeled?
- [ ] Are aliases unique, and do historical wikilinks still go to the intended person?
- [ ] Are session chronology, private knowledge, and OOC facts clearly distinguished?
- [ ] Does the local relationships table render in Obsidian, without any new global query or template changes?

> [!info]- ✧ Example and Provenance
> This standard was established during **Sands of Desolation Batch 5 worldbuilding**, after reconstructing Sessions 13–15. Damien's independent biography was introduced to preserve the private Session 12 revelation and later uncertain observations without adding a second party roster entry. This note documents the current working convention; revise it only when actual campaign needs reveal a limitation.
