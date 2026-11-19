---
type: Creature
subtype: PC
date: 03-29-2026
campaign: Sands of Desolation
world: Astodan
summary: Exiled fairy king seeking his son; he attributes his ruined kingdom and skull curse to Baba Eris Whitewood.
status: Active
aliases:
- Thornwick Nightshade
tags: []
attitude: Helpful
alignment: Chaotic Good
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]"
player: Dalton
race: '[[Fairy]]'
class: '[[Fighter]]'
level: 9
home: '[[Feywild]]'
location: '[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]'
affiliations: []
relations:
- person: '[[Worlds/Astodan/People/Baba Eris Whitewood]]'
  type: Enemy; Thornwick attributes his exile and skull curse to her
  certainty: Confirmed
image: null
---
# Thornwick

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

Thornwick Nightshade is a **fairy and exiled king** whose face bears a **skull fused to it by a curse**. He wields an extraordinary ancient axe that was later enchanted to hover at his side. His family's signet ring is a powerful personal reminder of the kingdom and son taken from him; the fused skull-mask was **not** removed when a separate axe-related transformation was dispelled. His exact clothing, stature, and other physical features beyond his fairy nature and curse are not firmly documented.

## Background & History

Thornwick says that [[Worlds/Astodan/People/Baba Eris Whitewood|Baba Eris Whitewood]] ruined his kingdom, exiled him from the Fey realm, and attached the skull to his face. After the party defeated her in [[Campaigns/Sands of Desolation/Session Journal/Isabelle 2, Electric Boogaloo|Session 10]], his curse and some of his lost history remained unresolved. Recovering his signet ring in [[Campaigns/Sands of Desolation/Session Journal/Amorphous Dreams|Session 11]] brought back memories of his family, including a missing son. [[Campaigns/Sands of Desolation/The Party/Diane|Diane]] later scryed on the son in [[Campaigns/Sands of Desolation/Session Journal/We find Thornwick's Son|Session 13]] and saw him alive in an unidentified castle, near a powerful winged undead being. The son remains unreunited with Thornwick, and the location and allegiance of those around him remain unknown.

## Personality & Motivations

**Finding and protecting his son** is Thornwick's clearest ongoing personal goal. His reactions to his family ring, the dream visions, and Diane's scrying show that the loss of his family weighs heavily on him. He is **direct and willing to intervene physically**: he tore Gideon's hemisphere free, challenged Falatir during the coin dispute, helped Weary up the Caldera steps, and tried to block Arthur from reaching the sword. His confrontation with Baba Eris and continued concern over the skull-mask make uncovering the causes and consequences of his exile a significant thread. The record does not yet prove a concrete plan to reclaim his throne or restore his kingdom; keep those possibilities separate from established motivations.

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

- **[[Battle for the Bulge|Session 5]] — Gideon's hemisphere:** In the final stretch of the battle with [[Gideon]], Thornwick succeeded on a **Strength check** and physically tore the mysterious [[The Hemisphere of Gideon|hemisphere]] out of Gideon's chest. This is confirmed by the player's retrospective recollection and the historical journal; the battle's final moments were not recorded.
- **[[A Second Session has Hit the Towers|Session 6]] — Fox token and Arthur's confidence:** During a watch at the cave, Thornwick noticed an imprint resembling the iron token previously brought by [[The Fox]]. He found the shape familiar from his past, but could not place it; it stirred a feeling of **sorrow**. In a separate private conversation, [[Arthur Morgan|Arthur]] told Thornwick that his outward appearance was a disguise adopted in response to prejudice and mistreatment. Arthur's actual appearance was not disclosed in the recording. Neither confidence was established as general party knowledge.

> [!warning]- ✧ Reconstruction provenance (OOC)
> The token's connection to Thornwick's past has **not** been explained. Do not infer an established alliance or enmity between Thornwick and the Fox. The Gideon check is player-corroborated but missing from audio. Evidence: Session 5 written account, B10 and the approved journals.

- **[[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]] — Thornwick's account of Baba Eris:** He told companions that [[Worlds/Astodan/People/Baba Eris Whitewood|Baba Eris Whitewood]], a hag from the Fey realm, destroyed his kingdom, exiled him to the Material Plane, and fused a skull to his face. He woke from a troubling vision of a hag and warned that "she is coming." These are Thornwick's reported experiences and accusations; the hag was not physically encountered during this session.
- **[[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]] — Matching symbol:** When [[Worlds/Astodan/People/Drax|Drax]] and [[Worlds/Astodan/People/Thrax|Thrax]] displayed the banner carried by duergar raiders, Thornwick recognized the emblem as matching the mark on his flesh. The connection suggests Baba Eris may be involved, but it does **not** establish who commands the raids. See [[Campaigns/Sands of Desolation/Mysteries/Who Is Behind the Duergar Raids|Who Is Behind the Duergar Raids?]].
- **[[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]] — Confrontation with Falatir:** Thornwick and [[Campaigns/Sands of Desolation/The Party/Falatir|Falatir]] came close to fighting as suspicions about a concealed coin escalated. A wedding ring was forcibly removed, but the record does not establish whether Falatir's finger was severed. Falatir later departed after his apparent sacrifice.

> [!warning]- ✧ Batch 3 reconstruction provenance (OOC)
> Thornwick's account identifies Baba Eris as his persecutor, and the duergar banner bears a matching emblem, but the raiders' employer and the mechanics of the curse remain unconfirmed. The hag-associated token discussed in Session 7 is not proven identical to the Fox's iron token or Falatir's later concealed coin.

- **[[Falatir's Sacrifice|Session 9]]:** The subsequent session's opening recap places Thornwick's discovery that he had a **son** and acquisition of an extraordinary axe before Session 10. The source does not fully establish the earlier encounter or the axe's official name.
- **[[Isabelle 2, Electric Boogaloo|Session 10]]:** Confronted [[Baba Eris Whitewood]] inside a cavern in the [[Grey Mountains]]. The party defeated the hag and a monstrous giant identified for Bestiary purposes as a [[The Wanderer's Guide to the Multiverse/Bestiary/Mouth of Grolantor|Mouth of Grolantor]].
- **[[Amorphous Dreams|Session 11]]:** Recovered his family signet ring from the cavern aftermath; it triggered powerful memories of his kingdom and son. A dark figure in a dream appeared consistent with the Fox, but its identity was not named to Thornwick. The guild altered his axe to hover at his side.
- **Personal mystery:** [[Where Is Thornwick's Son|Where is Thornwick's missing son?]] This remains unresolved by the end of Session 12.
- **[[We Meet the Fox|Session 12]]:** Learned the axe has a curse affecting non-dwarf wielders and changing their stature. [[Diane]] used *[[The Wanderer's Guide to the Multiverse/Spells/Greater Restoration|Greater Restoration]]* to undo the immediate physical transformation. His **separate fused skull-mask curse remained**. A dark visitor taunted him about his kingdom and son and induced him to agree to play an unclear game; no precise binding terms were established. The visitor's identity as the Fox is confirmed only out of character.

- **[[Campaigns/Sands of Desolation/Session Journal/We find Thornwick's Son|Session 13]]:** Diane successfully scryed upon Thornwick's missing son, tentatively called **Johnwick Nightshade** (spelling unverified), showing him alive in an unknown castle near a winged intelligent undead figure. The figure noticed and destroyed the scrying sensor. Thornwick was relieved yet uneasy. The Fox's connection to Thornwick's mask and Grayson's coin remains a lead, not proof that the two objects are identical.
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** While in New Phyrexia, Wild Magic briefly made Thornwick miniature and imposed an ally-contact condition. These were temporary effects; their exact carryover should not be assumed.

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19):** Received counsel from [[Worlds/Astodan/People/Narci|Narci]] about his missing son, responsibility, and what kind of father he would be.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** Enlarged himself and tried to block Arthur's advance during the struggle over the sword.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** Fought the living mound and attempted to prevent Arthur's attacks on companions.

- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** Accompanied the party toward Cinderfang and the Caldera. During the handling of the hemisphere at the fiendish gate, another companion's stumble nearly pulled him onto its dangerous exposed side.
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** Joined the group investigating the lightning-wreathed obelisk and was later reported flying around the Caldera while enormously enlarged. The spell or ability involved is not firmly established.
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]:** Rejoined the others at the crater rim and continued toward the descent into the Caldera.

## Additional Details


### Unique Abilities

### Inventory
