---
type: Creature
subtype: PC
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
player: Dalton
race: "[[Elf|Drow]]"
class:
level: 5
status: Active
statusAsOf: Session 0
home:
location: "[[Stal'hgite]]"
affiliations:
  - organization: "[[Church of Xurxus]]"
    status: Active
    certainty: Confirmed
    role: Agent of the church/council (self-described)
relations:
  - person: "[[Kiara Bashara]]"
    type: Traveling companion
    certainty: Confirmed
  - person: "[[Xurxus]]"
    type: Patron deity
    certainty: Confirmed
aliases: []
summary: A drow operative devoted to Xurxus, traveling with Kiara to recover a stolen artifact.
image:
tags: []
---
# Revelar

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

Revelar is a **drow** and a level 5 adventurer. His exact class has not been confirmed. In the introductory roleplay, he appeared with pale gray skin and white hair, wearing a red hood and mask, a tattered crimson cloak, and carrying a crossbow, blades, and vials. These details come from his supplied character artwork and roleplay presentation.

## Background & History

Revelar serves **[[Xurxus]]** and describes himself as the church or council's **“viper,”** going wherever they direct him. He also describes himself as a killer for hire. His past, exact position in the church, and the scope of his assignments are not yet known.

Xurxus selected Revelar alongside **[[Kiara Bashara]]** to recover a stolen artifact. They have arrived in **[[Stal'hgite]]**, in the Iron Hills, to seek the **Keeper of Knowledge**, beginning with the local tavern.

## Personality & Motivations

Revelar is pragmatic and comfortable discussing lethal force. He speaks with dry humor; in the introductory roleplay he complained about the brightness of the sunlight and drew his cowl over his head.

He and Kiara appear to disagree on the boundaries of mercy. When Kiara insisted she must offer mercy even to suspected goblin thieves, Revelar suggested they may have **“differing definition of what we call mercy.”** He nonetheless accepted that their tenets differ and emphasized their shared assignment.

**Current objective:** Fulfill Xurxus's instruction to recover the stolen artifact. His deeper personal motivations remain unknown.

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

- **[[Kiara Bashara]]:** Fellow chosen follower of Xurxus and current traveling companion. Their contrasting views on mercy are apparent, but they share the mission.
- **[[Xurxus]]:** Deity he serves; Revelar describes himself as an operative of the church or council.

## Campaign History & Knowledge

### Before Session 1
- Xurxus assigned Revelar and Kiara to recover a stolen artifact that could have dire consequences in the wrong hands.
- Revelar referred to the artifact as **“volatile”**; this is his characterization, not a confirmed property.
- Goblins are suspected of involvement, but their responsibility is unconfirmed.
- The pair were directed to find the Keeper of Knowledge in Stal'hgite, beginning at the tavern.
- In introductory conversation, Revelar and Kiara recognized their different approaches to mercy.

### Questions to follow
- What is Revelar's actual class and professional background?
- What exactly does his role as the church or council's “viper” involve?
- How does he interpret Xurxus's principle of balance?

## Additional Details

### Information awaiting confirmation
- Player name, class, hometown, and personal history.
- Whether “killer for hire” describes formal employment by the church or a broader profession.
- Exact details of the artifact and suspected thieves.

### Roleplay reference
Revelar presents a practical, unsentimental counterpoint to Kiara's idealism. Do not assume he is hostile to her: their introductory exchange established disagreement alongside cooperation.

## Session 1 Developments

Revelar challenged the tavernkeeper's ale price, threatened [[Nox]] during the library encounter, used a disguise to impersonate a goblin named Joe, and killed unconscious goblins after the first cave fight. His readiness to use force contrasted with [[Kiara Bashara]]'s diplomatic approach. He used [[Darkness]] during the later confrontation with the goblin leader.
