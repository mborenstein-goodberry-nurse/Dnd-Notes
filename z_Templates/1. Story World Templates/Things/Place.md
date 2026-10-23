---
type: Place
date: <% tp.date.now("MM-DD-YYYY") %>
world: "{{VALUE:world}}"
campaigns:
  - "{{VALUE:campaign}}"
status: Unknown
statusAsOf:
attitude: Unknown
locationType: Unknown
parentLocation:
map: "{{VALUE:primaryMap}}"
location:
mapmarker:
aliases: []
summary:
image:
tags: []
---

# <% tp.file.title %>

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
> **Map Marker**
> `INPUT[inlineSelect(option(null, Unknown), option(Capital), option(Settlement), option(Landmark), option(Region/Nature), option(Danger), option(Camp/Outpost)):mapmarker]`
> 
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
```dataviewjs
const current = dv.current();

const places = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p => p.type === "Place");

const people = dv.pages(`"Worlds/${current.world}/People"`)
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "NPC"
    );

// Resolve a link or wikilink to a Place Note.
function resolvePlace(value) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value).replace(/^!?\[\[|\]\]$/g, "").split("|")[0];

    const file = app.metadataCache.getFirstLinkpathDest(
        raw,
        current.file.path
    );

    return file ? places.find(p => p.file.path === file.path) : null;
}

// Determine whether a Place is the current Place
// or one of its descendants.
function getRelation(location) {
    let place = resolvePlace(location);
    const visited = new Set();
    let depth = 0;

    while (place && !visited.has(place.file.path)) {
        if (place.file.path === current.file.path) {
            return depth === 0 ? "Directly Here" : "Within Area";
        }

        visited.add(place.file.path);
        place = resolvePlace(place.parentLocation);
        depth++;
    }

    return null;
}

const results = [];

for (const person of people) {
    if (!person.location) continue;

    const relation = getRelation(person.location);

    if (relation) {
        results.push({
            person: person.file.link,
            location: person.location,
            relation
        });
    }
}

if (results.length) {
    results.sort((a, b) => {
        if (a.relation !== b.relation) {
            return a.relation === "Directly Here" ? -1 : 1;
        }
        return a.person.path.localeCompare(b.person.path);
    });

    dv.header(3, "Last Known Locations");
    
	dv.table(
    ["Person", "Location", "Relation"],
    results.map(r => [
        r.person,
        resolvePlace(r.location)?.file.link ?? "-",
        r.relation
    ])
);

}
```
```dataviewjs
const current = dv.current();

const places = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p => p.type === "Place");

const people = dv.pages(`"Worlds/${current.world}/People"`)
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "NPC"
    );

function resolvePlace(value) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value).replace(/^!?\[\[|\]\]$/g, "").split("|")[0];

    const file = app.metadataCache.getFirstLinkpathDest(
        raw,
        current.file.path
    );

    return file ? places.find(p => p.file.path === file.path) : null;
}

function getRelation(location) {
    let place = resolvePlace(location);
    const visited = new Set();
    let depth = 0;

    while (place && !visited.has(place.file.path)) {
        if (place.file.path === current.file.path) {
            return depth === 0 ? "Directly Here" : "Within Area";
        }

        visited.add(place.file.path);
        place = resolvePlace(place.parentLocation);
        depth++;
    }

    return null;
}

const results = [];

for (const person of people) {
    if (!person.home) continue;

    const relation = getRelation(person.home);

    if (relation) {
        results.push({
            person: person.file.link,
            home: person.home,
            relation
        });
    }
}

if (results.length) {
    results.sort((a, b) => {
        if (a.relation !== b.relation) {
            return a.relation === "Directly Here" ? -1 : 1;
        }
        return a.person.path.localeCompare(b.person.path);
    });

    dv.header(3, "Residents");

    dv.table(
        ["Person", "Home", "Relation"],
        results.map(r => [
            r.person,
            resolvePlace(r.home)?.file.link ?? "-",
            r.relation
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const places = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p => p.type === "Place");

const people = dv.pages(`"Worlds/${current.world}/People"`)
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "NPC"
    );

// Resolve a wikilink or Dataview link to a Place Note.
function resolvePlace(value) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value).replace(/^!?\[\[|\]\]$/g, "").split("|")[0];

    const file = app.metadataCache.getFirstLinkpathDest(
        raw,
        current.file.path
    );

    return file
        ? places.find(p => p.file.path === file.path)
        : null;
}

// Follow the parentLocation hierarchy.
function getRelation(location) {
    let place = resolvePlace(location);
    const visited = new Set();
    let depth = 0;

    while (place && !visited.has(place.file.path)) {
        if (place.file.path === current.file.path) {
            return depth === 0
                ? "Directly Here"
                : "Within Area";
        }

        visited.add(place.file.path);
        place = resolvePlace(place.parentLocation);
        depth++;
    }

    return null;
}

const results = [];

for (const person of people) {
    if (!person.origin) continue;

    const relation = getRelation(person.origin);

    if (relation) {
        results.push({
            person: person.file.link,
            origin: person.origin,
            relation
        });
    }
}

if (results.length) {
    results.sort((a, b) => {
        if (a.relation !== b.relation) {
            return a.relation === "Directly Here" ? -1 : 1;
        }

        return a.person.path.localeCompare(b.person.path);
    });

    dv.header(3, "Origins");

    dv.table(
        ["Person", "Origin", "Relation"],
        results.map(r => [
            r.person,
            resolvePlace(r.origin)?.file.link ?? "-",
            r.relation
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const places = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p => p.type === "Place");

const organizations = dv.pages(`"Worlds/${current.world}/Organizations"`)
    .where(o => o.type === "Organization");

// Resolve a wikilink or Dataview link to a Place Note.
function resolvePlace(value) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value).replace(/^!?\[\[|\]\]$/g, "").split("|")[0];

    const file = app.metadataCache.getFirstLinkpathDest(
        raw,
        current.file.path
    );

    return file
        ? places.find(p => p.file.path === file.path)
        : null;
}

// Follow the parentLocation hierarchy.
function getRelation(location) {
    let place = resolvePlace(location);
    const visited = new Set();
    let depth = 0;

    while (place && !visited.has(place.file.path)) {
        if (place.file.path === current.file.path) {
            return depth === 0
                ? "Directly Here"
                : "Within Area";
        }

        visited.add(place.file.path);
        place = resolvePlace(place.parentLocation);
        depth++;
    }

    return null;
}

const results = [];

for (const org of organizations) {
    if (!org.headquarters) continue;

    const relation = getRelation(org.headquarters);

    if (relation) {
        results.push({
            organization: org.file.link,
            headquarters: org.headquarters,
            relation
        });
    }
}

if (results.length) {
    results.sort((a, b) => {
        if (a.relation !== b.relation) {
            return a.relation === "Directly Here" ? -1 : 1;
        }

        return a.organization.path.localeCompare(
            b.organization.path
        );
    });

    dv.header(3, "Organizations Based Here");

    dv.table(
        ["Organization", "Headquarters", "Relation"],
        results.map(r => [
            r.organization,
            resolvePlace(r.headquarters)?.file.link ?? "-",
            r.relation
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const places = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p => p.type === "Place");

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.world === current.world
    );

// Normalize regular arrays, Dataview arrays, and single values.
function toArray(value) {
    if (value == null) return [];
    if (Array.isArray(value)) return value;
    if (typeof value.array === "function") return value.array();
    return [value];
}

// Resolve a wikilink or Dataview link to a Place Note.
function resolvePlace(value, sourcePath) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value)
            .replace(/^!?\[\[|\]\]$/g, "")
            .split("|")[0];

    const file = app.metadataCache.getFirstLinkpathDest(
        raw,
        sourcePath
    );

    return file
        ? places.find(p => p.file.path === file.path)
        : null;
}

// Determine whether a Place is the current Place
// or is contained within its geographic hierarchy.
function getRelation(value, sourcePath) {
    let place = resolvePlace(value, sourcePath);
    const visited = new Set();
    let depth = 0;

    while (place && !visited.has(place.file.path)) {
        if (place.file.path === current.file.path) {
            return depth === 0
                ? "Directly Associated"
                : "Within Area";
        }

        visited.add(place.file.path);

        const parent = place.parentLocation;
        const parentSource = place.file.path;

        place = resolvePlace(parent, parentSource);
        depth++;
    }

    return null;
}

const results = [];

for (const quest of quests) {
    const associations = toArray(quest.places);

    let relation = null;

    for (const value of associations) {
        const match = getRelation(value, quest.file.path);

        if (match === "Directly Associated") {
            relation = "Directly Associated";
            break;
        }

        if (match === "Within Area") {
            relation = "Within Area";
        }
    }

    if (relation) {
        results.push({
            quest: quest.file.link,
            campaign: quest.campaign ?? "-",
            relation,
            status: quest.status ?? "Unknown"
        });
    }
}

if (results.length) {
    results.sort((a, b) => {
        if (a.relation !== b.relation) {
            return a.relation === "Directly Associated" ? -1 : 1;
        }

        return String(a.campaign).localeCompare(String(b.campaign)) ||
            a.quest.path.localeCompare(b.quest.path);
    });

    dv.header(3, "Related Quests");

    dv.table(
        ["Quest", "Campaign", "Association", "Status"],
        results.map(r => [
            r.quest,
            r.campaign,
            r.relation,
            r.status
        ])
    );
}
```
```dataviewjs
const current = dv.current();
const world = current.world;

const mysteries = dv.pages('"Campaigns"')
    .where(p => p.type === "Mystery" && p.world === world);

const places = dv.pages(`"Worlds/${world}/Places"`)
    .where(p => p.type === "Place");

// Normalize Obsidian links and plain wiki-link strings.
function nameOf(value) {
    if (!value) return "";

    if (value.path) {
        return value.path.split("/").pop().replace(/\.md$/, "");
    }

    return String(value)
        .replace(/^\[\[/, "")
        .replace(/\]\]$/, "")
        .split("|")[0]
        .split("/")
        .pop()
        .replace(/\.md$/, "");
}

// Find all ancestors of a Place, including itself.
function ancestorsOf(placeName) {
    const ancestors = new Set();
    const visited = new Set();

    let name = placeName;

    while (name && !visited.has(name)) {
        visited.add(name);
        ancestors.add(name);

        const place = places.find(
            p => p.file.name === name
        );

        if (!place) break;

        name = nameOf(place.parentLocation);
    }

    return ancestors;
}

const results = [];

for (const mystery of mysteries) {
    const linkedPlaces = Array.from(mystery.places ?? []);
    let direct = false;
    let inherited = false;

    for (const linkedPlace of linkedPlaces) {
        const placeName = nameOf(linkedPlace);

        if (!placeName) continue;

        if (placeName === current.file.name) {
            direct = true;
            break;
        }

        if (ancestorsOf(placeName).has(current.file.name)) {
            inherited = true;
        }
    }

    if (direct || inherited) {
        results.push({
            mystery: mystery.file.link,
            campaign: mystery.campaign ?? "-",
            association: direct
                ? "Directly Associated"
                : "Within Area",
            status: mystery.status ?? "Unknown"
        });
    }
}

if (results.length) {
    results.sort((a, b) =>
        a.mystery.path.localeCompare(b.mystery.path)
    );

    dv.header(2, "Related Mysteries");

    dv.table(
        [
            `Mystery`,
            "Campaign",
            "Association",
            "Status"
        ],
        results.map(r => [
            r.mystery,
            r.campaign,
            r.association,
            r.status
        ])
    );
}
```


## Campaign History & Knowledge


## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
> Keep player-only information separate from what the party knows.
> Link the original OOC source note here when applicable.
