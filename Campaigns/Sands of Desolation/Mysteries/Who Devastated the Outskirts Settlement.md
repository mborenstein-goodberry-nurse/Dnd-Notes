---
type: Mystery
date: 11-16-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: "Who carried out the massacre at the Outskirts clan settlement, and why?"
people:
  - "[[Worlds/Astodan/People/Kenneth Stormjaw]]"
  - "[[Campaigns/Sands of Desolation/The Party/Jonks]]"
organizations: []
places:
  - "[[Worlds/Astodan/Places/Foo Fighters]]"
firstSeen: "[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]"
lastSeen: "[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]"
tags: []
---

# [[Who Devastated the Outskirts Settlement]]

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

- The party investigated a devastated Outskirts clan settlement in [[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]], with only Kenneth Stormjaw and a child reported alive.
- A vision or similar revelation depicted a **blood-covered, scarred, red-haired, red-eyed figure** who fought with his fists. The exact perception and the figure’s identification were **not confirmed in-character**.
- Jonks suspected the attacker might be his former master. That was **Jonks’s unverified theory**, not a confirmed identification. The Iron Shadows acted in a secret-police-like manner in the region, but their involvement in the attack is unproven.

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

- **[[Campaigns/Sands of Desolation/Session Journal/Session of Nat 20s|Session of Nat 20s]]:** Outskirts massacre investigation; the perpetrator remains **unknown to the party**. See [[Worlds/Astodan/Places/Foo Fighters]] and [[Worlds/Astodan/People/Kenneth Stormjaw]].


> [!warning]- ✧ Out-of-Character / Reconstruction Provenance
> **Spoiler:** The player directly confirms the perpetrator was **[[Campaigns/Sands of Desolation/Other/Soren|Soren]]**, distinct from Arthur and Damien despite sharing a body. The party did not identify him at this point. The player tentatively recalls that Soren encountered bullying and responded with disproportionate violence; this possible trigger is not independently verified. Do not set mystery status to Resolved on this OOC basis.
