---
type: Creature
subtype: PC
date: 04-20-2026
campaign: Sands of Desolation
world: Astodan
summary: Former companion whose search for a pale, white-haired woman led into a mysterious sacrifice and departure in Session 9; his fate is not confirmed as death.
status: Departed
aliases:
  - Fal
tags: []
attitude: Mixed
alignment: Neutral Evil
statusAsOf: "[[Falatir's Sacrifice]]"
player: Ben
race:
class:
level: 9
home:
location:
affiliations: []
relations:
  - person: "[[Xerac]]"
    type: "Holds Falatir's posthumous soul-service contract"
    certainty: Confirmed
  - person: "[[The Fox]]"
    type: "Familiar private visitor; extent of sponsorship uncertain"
    certainty: Confirmed
image:
---
# Falatir

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

- **Session 7:** In conversation with the party and the Mechanical Wonders' founders, Falatir spoke of searching for a **lost love**. Companions openly mentioned **shards**, but the woman's identity and the meaning of those fragments were not established for the group ([[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]).
- **Session 9:** During a dispute about a concealed coin, Falatir's **wedding ring** was revealed to be a [[The Wanderer's Guide to the Multiverse/Treasure/Ring of Mind Shielding|Ring of Mind Shielding]]. The notes do not confirm who kept the ring or whether a finger was injured. Falatir then made an apparently self-sacrificial choice involving demonic minotaurs and was **gone from the party** afterward ([[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]). His death is **not confirmed**.

## Personality & Motivations

The party knows that Falatir is searching for a lost love, and has heard mention of shards. His exact objective and the role of the mysterious woman remain unresolved in the surviving Session 9 account. See [[Campaigns/Sands of Desolation/Mysteries/Falatir's Search|Falatir's Search]].

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

- **[[We Give a Celestial a Piss Kink|Session 4]] — Xerac's bargain:** At the [[Hallowed Bastion]], Falatir recognized a shard worn by [[Xerac]] and agreed that his **soul and service would belong to Xerac after his death** in exchange for it. The contract stated that the claim could pass to Xerac's successor if Xerac died; no successor was named. Falatir signed despite companions' warnings. Bringing the shard near an existing card caused it to merge and form a **new card**, apparently showing the same pale, white-haired woman in a different emotional state. Neither the cards' purpose nor her identity was explained to the party. See [[Falatir's Search]].
- **[[A Second Session has Hit the Towers|Session 6]] — Private meeting with [[The Fox]]:** During the first watch outside the Dwarven Forge, the Fox approached Falatir, left an iron token he appeared to recognize, and spoke as someone familiar with his search. The Fox mentioned **two shards already obtained** and more still needed, warned that difficult choices lay ahead, and departed. Falatir remained determined to find *her* again. This exchange was private; its contents were not established as general party knowledge.

> [!warning]- ✧ Reconstruction provenance (OOC)
> The player's retrospective account suggests a deeper personal motivation involving a deceased wife and soul shards. These specifics were not clearly disclosed to the whole party by Session 6 and are deliberately **not** presented here as Falatir's public explanation. Evidence: B06, B10 and the approved Sessions 4 and 6 journals. The identity and powers of the cards, the Fox's ultimate goals, and any additional contract clauses are unresolved.

## Additional Details


### Unique Abilities

### Inventory

> [!warning]- ✧ Out-of-Character / Reconstruction Provenance (Batch 3)
> The player confirms retrospectively that Falatir sacrificed his place in life for **Isabelle, his wife**, but is unsure how much of that was disclosed in Session 9. Do not treat her relationship to Falatir or the full meaning of the exchange as party knowledge until Batch 4 establishes when they learned it. His previous frontmatter `statusAsOf: [[On Death's Door]]` referred to a later session and has been replaced with the last confirmed Session 9 appearance.
