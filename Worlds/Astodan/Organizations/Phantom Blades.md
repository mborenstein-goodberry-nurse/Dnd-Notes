---
type: Organization
date: 11-15-2026
world: "Astodan"
campaigns:
  - "Sands of Desolation"
status: "Active"
statusAsOf: "[[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary]]"
attitude: "Unknown"
organizationType: "Guild"
parentOrganization:
relations: []
headquarters: ""
leader: "Damascus (spelling provisional)"
aliases: []
summary: "One of the Pirate King's five guilds in New Phyrexia; reported leader Damascus (spelling provisional)."
image:
tags: []
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
> **Status As Of:** `VIEW[{statusAsOf}]`
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

The **Phantom Blades** are one of five named guilds operating in [[Worlds/Astodan/Places/New Phyrexia|New Phyrexia]] under the authority of [[Worlds/Astodan/People/Graves Hellborne|Graves Hellborne]], the Pirate King. They are identified in [[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]]. Their reported leader is **Damascus**, whose name spelling remains provisional; no separate person note is created yet.



## Purpose & Activities

- The adventurers begin searching for the Phantom Blades in [[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]], led by new companion [[Campaigns/Sands of Desolation/The Party/Noisy Owlbear|Noisy Owlbear]].
- [[Campaigns/Sands of Desolation/The Party/Arthur Morgan|Arthur]] is observed wearing a necklace with a **red-stained Phantom Blade emblem**. This suggests a connection but **does not establish guild membership or allegiance**. The mark's meaning and the guild's specific activities remain unknown.



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

- [[Worlds/Astodan/Places/New Phyrexia|New Phyrexia]] — known area of activity; exact headquarters not established.



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

- **[[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]]:** The party learns that the Phantom Blades are among five guilds operating under the Pirate King. **Damascus** is named as their leader (spelling provisional). An emblem associated with the guild, bearing a red stain, is seen on Arthur's necklace; the significance is unknown. Noisy Owlbear helps the party search for the guild.

## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
>
