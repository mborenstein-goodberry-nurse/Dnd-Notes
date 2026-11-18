---
type: Creature
subtype: PC
date: 11-18-2026
campaign: Sands of Desolation
world: Astodan
player: Ryan
race: "[[The Wanderer's Guide to the Multiverse/Races/Aasimar|Aasimar]]"
class: "[[The Wanderer's Guide to the Multiverse/Classes/Bard/Bard|Bard]]"
level: 9
status: Active
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]]"
home:
location: "[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]"
affiliations: []
relations: []
aliases: []
summary: Aasimar bard introduced by Warrick and traveling with the company into the Luciferian Caldera.
image:
tags: []
---
# Linus Lightfoot

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

Linus Lightfoot is an **aasimar bard** who joined the company shortly before its entry into the Luciferian Caldera. In his recorded character introduction, he described himself as **strikingly attractive and attentive to his appearance**, with a theatrical manner of presenting himself. His precise age, clothing, and identifying physical traits are not securely documented.

## Background & History

Linus introduced himself as a **former courtier from a kingdom he had left or been exiled from**, following an offense against its king. He also expressed a desire to **return to that kingdom**, although the place's name, his actual standing at court, and the circumstances preventing his return were not established. [[Worlds/Astodan/People/Warrick|Warrick]] brought him to the company at the tunnel entrance in [[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Session 20]]. The table offered several comic explanations for why Linus was being sent away from Foo Fighter territory; those improvisations should not be turned into settled criminal history.

## Personality & Motivations

Linus's own introduction portrays him as **flamboyant, image-conscious, and socially confident**, interested in making an impression on others. He mentioned deception and intimidation as parts of his social repertoire, though these are self-descriptions rather than proven habits. His clearest stated personal ambition is to **return to his former kingdom**. During his first expedition he offered healing and Bardic Inspiration to companions, and his fear during Arthur's supernatural display was an encounter effect, not proof of a fixed cowardly disposition. The details of his exile, loyalties, family, and long-term plans still need player confirmation.

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

- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** Brought to the company by [[Worlds/Astodan/People/Warrick|Warrick]] before the tunnel expedition. Linus described himself as an exiled courtier and joined as an aasimar bard. In the Caldera he offered **Healing Hands** to an injured ally and **Bardic Inspiration** during an effort to identify the sword; some details of the actions in the noisy audio are imperfectly transcribed.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** Present through the confrontation's aftermath. The handwritten notes probably refer to him when recounting a strike by the person called "Haley" (likely Amorpha), but the cause and exact sequence remain uncertain.

## Additional Details
