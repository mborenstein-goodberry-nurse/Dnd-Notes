---
type: Creature
subtype: NPC
date: 04-23-2026
world: Astodan
status: Unknown
attitude: Unknown
summary: Influential Gilded Lands figure, known to Diane as the rose-masked woman Rose and privately identified by Thrax as Pleasure in Session 11.
alignment: Unaligned
aliases:
- Rose
- Rose Lady
- Rose (Masked Woman)
tags: []
campaigns:
- Sands of Desolation
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Amorphous Dreams]]"
location: "[[Ingrail's Estate]]"
home:
origin:
affiliations: []
relations:
- person: '[[Duke Ingrail]]'
  type: Exerts authority over; precise position unknown
  certainty: Confirmed
portrait:
---
# Pleasure

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
At the Session 3 reception at [[Ingrail's Estate]], Diane encountered an influential woman in elegant rose-colored clothing and a pale pink-white **porcelain masquerade mask** with painted red lips. Her face was largely obscured. A metal claw-like nail ornament cut [[Diane]]'s chin when she seized it. Diane described the stranger as **Rose**, a nickname, rather than an introduced name. In a later **private** Session 11 conversation, [[Thrax]] identified this woman as **Pleasure**.

Her precise office, motivations, and current whereabouts are not established. The original note's last confirmed physical encounter was at Ingrail's Estate in Session 3.


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

- **Session 1:** The party found a letter connected with the Brutus Squad ambush, signed **Pleasure**. At that point they knew the name was tied to leadership in the Gilded Lands but had not met the signer.
- **[[Happy Hunger Games!|Session 3]] — known then as Rose:** She summoned Diane during the reception at [[Ingrail's Estate]]. [[Duke Ingrail]] visibly deferred to her, appearing afraid to contradict her. She knew about [[Weary]]'s damaged soul and the party's encounter with her agents, including their killing of a basilisk. She offered the party unobstructed passage toward the [[Tower of Icarus]] **only if they survived the Blood Games**; she did not offer an escort. She threatened Diane and cut her chin with a metal nail ornament. At the time, Diane **did not know** this woman's identity as Pleasure; the early source explicitly posed it as a question.



- **[[Amorphous Dreams|Session 11]]:** [[Diane]] experienced another nightmare involving the rose-masked woman. In a subsequent **private** conversation, [[Thrax]] identified this woman to Diane by the name **Pleasure**. This resolves the identity question for Diane but does not establish Pleasure's motives or make Diane's private discovery party-wide knowledge. See [[Identity of the Rose-Masked Woman]] for the historical identity mystery.

## Additional Details
- **Historical alias:** “Rose” / “Rose Lady” reflects Diane’s Session 3 descriptive nickname. In early-session journals, link as `[[Pleasure|Rose]]` (or `[[Pleasure|the rose-masked woman]]`) to **retain the name the party used at the time**.
- **Historical identity note:** The separate `Rose (Masked Woman).md` note has been merged into this one. No second individual is implied.
- **Sources:** Original Session 3 recording (B03), original Google Docs (Session 3 and Rose Lady entry), and Session 11 private Thrax conversation (B17). Identity first confirmed **to Diane**, not necessarily the rest of the party.


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*
