---
type: Creature
subtype: NPC
date: 11-18-2026
world: Astodan
campaigns:
- Sands of Desolation
status: Unknown
statusAsOf: null
attitude: Unknown
location: null
home: null
origin: null
affiliations: []
relations:
- person: '[[Worlds/Astodan/People/Guile|Guile]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Hostility|Hostility]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Vigor|Vigor]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Purity|Purity]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Withengar|Withengar]]'
  type: Associated arch-being
  certainty: Player account (retrospective)
aliases: []
summary: Primordial Astodan divinity known from earlier-campaign accounts; no direct Sands party encounter documented
  through Session 21.
portrait: null
tags: []
---
# Dread

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

Dread belongs to the five primordial divinities described in Astodan's retrospective world lore. No direct appearance to the Sands of Desolation party has been established through Session 21. Descriptions of Dread's nature and past interactions below reflect player recollections and later setting explanations.

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

The Sands of Desolation journals through Session 21 do not document an audience with Dread. The player recalls meeting Dread in an earlier campaign in the same setting; specifics of that encounter have not been reconstructed.

## Additional Details

**Knowledge boundary:** The names of Dread's Chosen and arch-being derive from previous-campaign testimony, not from evidence the current party acquired by Session 21.

**Unverified:** Physical appearance, exact personality and location.

> [!warning]- ✧ Out-of-Character Knowledge
> *Retrospective world lore and earlier-campaign testimony. Not established as knowledge of the Sands party through Session 21.*
>
> **Divine nature:** One of the Five Creators. Fellow-player recollections describe Dread as embodying dread and fear, which may be experienced by people of different moral alignments; this should not be flattened to an intrinsically evil alignment. Dread is male by corrected player testimony. Wiley confirmed the Five embody the concepts of their names (04:01-04:45), without individually detailing Dread.
>
> **Chosen:** **Jodie**, a party member in a prior campaign, reportedly became Dread's Chosen at that campaign's conclusion. Do not assign this knowledge to Sands characters without a session source.
>
> **Arch-being:** [[Worlds/Astodan/People/Withengar|Withengar]], an **Arch Devil**, associated with Dread in the player's arch-being reference. The player later confirmed Withengar was freed in the earlier campaign, though details are unknown.
>
> **DM-confirmed background:** DM Wiley confirmed during the November 18, 2026 PEAK conversation (05:51-06:45) that the Five made the arch-beings roughly 20-50 years after their own origins; this was an approximate estimate, not an exact date. Each arch-being is the eldest of its type. Chosen arose later from sentient beings. At 34:11-35:44, Wiley explained that the Five created other gods as buffers for mortal devotion, avoiding the additional power and competition that directly receiving worship might create. Nothing before the Five is established by recorded history (03:00-03:40).
>
> **Reference:** [[Campaigns/Sands of Desolation/Player Knowledge & Theories/The Five Creators - Retrospective Working Notes|The Five Creators - Retrospective Working Notes]].
