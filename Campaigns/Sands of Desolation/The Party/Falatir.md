---
type: Creature
subtype: PC
date: 04-20-2026
campaign: Sands of Desolation
world: Astodan
summary: Falatir sought shards connected to his lost wife Isabelle, accepted dangerous bargains, and vanished after an apparent sacrifice in Session 9; presumed dead, but his fate is unverified.
status: Presumed Dead
aliases:
- Fal
tags: []
attitude: Mixed
alignment: Neutral Evil
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Falatir's Sacrifice]]"
player: Ben
race:
class:
level: 9
home:
location: "[[Worlds/Astodan/Places/Dwarven Forge|Dwarven Forge region]]"
affiliations: []
relations:
- person: "[[Isabelle]]"
  type: "Wife; Falatir sought to restore her after her death"
  certainty: Confirmed
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

Falatir, also called **Fal**, was one of the original members of the Sands of Desolation adventuring company and a character played by Ben. He carried a private purpose throughout the party's early journey: finding the woman he had lost. His **physical appearance, race, and class are not established** in the surviving material, so those metadata fields remain blank.

## Background & History

Falatir's wife, [[Campaigns/Sands of Desolation/The Party/Isabelle|Isabelle]], had died before the events of the campaign. As the player later recalled, Falatir was seeking **fragments of her soul** in the hope of restoring her. At the campaign's outset, his companions knew only that he was searching for a pale, white-haired woman; his personal history and the role of the fragments were not fully explained to them.

His search led him into dangerous bargains. In the [[Worlds/Astodan/Places/Hallowed Bastion|Hallowed Bastion]], he accepted a shard from [[Worlds/Astodan/People/Xerac|Xerac]] in exchange for the lich's claim to Falatir's soul and service **after his death**. The shard interacted with a card Falatir already carried, producing another card showing the same woman. He was also visited privately by [[Worlds/Astodan/People/The Fox|the Fox]], who appeared familiar with his search and warned that more difficult choices lay ahead.

In [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Falatir's Sacrifice]], Falatir disappeared from the company following an apparently self-sacrificial act involving demonic minotaurs. The player's retrospective understanding is that **he gave up his life in Isabelle's place**. Isabelle subsequently joined the party, but no reliable account conclusively establishes Falatir's final physical or spiritual state. As of the last documented events, he is therefore **Presumed Dead**, not confirmed Dead. His last observed whereabouts were in the Dwarven Forge region; the precise site and what followed are unknown.

## Personality & Motivations

- **Devotion to Isabelle:** Reuniting with his lost wife drove his personal quest. He continued pursuing the soul fragments despite warnings and mounting danger.
- **Willingness to pay a personal cost:** He signed Xerac's posthumous service contract to obtain a shard and later made an apparently self-sacrificial choice tied to Isabelle's return.
- **Guarded about his search:** He revealed portions of his goal gradually. The concealed coin and the confrontation over his wedding ring strained his companions' trust, although the records do not establish every reason for his secrecy.
- **Uncertain loyalties and obligations:** His documented ties to Xerac and the Fox complicate his story; neither entity's complete intentions or control over his fate are confirmed.

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

### Sands of Desolation — Sessions 1–4

- **[[Campaigns/Sands of Desolation/Session Journal/It Begins...|It Begins...]] (Session 1):** Introduced as an original companion searching for a **pale, white-haired woman** important to him. An unidentified shadowy figure seemed familiar to Falatir; neither its identity nor its connection to his search was established.
- **[[Campaigns/Sands of Desolation/Session Journal/On Death's Door|On Death's Door]] (Session 2):** At the Hallowed Bastion necropolis, Falatir felt a strange familiarity with, or pull toward, the site. No explanation was established.
- **[[Campaigns/Sands of Desolation/Session Journal/We Give a Celestial a Piss Kink|We Give a Celestial a Piss Kink]] (Session 4):** Recognized a needed shard worn by [[Worlds/Astodan/People/Xerac|Xerac]] and signed away his **soul and service after death** to obtain it; the contract permitted the claim to pass to Xerac's successor if Xerac died. When brought near a card he carried, the shard formed a new card depicting the same unidentified woman in a different emotional state. Neither the cards' full purpose nor the woman's identity was explained to the party.

### Sands of Desolation — Sessions 6–9

- **[[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|A Second Session has Hit the Towers]] (Session 6):** During a private night watch, [[Worlds/Astodan/People/The Fox|the Fox]] brought an iron token Falatir recognized and spoke as someone familiar with his search. He referred to **two shards already obtained**, suggested more remained, and warned of difficult choices. This private discussion was not automatically known to his companions.
- **[[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Cave Divers be Like]] (Session 7):** Falatir spoke to the group about searching for **shards** and a **lost love**, confirming his grief without explaining Isabelle's identity or all the circumstances. He also watched for followers during the party's approach to the Mechanical Wonders.
- **[[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Falatir's Sacrifice]] (Session 9):** Suspicion centered on a **concealed coin** associated in the notes with a possible curse. Attempts to obtain answers led to conflict with [[Campaigns/Sands of Desolation/The Party/Thornwick|Thornwick]] and the revelation that Falatir's wedding ring was a [[The Wanderer's Guide to the Multiverse/Treasure/Ring of Mind Shielding|Ring of Mind Shielding]]. The exact coin effects and the ring's subsequent holder remain unknown. Falatir then made an apparently self-sacrificial choice amid demonic minotaurs and was no longer with the party. His fate was not confirmed at the time.

### Sands of Desolation — Sessions 10–12 (information learned after his disappearance)

- **[[Campaigns/Sands of Desolation/Session Journal/Isabelle 2, Electric Boogaloo|Isabelle 2, Electric Boogaloo]] (Session 10):** [[Campaigns/Sands of Desolation/The Party/Isabelle|Isabelle]], identified as Falatir's wife, joined as Ben's replacement character. Her arrival clarified the relationship retrospectively without establishing the exact mechanism of Falatir's sacrifice or his current whereabouts.
- **[[Campaigns/Sands of Desolation/Session Journal/We Meet the Fox|We Meet the Fox]] (Session 12):** A powerful visitor privately **claimed** to Isabelle and Thornwick that Falatir had recovered **two of five** soul fragments and offered his own soul in exchange for her return, leaving her incompletely restored. The visitor also claimed Falatir had entered servitude. These are statements by the visitor, **not independent confirmation** of the metaphysics, contract terms, or Falatir's survival.

> [!warning]- ✧ Reconstruction provenance (OOC)
> **Player recollection:** Falatir's ultimate motivation was to reunite with his deceased wife Isabelle by recovering soul fragments; the player recalls that he gave up his life in her place. This deeper explanation was **not fully established as public knowledge in the early sessions**. Keep early characters' dialogue and journals limited to what was learned at that point.
>
> **Status:** `Presumed Dead` is the player's selected assessment of Falatir's current state at the end of the Batch 6 historical checkpoint. His disappearance/sacrifice occurred in Session 9, hence `statusAsOf` still points to that last observed event. The status does **not** verify a corpse, a final death, or a release from Xerac's agreement. The later visitor's account of servitude is testimony, not proof.
>
> **Open questions:** The hidden coin is distinct from his wedding ring; no confirmed link establishes that it was the Fox's token or another earlier object. The wedding ring's later holder and the exact consequences of the Xerac contract remain unknown. Falatir's race, class, physical appearance, and home are not reliably recorded.

## Additional Details

### Unique Abilities

The surviving evidence does not identify a reliable character class, subclass, or distinctive mechanical ability for Falatir. His connection to the cards and soul fragments is **not** proof of a particular spell or class feature.

### Inventory

- **Soul-fragment cards:** Falatir possessed at least one card before the encounter with Xerac; after acquiring the shard, a second card appeared. Their present whereabouts and function are unknown.
- **Wedding ring:** A [[The Wanderer's Guide to the Multiverse/Treasure/Ring of Mind Shielding|Ring of Mind Shielding]], identified during Session 9's confrontation. It was forcibly removed or taken; **do not assume Falatir still possesses it**.
- **Concealed coin and Fox's token:** Both appear in the record, but ownership, final location, and any connection between the two are **unconfirmed**. See [[Campaigns/Sands of Desolation/Mysteries/Falatir's Concealed Coin|Falatir's Concealed Coin]] and [[Campaigns/Sands of Desolation/Mysteries/The Fox's Token|The Fox's Token]].

