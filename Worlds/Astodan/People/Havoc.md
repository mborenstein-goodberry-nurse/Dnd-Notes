---
type: Creature
subtype: NPC
date: 11-05-2026
world: Astodan
campaigns:
- Sands of Desolation
status: Unknown
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]]"
attitude: Unknown
location: "[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]"
home: null
origin: null
affiliations: []
relations:
- person: '[[Weary]]'
  type: Former sword-bearer / soul-consumption victim; soul restored in Session 23
  certainty: Confirmed
- person: '[[Worlds/Astodan/People/Hostility|Hostility]]'
  type: Associated Creator
  certainty: High confidence (retrospective)
aliases: []
summary: "Archdemon of Hostility associated with Hero's Bane; manifested during the Session 23 exchange as Weary regained his soul."
portrait: null
tags: []
---
# Havoc

> [!fas-infobox|right] ✧ NPC Overview
> ```dataviewjs
> const portrait = dv.current().portrait;
> if (portrait) {
>   const path = typeof portrait === "string"
>     ? portrait.replace(/^\[\[|\]\]$/g, "")
>     : portrait.path;
>   const file = app.metadataCache.getFirstLinkpathDest(path, dv.current().file.path);
>   if (file) {
>     const img = dv.el("img", "", {
>       attr: { src: app.vault.getResourcePath(file), alt: dv.current().file.name }
>     });
>     img.style.width = "100%";
>     img.style.maxHeight = "260px";
>     img.style.objectFit = "contain";
>   }
> }
> ```
> *`=this.summary`*
>
> **Status:** `INPUT[inlineSelect(option(Unknown), option(Alive), option(Undead), option(Dead), option(Missing), option(Presumed Dead)):status]`
>
> **Status As Of:** `=this.statusAsOf`
>
> **Attitude**: `INPUT[inlineSelect(option(Unknown), option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
>
> **Last Known Location:** `=this.location`
>
> **Aliases:** `INPUT[inlineList:aliases]`

## Description

An **Archdemon of Hostility** once confined within a powerful sword found by [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] during the first Astodan-series campaign. Havoc whispered seductively to Weary, urged him to harm others, and progressively consumed his soul. It also prevented Weary from telling [[Diane]] about its influence.


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


## Related Quests
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

    // Check whether this NPC is the quest giver.
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

During the final confrontation with [[Warrick]] in [[Resurgence|the Resurgence]], [[Wonder]] took the sword away from Weary, leaving a red soul-scar from his right hand to his right eye. The sword and Havoc disappeared from Weary's possession; their subsequent location **before Session 19** was not established in the pre-campaign account.

Havoc's title as **Archdemon of Hostility** is introduced to the party by Session 23. His specific link to the Five Creators remains **retrospective OOC cosmology**, not an additional party revelation. Earlier background: player's retrospective account (2026-11-05).

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19):** Warrick stated that [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Havoc's Sword]] spoke to him, called Weary an unsuitable host, and was later lost. Warrick also said it could not claim his soul because it did not belong to him; these remain his claims.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] (Session 20):** The party found a familiar sword lodged in an animated mound of bodies within the [[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]. Its influence appeared to draw companions into conflict; the identification and exact mechanism were not resolved that session.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] (Session 21):** [[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]] freed the weapon, and [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] took it. A sentient voice and demonic power were described, alongside a recorded but unspecified bargain. Neither freedom nor restoration occurred on record **in Session 21**; both are addressed in subsequent sessions.

- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** Appeared privately to [[Campaigns/Sands of Desolation/The Party/Weary|Weary]], showing a retained slice of Weary's soul and proposing either four other soul fragments or the defeat of [[Worlds/Astodan/People/The Sovereign|The Sovereign]] as routes to his release. Havoc named himself Archdemon of Hostility.
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** [[Campaigns/Sands of Desolation/The Party/Grayson|Grayson]] took [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Hero's Bane]] and vanished in black smoke. Havoc manifested visibly before the party; Weary regained his missing soul fragment. Havoc spoke of watching the impending fight with the Sovereign. His ongoing freedom is strongly suggested, but the precise terms and Grayson's destination are unknown.

- **[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]] (Session 27):** Appears outside the company's Caldera camp after the Sovereign's defeat. Claims that the party has satisfied a condition by destroying at least five hearts and offers help escaping: a fiendish disguise or hazardous teleportation. The group favors the disguise, which appears to take effect on the next day's journey. The arrangement does **not** prove benevolent intentions or clarify the full terms of Havoc's freedom.

## Additional Details

**Historical knowledge boundary:** [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Hero's Bane]] and the voice associated with it are relevant to the party through Session 21. Havoc's place in the primordial divine hierarchy was **not** established to the party by then.

> [!warning]- ✧ Out-of-Character Knowledge
> *Retrospective setting lore, previous-campaign recollection and DM clarification; not automatically the knowledge of Weary or the Sands party.*
>
> **Classification:** The older [[Campaigns/Sands of Desolation/Other/Arch Demon Notes|Arch Demon Notes]] identify Havoc as an **Arch Demon** associated with [[Worlds/Astodan/People/Hostility|Hostility]], one of the Five Creators. The player is highly confident that Havoc is Hostility's arch-being, although the specific pairing was not restated in the DM interview. Wiley **did** explicitly confirm Havoc is a demon at **11:41-11:45** in the November 18, 2026 recording.
>
> **Origins of the category:** Wiley said the Five made their arch-beings approximately 20-50 years after their own emergence, each the eldest of its kind (05:51-06:45). This does **not** establish when or how Havoc became bound to the sword.
>
> **Sword and soul consumption:** In the user's recollection, Havoc **wanted** to devour souls, and such consumption was intrinsic to its/the sword's survival. The player tentatively recalls Weary bargaining to free Havoc in exchange for regaining his soul and avoiding consumption; the Session 23 manifestation and Weary's restoration are now corroborated; the exact terms and mechanism remain unknown. Havoc is not described as unwilling to consume souls.
>
> **Source register:** [[Campaigns/Sands of Desolation/Player Knowledge & Theories/The Five Creators - Retrospective Working Notes|The Five Creators - Retrospective Working Notes]].
