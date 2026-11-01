---
type: Player Knowledge
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: OOC DM Hint
status: Unconfirmed
characterKnowledge: Unknown
summary: Out-of-character hint of a possible connection between Darian Pageweather and the unidentified God of Knowledge; Enos is not established as that deity.
people:
  - "[[Darian Pageweather]]"
organizations: []
places: []
quests: []
mysteries: []
sessions:
  - "[[Leaky Tights to Freaky Fights|Leaky Tights to Freaky Fights]]"
tags: []
subtype: Theory
---

# The Keeper's Divine Identity

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## The Lead

Following Session 1, the player discussed the gods and their preferred realms with the DM. The DM hinted that the **unidentified God of Knowledge** may be connected to [[Darian Pageweather]]. The player initially thought that deity might be [[Enos]], but has since explicitly withdrawn that identification: Enos is currently established as a goddess of trickery, not knowledge. One possible interpretation is that Darian **is** the god of knowledge, perhaps using another identity.

## Evidence & Reasoning

- **DM hint, out of character:** a possible connection between **the unidentified God of Knowledge** and Darian; the DM did **not** identify the deity as Enos.
- **Player inference:** Darian and the god of knowledge might be the same being. This was not confirmed by the DM.
- **Session context:** Darian is known as the Keeper of Knowledge and was studying the artifact.

## Open Questions

- What is the precise connection, if any?
- Is the suggested identity theory accurate, or is there a different explanation?
- What does Darian’s title mean, and how—if at all—is he connected to the unidentified God of Knowledge?

## Knowledge Boundary

**Player-only, unconfirmed.** Kiara has not learned this connection in-character. **Do not identify the God of Knowledge with Enos based on the existing hint.** Do not add it to the canonical Darian or the god of knowledge's world notes as established lore.

## Evidence Log

- **After Session 1:** DM hint reported by player; no in-game confirmation.

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
