---
aliases: games
banner_y: 0.86
banner: z_Assets/System/Sunset Banner.png
cssclasses:
session-hero: false
---
# [[Campaign Index]]

## List of current campaigns
```button
name Add New Campaign
type command
action QuickAdd: Macro - New Campaign
```

```dataviewjs
const statusOrder = {
    "active": 0,
    "planning": 1,
    "on hold": 2,
    "completed": 3,
    "cancelled": 3
};

const campaigns = dv.pages('"Campaigns"')
    .where(p => p.type === "Campaign")
    .array()
    .sort((a, b) => {
        const statusA = String(a.status ?? "").trim().toLowerCase();
        const statusB = String(b.status ?? "").trim().toLowerCase();

        const priorityA = statusOrder[statusA] ?? 99;
        const priorityB = statusOrder[statusB] ?? 99;

        return priorityA - priorityB ||
            a.file.name.localeCompare(b.file.name);
    });

const sessions = dv.pages('"Campaigns"')
    .where(p => p.type === "Session Journal");

function getNumOfGames(campaign) {
    const folder = `Campaigns/${campaign.campaign}/`;

    return sessions.where(s =>
        s.file.path.startsWith(folder) &&
        Number(s.sessionNum) > 0
    ).length;
}

dv.table(
    ["Campaign", "System", "Sessions", "Role", "Status"],
    campaigns.map(c => [
        c.file.link,
        c.system ?? "-",
        getNumOfGames(c),
        c.role ?? "-",
        c.status ?? "-"
    ])
);
```
### Historical Session Metadata Audit
```dataviewjs
const campaigns = dv.pages('"Campaigns"')
    .where(p => p.type === "Campaign");

const files = app.vault.getMarkdownFiles();
const excluded = [];

for (const campaign of campaigns) {
    const folder = campaign.file.folder;

    const journals = files.filter(f =>
        f.path.startsWith(`${folder}/Session Journal/`) ||
        f.path.startsWith(`${folder}/Session Journals/`)
    );

    for (const file of journals) {
        const page = dv.page(file.path);
        const type = page?.type ?? null;
        const number = page?.sessionNum ?? null;

        // Session 0 is intentionally excluded.
        if (file.basename === "Session 0" ||
            (type === "Session Journal" && Number(number) === 0)) {
            continue;
        }

        const valid =
            type === "Session Journal" &&
            number !== null &&
            Number(number) > 0;

        if (valid) continue;

        const reasons = [];

        if (type !== "Session Journal")
            reasons.push("Incorrect or missing type");

        if (number === null || !(Number(number) > 0))
            reasons.push("Missing or invalid sessionNum");

        excluded.push([
            campaign.file.link,
            dv.fileLink(file.path),
            type ?? "Missing",
            number ?? "Missing",
            reasons.join("; ")
        ]);
    }
}

dv.paragraph(`**${excluded.length} session-folder notes require review.**`);

if (excluded.length) {
    dv.table(
        ["Campaign", "Session", "Type", "Session #", "Issue"],
        excluded
    );
} else {
    dv.paragraph("All detected session notes meet v2 requirements.");
}
```
