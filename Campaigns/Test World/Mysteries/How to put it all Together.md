---
type: Mystery
date: 10-22-2026
campaign: Test World
world: Test World
status: Unresolved
summary: How do we link the Mysteries, Quests, and Everything else together?
people:
  - "[[Test Adventurer]]"
  - "[[Captain Aldric]]"
  - "[[Lady Eveline]]"
organizations:
  - "[[Thieve's Faction]]"
places:
  - "[[City of Brass]]"
  - "[[The Gilded Tavern]]"
firstSeen:
lastSeen:
tags:
---

# [[How to put it all Together]]

> [!fas-infobox|right no-title] Mystery Overview
> ## ✧ Mystery Overview ✧
> **Status:** `INPUT[inlineSelect(option(Unresolved), option(Partially Answered), option(Resolved)):status]`
>
> **First Discovered:** `=this.firstSeen`
>
> **Last Discovery:** `=this.lastSeen`
#### The Question 

*`=this.summary`*

#### What We Know


#### Discoveries
```dataviewjs
const current = dv.current();

const matchesLink = (value, target) => {
    if (!value) return false;

    if (value.path) {
        const resolved = dv.page(value.path);
        return resolved?.file.path === target.file.path ||
               value.path === target.file.path;
    }

    const name = String(value)
        .replace(/^\[\[/, "")
        .replace(/\]\]$/, "")
        .split("|")[0];

    const resolved = dv.page(name);

    return resolved?.file.path === target.file.path ||
           name === target.file.name ||
           name === target.file.path;
};

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        Array.from(q.mysteries ?? [])
            .some(m => matchesLink(m, current))
    )
    .sort(q => q.file.name, "asc");

if (quests.length) {
    dv.header(2, "Related Quests");

    dv.table(
        ["Quest", "Campaign", "Status"],
        quests.map(q => [
            q.file.link,
            q.campaign ?? "-",
            q.status ?? "Unknown"
        ])
    );
}
```


#### Related Notes

