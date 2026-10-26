---
aliases: games
banner_y: 0.86
banner: z_Assets/Sunset Banner.png
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
const campaigns = dv.pages('"Campaigns"')
    .where(p => p.type === "Campaign")
    .sort(p => p.status, "asc");

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
