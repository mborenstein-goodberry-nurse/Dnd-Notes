---
type: Creature
subtype: PC
date: 04-20-2026
campaign: Sands of Desolation
world: Astodan
summary: Hobgoblin pickpocket who joined the party in Anvil's Flame during Session 11.
status: Active
aliases: []
tags: []
attitude: Friendly
statusAsOf: '[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]]'
player: Alondra
race: '[[Hobgoblin]]'
class: null
level: 9
home: null
location: '[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]'
affiliations: []
relations: []
image: null
---
# Amorpha

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

Amorpha is a **hobgoblin** who joined the company in [[Worlds/Astodan/Places/Anvil's Flame|Anvil's Flame]]. She presented herself as an opportunistic pickpocket, stealing several companions' coin purses shortly after arriving. Her precise age, clothing, distinctive features, and fighting style have not been reliably established; the earlier records do not support a more detailed physical portrait.

## Background & History

The party first met Amorpha in [[Campaigns/Sands of Desolation/Session Journal/Amorphous Dreams|Session 11]], when she came out of a shop in Anvil's Flame and immediately made her light-fingered habits apparent. She later returned several missing guild rings during the Mechanical Wonders' investigation. Her unsettling dreams involved a self-proclaimed "king of the desert" and warnings about people looking for her. By [[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]], she recognized [[Worlds/Astodan/People/Graves Hellborne|Graves Hellborne]] as the man from those dreams, though his reasons for visiting her remain unknown.

## Personality & Motivations

Amorpha's actions establish a **bold, opportunistic approach to theft**, including taking risks that create friction with otherwise friendly people. She has continued traveling with the company while trying to understand the dreams and the threatening figure connected to them. At [[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Narci's grove]], she heard warnings about whom she chooses to steal from and about the meaning of her dreams. The sources do **not** establish her ultimate goal, her moral code, or whether she intends to give up stealing; those should remain open rather than be inferred from the jokes at the table.

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

### Sands of Desolation — Sessions 11–12
- **[[Amorphous Dreams|Session 11]]:** Introduced as a hobgoblin pickpocket in [[Anvil's Flame]] and joined the adventuring company. During a dream, she met a scarred, pirate-like figure calling himself the King of the Desert; his true identity is unknown.
- **[[We Meet the Fox|Session 12]]:** Was suspected during an investigation into five stolen guild rings. Three rings were recovered; do not assign the remaining theft to her. During a night watch she saw another apparent vision of the pirate-like figure rather than a confirmed physical visitor.
- **Open mystery as of Session 12:** [[Who Is Amorpha's Dream Visitor|Who is Amorpha's pirate-like visitor?]] The two appearances may be connected, but no identity is established.
- **Player attribution:** Alondra, confirmed by the player during Batch 4 reconstruction. Incidental address as “Hayley/Haley” in recordings is treated as an out-of-character table-name mix-up, **not a canonical character alias**.

### Sands of Desolation — Session 15
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** Reencountered the pirate-like figure from her earlier dream. The DM confirmed that she **recognized [[Worlds/Astodan/People/Graves Hellborne|Graves Hellborne]]**, the Pirate King, as that visitor. His intentions remain unknown. This is **Amorpha's** discovery; do not assume the full party received the information.
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** The reconstructed exchange and player recollection support Amorpha as the thief who took Joey's **Brutalizers necklace**. Graves estimated its value at **50–100 gp**. Original written notes call the thief "Alana"; preserve that discrepancy as provenance, not a new character.

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19):** Received [[Worlds/Astodan/People/Narci|Narci]]'s counsel concerning unsettling dreams and risks of theft.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** Took refuge in [[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]]'s *[[The Wanderer's Guide to the Multiverse/Spells/Rope Trick|Rope Trick]]* during the struggle over the sword.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** Probably the person whom Zach called "Haley" in shorthand, who struck [[Campaigns/Sands of Desolation/The Party/Linus Lightfoot|Linus Lightfoot]] and later stabbed Jonks to interrupt the sword's hold. **Probable attribution only**; do not treat Haley as a character alias or establish motives.

## Additional Details


### Unique Abilities

### Inventory
