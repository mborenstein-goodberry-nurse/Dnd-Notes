---
type: Mystery
date: 11-16-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: "Who sent Diane the direct warning not to enter Foo Fighter territory?"
people:
  - "[[Campaigns/Sands of Desolation/The Party/Diane]]"
organizations: []
places:
  - "[[Worlds/Astodan/Places/Foo Fighters]]"
firstSeen: "[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]]"
lastSeen: "[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]]"
tags: []
---

# [[Who Warned Diane at the Foo Fighter Border]]

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

- At the Foo Fighter border in [[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]], after the storm pursuit, Diane experienced a direct **Sending-like** communication warning against trespass.
- The exact wording, source, whether it was the actual *Sending* spell, and the reason for the territorial boundary are **unverified**. The storm simultaneously stopped at the border, but any shared cause is an inference.
- This warning was **not** the earlier physical note delivered by Pleasure. There is **no evidence** that they came from the same person.

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

- **[[Campaigns/Sands of Desolation/Session Journal/A Deal Broken|A Deal Broken]]:** The direct warning at the Foo Fighter boundary; see [[Campaigns/Sands of Desolation/The Party/Diane|Diane]], [[Worlds/Astodan/Places/Foo Fighters]], and [[Campaigns/Sands of Desolation/Mysteries/Who Sent Diane the Sun Home Note|the separate physical note mystery]].


> [!warning]- ✧ Out-of-Character / Reconstruction Provenance
> **OOC-only lead from the player (2026-11-16):** DM hints name three brothers among the major antagonist figures: **Skeletor** (principal BBEG), **Anuberath** (older brother, dragon-like), and **Asriel** (younger brother). The player *believes* the hints suggested **Anuberath sent the territorial warning**, but cannot confirm it. Do **not** write Anuberath into the in-character event, mark him the sender in metadata, or link the brothers to Pleasure’s physical note without evidence.
