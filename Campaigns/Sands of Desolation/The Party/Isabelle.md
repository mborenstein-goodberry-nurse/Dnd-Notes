---
type: Creature
subtype: PC
date: 04-17-2026
campaign: Sands of Desolation
world: Astodan
player: Ben
race: "[[Human]]"
class: "[[Druid]]"
level: 9
status: Active
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]"
home:
location: "[[Worlds/Astodan/Places/Foo Fighters]]"
affiliations: []
relations:
  - person: "[[Falatir]]"
    type: Husband
    certainty: Confirmed
aliases:
  - Isabelle Veldrama
summary: Falatir's wife and Ben's replacement PC, who joined the party in Session 10.
image:
tags: []
---
# Isabelle

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

Isabelle Veldrama is a [[The Wanderer's Guide to the Multiverse/Races/Human|human]] druid, [[Campaigns/Sands of Desolation/The Party/Falatir|Falatir]]'s wife, and Ben's replacement party character. Her physical appearance, age, and distinctive clothing are **not reliably described** by the surviving reconstructed sources. Her abilities involve animal companions and at least one primordial or wildfire-associated companion; the exact subclass is not confirmed.


The displayed **level 9** is a provisional historical roster placeholder; her exact advancement at this checkpoint is not independently established.

## Background & History

Isabelle had a life with Falatir before the campaign's events. She died under circumstances she could not fully recall, prompting Falatir's search for fragments of her soul. In a private dream or recovered memory, she experienced an earlier formal gathering, an arrow striking her chest, and dying in someone's arms. The killer's identity was not established; the recollection included an indistinct figure with dark hair.

Falatir gave up his own life in connection with Isabelle's return, after which she joined the adventuring company. **The exact mechanism and completeness of her restoration remain uncertain.** A powerful, unnamed dark visitor later *claimed* that only two of five soul fragments had been collected and that Falatir had entered servitude through his bargain. That account is testimony from the visitor, not independently established fact.

Isabelle may have ties to the older kingdom of [[Worlds/Astodan/Places/Sirvanna|Sirvanna]], possibly even to its former monarchy; this was raised as a question in the early journal, not verified. She found the technology of [[Worlds/Astodan/Places/Anvil's Flame|Anvil's Flame]] strikingly unfamiliar and researched Sirvanna's past to understand her place in the present world.


## Personality & Motivations

- **Find Falatir and recover her past.** She declined Diane's offer to leave the dangerous expedition, hoping to recover missing memories and learn what had happened to her husband.
- **Cautious curiosity.** She was unsettled by unfamiliar machines but explored their potential, consulting her animal companions and commissioning a steel defender.
- **Protective of her companions and wary of bargains.** Her animals reacted with hostility or fear toward Thornwick. Isabelle remained cautious of him and challenged his apparent willingness to engage with an unknown dark entity, warning that even agreeing to its games might carry consequences.


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

- **[[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Falatir's Sacrifice]] (Session 9):** The original summary names Isabelle in connection with Falatir's sacrifice, but the precise moment of her introduction and what the party learned are not preserved.
- **[[Campaigns/Sands of Desolation/Session Journal/Isabelle 2, Electric Boogaloo|Isabelle 2, Electric Boogaloo]] (Session 10):** Joins the company as Falatir's wife and Ben's new PC. Demonstrates animal-companion and wildfire-related druidic abilities. Her creatures react uneasily to Thornwick. A possible former connection to Sirvanna's royalty is raised but not established.
- **[[Campaigns/Sands of Desolation/Session Journal/Amorphous Dreams|Amorphous Dreams]] (Session 11):** Feels out of place amid Anvil's Flame's advances, researches Sirvanna, and commissions a steel defender for 500 gp. In a private dream, recalls being killed by an arrow and dying in someone's arms; the attacker's identity remains unknown.
- **[[Campaigns/Sands of Desolation/Session Journal/We Meet the Fox|We Meet the Fox]] (Session 12):** Receives her commissioned steel defender, which bonds to her. Declines Diane's offer to leave the quest, determined to learn about her restoration and locate Falatir. An unnamed dark visitor claims her soul is only partially restored and Falatir is bound in service. Isabelle objects to the visitor's proposed games and bargains.


## Additional Details

> [!warning]- ✧ Out-of-Character / Reconstruction Provenance
> - **Source scope:** Reconstructed Sessions 9–12 and Batch 4 review. Session 10 has only its original short journal; Session 11–12 details were reconstructed from recordings and reviewed notes.
> - **Not independently established:** Isabelle's physical appearance, exact death circumstances or killer, a former royal title in Sirvanna, her exact druid subclass, and whether the dark visitor's claim of five soul fragments is accurate.
> - **Identity boundary:** The dark visitor was later identified as [[Worlds/Astodan/People/The Fox|the Fox]] out of character, but did not introduce itself to Isabelle by that name during Session 12. Keep the visitor's claims attributed.
> - **Chronology:** The specific words exchanged when Isabelle joined in Session 10 are unrecorded. Do not project later explanations back into Sessions 9–10.


