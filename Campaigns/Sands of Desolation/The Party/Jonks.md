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
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]"
player: Daniel
race: "[[The Wanderer's Guide to the Multiverse/Races/Kobold|Kobold]]"
class: "[[Wizard]]"
subclass: "[[School of Necromancy]]"
level: 9
home:
location: "[[Worlds/Astodan/Places/Foo Fighters]]"
affiliations: []
relations: []
image:
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

Jonks is a **kobold wizard specializing in necromancy** who met the company in [[Worlds/Astodan/Places/New Phyrexia]] during [[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]] and joined its travels. He is a full party member, not a temporary NPC. His original notes do not establish his player, exact age, home, or personal history.

**Level:** 9 is a practical provisional roster placeholder reflecting the party baseline, **not a verified Session 16–17 advancement record**.

## Background & History

- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]] — Introduction:** Jonks met [[Campaigns/Sands of Desolation/The Party/Thornwick|Thornwick]] and [[Campaigns/Sands of Desolation/The Party/Noisy Owlbear|Noisy Owlbear]] at a potion shop. He reported that a **wealthy necromancer** was pursuing him; the pursuer’s identity and motive remain unknown.
- **[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]] — Outskirts settlement:** He suspected that a fighter glimpsed during the investigation might be his former master, but the identification is unproven. A body was given to Jonks for use as a potential **undead servant**; the source does not establish successful reanimation. The Fox handed him a mysterious coin, whose purpose is unknown.

## Personality & Motivations


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

## Additional Details


### Unique Abilities

### Inventory
