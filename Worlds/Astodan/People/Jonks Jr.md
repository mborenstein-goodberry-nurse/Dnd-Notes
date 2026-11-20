---
type: Creature
subtype: NPC
date: 11-19-2026
world: Astodan
campaigns:
  - Sands of Desolation
status: Alive
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]"
attitude: Helpful
location: "[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]"
home: null
origin: null
affiliations: []
relations:
- person: "[[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]]"
  type: "Loyal companion; formerly raised/commanded by Jonks"
  certainty: "DM confirmed identity and loyalty (Session 24)"
aliases:
  - "JJ"
  - "Jonks Junior"
summary: "Jonks's once-undead companion, confirmed by Wiley to have returned as a loyal summoned tanarukk in Session 24."
portrait: null
tags: []
---
# Jonks Jr.

> [!fas-infobox|right] ✧ NPC Overview
> ```dataviewjs
> const portrait = dv.current().portrait;
> if (portrait) {
>   const path = typeof portrait === "string"
>     ? portrait.replace(/^\[\[|\]\]$/g, "")
>     : portrait.path;
>   const file = app.metadataCache.getFirstLinkpathDest(path, dv.current().file.path);
>   if (file) {
>     const img = dv.el("img", "", {
>       attr: { src: app.vault.getResourcePath(file), alt: dv.current().file.name }
>     });
>     img.style.width = "100%";
>     img.style.maxHeight = "260px";
>     img.style.objectFit = "contain";
>   }
> }
> ```
> *`=this.summary`*
>
> **Status:** `INPUT[inlineSelect(option(Unknown), option(Alive), option(Undead), option(Dead), option(Missing), option(Presumed Dead)):status]`
>
> **Status As Of:** `=this.statusAsOf`
>
> **Attitude**: `INPUT[inlineSelect(option(Unknown), option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
>
> **Last Known Location:** `=this.location`
>
> **Aliases:** `INPUT[inlineList:aliases]`

## Description

**Jonks Jr. (JJ)** first came into being as an undead companion of [[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]] during [[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session 17]], following the massacre in [[Worlds/Astodan/Places/Foo Fighters|Foo Fighter territory]]. The original journal records Jonks acquiring a corpse and intending to animate it; the player retrospectively confirms that JJ was created during that session. Jonks later lost JJ when the party collapsed an infernal cavern. In [[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]], Jonks summoned a tanarukk through [[The Wanderer's Guide to the Multiverse/Spells/Summon Greater Demon|Summon Greater Demon]]. Jonks believed the creature was his lost companion; the DM **explicitly confirmed** it was the same Jonks Jr., now appearing in a demonic form.

JJ greeted Jonks affectionately, carried him back from the crater rim, and agreed to divert approaching fiends. His loyalty to Jonks persisted. The exact mechanics of his transformation, his planar situation and how reliably Jonks can call the **same individual** again remain undetermined. The party did not establish that he became permanently free or independent.


## Relationships & Affiliations
```dataviewjs
const current = dv.current();
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
```dataviewjs
const current = dv.current();
const relations = current.relations ?? [];

if (relations.length) {
    dv.header(3, "Known Personal Relationships");

    dv.table(
        ["Person", "Relationship", "Certainty"],
        relations.map(r => [
            r.person ?? "-",
            r.type ?? "Unknown",
            r.certainty ?? "Unknown"
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const worldPeople = dv.pages(`"Worlds/${current.world}/People"`);

const partyMembers = dv.pages('"Campaigns"')
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "PC" &&
        p.world === current.world
    );

const people = [...worldPeople, ...partyMembers]
    .filter(p =>
        p.type === "Creature" &&
        ["NPC", "PC"].includes(p.subtype) &&
        p.file.path !== current.file.path
    );

const incoming = [];

for (const person of people) {
    for (const relation of person.relations ?? []) {
        const target = relation.person;
        if (!target) continue;

        const matches =
            target.path === current.file.path ||
            String(target) === current.file.name ||
            String(target) === `[[${current.file.name}]]`;

        if (matches) {
            incoming.push({
                person: person.file.link,
                type: relation.type ?? "Unknown",
                certainty: relation.certainty ?? "Unknown"
            });
        }
    }
}

if (incoming.length) {
    incoming.sort((a, b) =>
        a.person.path.localeCompare(b.person.path)
    );

    dv.header(3, "Referenced By");

    dv.table(
        ["Person", "Their Relationship", "Certainty"],
        incoming.map(r => [
            r.person,
            r.type,
            r.certainty
        ])
    );
}
```


## Related Quests
```dataviewjs
const current = dv.current();

// Search quests across campaigns.
const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.world === current.world
    );

// Normalize arrays, Dataview DataArrays, and single values.
function toArray(value) {
    if (value == null) return [];
    if (Array.isArray(value)) return value;
    if (typeof value.array === "function") return value.array();
    return [value];
}

// Resolve a wikilink or Dataview link to its actual file.
function resolveFile(value, sourcePath) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value)
            .replace(/^!?\[\[|\]\]$/g, "")
            .split("|")[0];

    return app.metadataCache.getFirstLinkpathDest(
        raw,
        sourcePath
    );
}

const results = [];

for (const quest of quests) {
    const roles = [];

    // Check whether this NPC is the quest giver.
    const giver = resolveFile(
        quest.questGiver,
        quest.file.path
    );

    if (giver?.path === current.file.path) {
        roles.push("Quest Giver");
    }

    // Check general quest involvement.
    const involved = toArray(quest.people).some(value => {
        const file = resolveFile(value, quest.file.path);
        return file?.path === current.file.path;
    });

    if (involved && !roles.includes("Quest Giver")) {
        roles.push("Involved");
    }

    if (roles.length) {
        results.push({
            quest: quest.file.link,
            campaign: quest.campaign ?? "-",
            involvement: roles.join(", "),
            status: quest.status ?? "Unknown"
        });
    }
}

if (results.length) {
    results.sort((a, b) =>
        String(a.campaign).localeCompare(String(b.campaign)) ||
        a.quest.path.localeCompare(b.quest.path)
    );

    dv.table(
        ["Quest", "Campaign", "Involvement", "Status"],
        results.map(r => [
            r.quest,
            r.campaign,
            r.involvement,
            r.status
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const matchesLink = (value, target) => {
    if (!value) return false;

    if (value.path) {
        const resolved = dv.page(value.path);
        return resolved?.file.path === target.file.path ||
               value.path === target.file.path;
    }

    const name = String(value)
        .replace(/^\[\[/, "")
        .replace(/\]\]$/, "")
        .split("|")[0];

    const resolved = dv.page(name);

    return resolved?.file.path === target.file.path ||
           name === target.file.name ||
           name === target.file.path;
};

const mysteries = dv.pages('"Campaigns"')
    .where(m =>
        m.type === "Mystery" &&
        Array.from(m.people ?? [])
            .some(person => matchesLink(person, current))
    )
    .sort(m => m.file.name, "asc");

if (mysteries.length) {
    dv.header(2, "Related Mysteries");

    dv.table(
        ["Mystery", "Campaign", "Status"],
        mysteries.map(m => [
            m.file.link,
            m.campaign ?? "-",
            m.status ?? "Unknown"
        ])
    );
}
```


## Campaign History & Knowledge

- **[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]] (Session 17):** Jonks receives a corpse after the Foo Fighter territory massacre and intends to animate it. The player retrospectively confirms this was the creation of Jonks Jr.; the original journal did not document the successful animation. Soren's involvement in that session remains an OOC-only identification, not part of JJ's creation.
- **Later, exact session not yet confirmed:** Jonks Jr., formerly an undead companion, is lost in the collapse of a cavern leading toward an infernal realm (recounted in [[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]).
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]:** Appears as a tanarukk; Wiley confirms his identity. He helps Jonks and leaves to lead searching fiends away.


## Additional Details

> [!warning]- Classification
> The **current form is demonic / tanarukk**, not evidence that he remains an undead creature. His earlier loss was not a permanent-death confirmation. Wiley discussed possible future summoning but did not specify the mechanics.


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*
