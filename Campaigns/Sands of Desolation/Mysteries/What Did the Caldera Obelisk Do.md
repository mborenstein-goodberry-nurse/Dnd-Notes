---
type: Mystery
date: 11-19-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: "Why was a radiant manifested soul confined in the Caldera obelisk, and who built or operated it?"
people:
  - "[[Worlds/Astodan/People/Luz|Luz]]"
  - "[[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]]"
organizations: []
places:
  - "[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]"
firstSeen: "[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]"
lastSeen: "[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]"
tags: []
---
# [[Campaigns/Sands of Desolation/Mysteries/What Did the Caldera Obelisk Do|What Did the Caldera Obelisk Do]]

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

- In [[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]], a large obelisk projected lightning and was destroyed during an investigation, releasing or revealing an unidentified figure of white light. Fiends in the area were alerted.
- In [[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]], [[Campaigns/Sands of Desolation/The Party/Jonks|Jonks]] interpreted the obelisk as a **reverse lightning rod**, drawing beings from abyssal / infernal realms toward the material world. This is his knowledge-check conclusion, not the complete explanation of the site.
- The figure proved to be a manifested soul, but the **reason for her confinement is unknown**. This question overlaps with [[Campaigns/Sands of Desolation/Mysteries/Who Is Luz|Who Is Luz]] without proving an identity or origin.


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

> [!warning]- Source boundary
> The obelisk's function is inferred from the character's check, not direct proof of who constructed it or why it held Luz.
