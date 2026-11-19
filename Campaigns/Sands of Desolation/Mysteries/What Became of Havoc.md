---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Partially Answered
summary: "What happened to Havoc after the sword was recovered, and what became of Weary's missing soul? The soul was restored in Session 23; Havoc's subsequent path remains open."
people:
- '[[Weary]]'
- '[[Diane]]'
- '[[Wonder]]'
- '[[Havoc]]'
- '[[Warrick]]'
- '[[Jonks]]'
organizations: []
places:
- '[[Resurgence]]'
- '[[Luciferian Caldera]]'
firstSeen: '[[Campaigns/Sands of Desolation/Session Journal/Session 0|Session 0]]'
lastSeen: "[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]"
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

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]]:** Warrick claims the sword spoke to him and that he lost it.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]]:** The sword is found embedded in the living mound within the Caldera, apparently exerting influence over nearby companions; it is not yet recovered.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]]:** Jonks extracts the blade, and Weary takes it. A voice speaks through or alongside Weary, and an unspecified bargain is recorded. The player confirms its original name is **Hero's Bane**. The whereabouts of the **weapon** are now known, but **Havoc's release, the bargain's terms, and soul restoration remain unresolved**. Therefore the status is **Partially Answered**, not Resolved.


- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** Havoc privately appeared to [[Campaigns/Sands of Desolation/The Party/Weary|Weary]], displayed his missing soul fragment, named himself an Archdemon of Hostility, and proposed ways to free him.
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** [[Campaigns/Sands of Desolation/The Party/Grayson|Grayson]] took the blade and vanished as Havoc manifested before the party. Weary's soul was restored. The bargain's mechanics and Grayson's ultimate fate are unresolved; Havoc's subsequent intentions and whereabouts are not established. **Status stays Partially Answered**, not Resolved.

## Discoveries

### Sessions Referencing This Mystery
```dataviewjs
const current = dv.current();

// Resolve both ordinary and path-qualified wiki links.
function resolvesTo(value, fromPath, expectedPath) {
    if (!value) return false;
    const raw = value.path ?? String(value)
        .replace(/^!?\[\[/, "")
        .replace(/\]\]$/, "")
        .split("|")[0];

    const dest = app.metadataCache.getFirstLinkpathDest(raw, fromPath);
    return dest?.path === expectedPath ||
           raw === expectedPath ||
           raw === expectedPath.replace(/\.md$/, "");
}

const sessions = dv.pages(`"Campaigns/${current.campaign}/Session Journal"`)
    .where(s =>
        s.type === "Session Journal" &&
        (
            Array.from(s.file.outlinks ?? [])
                .some(link => resolvesTo(link, s.file.path, current.file.path)) ||
            resolvesTo(current.firstSeen, current.file.path, s.file.path) ||
            resolvesTo(current.lastSeen, current.file.path, s.file.path)
        )
    )
    .sort(s => Number(s.sessionNum ?? -1), "asc");

if (sessions.length) {
    dv.table(
        ["Session", "Date", "Journal"],
        sessions.map(s => [
            dv.fileLink(s.file.path, false, `Session ${s.sessionNum}`),
            s.date ?? "Not recorded",
            s.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No linked session journals yet.*");
}
```

## Related Quests
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
        String(q.status ?? "").trim().toLowerCase() !== "undiscovered" &&
        Array.from(q.mysteries ?? [])
            .some(m => matchesLink(m, current))
    )
    .sort(q => q.file.name, "asc");

if (quests.length) {
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


## Associated People & Places
```dataviewjs
const current = dv.current();

// The frontmatter fields are the curated associations for this mystery.
// People and Place notes can look these up in reverse via Related Mysteries.
function asArray(value) {
    if (value == null) return [];
    if (Array.isArray(value)) return value;
    if (typeof value.array === "function") return value.array();
    return [value];
}

function linkFor(value) {
    const text = value?.path ?? String(value);
    const match = text.match(/^!?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/);
    const target = match ? match[1] : text;
    const alias = value?.display ?? (match ? match[2] : undefined);
    const resolved = app.metadataCache.getFirstLinkpathDest(target, current.file.path);

    return resolved ? dv.fileLink(resolved.path, false, alias || undefined) : value;
}

let hasAssociations = false;

for (const [label, field] of [
    ["People", current.people],
    ["Places", current.places],
    ["Organizations", current.organizations]
]) {
    const entries = asArray(field).filter(Boolean);
    if (!entries.length) continue;

    hasAssociations = true;
    dv.header(3, `${label} (${entries.length})`);
    dv.list(entries.map(linkFor));
}

if (!hasAssociations) {
    dv.paragraph("*No associated people, places, or organizations recorded yet.*");
}
```

## Related Notes

- [[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]] — private terms offered by Havoc.
- [[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]] — witnessed manifestation and restoration of Weary's soul.

- [[Campaigns/Sands of Desolation/Session Journal/Session 0|Session 0]] — historical setup supplied by the player.

**Reconstruction status:** Open at the start of Session 1. Its later resolution, if any, will be recorded when the relevant session has been processed.

> [!warning]- ✧ Out-of-Character / Future Knowledge
> The player has indicated that some historical questions receive answers later in the campaign. No future revelation has been added to this pre-Session-1 mystery record.
- [[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]], [[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]], [[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]] — progressively narrowed location of the sword, then recovered it, without establishing Havoc's final fate.
