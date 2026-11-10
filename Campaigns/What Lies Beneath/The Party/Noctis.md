---
type: Creature
subtype: PC
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
player: Ben
race: "[[Warforged]]"
class: "[[Sorcerer]] ([[Abberant Mind]])"
level: 7
status: Active
statusAsOf: "[[Through the Eyes of Creation]]"
home:
location: "Forest beneath [[Xurxus's Capital]]"
affiliations: []
relations: []
aliases: []
summary:
image:
tags: []
---
# Noctis

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

Noctis is a level 5 adventurer with an unusual, partly mechanical appearance. Current frontmatter records [[Warforged]] and [[Sorcerer]] ([[Abberant Mind]]); earlier descriptive prose identified him as a [[Fighter]], a class conflict requiring verification. When first seen, their face appeared divided between a person-like side and basic machinery, resembling a constructed servant. Noctis is capable of telepathic communication. Their precise construction and origins have not yet been explained.

## Background & History

Noctis followed the developing group from the tavern toward the Keeper of Knowledge's library and made contact with the party there. The identity of Noctis’s creator and the full circumstances of the mechanical imprisonment are unknown; Session 2 added his own account of a tiefling past, the Ecclesiarchy, and Enos.

## Personality & Motivations

Noctis appeared purposeful and eager to move the mission forward, pressing the group to begin the search once Darian provided a location. Little else about their personality or private motivations has been established. Their unusual capabilities should not be taken as evidence of an unconfirmed class or patron.

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

### Session 1 — [[Leaky Tights to Freaky Fights]]
Noctis joined the gathering at [[Darian Pageweather]]'s library after quietly trailing the others. Their mechanical appearance and telepathic speech distinguished them from the other adventurers. Once Darian explained the artifact's last known location, Noctis urged the party to depart and joined the search in the goblin cave.

During the later confrontation, [[Hunger of Hadar]] was cast. The live notes suspected Noctis might be a warlock, but **the caster and any additional class or patron connection should not be treated as confirmed from that speculation alone**. Noctis was with the group when it pursued the aberration and arrived in the strange wasteland.

### Session 2 — [[The Things That Haunt Us]]
Before the blackouts, Noctis spoke with apparently diminished mechanical restrictions. He told [[Kiara Bashara]] that he had been confined in his mechanical body for over a century, that he originally came from among the tieflings in the [[The Banished Lands|Banished Lands]], and that an institution called the **Ecclesiarchy** had punished him for becoming too close to [[Enos]]. He described hearing Enos's voice before the blackouts. These are Noctis's statements and experiences; the institution's full motives remain unknown.

In his vision, an apparent Enos called forth [[Zayne]], whom Noctis seemed to recognize. Both appeared frightened and uncertain in a dark void. Their eyes later bled black ichor and they claimed he had been alone since entering the domain. The figures' authenticity and claims are unverified. His vision result was marked with a question mark rather than a confirmed pass or failure.

### Session 3 — [[Through the Eyes of Creation]]
Noctis fought the [[The Mind Gourger|Mind Gourger]] with spells, including a test of [[Chill Touch]] that did no necrotic damage and was intended to interrupt the creature's healing. [[Xethra]] appeared to recognize some unusual creative divine influence connected with [[Larien]], but did not establish how Noctis's mechanical imprisonment was made. He asked whether acceptance of her offer could be deferred until he received counsel; Xethra said it could.

Upon returning home, Noctis retained greater autonomy than before entering the Wasteland: the table described this as roughly three-quarters rather than one-half control. The cause is unproven.

## Additional Details

> [!warning]- OOC theory after Session 3
> Emily said a party member with missing memories could provide insight into the Hell Incident/cracks. Noctis is a plausible but **unconfirmed** candidate: [[Noctis and the Missing Memories]].


- **Still unknown:** Noctis's origins, creator, personal goals, and the nature of their telepathic ability.
- **Class discrepancy:** The current frontmatter lists [[Sorcerer]] ([[Abberant Mind]]), while earlier prose called Noctis a [[Fighter]]. Verify against the player’s character sheet rather than treating either as an established change. A prior speculative warlock identification is not confirmation.

**Metadata discrepancy retained for verification:** The YAML lists [[Sorcerer]] ([[Abberant Mind]]) while older prose says Fighter; the player's statements and observed spells do not justify silently resolving the contradiction.

**Follow-up:** Did his programming really weaken? Can he reach Enos after the vision? What is Zayne's true role? See [[The Mystery of Noctis's Imprisonment]].
