---
type: Creature
subtype: PC
date: 03-29-2026
campaign: Sands of Desolation
world: Astodan
summary: Fairy ruler searching for his son after a hag ruined his realm; his mark matches a banner carried by duergar raiders.
status: Active
aliases:
  - Thornwick Nightshade
tags: []
attitude: Helpful
alignment: Chaotic Good
statusAsOf: "[[Falatir's Sacrifice]]"
player: Dalton
race: "[[Fairy]]"
class: "[[Fighter]]"
level: 9
home: "[[Feywild]]"
location:
affiliations: []
relations: []
image:
---
# Thornwick

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


## Background & History

- **Session 7:** Thornwick told the party that a hag destroyed his Fey kingdom, exiled him to the Material Plane, and fused a skull to his face. When the Mechanical Wonders showed the raiders' banner, **its mark matched Thornwick's own**. He identified the hag as [[Worlds/Astodan/People/Baba Eris Whitewood|Baba Eris Whitewood]], although the precise relationship between her and the duergar remains unproven ([[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]).
- **Session 9:** His growing mistrust of [[Campaigns/Sands of Desolation/The Party/Falatir|Falatir]] led to a confrontation during the dispute over the concealed coin and Falatir's wedding ring ([[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]).

## Personality & Motivations

He is seeking his son and hopes to regain what was taken from his kingdom and confront the hag associated with his exile. In Session 7 he also asked about obtaining stronger equipment; **no weapon commission or payment was confirmed** in the surviving recording.

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


### Sands of Desolation — Sessions 4–6

- **[[Battle for the Bulge|Session 5]] — Gideon's hemisphere:** In the final stretch of the battle with [[Gideon]], Thornwick succeeded on a **Strength check** and physically tore the mysterious [[The Hemisphere of Gideon|hemisphere]] out of Gideon's chest. This is confirmed by the player's retrospective recollection and the historical journal; the battle's final moments were not recorded.
- **[[A Second Session has Hit the Towers|Session 6]] — Fox token and Arthur's confidence:** During a watch at the cave, Thornwick noticed an imprint resembling the iron token previously brought by [[The Fox]]. He found the shape familiar from his past, but could not place it; it stirred a feeling of **sorrow**. In a separate private conversation, [[Arthur Morgan|Arthur]] told Thornwick that his outward appearance was a disguise adopted in response to prejudice and mistreatment. Arthur's actual appearance was not disclosed in the recording. Neither confidence was established as general party knowledge.

> [!warning]- ✧ Reconstruction provenance (OOC)
> The token's connection to Thornwick's past has **not** been explained. Do not infer an established alliance or enmity between Thornwick and the Fox. The Gideon check is player-corroborated but missing from audio. Evidence: Session 5 written account, B10 and the approved journals.

## Additional Details


### Unique Abilities

### Inventory
