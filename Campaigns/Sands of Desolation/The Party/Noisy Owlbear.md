---
type: Creature
subtype: PC
date: 11-15-2026
campaign: Sands of Desolation
world: Astodan
player: Zach Glass
race: "[[Satyr]]"
class: "[[Druid]]"
level:
status: Active
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight|Sovereign Fight]]"
home:
location: "[[Worlds/Astodan/Places/Infinite Mausoleum|Infinite Mausoleum]]"
affiliations: []
relations: []
aliases: []
summary: "Satyr druid played by Zach Glass; truly died in Session 16, unexpectedly returned by the Sovereign fight, and participated through Session 28."
image:
tags: []
---
# Noisy Owlbear

> [!fas-infobox] ✧ Party Member Overview
> **Player:** `VIEW[{player}]`
>
> **Race:** `=this.race`
>
> **Class:** `=this.class`
>
> **Level:** `VIEW[{level}]`
>
> **Status:** `INPUT[inlineSelect(option(Active), option(Departed), option(Retired), option(Missing), option(Presumed Dead), option(Dead), option(Player Departed), option(Unknown)):status]`
>
> **Home:** `=this.home`
>
> **Last Known Location:** `=this.location`

## Description

A new adventuring companion encountered at the Voluptuous Breasts tavern in [[Worlds/Astodan/Places/New Phyrexia|New Phyrexia]]. The present frontmatter identifies him as a satyr druid, but the surviving Sessions 14–15 sources do not independently confirm those mechanics; his level and detailed background remain unclear.



## Background & History


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

- **[[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]]:** Introduced as a new adventuring character (player: **Zach Glass**, also Grayson's player). Met the company in New Phyrexia and helped lead the search for the Phantom Blades.
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** Assisted amid Weary's Wild Magic complications. A tread merchant accepted his **acorn** as payment for replacement caravan treads. Later surges created a duplicate, briefly transformed the duplicate into a turtle, and gave the original a fire aura and fire resistance. Some effects persisted toward the interlude; do not assign exact end times without evidence.

- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]] — Final journey:** Assisted the party in preparing and navigating the caravan out of New Phyrexia. During the pursuit by a towering skeletal creature amid a supernatural storm near Foo Fighter territory, Owlbear charged the threat and was killed. **The player confirms his death was actual, not merely an apparent defeat.** His last documented location is in the Wastes near the territorial boundary; the precise spot is unknown.

- **[[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight|Sovereign Fight]] (Session 25):** Returns during or just before the Sovereign confrontation despite his confirmed earlier death. Player recollection suggests a hellish portal, but its existence, origin, and whether the event was a resurrection are **unconfirmed**. Status returns to **Active** at this checkpoint; this does not erase the earlier death.
- **[[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight Part 2|Sovereign Fight Part 2]] (Session 26):** Participates in the prolonged fight, sustains combat effects including a reported Strength reduction, and survives the defeat.
- **[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]] (Session 27):** Helps handle one dangerous engine hemisphere and continues with the company out of the Caldera.
- **[[Campaigns/Sands of Desolation/Session Journal/To the Infinidungeon!|To the Infinidungeon!]] (Session 28):** Accompanies the mausoleum expedition, is briefly polymorphed into a baboon, and helps solve the entrance riddle according to Zach's notes. A later orb/map-related interaction is uncertain.

## Additional Details

> [!question]- Follow-up for Wiley — return mechanism
> How did Noisy Owlbear return around [[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight|Sovereign Fight]]? Was there a hellish portal, and was it a resurrection, summons, or something else? This question is open; the character was truly dead in Session 16.
