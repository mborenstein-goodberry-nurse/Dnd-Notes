---
type: Organization
date: 10-22-2026
world: Test World
campaigns:
  - Test World
status: Unknown
statusAsOf:
attitude: Unknown
organizationType: Political
parentOrganization: "[[Macro Parent Organization]]"
relations: []
headquarters:
leader:
aliases: []
summary:
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


## Purpose & Activities


## Members & Leadership


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
        ["Organization", "Type", "Certainty"],
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


## Campaign History & Knowledge


## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
>
