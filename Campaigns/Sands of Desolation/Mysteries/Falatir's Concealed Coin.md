---
type: Mystery
date: 11-10-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: What was the coin Falatir concealed, why was it associated with a curse, and what did it mean?
people:
- '[[Falatir]]'
- '[[Thornwick]]'
organizations: []
places:
- '[[Dwarven Forge]]'
firstSeen: '[[Falatir''s Sacrifice|Session 9]]'
lastSeen: '[[Falatir''s Sacrifice|Session 9]]'
tags: []
---

# [[Falatir's Concealed Coin]]

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

- **Session 9:** The company investigated a mysterious coin; companions other than [[Campaigns/Sands of Desolation/The Party/Falatir|Falatir]] produced their coins, and suspicion focused on him. The original notes describe Falatir as concealing a coin associated with a **curse** but do not establish the curse's actual effects, the coin's origin, or its final whereabouts.
- During the confrontation, the journal mentions *[[The Wanderer's Guide to the Multiverse/Spells/Vortex Warp|Vortex Warp]]* and an unsuccessful attempt to obtain reliable answers through *[[The Wanderer's Guide to the Multiverse/Spells/Zone of Truth|Zone of Truth]]*. Neither spell's circumstances are preserved sufficiently to infer the coin was teleported or that a special immunity was proven.
- Falatir's wedding ring was separately identified as a *[[The Wanderer's Guide to the Multiverse/Treasure/Ring of Mind Shielding|Ring of Mind Shielding]]*. **The ring and coin are different reported objects**; the ring does not automatically explain the Zone of Truth report.
- The Session 9 opening recap may refer back to coin awareness around Session 8, but the timing is not secure; the first confidently recorded public confrontation belongs to Session 9.
- **No confirmed connection** links this coin with the Fox's token from Session 6 or the hag-related tooth/iron object discussed in Session 7. A later theory may explore a connection, but this historical tracker does not assume one.

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

- [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]] — public confrontation over the coin and Falatir's departure.
- [[Campaigns/Sands of Desolation/Session Journal/Missed Session|Session 8]] — preceding recap only; the coin-related moment is not securely assignable to Session 8.
- [[Campaigns/Sands of Desolation/Mysteries/The Fox's Token|The Fox's Token]] — separate unresolved object; no identified link.
- [[Campaigns/Sands of Desolation/Mysteries/Falatir's Search|Falatir's Search]] — related character, distinct mystery.

> [!warning]- Out-of-Character / Reconstruction Provenance
> Session 9's historical journal is the principal record, corrected through player review. Its phrase about Vortex Warp moving “it” is not mechanical proof that a loose coin was targeted, and the record's “immune to Zone of Truth” description is a reported result without a known cause. Diane missed Session 8; do not assign the coin confrontation to that session based on a retrospective recap alone. No surviving evidence unites this coin with either the Fox's iron token or Thornwick's hag-associated object. Falatir's ultimate fate and Isabelle exchange are reserved for the Session 10 / Batch 4 review.
