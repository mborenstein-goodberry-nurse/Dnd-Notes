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
