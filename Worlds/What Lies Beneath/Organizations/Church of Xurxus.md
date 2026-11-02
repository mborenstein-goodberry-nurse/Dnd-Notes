---
type: Organization
date: 10-23-2026
world: What Lies Beneath
campaigns:
  - What Lies Beneath
status: Active
statusAsOf:
attitude: Complicated
organizationType: Religious
parentOrganization:
relations: []
headquarters: "[[Kingdom of Xanthar]]"
leader: "[[Xurxus]]"
aliases: []
summary: Religious and governing institution devoted to Xurxus, God of Balance, in the Mountain Valleys.
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

The **Church of Xurxus** is the religious and governing institution devoted to [[Xurxus]], God of Balance. Xurxus's realm is governed through a church-centered structure rather than a conventional monarchy.

The church is influential in the [[Kingdom of Xanthar]], including communities associated with the [[Fey Forests]] and [[Riverrun]]. Its precise jurisdiction, internal hierarchy, and administrative procedures have not yet been established.



## Purpose & Activities

The church worships Xurxus and is associated with maintaining balance, including planar balance. It exercises religious and political influence, although the division of responsibilities between Xurxus, the church council, and local officials is unknown.

Xurxus has personally commissioned [[Kiara Bashara]] and [[Revelar]] to recover a dangerous stolen artifact. Whether this is formally a church operation remains unclear.



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

- **[[Xurxus]]:** Patron deity and ruler of the church-governed realm.
- **[[Kiara Bashara]]:** Devout paladin of Xurxus; her formal standing within the institution is not established.
- **[[Revelar]]:** Serves the church's council as its self-described "viper"; his precise title and duties are unknown.
- **Unnamed priest:** A priest killed by [[Shayann]] while protecting Kiara. The name *Wren* has been suggested but is unconfirmed.

The council's membership, the church's ranks, and the relationship between its clergy and civil authorities remain unknown.



## Associated Places

- [[Kingdom of Xanthar]] — region of the church-governed realm.
- [[Fey Forests]] and [[Riverrun]] — places associated with Kiara's upbringing and the church's influence.
- [[Xurxus's Capital]] — provisional name for the mountain capital; the church's exact headquarters have not been confirmed.
- [[Stal'hgite]] — destination of the artifact-recovery mission, not an established church holding.



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

### Shayann's Banishment

When [[Kiara Bashara]] was approximately 20–30 years old, a priest of Xurxus threatened her. Her brother [[Shayann]] killed the priest to protect her, fled, and was later banished. Speaking Shayann's name became forbidden in their community.

Kiara believes Shayann was unjustly condemned and seeks to restore his name. **Unresolved:** whether the church formally ordered his banishment, which officials were involved, and whether Xurxus personally knew of or approved the decision. The event should not be assumed to coincide with the wider [[Hell Conflict]].

### The Stolen Artifact

Xurxus selected Kiara and Revelar to recover a stolen artifact with potentially dire consequences. They were directed to seek the Keeper of Knowledge in [[Stal'hgite]]. The church's broader involvement is unknown. See [[The Stolen Artifact]].



## Additional Details

### Open Questions

- How is the church governed beneath Xurxus, and who sits on its council?
- What authority does the church have over trials, punishment, and banishment?
- Who was responsible for Shayann's condemnation?
- How does the church interpret and enforce planar balance?
- Where is the institution's official headquarters?



> [!warning]- ✧ Out-of-Character Knowledge
> The priest's possible name, the exact chain of authority behind Shayann's banishment, and the church's involvement in the artifact mission are not confirmed. Avoid treating these as established facts.
