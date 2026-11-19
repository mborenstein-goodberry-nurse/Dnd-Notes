---
type: Creature
subtype: PC
date: 04-09-2026
campaign: Sands of Desolation
world: Astodan
player: Mason
race: '[[Human]]'
class:
- '[[Cleric]]'
- '[[Druid]]'
subclass:
- '[[Life Domain]]'
- '[[Circle of Stars]]'
level: 9
startingLevel: 9
status: Active
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]"
home: '[[Sun Home]]'
location: '[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]'
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
> **Status:** `INPUT[inlineSelect(option(Active), option(Departed), option(Retired), option(Missing), option(Presumed Dead), option(Dead), option(Player Departed), option(Unknown)):status]`
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

See [[Campaigns/Sands of Desolation/Session Journal/Session 0|Session 0]] for the shared chronology. History comes from the player's retrospective account (2026-11-05), enriched by the original Google Docs information sheets (especially pp. 5–6, 38, 43, 46). Since the recovered document was maintained during later sessions, not every undated design detail can be placed precisely before Session 1.

- **[[We Give a Celestial a Piss Kink|Session 4]] — Tower approach:** Diane restrained [[Weary]] when he tried to join the antics at the concealed [[The Wanderer's Guide to the Multiverse/Bestiary/Radiant Idol|Radiant Idol]] pedestal. She interpreted a Celestial inscription suggesting the prisoner was bound until someone desired its worth.
- **[[Battle for the Bulge|Session 5]] — The eye:** In the middle tower, Diane alone saw a **moving golden eye** following the group along the ceiling. Other companions could not perceive it. She also felt an overwhelming, frightening presence toward the central tower; she eventually continued after a companion helped calm her. The eye disappeared near Gideon's chamber. Its relationship to [[Gideon]] remains an [[The Golden Eye of Icarus|open mystery]], not a confirmed identification.
- **[[A Second Session has Hit the Towers|Session 6]] — Escape and the road:** Weary teleported Diane across a broken bridge, and later twinned *Polymorph* transformed them both into giant owls to rescue falling companions. Diane suggested heading toward the [[Dwarven Forge]] to seek [[Drax]] before attempting the [[Luciferian Caldera]]. She told the group about the earlier rose-masked woman's encounter, without confirming the woman's identity.
- **Session 6 — Private vision:** During the cave watch, Diane experienced a terrifying vision of her childhood village burning, including her mother's death and her father's rescue of her. [[Weary]] comforted her afterward. Diane later prayed to Apollo and felt reassured. This is a revisiting of her past, **not evidence of another present-day attack**.

> [!warning]- ✧ Reconstruction provenance (OOC)
> The golden eye's controller is not identified in the recordings. Diane's traumatic memory is her individual experience; do not assume the party witnessed it or that the vision resolves ambiguities in the older pre-campaign biographies. Evidence: B07–B10 and the approved Sessions 4–6 journals.

- **[[Amorphous Dreams|Session 11]]:** Dreamed of the rose-masked woman, later named **[[Pleasure]]** to Diane by [[Thrax]]. In a separate private conversation, Thrax helped Diane recover a childhood memory of a **red-and-black, two-headed dragon** destroying her home. [[Gavin Aceso]], her adoptive father, carried her from the danger. The dragon's identity and the original cause of her memory seal remain unverified. Neither this private encounter nor the identification of Pleasure automatically becomes party-wide knowledge.
- **[[We Meet the Fox|Session 12]]:** During a later camp watch, Diane broke [[Weary]]'s enchantment using *[[The Wanderer's Guide to the Multiverse/Spells/Dispel Magic|Dispel Magic]]* and suffered her own frightening dragon-related vision. She expressed doubts about the memories recovered with Thrax. In a private conversation Arthur revealed to Diane and Weary that he and Damien were distinct consciousnesses sharing one body. Do not generalize this secret to the whole party.

- **[[Campaigns/Sands of Desolation/Session Journal/We find Thornwick's Son|Session 13]]:** Her second *[[The Wanderer's Guide to the Multiverse/Spells/Scrying|Scrying]]* attempt revealed [[Thornwick]]'s son alive in an unidentified castle, in the company of an intelligent winged undead. The undead detected and destroyed the scrying sensor. After entering [[Worlds/Astodan/Places/The Wastes|the Wastes]], Diane struggled to channel stronger divine magic but could still cast [[The Wanderer's Guide to the Multiverse/Spells/Goodberry|Goodberry]]. She recognized the augmented undead as similar to enemies encountered with Weary on the approach to [[Worlds/Astodan/Places/Resurgence|the Resurgence]] in an earlier campaign (retrospective recollection).
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** Helped keep [[Weary]] alive when a Wild Magic surge gave him gills and prevented him from breathing air. She cast [[The Wanderer's Guide to the Multiverse/Spells/Cure Wounds|Cure Wounds]] during the emergency in [[Worlds/Astodan/Places/New Phyrexia|New Phyrexia]].

- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]] — First message in New Phyrexia:** As Diane and the party left Graves’s meeting room, [[Worlds/Astodan/People/Pleasure]] approached to meet him and **Pleasure personally slipped a physical note into Diane’s pocket** (player-confirmed clarification). It referred to her home, [[Sun Home]], and suggested a future encounter. Diane alone could read its contents; it appeared blank to Noisy Owlbear. Pleasure is the known **deliverer**, but whether she authored the note remains unconfirmed.
- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]] — Second message at the Foo Fighter boundary:** Diane received a **direct, Sending-like warning** not to trespass as the storm failed to cross into Foo Fighter territory. The warning was distinct from the physical note; its sender and actual spell remain unknown in-character.
- **[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]:** Traveled into Foo Fighter territory and encountered the aftermath of the Outskirts settlement massacre; the attacker’s identity was not established by the party.

> [!warning]- ✧ Player-only lead about the boundary warning
> The player recalls OOC DM hints naming **Skeletor**, his older dragon-like brother **Anuberath**, and younger brother **Asriel** as major antagonistic figures. The player **believes Anuberath may have delivered the boundary warning**. This is not a confirmed sender identification and was not known to Diane in-character. The hints do not connect either brother to Pleasure’s separately delivered physical note.

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19):** Stayed outside [[Worlds/Astodan/People/Narci|Narci]]'s grove with [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] and [[Worlds/Astodan/People/Warrick|Warrick]] during the brothers' uneasy reunion.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** Was among those drawn toward [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Havoc's Sword]] in the Caldera. Weary used *[[The Wanderer's Guide to the Multiverse/Spells/Hold Person|Hold Person]]* on her in the escalating conflict.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** Healed Weary and [[Campaigns/Sands of Desolation/The Party/Grayson|Grayson]] after the mound was destroyed. The extent of any lingering sword influence is not documented.

- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** After the interrupted rest in Cinderfang's former lair, continued with the group through the Caldera. She was deeply distressed during the confrontation with the dragon.
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** Remained with [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] and [[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]] while another group investigated the obelisk.
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]:** Rejoined the others and questioned [[Worlds/Astodan/People/Luz|Luz]] about her memories, family and safety. Considered *[[The Wanderer's Guide to the Multiverse/Spells/Speak with Dead|Speak with Dead]]*, but the magic did not apply to a non-corpse. Her religious insight was notably strong, without a definite recorded revelation.

## Additional Details

> [!warning]- ✧ Out-of-Character Knowledge
> The pre-campaign history is based on a retrospective player account. Preserve the order in which later-session information becomes known; do not backfill future reveals into Session 1. Do not assume Diane knew about Havoc while Weary was magically prevented from telling her.
