---
type: Creature
subtype: PC
date: 04-09-2026
campaign: Sands of Desolation
world: Astodan
player: Mason
race: null
class: Cleric (Life Domain) / Druid (Circle of Stars, 2 levels)
level: null
startingLevel: 9
status: Active
statusAsOf: null
home: '[[Sun Home]]'
location: null
affiliations: []
relations:
- person: '[[Weary]]'
  type: Husband
  certainty: Confirmed
- person: '[[Gavin Aceso]]'
  type: Adoptive father
  certainty: Confirmed
aliases:
- Diane Aceso Quest
- Diane Quest
summary: Devotee of Apollo and Life Domain cleric with two Circle of Stars druid levels; Weary's wife and traveling companion.
image: null
tags: []
---
# Diane

> [!fas-infobox] ✧ Party Member Overview
> **Player:** `VIEW[{player}]`
>
> **Race:** `=this.race`
>
> **Class:** `=this.class`
>
> **Level:** `VIEW[{level}]`
>
> **Status:** `VIEW[{status}]`
>
> **Home:** `=this.home`
>
> **Last Known Location:** `=this.location`

## Description

At the start of Sands of Desolation, Diane was a **level 9 character (Life cleric 7 / Stars druid 2)**, according to the original character plan. Her current level remains to be verified from her sheet.

Diane Aceso Quest was raised in [[Sun Home]], a sub-kingdom of [[Sirvanna]] whose Sun Religion venerates Apollo. She is a Life Domain cleric with two levels in Circle of Stars druid. Her druid training includes *Goodberry*, which she combines with her cleric abilities.


## Appearance & Personal Details

The original illustrated character reference (undated within the recovered document) depicts Diane with **blonde hair and blue eyes**, with burn scars on her **neck, shoulder, and hip**. Her battle-worn armor mixes leather and iron with red, orange, and gold Apollo imagery; she wears a linear sun holy symbol, carries a mace, and bears a shield marked with a sun and an eye. These are design descriptions from the historic notes, not proof that every detail was already present in Session 1.

Her recorded hobbies include historical/non-fiction reading, board games, puzzles, journaling with sketches, gardening, and knot-tying. Expressions she uses include *By the Sun* and *May the sun light your way*.

*Source: original Google Docs information sheets, pp. 5–6.*

## Background & History

Diane's original notes list **[[Meridian]]** as her hometown. They place Meridian in [[Sirvanna]], but do not establish whether the dragon-damaged village is Meridian itself.

Diane was adopted at a young age by [[Gavin Aceso]] and grew up relatively sheltered. She aspired to serve as a cleric, strengthened by her connection to the sun and Apollo.

A dragon attacked her village, burning large parts of it and severely burning Diane. The attack left visible scars and profound trauma. The dragon's identity and the details of the attack are not established in this pre-campaign account.

Before the original Astodan-series campaign, Diane met [[Weary]] at a tavern. They began traveling together, bringing her into a wider world she had previously experienced only in limited ways.


## Personality & Motivations

Diane begins this history with a sheltered perspective and fear rooted in her experience of the dragon attack. Her faith and desire to heal are important to her identity. The old character description portrays her as kindly and straight-laced, with a comforting bedside manner, an unease around fire, and a sense of humor brought out by Weary. These are undated design notes, not a claim about her character growth in Session 1. Her relationship with Weary develops from companionship into a mutual commitment to protect each other. Do not assume her later confidence, beliefs, or healing from trauma were already established at the start of the campaign.


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

### Before the first campaign

Raised in [[Sun Home]] by her adoptive father [[Gavin Aceso]], Diane trained as a cleric of Apollo. A devastating dragon attack scarred her physically and emotionally. She eventually met [[Weary]] in a tavern and traveled with him.

### First Astodan-series campaign

Diane and Weary were among those sent into [[Resurgence|the Resurgence]] to stop another demon-summoning ritual. Weary carried a sword containing the malicious entity [[Havoc]], but its influence was kept from Diane by Havoc itself; whether Diane later learned the full truth is not established by this account. At the confrontation with [[Warrick]], the ritual instead produced massive necrotic spires across the world.

### Between campaigns — roughly one year

Diane and Weary remained together, married, and spent time in [[Sun Home]]. Their traveling home, the [[Aceso Aid]] caravan, may have been given to them after their marriage; the timing is the player's tentative recollection (2026-11-05), not a dated event. They traveled to [[Tangambalanga]] when correspondence from Weary's parents abruptly stopped. Finding his family missing, they searched unsuccessfully before being summoned to [[Isabel's Castle]]. The disappearance was **unresolved when Sands of Desolation began**.

See [[Campaigns/Sands of Desolation/Session Journal/Session 0]] for the shared chronology. History comes from the player's retrospective account (2026-11-05), enriched by the original Google Docs information sheets (especially pp. 5–6, 38, 43, 46). Since the recovered document was maintained during later sessions, not every undated design detail can be placed precisely before Session 1.


## Additional Details

> [!warning]- ✧ Out-of-Character Knowledge
> The pre-campaign history is based on a retrospective player account. Preserve the order in which later-session information becomes known; do not backfill future reveals into Session 1. Do not assume Diane knew about Havoc while Weary was magically prevented from telling her.
