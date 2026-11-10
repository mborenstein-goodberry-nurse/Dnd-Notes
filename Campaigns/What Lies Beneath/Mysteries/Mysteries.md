---
type: Reference Sheet
date: 11-10-2026
campaign: What Lies Beneath
world: What Lies Beneath
---
# Mysteries

A complete index of the campaign's mysteries, including resolved mysteries.

```dataviewjs
const current = dv.current();
const root = `Campaigns/${current.campaign}`;

// A complete view, including solved mysteries. Read only this campaign.
const sessionNumbers = new Map(
    dv.pages(`"${root}/Session Journal"`)
      .where(s => String(s.type ?? "").toLowerCase() === "session journal"
               && s.campaign === current.campaign)
      .array()
      .map(s => [s.file.path, Number(s.sessionNum ?? -1)])
);

function lastReferencedSession(mystery) {
    for (const reference of [mystery.lastSeen, mystery.firstSeen]) {
        if (!reference) continue;
        const raw = reference?.path ?? String(reference)
            .trim().replace(/^!?\[\[/, "").replace(/\]\]$/, "").split("|")[0];
        const resolved = app.metadataCache.getFirstLinkpathDest(raw, mystery.file.path);
        if (resolved && sessionNumbers.has(resolved.path)) return sessionNumbers.get(resolved.path);
    }
    return -1;
}

function rankStatus(value) {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "unresolved") return 0;
    if (normalized === "partially answered" || normalized === "partially resolved") return 1;
    if (normalized === "resolved") return 2;
    return 3;
}

const mysteries = dv.pages(`"${root}/Mysteries"`)
    .where(m => String(m.type ?? "").toLowerCase() === "mystery"
        && m.campaign === current.campaign)
    .array()
    .sort((a, b) => rankStatus(a.status) - rankStatus(b.status)
        || lastReferencedSession(b) - lastReferencedSession(a)
        || a.file.name.localeCompare(b.file.name, undefined, { sensitivity: "base" }));

function addLink(cell, target, label, sourcePath) {
    const raw = target?.path ?? String(target);
    const file = app.metadataCache.getFirstLinkpathDest(raw, sourcePath);
    const path = file?.path ?? raw;
    const link = document.createElement("a");
    link.className = "internal-link";
    link.href = path;
    link.setAttribute("data-href", path);
    link.textContent = label || path.split("/").pop().replace(/\.md$/, "");
    cell.appendChild(link);
}

function addValue(cell, value, sourcePath) {
    if (value == null || String(value).trim() === "") {
        cell.textContent = "-";
        return;
    }
    if (value?.path) {
        addLink(cell, value.path, value.display, sourcePath);
        return;
    }
    const text = String(value);
    const wikilink = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let position = 0;
    let match;
    while ((match = wikilink.exec(text)) !== null) {
        cell.appendChild(document.createTextNode(text.slice(position, match.index)));
        addLink(cell, match[1], match[2], sourcePath);
        position = wikilink.lastIndex;
    }
    cell.appendChild(document.createTextNode(text.slice(position)));
}

if (!mysteries.length) {
    dv.paragraph("*No mysteries recorded yet.*");
} else {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";
    const header = table.createTHead().insertRow();
    ["Mystery", "Question", "Status", "Last Discovery"].forEach((title, index) => {
        const th = document.createElement("th");
        th.className = "table-view-th";
        th.textContent = index === 0 ? `${title} (${mysteries.length})` : title;
        header.appendChild(th);
    });
    const body = table.createTBody();
    for (const m of mysteries) {
        const row = body.insertRow();
        addLink(row.insertCell(), m.file.path, m.file.name, current.file.path);
        addValue(row.insertCell(), m.summary, m.file.path);
        addValue(row.insertCell(), m.status, m.file.path);
        addValue(row.insertCell(), m.lastSeen, m.file.path);
    }
    table.addEventListener("click", event => {
        const anchor = event.target.closest("a.internal-link[data-href]");
        if (!anchor || !table.contains(anchor)) return;
        event.preventDefault();
        event.stopPropagation();
        app.workspace.openLinkText(anchor.getAttribute("data-href"), current.file.path,
            event.ctrlKey || event.metaKey);
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
```
