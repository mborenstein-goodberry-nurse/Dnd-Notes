---
type: Player Knowledge
date: 11-08-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: Player Theory
status: Unconfirmed
characterKnowledge: Unknown
summary: Xethra's account may explain why the setting has plane-like regions but no conventional separate planes.
people:
  - "[[Xethra]]"
  - "[[Xurxus]]"
  - "[[Phoerah]]"
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

# The One World and Missing Planes

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Theory

Xethra claimed her children limited creation to one world, whereas she envisioned a cosmos with multiple dimensions, Heaven, and Hell. This may help explain why the setting includes physical regions resembling separate D&D planes rather than having those planes as independent realms.

## Evidence & Reasoning

- Prior campaign setting notes describe an unusual one-world cosmology with geographical analogues to traditional planes.
- Xethra said existence could have held many dimensions, Heaven, and Hell but her children wanted only one world with disparate elements brought together.
- The Hell Incident's alleged attempt to summon Hell raises questions about whether mortals tried to open or create a new plane, but does not prove they did.

## Alternatives & Uncertainties

Xethra's cosmology is her own testimony. Not every geographically plane-like region has a confirmed one-to-one planar role. The gods' intention, power, and degree of control over creation remain unknown.

## Open Questions

- Were the regions deliberately constructed as plane analogues?
- Did the gods suppress the formation of independent dimensions?
- What would happen to the present world if Xethra were freed?

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
