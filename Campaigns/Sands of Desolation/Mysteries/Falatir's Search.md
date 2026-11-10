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

- **Session 7 (public conversation):** Falatir's companions spoke openly of his search for **shards**, and Falatir told the [[Worlds/Astodan/Organizations/Mechanical Wonders|Mechanical Wonders]]' founders that he sought a **lost love**. This does not identify the woman, establish her fate, or prove how the shards might relate to her.
- **Session 9:** The party uncovered Falatir's wedding ring, identified as a *[[The Wanderer's Guide to the Multiverse/Treasure/Ring of Mind Shielding|Ring of Mind Shielding]]*. He then made an apparently deliberate sacrifice involving demonic minotaurs and left the party. The player recalls a woman appearing at the session's conclusion, but the surviving account does not establish the woman's identity, what the group learned, or Falatir's ultimate fate. **Do not treat the search as resolved merely because he departed.**

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
- [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]] — shards and lost love discussed aloud.
- [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]] — wedding ring, sacrifice, and an uncertain arrival.

> [!warning]- ✧ Out-of-Character / Reconstruction Provenance
> **Source boundary:** Session 1's original journal and reconstructed summary establish a search for a pale, white-haired woman and Falatir's reaction to a shadowy figure. No live Session 1 recording was available.
>
> **Session 4 OOC dialogue:** The players explicitly discuss the woman as Falatir's deceased wife, but they say the characters have not been told. This cannot be made public in the journal or mystery as an in-world disclosure.
>
> **Player recollection (2026-11-05 and 2026-11-09):** Falatir was ultimately seeking fragments of his wife's soul to revive her, and retrospectively gave up his life in Isabelle's place. The player does **not** recall how much of Isabelle's identity and the exchange was revealed in Session 9, and says calling Falatir simply Dead is inaccurate. The player's separate recollection is that a woman appeared at the end of Session 9. The public mystery must remain unresolved as of the Session 9 checkpoint; revisit the disclosure timing in Batch 4, not by assuming Session 10 knowledge was already public.
