---
type: Campaign
date: 12-01-2025
world: Astodan
campaign: Sands of Desolation
status: Active
role: player
system: D&D 5e
banner: z_Assets/Sands of Desolation/Sands of Desolation.png
banner-height: 625
content-start: 291
banner-radius: 17
banner-x: 50
banner-y: 70
---
# The Story of Sands of Desolation

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


## [[Campaigns/Sands of Desolation/Quest Board/Quest Board|Quest Board]]
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

const quests = dv.pages(`"Campaigns/${current.campaign}/Quest Board"`)
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "active"
    )
    .array()
    .sort((a, b) => {
        const byPriority = Number(a.priority ?? 999999) - Number(b.priority ?? 999999);
        if (byPriority !== 0) return byPriority;

        const byNumber = Number(a.questNum ?? 999999) - Number(b.questNum ?? 999999);
        return byNumber || a.file.name.localeCompare(b.file.name);
    });

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

const quests = dv.pages(`"Campaigns/${current.campaign}/Quest Board"`)
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "active"
    )
    .array()
    .sort((a, b) => {
        const byPriority = Number(a.priority ?? 999999) - Number(b.priority ?? 999999);
        if (byPriority !== 0) return byPriority;

        const byNumber = Number(a.questNum ?? 999999) - Number(b.questNum ?? 999999);
        return byNumber || a.file.name.localeCompare(b.file.name);
    });

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
```button
name New Mystery
type command
action QuickAdd: Macro - New Mystery
```
```dataviewjs
const current = dv.current();

const mysteries = dv.pages(`"Campaigns/${current.campaign}/Mysteries"`)
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

## [[Campaigns/Sands of Desolation/Session Journal/Session Journal|Journals]] 
```dataviewjs
const current = dv.current();
const folder = `Campaigns/${current.campaign}/Session Journal`;
const sessions = dv.pages(`"${folder}"`)
    .where(s =>
        String(s.type ?? "").toLowerCase() === "session journal" &&
        s.campaign === current.campaign
    )
    .sort(s => Number(s.sessionNum ?? -1), "desc")
    .limit(10)
    .array();

// Lightweight renderer: skips Dataview's per-cell rich Markdown processing.
function displayText(value) {
    if (value == null) return "";
    if (dv.isArray(value) || Array.isArray(value)) {
        return Array.from(value).map(displayText).filter(Boolean).join("; ");
    }
    if (typeof value.toFormat === "function") return value.toFormat("MM-dd-yyyy");
    const result = String(value).trim();
    return result.toLowerCase() === "null" ? "" : result;
}

function appendLink(cell, path, label) {
    const link = document.createElement("a");
    link.className = "internal-link";
    link.href = path;
    link.setAttribute("data-href", path);
    link.textContent = label;
    cell.appendChild(link);
}

function appendValue(cell, value, sourcePath = current.file.path, fallback = "-") {
    if (value?.nodeType) {
        cell.appendChild(value);
        return;
    }
    if (value?.path) {
        appendLink(cell, value.path, value.display || value.path.split("/").pop().replace(/\.md$/, ""));
        return;
    }
    const content = displayText(value);
    if (!content) {
        cell.textContent = fallback;
        return;
    }
    // Preserve wikilinks and aliases without running the rich Markdown renderer.
    const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let offset = 0;
    let found;
    while ((found = regex.exec(content)) !== null) {
        cell.appendChild(document.createTextNode(content.slice(offset, found.index)));
        const rawTarget = found[1];
        const label = found[2] || rawTarget.split("/").pop();
        const file = app.metadataCache.getFirstLinkpathDest(rawTarget, sourcePath);
        appendLink(cell, file?.path || rawTarget, label);
        offset = regex.lastIndex;
    }
    cell.appendChild(document.createTextNode(content.slice(offset)));
}

function renderTable(headers, rows, blankColumns = []) {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";
    const thead = table.createTHead();
    thead.className = "table-view-thead";
    const header = thead.insertRow();
    header.className = "table-view-tr-header";
    headers.forEach((name, index) => {
        const th = document.createElement("th");
        th.className = "table-view-th";
        th.textContent = index === 0 ? `${name} (${rows.length})` : name;
        header.appendChild(th);
    });
    const tbody = table.createTBody();
    tbody.className = "table-view-tbody";
    rows.forEach(row => {
        const tr = tbody.insertRow();
        row.forEach((value, index) =>
            appendValue(tr.insertCell(), value, current.file.path, blankColumns.includes(index) ? "" : "-")
        );
    });
    // Delegate navigation instead of attaching one event listener per cell.
    table.addEventListener("click", event => {
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        event.stopPropagation();
        app.workspace.openLinkText(
            anchor.getAttribute("data-href"),
            current.file.path,
            event.ctrlKey || event.metaKey
        );
    });
    table.addEventListener("auxclick", event => {
        if (event.button !== 1) return;
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        app.workspace.openLinkText(anchor.getAttribute("data-href"), current.file.path, true);
    });
    dv.container.appendChild(table);
}

if (sessions.length) {
    renderTable(
        ["Session", "Session #", "Date", "Summary"],
        sessions.map(s => [
            s.file.link,
            s.sessionNum ?? "-",
            s.displayDate ?? s.date ?? "-",
            s.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No sessions recorded yet.*");
}
```


## People

### Character Reference
[[Campaigns/Sands of Desolation/Diane - Character Reference|☀️ Diane]] · [[Campaigns/Sands of Desolation/Weary - Character Reference|✨ Weary]]

### The Party
```button
name New Party Member
type command
action QuickAdd: Macro - New Party Member
```
```dataviewjs
const current = dv.current();

const party = dv.pages(`"Campaigns/${current.campaign}/The Party"`)
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "PC" &&
        p.campaign === current.campaign
    )
    .sort(p => p.file.name, "asc")
    .array();

// Reuse the existing portrait-and-name appearance.
function characterCell(character) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";

    if (character.image) {
        const rawPath = character.image.path
            ? character.image.path
            : String(character.image)
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
            img.loading = "lazy";
            img.style.width = "36px";
            img.style.height = "36px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.flexShrink = "0";
            container.appendChild(img);
        }
    }

    const link = document.createElement("a");
    link.className = "internal-link";
    link.textContent = character.file.name;
    link.href = character.file.path;
    link.setAttribute("data-href", character.file.path);
    container.appendChild(link);
    return container;
}

// Lightweight metadata renderer: show actual lists as readable, linked text
// rather than rendering bullet lists (including empty bullet lists).
function addLink(cell, target, label, sourcePath) {
    const file = app.metadataCache.getFirstLinkpathDest(target, sourcePath);
    const path = file?.path || target;
    const link = document.createElement("a");
    link.className = "internal-link";
    link.href = path;
    link.setAttribute("data-href", path);
    link.textContent = label || target.split("/").pop().replace(/\.md$/, "");
    cell.appendChild(link);
}

function isArrayValue(value) {
    return Array.isArray(value) || dv.isArray(value);
}

function hasContent(value) {
    if (value == null) return false;
    if (isArrayValue(value)) return Array.from(value).some(hasContent);
    if (value.path) return true; // Dataview Link
    if (typeof value === "string") {
        const str = value.trim();
        return str !== "" && str.toLowerCase() !== "null";
    }
    return true; // 0 and false are valid metadata values
}

function addTextWithWikilinks(cell, value, sourcePath) {
    const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let offset = 0;
    let match;
    while ((match = regex.exec(value)) !== null) {
        cell.appendChild(document.createTextNode(value.slice(offset, match.index)));
        addLink(cell, match[1], match[2] || "", sourcePath);
        offset = regex.lastIndex;
    }
    cell.appendChild(document.createTextNode(value.slice(offset)));
}

function appendValue(cell, value, sourcePath) {
    if (!hasContent(value)) {
        cell.textContent = "-";
        return;
    }

    function appendPart(part) {
        if (isArrayValue(part)) {
            let first = true;
            for (const item of Array.from(part)) {
                if (!hasContent(item)) continue;
                if (!first) cell.appendChild(document.createTextNode("; "));
                appendPart(item);
                first = false;
            }
        } else if (part?.path) {
            addLink(cell, part.path, part.display || "", sourcePath);
        } else if (typeof part?.toFormat === "function") {
            cell.appendChild(document.createTextNode(part.toFormat("MM-dd-yyyy")));
        } else {
            addTextWithWikilinks(cell, String(part).trim(), sourcePath);
        }
    }

    appendPart(value);
}

if (party.length) {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";

    const thead = table.createTHead();
    thead.className = "table-view-thead";
    const header = thead.insertRow();
    header.className = "table-view-tr-header";

    ["Character", "Player", "Race", "Class", "Level", "Status"]
        .forEach((name, index) => {
            const th = document.createElement("th");
            th.className = "table-view-th";
            th.textContent = index === 0 ? `${name} (${party.length})` : name;
            header.appendChild(th);
        });

    const tbody = table.createTBody();
    tbody.className = "table-view-tbody";
    for (const p of party) {
        const row = tbody.insertRow();
        row.insertCell().appendChild(characterCell(p));
        appendValue(row.insertCell(), p.player, p.file.path);
        appendValue(row.insertCell(), p.race, p.file.path);
        appendValue(row.insertCell(), p.class, p.file.path);
        appendValue(row.insertCell(), p.level, p.file.path);
        appendValue(row.insertCell(), p.status ?? "Unknown", p.file.path);
    }

    // One event handler for the table, rather than one per link.
    table.addEventListener("click", event => {
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        event.stopPropagation();
        app.workspace.openLinkText(
            anchor.getAttribute("data-href"),
            current.file.path,
            event.ctrlKey || event.metaKey
        );
    });
    table.addEventListener("auxclick", event => {
        if (event.button !== 1) return;
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        app.workspace.openLinkText(
            anchor.getAttribute("data-href"),
            current.file.path,
            true
        );
    });
    dv.container.appendChild(table);
} else {
    dv.paragraph("*No party members recorded yet.*");
}
```

### Other Characters 
```button
name New Person  
type command
action QuickAdd: Macro - New NPC
```
```dataviewjs
const current = dv.current();

// Get the session number from an NPC's statusAsOf link.
function getLastAppearance(npc) {
    if (!npc.statusAsOf) return -1;

    const rawPath = npc.statusAsOf.path
        ? npc.statusAsOf.path
        : String(npc.statusAsOf)
            .replace(/^!?\[\[/, "")
            .replace(/\]\]$/, "")
            .split("|")[0];

    const file = app.metadataCache.getFirstLinkpathDest(
        rawPath,
        npc.file.path
    );

    if (!file) return -1;

    const session = dv.page(file.path);

    if (session?.sessionNum == null) return -1;

    const sessionNum = Number(session.sessionNum);

    return Number.isFinite(sessionNum) ? sessionNum : -1;
}

// Collect NPCs belonging to the current campaign.
const npcs = dv.pages(`"Worlds/${current.world}/People"`)
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "NPC" &&
        Array.from(p.campaigns ?? [])
            .includes(current.campaign)
    )
    .array();

// Cache the last appearance for each NPC.
const appearances = new Map(
    npcs.map(p => [
        p.file.path,
        getLastAppearance(p)
    ])
);

// Sort newest appearance first, then alphabetically.
npcs.sort((a, b) => {
    const sessionA = appearances.get(a.file.path);
    const sessionB = appearances.get(b.file.path);

    return (sessionB - sessionA) ||
        a.file.name.localeCompare(
            b.file.name,
            undefined,
            { sensitivity: "base" }
        );
});

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

        if (file && file.extension !== "md") {
            const img = document.createElement("img");

            img.src = app.vault.getResourcePath(file);
            img.alt = npc.file.name;
            img.loading = "lazy";

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

// Render the NPC table without Dataview's rich per-cell renderer.
// Lightweight renderer: skips Dataview's per-cell rich Markdown processing.
function displayText(value) {
    if (value == null) return "";
    if (dv.isArray(value) || Array.isArray(value)) {
        return Array.from(value).map(displayText).filter(Boolean).join("; ");
    }
    if (typeof value.toFormat === "function") return value.toFormat("MM-dd-yyyy");
    const result = String(value).trim();
    return result.toLowerCase() === "null" ? "" : result;
}

function appendLink(cell, path, label) {
    const link = document.createElement("a");
    link.className = "internal-link";
    link.href = path;
    link.setAttribute("data-href", path);
    link.textContent = label;
    cell.appendChild(link);
}

function appendValue(cell, value, sourcePath = current.file.path, fallback = "-") {
    if (value?.nodeType) {
        cell.appendChild(value);
        return;
    }
    if (value?.path) {
        appendLink(cell, value.path, value.display || value.path.split("/").pop().replace(/\.md$/, ""));
        return;
    }
    const content = displayText(value);
    if (!content) {
        cell.textContent = fallback;
        return;
    }
    // Preserve wikilinks and aliases without running the rich Markdown renderer.
    const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let offset = 0;
    let found;
    while ((found = regex.exec(content)) !== null) {
        cell.appendChild(document.createTextNode(content.slice(offset, found.index)));
        const rawTarget = found[1];
        const label = found[2] || rawTarget.split("/").pop();
        const file = app.metadataCache.getFirstLinkpathDest(rawTarget, sourcePath);
        appendLink(cell, file?.path || rawTarget, label);
        offset = regex.lastIndex;
    }
    cell.appendChild(document.createTextNode(content.slice(offset)));
}

function renderTable(headers, rows, blankColumns = []) {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";
    const thead = table.createTHead();
    thead.className = "table-view-thead";
    const header = thead.insertRow();
    header.className = "table-view-tr-header";
    headers.forEach((name, index) => {
        const th = document.createElement("th");
        th.className = "table-view-th";
        th.textContent = index === 0 ? `${name} (${rows.length})` : name;
        header.appendChild(th);
    });
    const tbody = table.createTBody();
    tbody.className = "table-view-tbody";
    rows.forEach(row => {
        const tr = tbody.insertRow();
        row.forEach((value, index) =>
            appendValue(tr.insertCell(), value, current.file.path, blankColumns.includes(index) ? "" : "-")
        );
    });
    // Delegate navigation instead of attaching one event listener per cell.
    table.addEventListener("click", event => {
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        event.stopPropagation();
        app.workspace.openLinkText(
            anchor.getAttribute("data-href"),
            current.file.path,
            event.ctrlKey || event.metaKey
        );
    });
    table.addEventListener("auxclick", event => {
        if (event.button !== 1) return;
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        app.workspace.openLinkText(anchor.getAttribute("data-href"), current.file.path, true);
    });
    dv.container.appendChild(table);
}

if (npcs.length) {
    renderTable(
        ["Character", "Attitude", "Status", "Last Appearance", "Last Known Location", "Summary"],
        npcs.map(p => [
            characterCell(p),
            p.attitude ?? "Unknown",
            p.status ?? "Unknown",
            displayLocation(p.statusAsOf),
            displayLocation(p.location),
            p.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No NPCs recorded for this campaign.*");
}
```


## Organizations
```button
name New Organization
type command
action QuickAdd: Macro - New Organization
```
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
            img.loading = "lazy";

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

// Lightweight renderer: skips Dataview's per-cell rich Markdown processing.
function displayText(value) {
    if (value == null) return "";
    if (dv.isArray(value) || Array.isArray(value)) {
        return Array.from(value).map(displayText).filter(Boolean).join("; ");
    }
    if (typeof value.toFormat === "function") return value.toFormat("MM-dd-yyyy");
    const result = String(value).trim();
    return result.toLowerCase() === "null" ? "" : result;
}

function appendLink(cell, path, label) {
    const link = document.createElement("a");
    link.className = "internal-link";
    link.href = path;
    link.setAttribute("data-href", path);
    link.textContent = label;
    cell.appendChild(link);
}

function appendValue(cell, value, sourcePath = current.file.path, fallback = "-") {
    if (value?.nodeType) {
        cell.appendChild(value);
        return;
    }
    if (value?.path) {
        appendLink(cell, value.path, value.display || value.path.split("/").pop().replace(/\.md$/, ""));
        return;
    }
    const content = displayText(value);
    if (!content) {
        cell.textContent = fallback;
        return;
    }
    // Preserve wikilinks and aliases without running the rich Markdown renderer.
    const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let offset = 0;
    let found;
    while ((found = regex.exec(content)) !== null) {
        cell.appendChild(document.createTextNode(content.slice(offset, found.index)));
        const rawTarget = found[1];
        const label = found[2] || rawTarget.split("/").pop();
        const file = app.metadataCache.getFirstLinkpathDest(rawTarget, sourcePath);
        appendLink(cell, file?.path || rawTarget, label);
        offset = regex.lastIndex;
    }
    cell.appendChild(document.createTextNode(content.slice(offset)));
}

function renderTable(headers, rows, blankColumns = []) {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";
    const thead = table.createTHead();
    thead.className = "table-view-thead";
    const header = thead.insertRow();
    header.className = "table-view-tr-header";
    headers.forEach((name, index) => {
        const th = document.createElement("th");
        th.className = "table-view-th";
        th.textContent = index === 0 ? `${name} (${rows.length})` : name;
        header.appendChild(th);
    });
    const tbody = table.createTBody();
    tbody.className = "table-view-tbody";
    rows.forEach(row => {
        const tr = tbody.insertRow();
        row.forEach((value, index) =>
            appendValue(tr.insertCell(), value, current.file.path, blankColumns.includes(index) ? "" : "-")
        );
    });
    // Delegate navigation instead of attaching one event listener per cell.
    table.addEventListener("click", event => {
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        event.stopPropagation();
        app.workspace.openLinkText(
            anchor.getAttribute("data-href"),
            current.file.path,
            event.ctrlKey || event.metaKey
        );
    });
    table.addEventListener("auxclick", event => {
        if (event.button !== 1) return;
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        app.workspace.openLinkText(anchor.getAttribute("data-href"), current.file.path, true);
    });
    dv.container.appendChild(table);
}

if (ordered.length) {
    renderTable(
        ["Organization", "Type", "Parent Organization", "Headquarters", "Status"],
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


## Places 
### Maps
```button
name New Map
type command
action QuickAdd: Macro - New Map
```
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
```button
name New Place
type command
action QuickAdd: Macro - New Place
```
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
            img.loading = "lazy";
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

// Lightweight renderer: skips Dataview's per-cell rich Markdown processing.
function displayText(value) {
    if (value == null) return "";
    if (dv.isArray(value) || Array.isArray(value)) {
        return Array.from(value).map(displayText).filter(Boolean).join("; ");
    }
    if (typeof value.toFormat === "function") return value.toFormat("MM-dd-yyyy");
    const result = String(value).trim();
    return result.toLowerCase() === "null" ? "" : result;
}

function appendLink(cell, path, label) {
    const link = document.createElement("a");
    link.className = "internal-link";
    link.href = path;
    link.setAttribute("data-href", path);
    link.textContent = label;
    cell.appendChild(link);
}

function appendValue(cell, value, sourcePath = current.file.path, fallback = "-") {
    if (value?.nodeType) {
        cell.appendChild(value);
        return;
    }
    if (value?.path) {
        appendLink(cell, value.path, value.display || value.path.split("/").pop().replace(/\.md$/, ""));
        return;
    }
    const content = displayText(value);
    if (!content) {
        cell.textContent = fallback;
        return;
    }
    // Preserve wikilinks and aliases without running the rich Markdown renderer.
    const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let offset = 0;
    let found;
    while ((found = regex.exec(content)) !== null) {
        cell.appendChild(document.createTextNode(content.slice(offset, found.index)));
        const rawTarget = found[1];
        const label = found[2] || rawTarget.split("/").pop();
        const file = app.metadataCache.getFirstLinkpathDest(rawTarget, sourcePath);
        appendLink(cell, file?.path || rawTarget, label);
        offset = regex.lastIndex;
    }
    cell.appendChild(document.createTextNode(content.slice(offset)));
}

function renderTable(headers, rows, blankColumns = []) {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";
    const thead = table.createTHead();
    thead.className = "table-view-thead";
    const header = thead.insertRow();
    header.className = "table-view-tr-header";
    headers.forEach((name, index) => {
        const th = document.createElement("th");
        th.className = "table-view-th";
        th.textContent = index === 0 ? `${name} (${rows.length})` : name;
        header.appendChild(th);
    });
    const tbody = table.createTBody();
    tbody.className = "table-view-tbody";
    rows.forEach(row => {
        const tr = tbody.insertRow();
        row.forEach((value, index) =>
            appendValue(tr.insertCell(), value, current.file.path, blankColumns.includes(index) ? "" : "-")
        );
    });
    // Delegate navigation instead of attaching one event listener per cell.
    table.addEventListener("click", event => {
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        event.stopPropagation();
        app.workspace.openLinkText(
            anchor.getAttribute("data-href"),
            current.file.path,
            event.ctrlKey || event.metaKey
        );
    });
    table.addEventListener("auxclick", event => {
        if (event.button !== 1) return;
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        app.workspace.openLinkText(anchor.getAttribute("data-href"), current.file.path, true);
    });
    dv.container.appendChild(table);
}

if (ordered.length) {
    renderTable(
        ["Place", "Type", "Parent Location", "Status", "Summary"],
        ordered.map(({ place, depth }) => [
            placeCell(place, depth),
            place.locationType ?? "-",
            displayLink(place.parentLocation),
            place.status ?? "Unknown",
            place.summary ?? ""
        ]),
        [4] // Original Places view leaves missing summaries blank.
    );
} else {
    dv.paragraph("*No places recorded for this campaign.*");
}
```


## Pre-Campaign History

[[Campaigns/Sands of Desolation/Session Journal/Session 0|Background and chronology before Session 1]] — Diane and Weary's earlier campaign, marriage, their shared [[Aceso Aid]] caravan, and the unresolved disappearance of [[Ernon Quest]] and [[Divari Quest]]. **Starting levels:** Diane cleric 7 / druid 2; Weary sorcerer 9 (original character plan).

## Historical Campaign Pointers

Confirmed player characters for the present reconstruction: [[Weary]] and [[Diane]]. Both now use the v2 **PC** schema. An older index also listed [[Waffles]] under **Me**; its player/ownership remains unverified, so no classification has been changed.
