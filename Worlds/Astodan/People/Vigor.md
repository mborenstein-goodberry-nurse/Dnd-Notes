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
- person: '[[Worlds/Astodan/People/Purity|Purity]]'
  type: Fellow Creator
  certainty: Confirmed (retrospective cosmology)
- person: '[[Worlds/Astodan/People/Bastion|Bastion]]'
  type: Associated arch-being
  certainty: DM confirmed (retrospective)
- person: '[[Worlds/Astodan/People/Narci|Narci]]'
  type: Patron of; Narci identifies as servant
  certainty: Confirmed (Session 19)
aliases: []
summary: Divine figure whom Narci named as her patron and master; not encountered directly by the party through Session 21.
portrait: null
tags: []
---
# Vigor

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

Vigor is the **divine figure Narci invoked as her patron** during the party's Session 19 visit to her grove. She described herself as his faithful servant and said she needed to consult him before providing certain further assistance. **Vigor did not appear or speak to the party** in the surviving Session 19–21 evidence.

No witnessed physical form, voice, temperament, location, or direct intervention can be described from the party's current historical knowledge. His wider place in Astodan's pantheon is documented separately under **Out-of-Character Knowledge**, rather than presented as something the party learned by meeting Narci.

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

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19 — mentioned, not encountered):** [[Worlds/Astodan/People/Narci|Narci]] identified herself as Vigor's faithful servant and said she would consult him about further help for the travelers. The party received guidance from Narci, **not a direct audience with Vigor**. No direct contact with him is established through Session 21.

## Additional Details

**Historical knowledge boundary:** Through Session 21, the party knows Vigor by name because [[Worlds/Astodan/People/Narci|Narci]] declared herself his servant in Session 19. There is **no direct appearance** or evidence that the party understood Vigor's wider status.

**DM source:** Interview with Wiley while playing PEAK, November 18, 2026. All divine-hierarchy claims below remain **retrospective** rather than in-character discoveries.

> [!warning]- ✧ Out-of-Character Knowledge
> *Retrospective setting knowledge, not established to the Sands party through Session 21.*
>
> **Creator deity:** Vigor is one of the Five ([[Worlds/Astodan/People/Guile|Guile]], [[Worlds/Astodan/People/Dread|Dread]], [[Worlds/Astodan/People/Hostility|Hostility]], [[Worlds/Astodan/People/Vigor|Vigor]], and [[Worlds/Astodan/People/Purity|Purity]]). Wiley confirmed that these gods embody concepts connected to their names, rather than fixed moral alignment categories (04:01-04:45). Vigor is male by corrected player testimony; no physical form or full domain explanation is recorded.
>
> **Chosen:** [[Worlds/Astodan/People/Narci|Narci]], the blind female monk and shaman encountered in Session 19, is **Vigor's Chosen**, confirmed by the player after checking earlier-campaign knowledge. This identity was not established in-character in Session 19.
>
> **Arch-being: [[Worlds/Astodan/People/Bastion|Bastion]], Arch Elemental.** Wiley confirmed this at **08:39-08:50** of the November 18 recording. **Solas was a proposed name for someone else**, not Vigor's arch-being. The fellow player's recollection of meeting Vigor's elemental before Skeletor took an orb is not yet tied to a known session.
>
> **Category history:** Wiley says the Five created the arch-beings roughly **20-50 years** after their own origins; the arch-beings are the eldest of their respective types. Chosen came later from sentient beings (05:51-06:45). The Five created lesser gods to receive mortal worship on their behalf, avoiding the extra power and competition direct devotion might cause (34:11-35:44).
>
> **Source register:** [[Campaigns/Sands of Desolation/Player Knowledge & Theories/The Five Creators - Retrospective Working Notes|The Five Creators - Retrospective Working Notes]].
