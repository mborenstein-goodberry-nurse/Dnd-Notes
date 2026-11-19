---
type: Mystery
date: 11-19-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: "Grayson disappeared into black smoke during the Hero's Bane exchange; what actually happened to him?"
people:
  - "[[Campaigns/Sands of Desolation/The Party/Grayson|Grayson]]"
  - "[[Campaigns/Sands of Desolation/The Party/Weary|Weary]]"
  - "[[Worlds/Astodan/People/Havoc|Havoc]]"
organizations: []
places:
  - "[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]"
firstSeen: "[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]"
lastSeen: "[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]"
tags: []
---
# [[Campaigns/Sands of Desolation/Mysteries/What Became of Grayson|What Became of Grayson]]

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

- In [[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]], [[Campaigns/Sands of Desolation/The Party/Grayson|Grayson]] picked up [[Campaigns/Sands of Desolation/Other/Havoc's Sword|Hero's Bane]], disappeared during an exchange and was not seen afterward. [[Worlds/Astodan/People/Havoc|Havoc]] manifested and [[Campaigns/Sands of Desolation/The Party/Weary|Weary]] regained his missing soul.
- Companions referred to Grayson as dead in the next session; **Presumed Dead** is the appropriate party status at this checkpoint.
- No direct recording preserves Grayson's destination, the mechanics of the exchange, or confirmation of permanent death.


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

- [[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]
- [[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]

> [!warning]- Do not prematurely resolve
> Do not assert that Grayson is definitely dead, imprisoned, or otherwise located without confirming session evidence.
