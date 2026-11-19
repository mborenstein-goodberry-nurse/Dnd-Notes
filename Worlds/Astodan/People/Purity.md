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
- person: '[[Worlds/Astodan/People/Dread|Dread]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Hostility|Hostility]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Vigor|Vigor]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
aliases: []
summary: A primordial Astodan divinity from retrospective cosmology; current party knowledge and direct contact
  are unestablished.
portrait: null
tags: []
---
# Purity

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

Purity is one of Astodan's five primordial divine figures. Through Session 21, the Sands party has no verified direct encounter with Purity. Specifics about the god's appearance, conceptual domain, and servants belong to retrospective accounts and are separated below.

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

The player tentatively recalls a brief meeting with Purity during a previous Astodan campaign. No reconstructed Sands of Desolation Session 0-21 directly features Purity.

## Additional Details

**Knowledge boundary:** No verified introduction to Purity in the current campaign through Session 21. Do not equate the concept of purity with moral goodness or invent a divine philosophy.

**Unresolved:** Details of the earlier encounter, the arch-being's identity and type, and the specific meaning of Purity's domain.

> [!warning]- ✧ Out-of-Character Knowledge
> *Retrospective world lore and earlier-campaign testimony. Not established as knowledge of the Sands party through Session 21.*
>
> **Identity:** Purity is one of the Five; **the only female among the Five**, according to corrected fellow-player testimony (not spoken by Wiley in the recording). The Five embody the concepts of their names, but Wiley did not define the full extent of Purity's domain. No fixed good alignment is supported.
>
> **Chosen:** **Ghidorah**, described by another player as a dragon residing in the **Islands of Moorne**. This is retrospective player lore, and the associated geography has not been independently verified.
>
> **Arch-being:** The party reportedly has **not met** Purity's arch-being. The older [[Campaigns/Sands of Desolation/Other/Arch Demon Notes|Arch Demon Notes]] list **Aureal - Purity** and an unnamed **Arch Angel**, but these are not securely connected. Do not create a definitive arch-being identity from these fragments.
>
> **DM-confirmed background:** DM Wiley confirmed during the November 18, 2026 PEAK conversation (05:51-06:45) that the Five made the arch-beings roughly 20-50 years after their own origins; this was an approximate estimate, not an exact date. Each arch-being is the eldest of its type. Chosen arose later from sentient beings. At 34:11-35:44, Wiley explained that the Five created other gods as buffers for mortal devotion, avoiding the additional power and competition that directly receiving worship might create. Nothing before the Five is established by recorded history (03:00-03:40).
>
> **Reference:** [[Campaigns/Sands of Desolation/Player Knowledge & Theories/The Five Creators - Retrospective Working Notes|The Five Creators - Retrospective Working Notes]].
