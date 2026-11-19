---
type: Creature
subtype: NPC
date: 11-19-2026
world: Astodan
campaigns:
  - Sands of Desolation
status: Alive
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]"
attitude: Mixed
location: "[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]"
home: null
origin: null
affiliations: []
relations:
- person: "[[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]]"
  type: "Former enslaving master of Jonks"
  certainty: "Confirmed (Jonks testimony)"
- person: "[[Worlds/Astodan/People/Ursula|Ursula]]"
  type: "Caused Ursula's death; intent disputed"
  certainty: "Confirmed death; disputed intent"
- person: "[[Worlds/Astodan/People/Skylia the Inferno|Skylia the Inferno]]"
  type: "Supplanted as red-dragon ruler by Skylia"
  certainty: "Reported historical lore (Session 22)"
aliases:
  - "Cinderfame"
  - "Cinderfane"
summary: "Powerful red dragon, former enslaving master of Jonks, found fused into a corrupted hill and freed near the Luciferian Caldera."
portrait: null
tags: []
---
# Cinderfang

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

Cinderfang is an enormous **red dragon** formerly served by [[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]]. Jonks identified the abandoned volcanic lair as Cinderfang's and recalled the death of his wife, [[Worlds/Astodan/People/Ursula|Ursula]], whom the dragon crushed. Cinderfang admitted causing her death but claimed it was accidental; Jonks had no reason to trust his explanation.

In [[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]], the dragon was found **embedded and restrained in an unnatural hill of flesh**, suffering prolonged demonic corruption. Jonks attacked him with a blast from a Wand of Fireballs. Cinderfang endured the attack and seemed to want release from his imprisonment. The party questioned him, then ultimately freed him; neither the method nor the terms of any agreement survive in the available recording.

Cinderfang announced an intention to **kill the Sovereign and burn the Caldera**. This is his stated goal, not confirmation that he became a dependable ally. The party next saw him enter the Caldera, but he had not returned by [[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]].


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

- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** Jonks recognizes the old lair and the place Ursula died. The party finds Cinderfang bound in a flesh-covered hill. Jonks attacks; Cinderfang reveals his hatred of the Sovereign and the party frees him (method unclear).
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** Later recap places Cinderfang entering the Caldera after being freed.
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]:** The group reports that he has not reappeared.


## Additional Details

> [!warning]- Source and naming uncertainty
> The speech-to-text alternates between Cinderfang, Cinderfame and Cinderfane; **Cinderfang** follows the reviewed journals. Confirm the spelling with the DM if possible. His release is confirmed by the later recap, but the process is not recorded.


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*
