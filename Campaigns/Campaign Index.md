---
aliases: games
banner_y: 0.86
banner: z_Assets/Sunset Banner.png
cssclasses:
---
# [[Campaign Index]]

## List of current campaigns
```button
name Add New World
type command
action QuickAdd: Macro - New Campaign
```

```dataviewjs
let totalGames;
function getNumOfGames(campaign) {
	let numOfGames = app.plugins.plugins.dataview.api
        .pages(`"Campaigns/${campaign}"`)
        .where(page => {
            if (page.type === 'session') {
                if (page.campaign === campaign) {
	                totalGames = totalGames + 1;
                    return true;
                }
            }
        }).length
	return numOfGames
}

dv.table(["Campaign","System","Sessions", "Role","Status"],dv.pages('"Campaigns"')
  .where(b => b.type === "Campaign")
  .sort(b => b.status)
  .map(b => [dv.fileLink(b.file.path,false,[b.campaign]),b.system,getNumOfGames(b.campaign),b.role,b.status]))
```
