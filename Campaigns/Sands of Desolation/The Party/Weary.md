---
type: Creature
subtype: PC
date: 04-09-2026
campaign: Sands of Desolation
world: Astodan
player: Mason
race: Tiefling
class: Sorcerer (homebrew Wild Magic)
level:
startingLevel: 9
status: Active
statusAsOf:
home: "[[Tangambalanga]]"
location:
affiliations: []
relations:
  - person: "[[Diane]]"
    type: Wife
    certainty: Confirmed
  - person: "[[Warrick]]"
    type: Younger brother
    certainty: Confirmed
  - person: "[[Wonder]]"
    type: Sister-in-law
    certainty: Confirmed
  - person: "[[Lunatir]]"
    type: Private encounter after Wild Magic surge; patron influence not fully understood
    certainty: Confirmed
aliases:
  - Weary Quest
  - Weary Consistently Chaotic Oddball Quest
summary: Tiefling Wild Magic sorcerer from Tangambalanga, husband of Diane; scarred by a soul-consuming sword containing Havoc.
image:
tags: []
---
# Weary

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

The original character plan lists Weary as **Sorcerer 9 at the beginning of Sands of Desolation**. His current level remains to be verified from his sheet.

Weary Quest is a tiefling sorcerer with innate Wild Magic, born into a prominent, quasi-noble metalworking family in [[Tangambalanga]], within the [[Griffin Empire]]. The family smelted and crafted fine goods; the heat tolerance associated with tieflings suited the work.

Weary uses the campaign-specific sorcerer subclass **[[Wild Magic - Revised|Wild Magic - Revised]]** from *The Dungeon Coach's DC Wild Magic Bundle* (v2.0). Rather than relying on standard 5e surge mechanics, this variant uses a deteriorating **Surge Die** for casting spells of 1st level or higher, Metamagic-enhanced surge risk, and a d300 surge table. Its subclass progression provides greater opportunities to shape or control surges. The full mechanical quick reference is in [[Weary - Character Reference]].

*Rules source: DC Wild Magic Bundle, v2.0, pp. 3, 5-9, 17 (user-provided PDF). These rules describe increasing instability during casting; Weary's childhood experience of suppressed, pent-up magic is player-established backstory rather than a feature specified by this PDF.*


## Appearance & Personal Details

His original illustrated description depicts **purple skin, dark-blue hair, and curling horns behind his ears**. His natural left eye is blue; his right eye is red. The Havoc-related discoloration extends from his right hand and arm across his right chest. The older character design describes a silver-white shirt, blue vest, brown split-back coat for his tail, and a **family pendant: a gold-covered blood vial marked with a Q**. The document does not establish whether this is the same vial his father once used to manage surges.

His fidgeting, animated tail, flamboyant humor, and guardedness with strangers are emphasized in the old notes. His hobbies include card tricks, acting with *Disguise Self*, illusions, clothing and fashion, reading adventures, and gambling. His full name is **Weary Consistently Chaotic Oddball Quest**. These descriptions are sourced to the historic character design; the precise time each feature or habit arose is not independently dated.

*Source: original Google Docs information sheets, pp. 7–8.*

## Background & History

As a child, Weary enjoyed the ease and power of his magical ability, but his unpredictable surges posed risks to himself and others. His father, [[Ernon Quest]], experimented with a blood vial and other methods to manage the problem, eventually forbidding Weary from using magic at all.

His mother is named [[Divari Quest]] in the recovered family notes (which contain a contradictory parental-role label for Divari).

A bitter rivalry developed between Weary and his younger brother, [[Warrick]]. During a fight between them, Warrick pushed their father aside when he tried to intervene. Weary accidentally unleashed years of pent-up magic in a catastrophic surge, scarring Warrick, breaking one of his horns, and warping part of the family home. Overwhelmed by guilt, Weary fled.

While traveling, Weary met [[Diane]] at a tavern; they began exploring the world together. He came to use magic more often despite the continuing surges, fearing that prolonged suppression could cause another devastating release.


## Personality & Motivations

Before meeting Diane, Weary enjoyed travel but feared taking responsibility. His guilt about injuring Warrick and his concern about the danger of uncontrolled magic remain central to his history. He uses magic proactively rather than suppressing it, despite the risk of individual surges.

His experience with [[Havoc]] made him reconsider how he lived. Marrying Diane marked a commitment to mutual protection, not the resolution of all his fears or family troubles.


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

Weary grew up in [[Tangambalanga]], where his family's craft and status gave him a privileged but troubled upbringing. His uncontrollable Wild Magic, the failed efforts to suppress it, and the fight that injured his brother [[Warrick]] led him to run away. He later met [[Diane]] and traveled with her.

### First Astodan-series campaign

During the mission in [[Resurgence|the Resurgence]], Weary found an exceptionally powerful sword containing [[Havoc]]. The entity whispered to him, urged harm, progressively consumed his soul, and prevented him from confiding in Diane. Weary could not rid himself of the weapon. During the final confrontation with Warrick, [[Wonder]] took the sword from Weary, leaving a red mark from his **right hand to his right eye**, understood as a scar upon his soul. Warrick's demon-summoning ritual instead produced massive necrotic spires across the world.

### Between campaigns — roughly one year

Weary and Diane married and lived for a time in [[Sun Home]]. Weary maintained written contact with his parents after having fled his family home, but their replies suddenly stopped. He and Diane returned to [[Tangambalanga]], discovered his family missing, and searched without success. They were subsequently summoned to [[Isabel's Castle]]. His family's fate was **still unknown at the start of Sands of Desolation**.

See [[Campaigns/Sands of Desolation/Session Journal/Session 0]]. This foundation comes from the player's retrospective account (2026-11-05), not a recovered first-campaign transcript. Later revelations should be added in the sessions in which they were learned.


### Sands of Desolation — Sessions 4–6

- **[[We Give a Celestial a Piss Kink|Session 4]] — The hidden towers:** Weary cast *[[The Wanderer's Guide to the Multiverse/Spells/Dispel Magic|Dispel Magic]]* to expose the concealed [[Tower of Icarus]]. The corrupted magical wellspring triggered a harmful Wild Magic surge that summoned a hostile [[The Wanderer's Guide to the Multiverse/Bestiary/Glabrezu|Glabrezu]]. Later, he attempted to join Arthur and Cain in their antics around the imprisoned idol, but [[Diane]] stopped him.
- **[[A Second Session has Hit the Towers|Session 6]] — Hemisphere and escape:** After [[Thornwick]] recovered the hemisphere, Weary cast *[[The Wanderer's Guide to the Multiverse/Spells/Nystul's Magic Aura|Nystul's Magic Aura]]* to conceal its magical signature. He used *[[The Wanderer's Guide to the Multiverse/Spells/Vortex Warp|Vortex Warp]]* to move Diane across a gap and his [[The Wanderer's Guide to the Multiverse/Treasure/Astral Shard|Astral Shard]] to reposition himself. He then cast twinned *[[The Wanderer's Guide to the Multiverse/Spells/Polymorph|Polymorph]]* so that he and Diane could attempt to rescue their falling companions as giant owls. Later, his *[[The Wanderer's Guide to the Multiverse/Spells/Mordenkainen's Private Sanctum|Mordenkainen's Private Sanctum]]* triggered a neutral Wild Magic surge during the cave camp.
- **Session 6 — Private encounter with [[Lunatir|Lunitari]]:** Weary experienced an apparent future life with an older Diane, then recognized that the scenario was false. The visitor revealed herself as Lunitari, associated with magic, illusions, knowledge and trickery, and said she had answered his magical call. Weary objected to her impersonation of his wife. The DM explained out of character that the earlier neutral surge had attracted a **neutral patron**; the exact ongoing obligations and effects were not disclosed. Weary did **not** share the encounter with the whole party at this checkpoint.

> [!warning]- ✧ Reconstruction provenance (OOC)
> Lunitari's name was explicitly spelled out in B10; her existing file is still `Lunatir.md`. The patron outcome is OOC mechanical context rather than a publicly known party revelation. No additional spells, subclass abilities, or permanent new character powers have been inferred. Evidence: B06–B07, B09–B10 and the approved journals.

## Additional Details

[[Aceso Aid]] — Weary and Diane's shared caravan, drawn in and described by the original character notes (p. 9). The player tentatively dates receiving it to after their marriage.


> [!warning]- ✧ Out-of-Character Knowledge
> The pre-campaign history is based on a retrospective player account. Preserve the order in which later-session information becomes known; do not backfill future reveals into Session 1. Do not assume Diane knew about Havoc while Weary was magically prevented from telling her.
