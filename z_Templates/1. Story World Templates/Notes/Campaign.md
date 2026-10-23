---
type: Campaign
date: <% tp.date.now("MM-DD-YYYY") %>
world: {{VALUE:World}}
campaign: <% tp.file.folder(false) %>
status: active
role: player
system: D&D 5e
banner: z_Assets/System/RPG Group.jpg
---
# The Story of <% tp.file.title %>

## Controls 
--- start-multi-column: Control panel p1\
```column-settings
number of columns: 4
```

```button
name New Session 
type command
action QuickAdd: Macro - New Session Journal Entry
```
```button
name New Mystery
type command
action QuickAdd: Macro - New Mystery
```

--- end-column ---

```button
name New Person  
type command
action QuickAdd: Macro - New NPC
```
```button
name New Map
type command
action QuickAdd: Macro - New Map
```

--- end-column ---

```button
name New Place  
type command
action QuickAdd: Macro - New Place
```
```button
name New Organization  
type command
action QuickAdd: Macro - New Organization
```

--- end-column ---

```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
```button
name New Note  
type command
action QuickAdd: Macro - New Note
```

--- end-multi-column


## [[<%tp.file.folder(true)%>/Quest Board/Quest Board|Quest Board]]
### Main Quest 
```dataviewjs
const current = dv.current();

const priorityLabels = {
    0: "Initial Setup",
    1: "Time-Critical",
    2: "Important",
    3: "Scheduled",
    4: "Side Quest",
    5: "Neutral"
};

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "active"
    )
    .sort(q => Number(q.questNum ?? 999999), "asc")
    .sort(q => Number(q.priority ?? 999999), "asc");

if (quests.length) {
    const mainQuest = quests[0];

    dv.table(
        ["Main Quest", "Quest #", "Priority", "Summary", "Status"],
        [[
            mainQuest.file.link,
            mainQuest.questNum ?? "-",
            priorityLabels[mainQuest.priority] ?? "Unknown",
            mainQuest.summary ?? "-",
            mainQuest.status ?? "Unknown"
        ]]
    );
} else {
    dv.paragraph("*No active main quest found.*");
}
```
### Other Active Quests
```dataviewjs
const current = dv.current();

const priorityLabels = {
    0: "Initial Setup",
    1: "Time-Critical",
    2: "Important",
    3: "Scheduled",
    4: "Side Quest",
    5: "Neutral"
};

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "active"
    )
    .sort(q => Number(q.questNum ?? 999999), "asc")
    .sort(q => Number(q.priority ?? 999999), "asc");

const otherQuests = quests.slice(1);

if (otherQuests.length) {
    dv.table(
        ["Quest", "Quest #", "Priority", "Summary"],
        otherQuests.map(q => [
            q.file.link,
            q.questNum ?? "-",
            priorityLabels[q.priority] ?? "Unknown",
            q.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No additional active quests.*");
}
```


## Mysteries
```dataviewjs
const current = dv.current();

const mysteries = dv.pages('"Campaigns"')
    .where(m =>
        m.type === "Mystery" &&
        m.campaign === current.campaign &&
        String(m.status ?? "").toLowerCase() !== "resolved"
    )
    .sort(m => m.file.name, "asc");

if (mysteries.length) {
    dv.table(
        ["Mystery", "Question", "Status"],
        mysteries.map(m => [
            m.file.link,
            m.summary ?? "-",
            m.status ?? "Unknown"
        ])
    );
} else {
    dv.paragraph("*No unresolved mysteries.*");
}
```

## [[<%tp.file.folder(true)%>/Session Journal/Session Journal|Journals]] 
```dataviewjs
const current = dv.current();

const sessions = dv.pages('"Campaigns"')
    .where(s =>
        String(s.type ?? "").toLowerCase() === "session journal" &&
        s.campaign === current.campaign
    )
    .sort(s => Number(s.sessionNum ?? -1), "desc")
    .limit(10);

if (sessions.length) {
    dv.table(
        ["Session", "Session #", "Date", "Summary"],
        sessions.map(s => [
            s.file.link,
            s.sessionNum ?? "-",
            s["date"] ?? s.date ?? "-",
            s.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No sessions recorded yet.*");
}
```


## People

### The Party
```dataviewjs
const current = dv.current();

const party = dv.pages('"Campaigns"')
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "PC" &&
        p.campaign === current.campaign
    )
    .sort(p => p.file.name, "asc");

// Create a character cell with an optional portrait.
function characterCell(character) {
    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";

    const portrait = character.image;

    if (portrait) {
        const rawPath = portrait.path
            ? portrait.path
            : String(portrait)
                .replace(/^!?\[\[/, "")
                .replace(/\]\]$/, "")
                .split("|")[0];

        const file = app.metadataCache.getFirstLinkpathDest(
            rawPath,
            character.file.path
        );

        if (file && file.extension !== "md") {
            const img = document.createElement("img");

            img.src = app.vault.getResourcePath(file);
            img.alt = character.file.name;

            img.style.width = "36px";
            img.style.height = "36px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.flexShrink = "0";

            container.appendChild(img);
        }
    }

    const link = document.createElement("a");

    link.textContent = character.file.name;
    link.classList.add("internal-link");
    link.setAttribute("data-href", character.file.path);
    link.setAttribute("href", character.file.path);

    container.appendChild(link);

    return container;
}

if (party.length) {
    dv.table(
        ["Character", "Player", "Race", "Class", "Level", "Status"],
        party.map(p => [
            characterCell(p),
            p.player ?? "-",
            p.race ?? "-",
            p.class ?? "-",
            p.level ?? "-",
            p.status ?? "Unknown"
        ])
    );
} else {
    dv.paragraph("*No party members recorded yet.*");
}
```

### Other Characters 
```dataviewjs
const current = dv.current();

const npcs = dv.pages(`"Worlds/${current.world}/People"`)
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "NPC" &&
        Array.from(p.campaigns ?? [])
            .includes(current.campaign)
    )
    .sort(p => p.file.name, "asc");

// Convert stored location values into clickable links.
function displayLocation(value) {
    if (!value) return "-";
    if (value.path) return value;

    const parsed = dv.parse(String(value));
    return parsed?.path ? parsed : String(value);
}

// Build a character cell containing a portrait and clickable name.
function characterCell(npc) {
    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";

    const portrait = npc.portrait;

    if (portrait) {
        const rawPath = portrait.path
            ? portrait.path
            : String(portrait)
                .replace(/^!?\[\[/, "")
                .replace(/\]\]$/, "")
                .split("|")[0];

        const file = app.metadataCache.getFirstLinkpathDest(
            rawPath,
            npc.file.path
        );

        if (file) {
            const img = document.createElement("img");

            img.src = app.vault.getResourcePath(file);
            img.alt = npc.file.name;

            img.style.width = "36px";
            img.style.height = "36px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.flexShrink = "0";

            container.appendChild(img);
        }
    }

    const link = document.createElement("a");

    link.textContent = npc.file.name;
    link.classList.add("internal-link");
    link.setAttribute("data-href", npc.file.path);
    link.setAttribute("href", npc.file.path);

    container.appendChild(link);

    return container;
}

if (npcs.length) {
    dv.table(
        [
            "Character",
            "Attitude",
            "Status",
            "Last Known Location",
            "Summary"
        ],
        npcs.map(p => [
            characterCell(p),
            p.attitude ?? "Unknown",
            p.status ?? "Unknown",
            displayLocation(p.location),
            p.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No NPCs recorded for this campaign.*");
}
```


## Places 
### Maps
```dataviewjs
const current = dv.current();

const maps = dv.pages(`"Worlds/${current.world}/Maps"`)
    .where(m =>
        m.type === "Map" &&
        (
            m.campaign === current.campaign ||
            Array.from(m.campaigns ?? [])
                .includes(current.campaign)
        )
    )
    .sort(m => m.file.name, "asc");

if (maps.length) {
    dv.table(
        ["Map", "Description"],
        maps.map(m => [
            m.file.link,
            m.summary ?? m.description ?? "-"
        ])
    );
} else {
    dv.paragraph("*No maps recorded for this campaign.*");
}
```

### Places
```dataviewjs
const current = dv.current();

const places = dv.pages(`"Worlds/${current.world}/Places"`)
    .where(p =>
        p.type === "Place" &&
        Array.from(p.campaigns ?? [])
            .includes(current.campaign)
    )
    .array();

// Resolve wikilinks to their actual files.
function resolveFile(value, sourcePath) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value)
            .replace(/^!?\[\[/, "")
            .replace(/\]\]$/, "")
            .split("|")[0];

    return app.metadataCache.getFirstLinkpathDest(
        raw,
        sourcePath
    );
}

// Index places by their file paths.
const placeMap = new Map(
    places.map(p => [p.file.path, p])
);

// Find a place's parent, if it's included in this campaign.
function getParent(place) {
    const file = resolveFile(
        place.parentLocation,
        place.file.path
    );

    return file ? placeMap.get(file.path) : null;
}

// Build the hierarchy, with alphabetical ordering at each level.
const children = new Map();

for (const place of places) {
    const parent = getParent(place);
    const parentKey = parent && parent.file.path !== place.file.path
        ? parent.file.path
        : null;

    if (!children.has(parentKey)) {
        children.set(parentKey, []);
    }

    children.get(parentKey).push(place);
}

for (const siblings of children.values()) {
    siblings.sort((a, b) =>
        a.file.name.localeCompare(b.file.name)
    );
}

// Flatten the hierarchy into display rows.
const ordered = [];
const visited = new Set();

function addPlace(place, depth = 0) {
    if (visited.has(place.file.path)) return;

    visited.add(place.file.path);
    ordered.push({ place, depth });

    for (const child of children.get(place.file.path) ?? []) {
        addPlace(child, depth + 1);
    }
}

for (const root of children.get(null) ?? []) {
    addPlace(root);
}

// Safety fallback for circular parent references.
for (const place of places) {
    if (!visited.has(place.file.path)) {
        addPlace(place);
    }
}

// Display clickable location values.
function displayLink(value) {
    if (!value) return "-";
    if (value.path) return value;

    const parsed = dv.parse(String(value));
    return parsed?.path ? parsed : String(value);
}

// Create a place name with optional image and indentation.
function placeCell(place, depth) {
    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";
    container.style.paddingLeft = `${depth * 18}px`;

    if (place.image) {
        const file = resolveFile(place.image, place.file.path);

        if (file && file.extension !== "md") {
            const img = document.createElement("img");

            img.src = app.vault.getResourcePath(file);
            img.alt = place.file.name;
            img.style.width = "36px";
            img.style.height = "36px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.flexShrink = "0";

            container.appendChild(img);
        }
    }

    const link = document.createElement("a");

    link.textContent = place.file.name;
    link.classList.add("internal-link");
    link.setAttribute("data-href", place.file.path);
    link.setAttribute("href", place.file.path);

    container.appendChild(link);

    return container;
}

if (ordered.length) {
    dv.table(
        ["Place", "Type", "Parent Location", "Status", "Summary"],
        ordered.map(({ place, depth }) => [
            placeCell(place, depth),
            place.locationType ?? "-",
            displayLink(place.parentLocation),
            place.status ?? "Unknown",
            place.summary ?? ""
        ])
    );
} else {
    dv.paragraph("*No places recorded for this campaign.*");
}
```

## Organizations 
```dataviewjs
const current = dv.current();

const organizations = dv.pages(`"Worlds/${current.world}/Organizations"`)
    .where(o =>
        o.type === "Organization" &&
        Array.from(o.campaigns ?? [])
            .includes(current.campaign)
    )
    .array();

// Resolve wikilinks to their actual files.
function resolveFile(value, sourcePath) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value)
            .replace(/^!?\[\[/, "")
            .replace(/\]\]$/, "")
            .split("|")[0];

    return app.metadataCache.getFirstLinkpathDest(
        raw,
        sourcePath
    );
}

// Index organizations by file path.
const organizationMap = new Map(
    organizations.map(o => [o.file.path, o])
);

// Find the parent organization within this campaign.
function getParent(org) {
    const file = resolveFile(
        org.parentOrganization,
        org.file.path
    );

    return file ? organizationMap.get(file.path) : null;
}

// Group organizations beneath their parents.
const children = new Map();

for (const org of organizations) {
    const parent = getParent(org);

    const parentKey =
        parent && parent.file.path !== org.file.path
            ? parent.file.path
            : null;

    if (!children.has(parentKey)) {
        children.set(parentKey, []);
    }

    children.get(parentKey).push(org);
}

// Alphabetize organizations sharing the same parent.
for (const siblings of children.values()) {
    siblings.sort((a, b) =>
        a.file.name.localeCompare(b.file.name)
    );
}

// Flatten the hierarchy for the table.
const ordered = [];
const visited = new Set();

function addOrganization(org, depth = 0) {
    if (visited.has(org.file.path)) return;

    visited.add(org.file.path);
    ordered.push({ org, depth });

    for (const child of children.get(org.file.path) ?? []) {
        addOrganization(child, depth + 1);
    }
}

for (const root of children.get(null) ?? []) {
    addOrganization(root);
}

// Safety fallback for circular parent references.
for (const org of organizations) {
    if (!visited.has(org.file.path)) {
        addOrganization(org);
    }
}

// Display clickable metadata links.
function displayLink(value) {
    if (!value || String(value) === "None") return "None";
    if (value.path) return value;

    const parsed = dv.parse(String(value));
    return parsed?.path ? parsed : String(value);
}

// Create organization name with optional image and indentation.
function organizationCell(org, depth) {
    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";
    container.style.paddingLeft = `${depth * 18}px`;

    if (org.image) {
        const file = resolveFile(org.image, org.file.path);

        if (file && file.extension !== "md") {
            const img = document.createElement("img");

            img.src = app.vault.getResourcePath(file);
            img.alt = org.file.name;

            img.style.width = "36px";
            img.style.height = "36px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.flexShrink = "0";

            container.appendChild(img);
        }
    }

    const link = document.createElement("a");

    link.textContent = org.file.name;
    link.classList.add("internal-link");
    link.setAttribute("data-href", org.file.path);
    link.setAttribute("href", org.file.path);

    container.appendChild(link);

    return container;
}

if (ordered.length) {
    dv.table(
        [
            "Organization",
            "Type",
            "Parent Organization",
            "Headquarters",
            "Status"
        ],
        ordered.map(({ org, depth }) => [
            organizationCell(org, depth),
            org.organizationType ?? "-",
            displayLink(org.parentOrganization),
            displayLink(org.headquarters),
            org.status ?? "Unknown"
        ])
    );
} else {
    dv.paragraph("*No organizations recorded for this campaign.*");
}
```

