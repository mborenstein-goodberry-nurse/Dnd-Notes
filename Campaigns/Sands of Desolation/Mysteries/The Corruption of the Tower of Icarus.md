---
type: Mystery
date: 11-08-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: What corrupted the Towers of Icarus, why were the Radiant Idols imprisoned there, and what authority did Gideon hold?
people:
- '[[Gideon]]'
organizations: []
places:
- '[[Tower of Icarus]]'
firstSeen: '[[We Give a Celestial a Piss Kink|Session 4]]'
lastSeen: '[[A Second Session has Hit the Towers|Session 6]]'
tags: []
---

# [[The Corruption of the Tower of Icarus]]

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

- **Session 4:** The party discovered three magically concealed, interconnected towers amid distorted woodland. A wild-magic-saturated area and a trapped, wing-clipped [[The Wanderer's Guide to the Multiverse/Bestiary/Radiant Idol|Radiant Idol]] suggested corruption of an older celestial site.
- **Session 5:** A second imprisoned Radiant Idol remained in the middle tower. In the central tower, the party confronted [[Gideon]], who called himself the Judge; the circumstances of the idols' punishment were not explained.
- **Session 6:** After Thornwick recovered the hemisphere and Gideon was defeated, the towers began restructuring into **one** spire. A surviving Radiant Idol appeared to preserve or rebuild it, and the corrupted woods began to recover gradually.
- The **cause** of the corruption, who imprisoned the idols, how Gideon's authority worked, and whether the transformation removed all lingering effects remain unproven.

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

- [[We Give a Celestial a Piss Kink]] — concealed towers and first imprisoned idol.
- [[Battle for the Bulge]] — second idol and Gideon.
- [[A Second Session has Hit the Towers]] — reconstruction into the singular tower.
- [[Tower of Icarus|Towers of Icarus]] — historic and current physical state.

> [!warning]- Out-of-Character / Reconstruction Provenance
> Based on the player-reviewed Session 4–6 journals and recordings B06–B10. The records establish the changes but **not** the responsible force, original judgment, or final fate of the idols. Historical name is `Towers of Icarus`; the location is now named `Tower of Icarus`. No campaign encounter lore is placed in the Guide Bestiary.
