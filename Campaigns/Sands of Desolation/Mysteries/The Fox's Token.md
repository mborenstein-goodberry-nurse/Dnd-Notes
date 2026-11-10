---
type: Mystery
date: 11-08-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: Why did Thornwick recognize the iron token associated with the Fox, and what does it signify?
people:
- '[[Falatir]]'
- '[[Thornwick]]'
- '[[The Fox]]'
organizations: []
places: []
firstSeen: '[[A Second Session has Hit the Towers|Session 6]]'
lastSeen: '[[A Second Session has Hit the Towers|Session 6]]'
tags: []
---

# [[The Fox's Token]]

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

- **Session 6 (private to Falatir):** [[The Fox]] set down an iron token that Falatir appeared to recognize. The Fox's conversation concerned Falatir's search and the two shards; no full explanation of the token was given.
- **Session 6 (later watch):** [[Thornwick]] found an **imprint resembling the token** near the cave entrance. It felt familiar from his past, and brought a sense of sorrow, but he could not explain why.
- Whether these two impressions are identical, and what Thornwick's response means, are **unresolved**. These were separate, private experiences, not automatically shared with the group.

- **Session 7 comparison only:** Thornwick and Arthur discussed a small iron, toothlike or coinlike object associated with Baba Eris Whitewood, possibly a means of communication ([[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]). The source does **not** establish that it is the Fox's iron token, the earlier imprint, or Falatir's concealed Session 9 coin. These leads remain separate until corroborated.

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

- [[A Second Session has Hit the Towers]] — both private encounters.
- [[The Fox]] — carried the token.
- [[Falatir]] and [[Thornwick]] — distinct private connections.

> [!warning]- Out-of-Character / Reconstruction Provenance
> Session 6 journal reconstructed from recordings B09/B10 and original notes. The Fox's earlier-campaign history (including Waffles) is retrospective/OOC and does **not** independently explain Thornwick's recognition or establish a new party-wide disclosure. Do not infer compulsion, shared pacts, or an identical token.
