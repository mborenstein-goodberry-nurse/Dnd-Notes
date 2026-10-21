---
type: Place
date: 10-21-2026
world: "Test World"
campaigns:
  - "Test World"
status: Unknown
statusAsOf:
attitude: Unknown
locationType: Unknown
parentLocation:
map:
location:
mapmarker:
aliases: []
summary:
image:
tags: []
---

# Kingdom of Gold

> [!fas-infobox] ✧ Place Overview
> ```dataviewjs
> const image = dv.current().image;
>
> if (image) {
>     const path = image.path ?? String(image).replace(/^\[\[|\]\]$/g, "");
>     const file = app.metadataCache.getFirstLinkpathDest(
>         path,
>         dv.current().file.path
>     );
>
>     if (file) {
>         const container = dv.el("div", "");
>         const img = container.createEl("img");
>         img.src = app.vault.getResourcePath(file);
>         img.style.width = "100%";
>         img.style.height = "auto";
>         img.style.borderRadius = "4px";
>     }
> }
> ```
> 
> *`=this.summary`*
>
> **Location Type**
> `INPUT[inlineSelect(option(Unknown), option(Site/Monument), option(House), option(Shop), option(Manor/Castle), option(Camp/Outpost), option(Small Village), option(Large Village), option(Small Town), option(Large Town), option(City), option(Large City), option(City-State), option(Sub-Kingdom), option(Kingdom), option(Continent), option(Other)):locationType]`
>
> **Status**
> `INPUT[inlineSelect(option(Unknown), option(Active), option(Abandoned), option(Destroyed), option(Ruined), option(Occupied), option(Other)):status]`
>
> **Status As Of:** `=this.statusAsOf`
>
> **Attitude**
> `INPUT[inlineSelect(option(Unknown), option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
>
> **Parent Location:** `=this.parentLocation`
>
> **Map:** `=this.map`

## Description


## Notable Locations
```dataviewjs
const current = dv.current();

const children = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p =>
        p.type === "Place" &&
        p.parentLocation &&
        (
            p.parentLocation.path === current.file.path ||
            String(p.parentLocation) === current.file.name ||
            String(p.parentLocation) === `[[${current.file.name}]]`
        )
    )
    .sort(p => p.file.name, "asc");

if (children.length) {
    dv.header(3, "Locations Within");
    dv.list(children.map(p => p.file.link));
}
```


## People & Organizations


## Campaign History & Knowledge


## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
> Keep player-only information separate from what the party knows.
> Link the original OOC source note here when applicable.
