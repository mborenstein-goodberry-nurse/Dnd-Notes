---
type: Player Knowledge
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
knowledgeType: OOC DM Confirmation
status: Confirmed
characterKnowledge: OOC Only
summary: "Emily accidentally confirmed out of character that Darian Pageweather is Ethos; the party has not discovered this, and Ethos's formal divine domain remains unconfirmed."
people:
  - "[[Darian Pageweather]]"
  - "[[Ethos]]"
organizations: []
places: []
quests: []
mysteries: []
sessions:
  - "[[Leaky Tights to Freaky Fights|Leaky Tights to Freaky Fights]]"
  - "[[Through the Eyes of Creation]]"
tags: []
subtype: Theory
---

# The Keeper's Divine Identity

> [!warning] SPOILER — Out-of-character DM confirmation
> **Emily accidentally revealed that [[Darian Pageweather]] is [[Ethos]].** This is confirmed for the player **only**, not information learned by Kiara or the party. Do not transfer this revelation into in-character session journals, the world's canonical character descriptions, or character relationships until discovered in play.

> [!fas-infobox|right] ✧ Player Knowledge
> **Type:** `=this.knowledgeType`
>
> **Status:** `=this.status`
>
> **Character Knowledge:** `=this.characterKnowledge`
>
> *`=this.summary`*

## Confirmed Identity (OOC Only)

**[[Darian Pageweather]] is [[Ethos]].** After the Session 3 review, Emily unintentionally disclosed this identity to the player. This resolves the previous speculation that Darian might be Ethos or connected to him.

**Scope of confirmation:** This establishes the equivalence of the two identities, **not** that the party knows it, nor necessarily that Ethos's formal divine domain or title is God of Knowledge. Darian's Keeper of Knowledge title and the earlier DM hint still support that hypothesis, but do not independently prove the precise divine domain.

## How the Theory Developed

- **After Session 1:** Emily hinted out of character that Darian might have a connection to the unidentified God of Knowledge; no name was supplied.
- **Earlier hypothesis:** The player considered Enos, then withdrew that interpretation after learning Enos was associated with trickery.
- **Session 3:** Xethra identified Ethos as Enos's twin and the child who sent her the artifact. Darian had been studying the artifact, making Ethos a leading candidate.
- **After Session 3:** Emily's accidental OOC revelation directly confirmed **Darian = Ethos**.

## What Remains Unknown

- Whether Ethos's *formal divine domain* is Knowledge, or whether Darian's title has a more specific meaning.
- Why Ethos used the identity of Darian Pageweather and what he sought by researching the artifact.
- Whether any party member has suspected or discovered his identity in-character.
- What role, if any, Ethos played in Xethra's imprisonment or the original breaches.

## Knowledge Boundary

**Player-only spoiler; confirmed OOC.** Keep the in-character mystery open. Do not retrospectively assign Kiara or the party knowledge they have never demonstrated, or alter the canonical Darian/Ethos world notes to reveal the equivalence as public knowledge. Future sessions may establish when and how the characters learn it.

## Evidence Log

- **After Session 1 (OOC):** An ambiguous hint about Darian and the God of Knowledge.
- **Session 3 (in character):** Xethra named Ethos as Enos's twin and the one who sent the artifact.
- **After Session 3 (OOC, direct DM slip):** Emily accidentally confirmed Darian Pageweather is Ethos; reported by the player during this review.

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
