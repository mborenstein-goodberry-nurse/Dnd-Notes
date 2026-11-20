---
type: Reference Sheet
date: 11-19-2026
campaign: What Lies Beneath
world: What Lies Beneath
---
# Other Characters

A complete index of the campaign's NPCs, sorted by most recent recorded appearance. Characters without a recorded appearance appear last, alphabetically.

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
