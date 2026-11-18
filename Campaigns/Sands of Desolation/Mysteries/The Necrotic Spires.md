---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: What are the necrotic spires created by Warrick’s failed summoning ritual?
people:
- '[[Warrick]]'
- '[[Wonder]]'
organizations: []
places:
- '[[Resurgence]]'
- '[[Worlds/Astodan/Places/The Wastes]]'
firstSeen: '[[Campaigns/Sands of Desolation/Session Journal/Session 0|Session 0]]'
lastSeen: '[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]]'
tags: []
---
# [[The Necrotic Spires]]

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

- During the original Astodan-series campaign, [[Warrick]] attempted to summon a demon army in [[Resurgence|the Resurgence]].
- Instead, huge necrotic spires appeared across the world.
- The spires seem connected to a growing threat from horrific creatures such as Nightwalkers.
- Their purpose, mechanism, and precise connection to the creatures were unknown at the start of Sands of Desolation.

- **[[Campaigns/Sands of Desolation/Session Journal/A Nice Chat with the Pirate King|A Nice Chat with the Pirate King]] — Graves’s account:** Graves described a **warlock** raising the spires by using an **uncorrupted living soul**, then asserted that the spell could no longer be reversed. He also reported rougher seas, recurring nocturnal undead, desert golems collecting corpses, and military action by the Dominion and Sirvanna. These are **his claims**, not independent verification of the ritual mechanism.
- **Weary’s private firsthand knowledge:** Weary **watched Warrick perform the original ritual** and therefore knew whom Graves meant. He intentionally did **not** reveal his knowledge to Graves. **Whose soul** Graves was referring to remains unknown; witnessing the ritual does not establish the soul’s identity.

- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] — Warrick's later account:** Warrick tells Weary he bargained with a fiend for power and was promised a ritual opening a Hell gateway. He claims the supplied rite instead **unintentionally raised the spires**. This may challenge the earlier "demon army" explanation, but it remains his interested testimony, not objective proof of the ritual.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]]:** Depictions of the necrotic spires appear among the Blood War carvings in a volcanic chamber inside the Caldera. The reason for this association is unknown.


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

- [[Campaigns/Sands of Desolation/Session Journal/Session 0|Session 0]] — historical setup supplied by the player.
- [[Campaigns/Sands of Desolation/Session Journal/We find Thornwick's Son|Session 13]] — the party enters the Wastes, experiences unusual magical interference, and is attacked by mechanically augmented undead near a necrotic spire.
- [[Campaigns/Sands of Desolation/Session Journal/Blueberry Weary|Session 14]] — the party defeats the attackers, retrieves two necrotic bones, and **first sees Nightwalkers**, previously known only through rumor. "Three Nightwalkers per spire" is a **reported count**, not a visual confirmation at every spire. The structures' purpose remains unknown.

**Reconstruction status:** Open at the start of Session 1. Its later resolution, if any, will be recorded when the relevant session has been processed.

> [!warning]- ✧ Out-of-Character / Future Knowledge
> The player has indicated that some historical questions receive answers later in the campaign. No future revelation has been added to this pre-Session-1 mystery record.

- **[[Campaigns/Sands of Desolation/Session Journal/A Nice Chat with the Pirate King|A Nice Chat with the Pirate King]]:** Graves provides a new account of the spires and mentions the unidentified uncorrupted living soul. Weary recognizes Warrick as the responsible warlock from firsthand experience but deliberately keeps this knowledge to himself. The mystery’s unresolved questions now include the soul’s identity, the role of the soul, and the reliability of Graves’s irreversibility claim.
- [[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]] — first account from Warrick himself of the fiendish bargain and supposedly accidental spire-raising.
- [[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]] — spires depicted among infernal carvings; meaning unknown.
