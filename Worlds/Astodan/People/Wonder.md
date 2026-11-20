---
type: Creature
subtype: NPC
date: 11-05-2026
world: Astodan
campaigns:
- Sands of Desolation
status: Alive
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]]"
attitude: Mixed
location: "[[Worlds/Astodan/Places/Foo Fighters|Foo Fighters]]"
home: null
origin: null
affiliations: []
relations:
- person: '[[Warrick]]'
  type: Husband
  certainty: Confirmed
- person: '[[Weary]]'
  type: Brother-in-law
  certainty: Confirmed
- person: "[[Worlds/Astodan/People/Gideon|Gideon]]"
  type: "Named as her patron; helped attempt to restore her body"
  certainty: "Wonder testimony (Session 27)"
aliases:
  - Luz
summary: "Warrick's wife, missing since before Session 19; her luminous disembodied self was called Luz until she reunited with her body in Session 27."
portrait: null
tags: []
---
# Wonder

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

A blue female tiefling; the original person-of-interest entry identifies her as a **Celestial Warlock** (patron **not known at that earlier checkpoint**). In Session 27 she names [[Worlds/Astodan/People/Gideon|Gideon]] as her patron, a claim not independently confirmed. The player's later retrospective account identifies her as married to [[Warrick]], while the original notes more cautiously describe their relationship as that of companions. This difference in certainty is preserved for later corroboration. She traveled with the adventuring party during the original Astodan-series campaign, concealing her role as an accomplice.


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

At the ritual confrontation in [[Resurgence|the Resurgence]], Wonder seized the sword containing [[Havoc]] from [[Weary]]. Its removal left a red scar stretching from his right hand to his right eye. Warrick's attempted summoning then produced the necrotic spires.

Her subsequent fate and the sword's whereabouts are not established at the opening of Sands of Desolation. *Sources: player retrospective account (2026-11-05) and original Google Docs notes (p. 39).*

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] (Session 19):** Warrick told Weary that [[Worlds/Astodan/People/Wonder|Wonder]] was **missing**. A reported book's apparent claim that she was dead was corrected in the conversation to **lost**. Her fate and last actual whereabouts are not established; this is a reported missing status rather than a witnessed disappearance.

- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]] (Session 23; identity still unknown):** The party frees a luminous figure from a Caldera obelisk. They do not yet know that this is Wonder.
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]] (Session 24):** The disembodied woman is temporarily named [[Worlds/Astodan/People/Luz|Luz]] by Jonks; she has incomplete memories and is perceived as a manifest soul. Her real identity is still unknown to the party.
- **[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]] (Session 27 — identity established):** When Isabelle uses the chamber's **release** control, the luminous figure merges into the suspended woman's body, which revives. She identifies herself as **Wonder**, [[Worlds/Astodan/People/Warrick|Warrick]]'s wife, and names [[Worlds/Astodan/People/Gideon|Gideon]] as her patron who helped try to restore her body. The group later escapes the Caldera with her. The precise separation/imprisonment mechanism remains unexplained.

## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*

> [!note]- Identity and chronology
> **Luz and Wonder are one person**, not two independent NPCs. This note is the established identity; the pre-revelation [[Worlds/Astodan/People/Luz|Luz]] note is preserved as a non-roster historical reference, while Wonder remains the single canonical NPC. Do not reveal Wonder's identity inside Session 23–24 narratives.
