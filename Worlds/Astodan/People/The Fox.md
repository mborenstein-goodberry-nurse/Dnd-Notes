---
type: Creature
date: 04-09-2026
world: Astodan
status: Alive
summary: A talking fox linked to Falatir’s quest, who visited the party’s camp.
attitude: Unknown
alignment: Unaligned
aliases: []
tags: []
campaigns:
- Sands of Desolation
subtype: NPC
statusAsOf: "[[A Second Session has Hit the Towers]]"
location: null
home: null
origin: null
affiliations: []
relations: []
portrait: null
---
# The Fox

> [!fas-infobox|right] ✧ NPC Overview
> ```dataviewjs
> const portrait = dv.current().portrait;
> if (portrait) {
>   const path = typeof portrait === "string"
>     ? portrait.replace(/^\[\[|\]\]$/g, "")
>     : portrait.path;
>   const file = app.metadataCache.getFirstLinkpathDest(path, dv.current().file.path);
>   if (file) {
>     const img = dv.el("img", "", {
>       attr: { src: app.vault.getResourcePath(file), alt: dv.current().file.name }
>     });
>     img.style.width = "100%";
>     img.style.maxHeight = "260px";
>     img.style.objectFit = "contain";
>   }
> }
> ```
> *`=this.summary`*
>
> **Status:** `INPUT[inlineSelect(option(Unknown), option(Alive), option(Dead), option(Missing), option(Presumed Dead)):status]`
>
> **Status As Of:** `=this.statusAsOf`
>
> **Attitude**: `INPUT[inlineSelect(option(Unknown), option(Helpful), option(Friendly), option(Indifferent), option(Mixed), option(Unhelpful), option(Hostile)):attitude]`
>
> **Last Known Location:** `=this.location`
>
> **Aliases:** `INPUT[inlineList:aliases]`

## Description



A speaking fox who approached [[Falatir]] at a protected camp near the Gilded Lands/Dwarven Forge border. He produced a familiar iron token and referred to himself as watching over allies and investments; Falatir recognized him. The Fox warned of difficult choices and referred to **two shards** already recovered. He returned in the direction of the Gilded Lands. His true nature and any other identity remain unproven.

## Relationships & Affiliations
```dataviewjs
const current = dv.current();
const affiliations = current.affiliations ?? [];

if (affiliations.length) {
    dv.table(
        ["Organization", "Status", "Certainty", "Role"],
        affiliations.map(a => [
            a.organization ?? "-",
            a.status ?? "Unknown",
            a.certainty ?? "Unknown",
            a.role || "-"
        ])
    );
}
```
```dataviewjs
const current = dv.current();
const relations = current.relations ?? [];

if (relations.length) {
    dv.header(3, "Known Personal Relationships");

    dv.table(
        ["Person", "Relationship", "Certainty"],
        relations.map(r => [
            r.person ?? "-",
            r.type ?? "Unknown",
            r.certainty ?? "Unknown"
        ])
    );
}
```
```dataviewjs
const current = dv.current();

const worldPeople = dv.pages(`"Worlds/${current.world}/People"`);

const partyMembers = dv.pages('"Campaigns"')
    .where(p =>
        p.type === "Creature" &&
        p.subtype === "PC" &&
        p.world === current.world
    );

const people = [...worldPeople, ...partyMembers]
    .filter(p =>
        p.type === "Creature" &&
        ["NPC", "PC"].includes(p.subtype) &&
        p.file.path !== current.file.path
    );

const incoming = [];

for (const person of people) {
    for (const relation of person.relations ?? []) {
        const target = relation.person;
        if (!target) continue;

        const matches =
            target.path === current.file.path ||
            String(target) === current.file.name ||
            String(target) === `[[${current.file.name}]]`;

        if (matches) {
            incoming.push({
                person: person.file.link,
                type: relation.type ?? "Unknown",
                certainty: relation.certainty ?? "Unknown"
            });
        }
    }
}

if (incoming.length) {
    incoming.sort((a, b) =>
        a.person.path.localeCompare(b.person.path)
    );

    dv.header(3, "Referenced By");

    dv.table(
        ["Person", "Their Relationship", "Certainty"],
        incoming.map(r => [
            r.person,
            r.type,
            r.certainty
        ])
    );
}
```


## Related Quests
```dataviewjs
const current = dv.current();

// Search quests across campaigns.
const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        String(q.status ?? "").trim().toLowerCase() !== "undiscovered" &&
        q.world === current.world
    );

// Normalize arrays, Dataview DataArrays, and single values.
function toArray(value) {
    if (value == null) return [];
    if (Array.isArray(value)) return value;
    if (typeof value.array === "function") return value.array();
    return [value];
}

// Resolve a wikilink or Dataview link to its actual file.
function resolveFile(value, sourcePath) {
    if (!value) return null;

    const raw = value.path
        ? value.path
        : String(value)
            .replace(/^!?\[\[|\]\]$/g, "")
            .split("|")[0];

    return app.metadataCache.getFirstLinkpathDest(
        raw,
        sourcePath
    );
}

const results = [];

for (const quest of quests) {
    const roles = [];

    // Check whether this NPC is the quest giver.
    const giver = resolveFile(
        quest.questGiver,
        quest.file.path
    );

    if (giver?.path === current.file.path) {
        roles.push("Quest Giver");
    }

    // Check general quest involvement.
    const involved = toArray(quest.people).some(value => {
        const file = resolveFile(value, quest.file.path);
        return file?.path === current.file.path;
    });

    if (involved && !roles.includes("Quest Giver")) {
        roles.push("Involved");
    }

    if (roles.length) {
        results.push({
            quest: quest.file.link,
            campaign: quest.campaign ?? "-",
            involvement: roles.join(", "),
            status: quest.status ?? "Unknown"
        });
    }
}

if (results.length) {
    results.sort((a, b) =>
        String(a.campaign).localeCompare(String(b.campaign)) ||
        a.quest.path.localeCompare(b.quest.path)
    );

    dv.table(
        ["Quest", "Campaign", "Involvement", "Status"],
        results.map(r => [
            r.quest,
            r.campaign,
            r.involvement,
            r.status
        ])
    );
}
```
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

const mysteries = dv.pages('"Campaigns"')
    .where(m =>
        m.type === "Mystery" &&
        Array.from(m.people ?? [])
            .some(person => matchesLink(person, current))
    )
    .sort(m => m.file.name, "asc");

if (mysteries.length) {
    dv.header(2, "Related Mysteries");

    dv.table(
        ["Mystery", "Campaign", "Status"],
        mysteries.map(m => [
            m.file.link,
            m.campaign ?? "-",
            m.status ?? "Unknown"
        ])
    );
}
```


## Campaign History & Knowledge



- **Session 6:** Met Falatir privately outside the sanctum at camp. The exchange made clear their established patron-like association and the Fox's interest in the shards. A token he displayed left an impression later recognized by Thornwick as something sorrowfully familiar, though Thornwick could not explain why. The other party members were not necessarily privy to the conversation.

## Additional Details


> [!warning]- ✧ Out-of-Character Knowledge
> *Player-only information. Record the source of each revelation and do not treat it as party knowledge.*
>
> **Earlier-campaign history — Waffles's account (retrospective player recollection, 2026-11-08)**
> - Before *Sands of Desolation*, the player character later known as **Waffles** was an ordinary paladin in his hometown. He rescued a **dark-red fox** from a hunter's trap. As he did favors for the fox, it granted him increasing power, while the favors and bargains grew more dangerous and extreme.
> - Waffles and a group of fellow paladins or soldiers were eventually lured into a giant nest, **possibly belonging to chitines and a choldrith** (the player is uncertain of the creature identification). The Fox appeared and offered a choice described as **their souls or their lives**. They survived the creatures but were transformed and bound to the Fox.
> - Waffles became a **yuan-ti capable of shifting between a snake-like and a more humanoid form**; the exact subtype is not established here. He became one of the Fox's favorite playthings. His **Hexblade warlock** powers were granted through the Fox. In the earlier campaign, Waffles concealed his bond and dealings with the Fox from the other party members.
> - Waffles was originally an **Oath of the Crown paladin**. After his bargain with the Fox, his oath tenets were rewritten (order not established) as: **"The Fox's word is Law"**, **"Do not gossip about the Fox"**, and **"Dying is Gay"**. These are the player's exact recollected oath wordings, not general rules imposed on others.
> - **Unresolved question:** Whether the Fox can directly compel Waffles to obey is **unconfirmed**. Waffles has never truly challenged him. Obedience and the oath wording alone do not demonstrate magical compulsion.
>
> **What the player recalls being established during the earlier campaign**
> - The Fox was a **chaotic, antagonistic, exceptionally powerful entity**. He had **conquered the Feywild** and sought to extend his dominion into the **Material Plane**.
> - The DM confirmed that the Fox **came from the Shadowfell**, consistent with the player's original backstory premise.
>
> **Provenance and chronology**
> - The rescue, bargains, nest, transformation and relationship originated in the player's previous-character backstory, which the DM was free to reinterpret. The setting claims above were understood by the player to have been confirmed in that earlier campaign. This recollection is **not** evidence that the SOD party knew these facts by Session 6.
> - The previous-campaign Waffles account should not be injected into Waffles's later SOD character note or used to establish the Fox's intentions toward Falatir without evidence from an appropriately dated SOD session. Keep the current Session 6 history above as the party-facing chronological account.

