---
type: Creature
subtype: NPC
date: 04-21-2026
world: Astodan
status: Alive
summary: "Pirate King of New Phyrexia; rules a kingdom with five guilds and is recognized by Amorpha as her mysterious dream visitor."
attitude: Indifferent
alignment: Unaligned
aliases:
- Pirate King
tags: []
campaigns:
- Sands of Desolation
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]]"
location: "[[Worlds/Astodan/Places/New Phyrexia]]"
home: null
origin: null
affiliations: []
relations: []
portrait: null
---
# Graves Hellborne

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

**Graves Hellborne** is the **Pirate King** of [[Worlds/Astodan/Places/New Phyrexia|New Phyrexia]]. The company meets his court in [[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]] and returns in [[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]. He is associated with five guilds: **Sewer Rats, Flesh Takers, Extortionists, Brutalizers,** and [[Worlds/Astodan/Organizations/Phantom Blades|Phantom Blades]]. His precise arrangement with each guild remains unknown. His schnauzer is named **Spore**.

[[Campaigns/Sands of Desolation/The Party/Amorpha|Amorpha]] recognizes Graves as the scarred, pirate-like figure from her earlier dreams; his reason for appearing to her remains unexplained. He also discusses private business with [[Campaigns/Sands of Desolation/The Party/Grayson|Grayson]] in Session 15. Arthur seems familiar with him in Session 14, but any deeper alliance is unconfirmed.



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

- **[[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]]:** The company reaches his kingdom, learns of the five guilds, and encounters his court; **Damascus** is reported as the Phantom Blades' leader (spelling provisional).
- **[[Campaigns/Sands of Desolation/Session Journal/The Session of Surge|Session 15]]:** Speaks to Grayson about undisclosed business; Grayson then leaves by magic with Creed. Graves identifies or confirms the name of his dog, Spore, and estimates a stolen Brutalizers necklace at 50–100 gp. Amorpha directly recognizes him as her dream visitor.

- **[[Campaigns/Sands of Desolation/Session Journal/A Nice Chat with the Pirate King|A Nice Chat with the Pirate King]] — Weary’s private audience:** [[Campaigns/Sands of Desolation/Session Journal/A Nice Chat with the Pirate King|A Nice Chat with the Pirate King]] records Graves recognizing Weary’s long-standing curse and describing the Necrotic Spires as the result of a warlock’s use of an **uncorrupted living soul**, which Graves said could no longer be undone. He also reported worsening seas, nocturnal undead, golems gathering bodies, and action by the Dominion and Sirvanna. These are **Graves’s claims**, not independently verified explanations. Weary, using Truesight, recognized Graves’s hidden apparatus as life support; Graves did not say so, and no purpose beyond that observed function is established.
- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]]:** Asked the company to leave his meeting room to make way for [[Worlds/Astodan/People/Pleasure]], with whom he reportedly had prior arrangements. Separate written sources report that Grayson **won his freedom** from Graves in a dice contest; the terms and exact chronology are not established.

## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*

> [!warning]- ✧ Private observation — Session 15
> A temporary 60-foot [[The Wanderer's Guide to the Multiverse/Dictionary/Truesight|Truesight]] effect allows [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] to see beyond Graves' outward illusion: scars, tubing containing reddish liquid, mechanical apparatus, and concealed weapons. Graves notices the reaction and gives a subtle acknowledgment. **Only Weary is confirmed to have seen these details; the apparatus' purpose is unknown.**
