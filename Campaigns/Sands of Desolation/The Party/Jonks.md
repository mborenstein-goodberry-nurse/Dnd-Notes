---
type: Creature
subtype: PC
date: 03-29-2026
campaign: Sands of Desolation
world: Astodan
summary: Kobold necromancy wizard who joined the adventuring company in Session 16 while fleeing a wealthy necromancer.
status: Active
aliases:
- Jonks
tags: []
attitude: Friendly
alignment: Neutral Good
statusAsOf: '[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]]'
player: Daniel
race: '[[The Wanderer''s Guide to the Multiverse/Races/Kobold|Kobold]]'
class: '[[Wizard]]'
subclass: '[[School of Necromancy]]'
level: 9
home: null
location: '[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]'
affiliations: []
relations: []
image: null
---
# Jonks

> [!fas-infobox] ✧ Party Member Overview
> **Player:** `VIEW[{player}]`
>
> **Race:** `=this.race`
>
> **Class:** `=this.class`
>
> **Level:** `VIEW[{level}]`
>
> **Status:** `INPUT[inlineSelect(option(Active), option(Departed), option(Retired), option(Missing), option(Presumed Dead), option(Dead), option(Unknown)):status]`
>
> **Home:** `=this.home`
>
> **Last Known Location:** `=this.location`

## Description

Jonks is a **kobold wizard who practices necromancy**. He introduced himself to the company in a New Phyrexia potion shop and joined the expedition while avoiding an unnamed wealthy necromancer. The historical record does not reliably establish his physical features beyond being a kobold, his age, or where he was born.

## Background & History

In a more detailed **in-character introduction recorded in Session 20**, Jonks recounted that he had been enslaved by a dragon, that the dragon killed his wife by stepping on her, and that he subsequently served a necromancer before fleeing with some of that master's possessions to pursue necromancy for himself. These are **Jonks's own claims**, not independently verified biographical facts; the first introduction recorded in [[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|Session 16]] establishes that a wealthy necromancer was pursuing him. Whether his former master and that pursuer are definitely the same individual should remain open until confirmed. In [[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session 17]], Jonks suspected that an attacker might be his former master; the identification was not verified.

## Personality & Motivations

Jonks is **openly enthusiastic about necromancy**, speaking matter-of-factly about reanimating the dead and intending to turn a recovered corpse into an undead servant (success unconfirmed). His account of taking his former master's possessions suggests a desire for **independence in his magical practice**, while the pursuit gives him an immediate reason to keep moving. He also acts alongside the company: he provided magical refuge with *[[The Wanderer's Guide to the Multiverse/Spells/Rope Trick|Rope Trick]]* and helped extract Hero's Bane despite injury to his hand. His larger personal ambitions, his relationship with his wife, and the identity of his pursuer remain to be confirmed.

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
```dataviewjs
const current = dv.current();

// Search quests across campaigns.
const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        String(q.status ?? "").trim().toLowerCase() !== "undiscovered" &&
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

    // Check whether this Character is the quest giver.
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
    dv.header(2, "Related Quests");

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

- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]]:** Joined the traveling party after the New Phyrexia potion-shop encounter; accompanied the company during the unnatural storm and flight toward Foo Fighter territory.
- **[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]:** Joined the investigation of the devastated Outskirts settlement. Acquired a body he intended to reanimate as an undead servant; the result is undocumented. Received a coin from [[Worlds/Astodan/People/The Fox]], with no established effect.

> [!note]- Historical level uncertainty
> Jonks was reportedly the same level as the other characters at introduction, but the exact level for Sessions 16–17 has not been recovered. `level: 9` is a **provisional database placeholder**, not confirmation of his precise level at the time.

- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** Used *[[The Wanderer's Guide to the Multiverse/Spells/Rope Trick|Rope Trick]]* as a refuge during the sword-driven intraparty conflict.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** Extracted [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Havoc's Sword]] using a magical hand and suffered visible hand corruption. The person called "Haley" (probably [[Campaigns/Sands of Desolation/The Party/Amorpha|Amorpha]]) stabbed him to interrupt the hold. Lasting harm or full reversal is unverified.

## Additional Details


### Unique Abilities

### Inventory
