---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: What is the hemisphere taken from Gideon, and can it help counter the Wastes?
people: ["[[Gideon]]", "[[Thornwick]]"]
organizations: ['[[Mechanical Wonders]]']
places: ["[[Tower of Icarus]]", "[[Anvil's Flame]]"]
firstSeen: "[[Battle for the Bulge]]"
lastSeen: "[[Falatir's Sacrifice|Session 9]]"
tags: []
---

# [[The Hemisphere of Gideon]]

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

- **Session 5:** The party confronted [[Gideon]] in the central tower. A hemisphere was embedded in his chest, and he appeared to believe the party had come to steal it.
- **End of Session 5:** [[Thornwick]] succeeded on a **Strength check** to tear the hemisphere from Gideon's chest during the final stretch of the battle. The combat was not recorded, but the player confirmed the action from firsthand recollection.
- **Session 6:** B09 opens with the hemisphere already in the party's possession. [[Weary]] used *[[Nystul's Magic Aura]]* to conceal its magical signature during the escape.
- **The retrieval quest was Completed in Session 5.** This does **not** resolve what the hemisphere is, whether it can help against the Wastes, or what consequences its removal may have.

- **Session 7:** The hemisphere emitted an intense purple glow, gripped a test pillow with its moving underside, and appeared to be part of a larger mechanism. A guild attendant's attempt at *[[The Wanderer's Guide to the Multiverse/Spells/Identify|Identify]]* failed to determine its purpose. [[Worlds/Astodan/People/Drax|Drax]] tentatively dated it to the **Equalizer War**, fitted a metal cover over its dangerous underside, and **returned it to the party**. The [[Worlds/Astodan/Organizations/Mechanical Wonders|Mechanical Wonders]] could not complete a full analysis without specialist equipment.
- **Session 9:** A *[[The Wanderer's Guide to the Multiverse/Spells/Sending|Sending]]*-style message to [[Worlds/Astodan/People/Queen Isabel|Queen Isabel]] reported the recovered hemisphere and the guild collaboration. This is a **report**, not an explanation of its function or proof that the queen replied.

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

- [[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|First documented session]]
- [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]] — guild examination, Equalizer War estimate, and protective metal plate.
- [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]] — last documented report to Queen Isabel (not a second physical examination).
- [[Find the Hidden Relic in the Towers (1 of 2)]] — retrieval Completed in Session 5; this mystery remains Unresolved.

> [!warning]- Out-of-Character / Reconstruction Provenance
> Session 5 extraction is supported by the old written account plus the player's 2026-11-06 firsthand recollection; the Strength check itself was not recorded. B09 establishes possession at the start of Session 6. The player expressly chose **Completed (Session 5)** for the retrieval quest on 2026-11-08, without resolving the artifact's function. B11/B12 record the guild examination in Session 7. Session 9 records the latest **reference/report**, not the latest examination. Drax's dating is an expert's tentative assessment, not independent proof. No later revelations are asserted.
