---
type: Creature
subtype: PC
date: 04-20-2026
campaign: Sands of Desolation
world: Astodan
summary: Human warlock introduced at the Hallowed Bastion; Xerac is identified as his patron by Session 9.
status: Presumed Dead
aliases:
- Grayson Underwood
- Underwood
tags: []
attitude: Friendly
alignment: Neutral Evil
statusAsOf: '[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]'
player: Zach Glass
race: '[[Human]]'
class: '[[Warlock]]'
level: 9
startingLevel: 9
home: null
location: '[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]'
affiliations: []
relations:
- person: '[[Worlds/Astodan/People/Xerac]]'
  type: Warlock patron; pact terms unknown
  certainty: Confirmed
image: null
---
# Grayson

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

Grayson Underwood entered the story as a **human warlock** carrying a staff and a deck of cards, with a small imp described near him. His original appearance should not be confused with his **later skeletal body**, documented by the Caldera expedition; the transformation's exact cause and timing remain incompletely reconstructed. His patron is [[Worlds/Astodan/People/Xerac|Xerac]], though their bargain is not known in full.

## Background & History

Grayson met the company after [[Worlds/Astodan/People/Xerac|Xerac]] released him and other captives from the [[Worlds/Astodan/Places/Hallowed Bastion|Hallowed Bastion]]. By [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]], Xerac was identified as his warlock patron. Grayson subsequently traveled apart from the group with Creed, departed the Pirate King's court, and later **won his freedom in a dice contest** with [[Worlds/Astodan/People/Graves Hellborne|Graves Hellborne]], returning to the party by approximately Session 16. The bargain's precise terms, Creed's death, and several intervening events remain unclear.

## Personality & Motivations

Grayson repeatedly takes **high-stakes gambles and experiments with questionable magical objects**. He purchased an alleged Deck of Many Things from [[Worlds/Astodan/People/Zoff|Zoff]] despite its untested provenance; the deck proved fake. His habit of swallowing or incorporating unusual objects includes Isabelle's Ring of Mind Shielding (player-confirmed) and an unidentified coin embedded in his skeletal body during [[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|Session 21]]. Winning his freedom was a demonstrated immediate aim, but his broader loyalties, the purpose of his dealings with Xerac, and the meaning of his coins remain unresolved. His risk-taking is observable; do not assume a particular hidden agenda from it.

By [[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]] (Session 23), Grayson took [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Hero's Bane]] during a witnessed exchange, then vanished into black smoke as [[Worlds/Astodan/People/Havoc|Havoc]] appeared. The companions subsequently spoke of Grayson as dead. **Status: Presumed Dead as of Session 23**, since the disappearance and presumed loss were witnessed but his final fate was not established.

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

- **Session 4:** Joins the group after Xerac releases the captives. Human warlock with cards and a staff.
- **Sessions 5–6:** Travels with the group through the Towers of Icarus and into Dwarven Forge territory; exact Gideon battle participation is not fully reconstructed.
- **[[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]:** Grayson is listed with the party, and the original journal identifies [[Worlds/Astodan/People/Xerac|Xerac]] as his warlock patron. The original spelling "Zarach" was corrected by the player. The disclosure's circumstances and any pact terms are not recorded; Xerac did **not** appear in person in Session 9.

- **[[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]]:** Separated from the traveling party, taking **Creed** with him; the original journal and later recap link his errand to [[Worlds/Astodan/People/Xerac|Xerac]] (jokingly called "Lich Diddy" at the table). The precise purpose of the meeting is unknown.
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** Seen speaking privately with [[Worlds/Astodan/People/Graves Hellborne|Graves Hellborne]] at the Pirate King's court. He then left by magical travel with Creed. **Party status: Departed as of Session 15.** This describes the historical checkpoint, not an assertion that he will never return.

- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]] — Freedom and return:** Written sources say Grayson won a dice contest against [[Worlds/Astodan/People/Graves Hellborne]], thereby **winning his freedom**. The terms, exact location, and sequence of the contest remain unclear. He was back with the traveling company by approximately this period; the user confirms a likely return by Session 16. **Party status changes from Departed (Session 15) to Active.** The same accounts report that **Creed died**, without preserving the precise circumstances. A note about a swallowed wedding ring *probably* concerns Grayson eating Isabelle’s Ring of Mind Shielding, consistent with his practice of consuming magical objects, but the item identification is uncertain.
- **[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]:** Present among the companions exploring Foo Fighter territory and the aftermath of the Outskirts settlement attack. The natural-20s / mistaken-messiah episode was largely a running joke; the person responsible is unverified (possibly Grayson or Jonks).

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19):** Bought a purported Deck of Many Things and unidentified enchanted hand axe from [[Worlds/Astodan/People/Zoff|Zoff]] for **75 gp total**; authenticity was unverified at the time.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** Drew from the purchased deck and learned it was **nonmagical and fake**. Entered the Caldera, moved toward the living mound, was grappled, and used **Potion Mix #5**; specific modifiers and duration remain uncertain.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** Was swallowed by the mound, went down, and used *[[The Wanderer's Guide to the Multiverse/Spells/Hellish Rebuke|Hellish Rebuke]]*. Later embedded another unidentified coin into his skeletal body; its source, exact placement and effects are unknown and must not be conflated with Jonks's Fox coin.

- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** Present during the trek toward the Caldera and the discovery of Cinderfang.
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** Took [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Hero's Bane]] during an exchange witnessed by the party, then **vanished into black smoke** as [[Worlds/Astodan/People/Havoc|Havoc]] manifested. [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] regained his missing soul fragment. The party soon spoke of Grayson as dead, but the surviving evidence does not establish his fate. **Party status: Presumed Dead as of Session 23**, not confirmed permanently dead.

## Additional Details


### Unique Abilities

### Inventory
