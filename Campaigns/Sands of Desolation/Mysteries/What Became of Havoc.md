---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: Where did Havoc and the powerful sword go after Wonder took it?
people:
- '[[Weary]]'
- '[[Diane]]'
- '[[Wonder]]'
- '[[Havoc]]'
organizations: []
places:
- '[[Resurgence]]'
firstSeen: null
lastSeen: null
tags: []
---

# [[What Became of Havoc]]

> [!fas-infobox|right no-title] Mystery Overview
> ## ✧ Mystery Overview ✧
> **Status:** `INPUT[inlineSelect(option(Unresolved), option(Partially Answered), option(Resolved)):status]`
>
> **First Discovered:** `=this.firstSeen`
>
> **Last Discovery:** `=this.lastSeen`
## The Question

*`=this.summary`*

## What We Know

- In the first campaign, [[Weary]] carried [[Havoc's Sword]], which contained the malicious entity [[Havoc]].
- Havoc influenced Weary, consumed his soul, and prevented him from telling [[Diane]] what was happening.
- [[Wonder]] took the sword at the confrontation with [[Warrick]], leaving Weary with a red scar from his right hand to his right eye.
- The entity's and weapon's later whereabouts were not established in the pre-campaign recollection.


## Discoveries
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


## Related Notes

- [[Sands of Desolation - Before Session 1]] — historical setup supplied by the player.

**Reconstruction status:** Open at the start of Session 1. Its later resolution, if any, will be recorded when the relevant session has been processed.

> [!warning]- ✧ Out-of-Character / Future Knowledge
> The player has indicated that some historical questions receive answers later in the campaign. No future revelation has been added to this pre-Session-1 mystery record.
