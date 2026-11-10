---
type: Mystery
date: 11-05-2026
campaign: Sands of Desolation
world: Astodan
status: Unresolved
summary: Who was the pale, white-haired woman Falatir was seeking, and why did the shadowy figure seem familiar to him?
people:
- '[[Falatir]]'
- '[[Xerac]]'
- '[[The Fox]]'
organizations: []
places: []
firstSeen: '[[It Begins...|Session 1]]'
lastSeen: "[[Falatir's Sacrifice|Session 9]]"
tags: []
---

# [[Falatir's Search]]

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

- In [[It Begins...|Session 1]], [[Falatir]] was looking for a pale, white-haired woman important to him.
- A shadowy figure seemed familiar to Falatir, but the figure's identity was not established by the surviving Session 1 evidence.
- The woman’s identity, her fate, Falatir's precise reasons for seeking her, and any connection with the shadowy figure were not established publicly by this point in the reconstructed timeline.

- **Session 4:** [[Xerac]] gave Falatir a shard under a signed contract claiming his soul and service after death (the claim could pass to a successor). The shard merged with a card Falatir carried, producing another card depicting the mysterious woman in a different mood. Why the cards change, and what the contract may demand, remain unanswered.
- **Session 6 (private to Falatir):** [[The Fox]] referred to **two recovered shards** and warned of difficult choices ahead. Falatir remained determined to find *her* again. Neither the exact meaning of the shards nor the Fox's intentions is established; the conversation was not publicly witnessed by the party.

- **Session 7 (spoken around companions):** The conversation included Falatir searching for **shards** and a **lost love**; he repeated the lost-love motive to Drax ([[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]). Neither the exact purpose of the shards nor the woman's identity was disclosed in the surviving public account.
- **Session 9:** A confrontation revealed that Falatir's wedding ring was a [[The Wanderer's Guide to the Multiverse/Treasure/Ring of Mind Shielding|Ring of Mind Shielding]]; the eventual holder is unknown. Falatir then made an apparently self-sacrificial choice involving demonic minotaurs and **departed the group**. The missing context about his fate and Isabelle remains **unresolved** ([[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]).

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

- [[It Begins...|Session 1]] — Falatir's search and the shadowy figure.
- [[Falatir]] — companion associated with this question.
- [[Campaigns/Sands of Desolation/Session Journal/We Give a Celestial a Piss Kink|Session 4]] — Xerac's bargain and the second card.
- [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]] — private conversation with the Fox.
- [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]] — the party hears about shards and a lost love.
- [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]] — the ring revelation and Falatir's departure.

> [!warning]- ✧ Out-of-Character / Reconstruction Provenance
> **Source boundary:** Session 1's original journal and reconstructed summary establish a search for a pale, white-haired woman and Falatir's reaction to a shadowy figure. No live Session 1 recording was available.
>
> **Session 4 OOC dialogue:** The players explicitly discuss the woman as Falatir's deceased wife, but they say the characters have not been told. This cannot be made public in the journal or mystery as an in-world disclosure.
>
> **Player recollection (2026-11-05):** Falatir was ultimately seeking fragments of his wife's soul to revive her. It is not established whether he explained that motivation to the party in Session 1. The public question and early-session summaries must not treat those later-known details as disclosed.

> [!warning]- ✧ Batch 3 knowledge boundary
> The player's later recollection is that Falatir exchanged his place in life for **Isabelle, his wife**, but there is no surviving contemporaneous confirmation of what the party learned in Session 9. Retain this as OOC knowledge and review the disclosure in Batch 4.
