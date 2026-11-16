---
type: Creature
subtype: PC
date: 03-29-2026
campaign: Sands of Desolation
world: Astodan
summary: Arthur Morgan, an adventurer from Sparrow traveling with the company in New Phyrexia.
status: Active
aliases:
- Arthur
- Soren
- Arthur Morgan
- Soren Hellborne
- Arthur/Damien/Soren
- Damien/Soren
tags: []
attitude: Helpful
alignment: Unaligned
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge]]"
player: Emily
race: Human
class: "[[Paladin]]"
level: 9
home: "[[Sparrow]]"
location: "[[Worlds/Astodan/Places/New Phyrexia]]"
affiliations: []
relations: []
image:
---
# Arthur Morgan

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

Arthur Morgan is an adventurer from [[Sparrow]]. During a private camp conversation in [[We Meet the Fox|Session 12]], he revealed to [[Diane]] and [[Weary]] that he and [[Campaigns/Sands of Desolation/Other/Damien Castellanos|Damien Castellanos]] are **distinct people sharing one physical body**, not alternate names for one person. Damien briefly introduced himself; the remainder of the party was not established as knowing this arrangement at that time.

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

- **[[It Begins...|Session 1]]:** Arthur described [[Sparrow]] as his hometown, where he lived with an elderly couple whom he regarded as family. Their precise relationship was not established in the surviving Session 1 notes; this detail comes from the player's retrospective recollection.


### Sands of Desolation — Sessions 4–6

- **[[We Give a Celestial a Piss Kink|Session 4]] — Imprisoned idol:** Arthur joined [[Cain]] in urinating toward the invisible captive and pedestal in the short tower of [[Tower of Icarus]]. The captive was later revealed to be a [[The Wanderer's Guide to the Multiverse/Bestiary/Radiant Idol|Radiant Idol]].
- **[[A Second Session has Hit the Towers|Session 6]] — Escape and confidence:** Arthur survived the collapsing bridges; an attempted giant-owl rescue briefly caught his hair. Later, during a private conversation with [[Thornwick]], Arthur admitted that the appearance he presented to others was a **disguise**, adopted after mistreatment of those perceived as different. His concealed appearance was **not revealed** in this conversation, and this admission was not established as shared party knowledge.

> [!warning]- ✧ Reconstruction provenance (OOC)
> Do not infer the details of Arthur's hidden appearance, the purpose of later aliases, or any future identity developments from this Session 6 confidence. His existing `status` and `statusAsOf` fields reflect another point in the legacy archive and are not overwritten by this historical addendum. Evidence: B07, B09–B10 and the approved journals.

### Sands of Desolation — Session 12 (private disclosure)
- On the road toward the Wastes, Arthur told [[Diane]] and [[Weary]] in private that **Arthur and Damien were separate consciousnesses sharing one body** and briefly presented Damien. He did not establish how this happened, and only part of the company was trusted with the truth. Earlier aliases (including Soren) should not be casually conflated into an explained origin.
- The original Session 12 journal retrospectively attributes two missing guild rings to Arthur/Damien. The surviving session recordings do not independently document the theft or a confession. This remains a **source attribution with uncertain proof**, not an established public allegation.

### Sands of Desolation — Session 14
- **[[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]]:** The original journal credits Arthur with finishing the undead battle in the Wastes. At the Pirate King's court he was described as dark-haired and on friendly terms with [[Worlds/Astodan/People/Graves Hellborne|Graves Hellborne]]. His necklace bore a red-stained [[Worlds/Astodan/Organizations/Phantom Blades|Phantom Blades]] emblem. The player suspected this could be [[Campaigns/Sands of Desolation/Other/Damien Castellanos|Damien]]'s form, but **which individual was in control is unconfirmed**. Diane and Weary had learned the shared-body secret privately in Session 12; do not extend that knowledge to the entire party.

## Additional Details

### Shared Body — Identity Reference

- **Party roster:** This is the only Party Member note for the shared body; Damien has an independent [[Campaigns/Sands of Desolation/Other/Damien Castellanos|supplemental biography]], not a second roster entry. This is an organizational choice, not a statement that Arthur and Damien are the same person.
- **Private disclosure:** Arthur and Damien described themselves as distinct consciousnesses in [[We Meet the Fox|Session 12]]. Their exact origin and how their coexistence works were not established in that scene.
- **Possible later appearance:** The original [[Blueberry Weary|Session 14]] journal speculates that Arthur may have appeared as Damien at the Pirate King's court; **the identity in control is unconfirmed**.

> [!warning]- ✧ Out-of-Character Identity & Link Notes
> The campaign note-taker confirms Arthur is a **changeling**. The existing displayed `race: Human` metadata remains unchanged for now, reflecting Arthur's earlier presentation rather than establishing his actual race as publicly known.
>
> The campaign note-taker also confirms that Arthur and Damien sometimes compete for control and have substantially overlapping, but not identical, personal histories. Do not invent which individual experienced an ambiguous event.
>
> Legacy aliases involving **Soren** or combined names remain on this note temporarily so links in later, unreconstructed journals keep resolving. They do **not** establish that Soren was known by Session 15.

### Unique Abilities

### Inventory
