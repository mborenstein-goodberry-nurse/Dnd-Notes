---
type: Reference Sheet
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
---
```dataviewjs
const current = dv.current();
const folder = `Campaigns/${current.campaign}/Session Journal`;

const sessions = dv.pages(`"${folder}"`)
    .where(s =>
        String(s.type ?? "").toLowerCase() === "session journal"
    )
    .sort(s => Number(s.sessionNum ?? -1), "desc")
    .array();

// Convert metadata to plain display text.
function text(value) {
    if (value == null) return "";

    if (Array.isArray(value)) {
        return value.map(text).filter(Boolean).join("; ");
    }

    if (typeof value.toFormat === "function") {
        return value.toFormat("MM-dd-yyyy");
    }

    const result = String(value).trim();
    return result.toLowerCase() === "null" ? "" : result;
}

// Create working Obsidian internal links.
function addLink(cell, target, label, sourcePath) {
    const link = document.createElement("a");
    link.className = "internal-link";
    link.textContent = label;
    link.href = "#";
    link.setAttribute("data-href", target);

    link.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        app.workspace.openLinkText(
            target,
            sourcePath,
            event.ctrlKey || event.metaKey
        );
    });

    cell.appendChild(link);
}

// Render summary text, preserving [[wikilinks]].
function renderSummary(cell, value, sourcePath) {
    const summary = text(value);
    const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(summary)) !== null) {
        cell.appendChild(document.createTextNode(
            summary.slice(lastIndex, match.index)
        ));

        const target = match[1];
        const label = match[2] ?? target.split("/").pop();

        addLink(cell, target, label, sourcePath);
        lastIndex = regex.lastIndex;
    }

    cell.appendChild(document.createTextNode(
        summary.slice(lastIndex)
    ));
}

// Build a lightweight table using Dataview's CSS classes.
if (!sessions.length) {
    dv.paragraph("*No sessions recorded yet.*");
} else {
    const table = document.createElement("table");
    table.className = "dataview table-view-table";

    const thead = table.createTHead();
    thead.className = "table-view-thead";

    const header = thead.insertRow();
    header.className = "table-view-tr-header";

    [
        `Session (${sessions.length})`,
        "Session #",
        "Date",
        "Summary"
    ].forEach(title => {
        const th = document.createElement("th");
        th.className = "table-view-th";
        th.textContent = title;
        header.appendChild(th);
    });

    const tbody = table.createTBody();
    tbody.className = "table-view-tbody";

    for (const s of sessions) {
        const row = tbody.insertRow();

        const nameCell = row.insertCell();
        addLink(
            nameCell,
            s.file.path,
            s.file.name,
            current.file.path
        );

        row.insertCell().textContent = text(s.sessionNum) || "-";
        row.insertCell().textContent = text(s.date) || "-";

        const summaryCell = row.insertCell();

		if (text(s.summary)) {
		    renderSummary(summaryCell, s.summary, s.file.path);
		} else {
		    summaryCell.textContent = "-";
		}
    }

    dv.container.appendChild(table);
}
```
