---
type: Organization
date: 04-30-2026
world: Astodan
summary: A renowned specialist crafting guild led by Founders Drax and Thrax, conditionally helping the party while duergar raids threaten its work.
status: Active
attitude: Friendly
alignment: Unaligned
tags: []
campaigns:
- Sands of Desolation
organizationType: Guild
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/We Meet the Fox]]"
parentOrganization:
relations: []
headquarters: "[[Anvil's Flame]]"
leader: "[[Drax]] and [[Thrax]]"
aliases: []
image:
---
> [!fas-infobox] ✧ Organization Overview
>
> ```dataviewjs
> const p = dv.current();
> if (p.image) {
>     const imagePath = typeof p.image === "string"
>         ? p.image.replace(/^\[\[|\]\]$/g, "")
>         : p.image.path;
>     const imageFile = app.metadataCache.getFirstLinkpathDest(
>         imagePath, p.file.path
>     );
>     if (imageFile) {
>         dv.el("img", "", {
>             attr: {
>                 src: app.vault.getResourcePath(imageFile),
>                 style: "width:100%;height:auto;"
>             }
>         });
>     }
> }
> ```
>
> **Summary:** `VIEW[{summary}]`
>
> **Organization Type**
> `INPUT[inlineSelect(option(Guild), option(Government), option(Noble House), option(Military), option(Religious), option(Criminal), option(Political), option(Secret Society), option(Company), option(Adventuring Party), option(Other)):organizationType]`
>
> **Status**
> `INPUT[inlineSelect(option(Unknown), option(Active), option(Disbanded), option(Destroyed), option(Inactive)):status]`
>
> **Status As Of:** `=this.statusAsOf`
>
> **Attitude**
> `INPUT[inlineSelect(option(Unknown), option(Friendly), option(Neutral), option(Hostile), option(Complicated)):attitude]`
>
> **Parent Organization:**
> ```dataviewjs
> const p = dv.current();
> if (p.parentOrganization) {
>     dv.paragraph(p.parentOrganization);
> } else {
>     dv.paragraph("");
> }
> ```
>
> **Headquarters:**
> ```dataviewjs
> const p = dv.current();
> if (p.headquarters) {
>     dv.paragraph(p.headquarters);
> } else {
>     dv.paragraph("");
> }
> ```
>
> **Leader:**
> ```dataviewjs
> const p = dv.current();
> if (p.leader) {
>     dv.paragraph(p.leader);
> } else {
>     dv.paragraph("");
> }
> ```



## Description

The Mechanical Wonders is a respected specialist-crafting guild in [[Worlds/Astodan/Places/Anvil's Flame|Anvil's Flame]], within the Dwarven Forge. Founders [[Worlds/Astodan/People/Drax|Drax]] and [[Worlds/Astodan/People/Thrax|Thrax]] met the party in [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]. Its cooperation is **conditional**, rather than evidence of outright hostility or permanent alliance. The founders spoke of longstanding ties with the [[Worlds/Astodan/People/Queen Isabel|queen]] and the Griffin Empire.

## Purpose & Activities

- Builds and studies exceptional arms, armor, and magical or mechanical objects. During [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]], Drax identified the recovered hemisphere as extraordinarily old, plated its gripping surface for safe carriage, and returned it to the adventurers. **The guild did not keep the artifact.**
- Raids by [[The Wanderer's Guide to the Multiverse/Races/Duergar|duergar]] have disrupted mines, shipments, and research equipment. The founders suspect an outside collaborator; the raiders' banner resembles the mark Thornwick attributes to Baba Eris Whitewood.
- In return for help recovering stolen equipment and opposing the raiders, the founders offered to assist with a deeper hemisphere investigation. By [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]], the equipment had reportedly been **recovered**, but its **return to the guild is unconfirmed**.
- Drax accepted **300 gp** for three commissioned equipment enhancements in Session 7. Completion and collection were not verified in the Session 7 evidence. The player subsequently confirmed both enchantments **were completed by the end of Session 12**; their precise handoff scene remains unknown.

## Members & Leadership

```dataviewjs
const current = dv.current();

// Collect people from the world and associated campaigns.
const folders = [
    `Worlds/${current.world}/People`
];

for (const campaign of current.campaigns ?? []) {
    folders.push(`Campaigns/${campaign}/The Party`);
}

// Search all relevant folders, avoiding duplicate notes.
const people = new Map();

for (const folder of folders) {
    for (const person of dv.pages(`"${folder}"`)) {
        people.set(person.file.path, person);
    }
}

// Find people affiliated with this organization.
const members = [];

for (const person of people.values()) {
    for (const affiliation of person.affiliations ?? []) {
        const target = affiliation.organization;

        if (!target) continue;

        const matches =
            target.path === current.file.path ||
            String(target) === current.file.name ||
            String(target) === `[[${current.file.name}]]`;

        if (matches) {
            members.push({
                person: person.file.link,
                role: affiliation.role || "-",
                status: affiliation.status || "Unknown",
                certainty: affiliation.certainty || "Unknown"
            });
        }
    }
}

if (members.length) {
    members.sort((a, b) =>
        a.person.path.localeCompare(b.person.path)
    );

    dv.table(
        ["Person", "Role", "Status", "Certainty"],
        members.map(m => [
            m.person,
            m.role,
            m.status,
            m.certainty
        ])
    );
}
```


## Associated Places


## Organization Relationships
```dataviewjs
const current = dv.current();

const children = dv.pages(`"Worlds/${current.world}/Organizations"`)
    .where(o =>
        o.type === "Organization" &&
        o.parentOrganization &&
        (
            o.parentOrganization.path === current.file.path ||
            String(o.parentOrganization) === current.file.name ||
            String(o.parentOrganization) === `[[${current.file.name}]]`
        )
    )
    .sort(o => o.file.name, "asc");

if (children.length) {
    dv.header(3, "Suborganizations");
    dv.list(children.map(o => o.file.link));
}
```
```dataviewjs
const current = dv.current();
const relations = current.relations ?? [];

if (relations.length) {
    dv.header(3, "Known Relationships");

    dv.table(
        ["Organization", "Relationship", "Certainty"],
        relations.map(r => [
            r.organization ?? "-",
            r.type ?? "Unknown",
            r.certainty ?? "Unknown"
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const organizations = dv.pages(`"Worlds/${current.world}/Organizations"`)
    .where(o =>
        o.type === "Organization" &&
        o.file.path !== current.file.path
    );

const incoming = [];

for (const org of organizations) {
    for (const relation of org.relations ?? []) {
        const target = relation.organization;

        if (!target) continue;

        const matches =
            target.path === current.file.path ||
            String(target) === current.file.name ||
            String(target) === `[[${current.file.name}]]`;

        if (matches) {
            incoming.push({
                organization: org.file.link,
                type: relation.type ?? "Unknown",
                certainty: relation.certainty ?? "Unknown"
            });
        }
    }
}

if (incoming.length) {
    incoming.sort((a, b) =>
        a.organization.path.localeCompare(b.organization.path)
    );

    dv.header(3, "Referenced By");

    dv.table(
        ["Organization", "Their Relationship", "Certainty"],
        incoming.map(r => [
            r.organization,
            r.type,
            r.certainty
        ])
    );
}
```


## Related Quests
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

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        String(q.status ?? "").trim().toLowerCase() !== "undiscovered" &&
        Array.from(q.organizations ?? [])
            .some(org => matchesLink(org, current))
    )
    .sort(q => q.file.name, "asc");

if (quests.length) {
    dv.table(
        ["Quest", "Campaign", "Status"],
        quests.map(q => [
            q.file.link,
            q.campaign ?? "-",
            q.status ?? "Unknown"
        ])
    );
}
```


## Campaign History & Knowledge


- **[[Amorphous Dreams|Session 11]]:** Awarded seven 500 gp bags to the company following the raiders' defeat and recovery of stolen equipment. Drax identified Gideon's hemisphere as a portion of an ancient rejuvenation engine. The brothers also helped modify Thornwick's axe. Isabelle commissioned a steel defender for 500 gp, delivered in Session 12.
- **[[We Meet the Fox|Session 12]]:** The founders investigated **five missing rings**. Three were recovered and two remained missing. An earlier source attributes their taking to Arthur/Damien without independent confirmation in the available recordings; do not treat that attribution as fact. Guild relations continued after the incident.

## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
>
