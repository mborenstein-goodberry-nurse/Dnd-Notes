---
aliases: games
banner_y: 1
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

    const campaignSessions = sessions
        .where(s => s.file.path.startsWith(folder))
        .array();

    return campaignSessions.reduce((highest, session) => {
        const num = Number(session.sessionNum);

        return Number.isInteger(num) && num > highest
            ? num
            : highest;
    }, 0);
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

Lily's Notes for [[Bullets and Broncos]]: 
https://horatioclerval.notion.site/Bullets-Broncos-Keera-Miller-409271ed763747d884619f3bbedffd8d