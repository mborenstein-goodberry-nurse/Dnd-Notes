---
type: Mystery
date: 11-10-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: Who is collaborating with the duergar raiders, and why does their banner bear the same mark as Thornwick?
people:
- '[[Thornwick]]'
- '[[Baba Eris Whitewood]]'
- '[[Drax]]'
- '[[Thrax]]'
organizations:
- '[[Mechanical Wonders]]'
places:
- '[[Dwarven Forge]]'
- '[[Anvil''s Flame]]'
- '[[Grey Mountains]]'
firstSeen: '[[Cave Divers be Like|Session 7]]'
lastSeen: '[[Falatir''s Sacrifice|Session 9]]'
tags: []
---

# [[Who Is Behind the Duergar Raids]]

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

- **Session 7:** [[Worlds/Astodan/People/Drax|Drax]] and [[Worlds/Astodan/People/Thrax|Thrax]] said that raiders from the [[Worlds/Astodan/Places/Grey Mountains|Grey Mountains]], near [[Worlds/Astodan/Places/Anvil's Flame|Anvil's Flame]] in the [[Worlds/Astodan/Places/Dwarven Forge|Dwarven Forge]], had attacked mines, shipments and the [[Worlds/Astodan/Organizations/Mechanical Wonders|Mechanical Wonders]]' equipment. The founders suspected an outside collaborator, whose identity and role they could not verify.
- The duergar banner displayed a symbol matching the mark borne by [[Campaigns/Sands of Desolation/The Party/Thornwick|Thornwick]]. He connected that mark to [[Worlds/Astodan/People/Baba Eris Whitewood|Baba Eris Whitewood]], the hag who, he said, destroyed his Fey kingdom, banished him, and fused a skull to his face. This is a **strong lead**, but does not prove she commands the raiders or explain their motives.
- **Sessions 8–9:** The party reportedly recovered the guild's stolen mining equipment. In Session 9, they defeated a much larger duergar force than anticipated. Neither success identifies the outside collaborator or confirms the location of the exact cave in which the battle occurred.
- **Geographical correction (player-confirmed):** The Grey Mountains neighbor Anvil's Flame and lie within the Dwarven Forge. This does not establish that the party visited the mountains during the recovery expedition.

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

- [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]] — founders' report, banner and Thornwick's recognition.
- [[Campaigns/Sands of Desolation/Session Journal/Missed Session|Session 8]] — recovery known from the later recap, but not a firsthand account.
- [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]] — defeat of duergar without identification of their collaborator.
- [[Worlds/Astodan/People/Baba Eris Whitewood|Baba Eris Whitewood]] — named by Thornwick; actual involvement remains unproven.
- [[Worlds/Astodan/Organizations/Mechanical Wonders|Mechanical Wonders]] — guild affected by the raids.

> [!warning]- Out-of-Character / Reconstruction Provenance
> Session 7 B12 and the approved journal establish the founders' report and Thornwick's reaction; no hag appearance is recorded. Session 8 is a confirmed session missed by Diane, with no matched audio and only a Session 9 recap confirming equipment recovery. Session 9 records a duergar victory, not the collaborator's identity. The player confirmed the Grey Mountains' geography on 2026-11-10. Distinguish reported intelligence and player-confirmed geography from witnessed travel. Do not merge this question with the separate coin mystery or use later campaign outcomes.
