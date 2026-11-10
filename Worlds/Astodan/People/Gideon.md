---
type: Creature
subtype: NPC
date: 04-30-2026
world: Astodan
status: Presumed Dead
attitude: Hostile
alignment: Lawful Evil
aliases: []
tags: []
summary: Gideon the Judge, a corrupted celestial guarding a hemisphere in his chest.
campaigns:
  - Sands of Desolation
statusAsOf: "[[Battle for the Bulge]]"
location: "[[Tower of Icarus]]"
home:
origin:
affiliations: []
relations: []
portrait:
---
# Gideon

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



**Gideon the Judge** occupied an ivory throne in the central chamber of the [[Tower of Icarus|Tower of Icarus]]. The original Session 5 journal portrays him as a massive, once-radiant celestial figure wreathed in purple necrotic energy, with a mysterious **hemisphere embedded in his chest**. He condemned the intruding party and fought them. In the battle's final stretch, [[Campaigns/Sands of Desolation/The Party/Thornwick|Thornwick]] passed a Strength check and physically tore the hemisphere from his chest (player-confirmed retrospective recollection; combat audio not preserved). The Session 6 recording begins with Gideon absent and the artifact recovered. His exact creature type was not confirmed; the original table compared him to an Empyrean. His epithet, *the Judge*, does not on its own establish who appointed him or his authority over the captive celestials.

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



- **Session 5 — [[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|Battle for the Bulge]]:** The party reached Gideon's chamber after encountering two imprisoned [[The Wanderer's Guide to the Multiverse/Bestiary/Radiant Idol|Radiant Idols]] and a [[Campaigns/Sands of Desolation/Mysteries/The Golden Eye of Icarus|golden eye]] visible only to Diane. Gideon condemned the party and fought them, apparently protecting the hemisphere in his chest. The written journal records **AC 22** and **magic resistance**; the missing combat recording cannot independently verify those values. Thornwick's player later confirmed that he succeeded on a Strength check and tore the hemisphere free during the final stretch of this fight.
- **Session 6 — [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|A Second Session has Hit the Towers]] (aftermath only):** Recording B09 starts after the fight, with Gideon absent, the hemisphere recovered, and the surrounding land beginning to regenerate. Gideon does **not** reappear in this session. The status **Dead** is retained from the legacy note, but the supplied audio does not independently establish his final fate or the exact mechanism of death.

**Related open questions:** [[Campaigns/Sands of Desolation/Mysteries/The Hemisphere of Gideon|What is the hemisphere?]] Why were the idols imprisoned, and what authority did Gideon possess? Diane's [[Campaigns/Sands of Desolation/Mysteries/The Golden Eye of Icarus|golden-eye mystery]] has a separate [[Campaigns/Sands of Desolation/Player Knowledge & Theories/Gideons Golden Eye Theory|player theory]] implicating Gideon, but the link is **unconfirmed**, not established lore.

## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*
