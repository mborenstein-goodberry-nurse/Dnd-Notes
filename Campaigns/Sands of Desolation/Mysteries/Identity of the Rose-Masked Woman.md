---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: Who was the powerful woman Diane called Rose, and was she the same person as Pleasure?
people:
- '[[Rose (Masked Woman)|Rose]]'
- '[[Diane]]'
- '[[Weary]]'
- '[[Duke Ingrail]]'
- '[[Pleasure]]'
organizations: []
places:
- "[[Ingrail's Estate]]"
- '[[Grand Exchange]]'
firstSeen: '[[Happy Hunger Games!|Session 3]]'
lastSeen: '[[A Second Session has Hit the Towers|Session 6]]'
tags: []
---

# [[Identity of the Rose-Masked Woman]]

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

- At the [[Happy Hunger Games!|Session 3]] reception, [[Diane]] met a woman in an elaborate pale rose-colored porcelain mask who had authority over [[Duke Ingrail]].
- She knew of [[Weary]]'s unusual coloring and soul-related history, and said her agents had confronted the party and lost a beast on the road.
- She offered the surviving captives passage toward the [[Tower of Icarus|Towers of Icarus]] if they lived through the Blood Games.
- The historical player notes call her **Rose** as a nickname and separately record a [[It Begins...|Session 1]] letter signed [[Pleasure]]. There is no confirmed identification in the supplied [[Happy Hunger Games!|Session 3]] audio.
- **Session 6:** During the journey toward Dwarven Forge, Diane told her companions about the masked woman who had approached her during captivity. This sharing of previously private knowledge did **not** confirm the woman's name or prove any connection to Pleasure.

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

- [[Rose (Masked Woman)|Rose]] — observed woman, identity unconfirmed
- [[It Begins...]] — signed Pleasure letter
- [[Happy Hunger Games!]] — direct meeting
- [[A Second Session has Hit the Towers]] — Diane tells the party about her encounter

> [!warning]- ✧ Out-of-Character / Reconstruction Provenance
> Session 3 recording B03, original Google Docs notes pp. 27 and 33, and the reconstructed Session 6 road conversation. The original player notes explicitly ask whether Rose is Pleasure; do not mark this mystery resolved from later lore. `lastSeen` moves to Session 6 to reflect the **party-wide disclosure**, not fresh proof of Rose's identity.
