---
type: Creature
subtype: PC
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
player: Mason
race: "[[Eladrin]]"
class: "[[Paladin]] ([[Oath of Redemption]])"
level: 7
status: Active
statusAsOf: "[[Through the Eyes of Creation]]"
home: "[[Riverrun]]"
location: "Forest beneath [[Xurxus's Capital]]"
affiliations:
  - organization: "[[Church of Xurxus]]"
    status: Active
    certainty: Confirmed
    role: Redemption Paladin
relations:
  - person: "[[Shayann]]"
    type: Brother
    certainty: Confirmed
  - person: "[[Xurxus]]"
    type: Patron deity
    certainty: Confirmed
  - person: "[[Revelar]]"
    type: Traveling companion
    certainty: Confirmed
aliases:
  - Kiara
summary: "A Redemption Paladin devoted to her oath, distrustful of the Church that banished Shayann and newly questioning Xurxus after meeting Xethra."
image:
tags: []
---
# Kiara Bashara

> [!fas-infobox] ✧ Party Member Overview
> **Player:** `VIEW[{player}]`
>
> **Race:** `=this.race`
>
> **Class:** `=this.class`
>
> **Level:** `VIEW[{level}]`
>
> **Status:** `INPUT[inlineSelect(option(Active), option(Departed), option(Retired), option(Missing), option(Presumed Dead), option(Dead), option(Unknown)):status]`
>
> **Home:** `=this.home`
>
> **Last Known Location:** `=this.location`

## Description

Kiara Bashara is a **197-year-old eladrin paladin (Oath of Redemption), level 5**. She most often appears in her **Autumn** aspect, with shoulder-length dark brown hair, sharp green eyes, and features she describes as imperfect but strong. Her armor and clothing evoke autumn leaves, and she wears a half-cape.

Her seasonal expressions reflect her emotions: **Autumn** is her usual warm, charismatic manner; **Summer** often accompanies anger and determination; **Winter** is another aspect she adopts, though its emotional meaning has not yet been established. Her Spring expression is not yet described.


## Background & History

Kiara grew up in **[[Riverrun]]**, a settlement in the **[[Fey Forests]]** associated with Xurxus's mountain realm. Her upbringing was comparatively sheltered, though she has consciously tried to challenge that worldview.

Her life changed when she and her brother **[[Shayann]]** were accosted by a priest of Xurxus, possibly named **Wren** (name unconfirmed). The priest's behavior toward Kiara was predatory, with an implication of sexual abuse. Shayann killed the priest to protect her. Kiara firmly believes Shayann was innocent and his actions justified.

Killing a priest was treated as a grave offense. Shayann fled, was banished by the community, and was effectively erased from public memory: even speaking his name was forbidden. Kiara has not seen him since and is convinced he is alive. The incident occurred when she was approximately 20–30 years old; its precise relationship to the historical Hell conflict remains to be confirmed.

Kiara entered the path of a Redemption Paladin as a **means to bring Shayann home**. She does not believe he needs moral forgiveness; rather, she hopes the authority and power associated with redemption can overturn his condemnation. Her original practical purpose has developed into sincere devotion to the oath itself.

She reveres **[[Xurxus]]**, god of balance, and regards his assignment to retrieve a stolen artifact as a chance to prove herself. She and **[[Revelar]]**, another follower chosen for the task, have traveled to **[[Stal'hgite]]** in the Iron Hills to seek the Keeper of Knowledge, beginning at the local tavern.


## Personality & Motivations

Kiara is charismatic, compassionate, earnest, and unusually sincere. She tends to speak frankly and directly about her beliefs. Although capable of sternness and skepticism, she seeks understanding and diplomacy before resorting to violence. She places considerable pressure on herself to live up to her oath.

**Primary personal goal — Justice for Shayann:** Find her brother, establish that he was wrongfully condemned, and bring him home. She is certain he is alive and determined not to abandon him.

**Religious commitment:** Serve Xurxus and faithfully practice the Oath of Redemption. She regards the artifact mission as both a sacred duty and an opportunity to earn greater trust.

**Oath of Redemption tenets:**
- **Peace:** Violence is a last resort; diplomacy and understanding create lasting peace.
- **Innocence:** People begin innocent and can be shaped toward evil by circumstances; compassion and example can guide them back.
- **Patience:** Change requires sustained effort and support. **This is the tenet Kiara struggles with most.**
- **Wisdom:** Mercy has limits; if ending a dangerous life is truly necessary, the decision must be carefully considered and then carried through.

**Character tension:** Kiara believes in redeeming those who have done wrong, but she seeks to restore someone she believes never deserved condemnation. Her devotion to Xurxus coexists with the fact that a priest of his church threatened her and her community banished Shayann. Whether Xurxus personally knew of or approved those events is unknown.


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
```dataviewjs
const current = dv.current();

// Search quests across campaigns.
const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
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

    // Check whether this Character is the quest giver.
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
    dv.header(2, "Related Quests");

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

- **[[Shayann]]:** Beloved brother; banished after protecting Kiara. She is certain he lives and is determined to reunite with him.
- **[[Xurxus]]:** Revered deity and mission-giver. His church also played a role in Shayann's condemnation.
- **[[Revelar]]:** Fellow follower of Xurxus and current traveling companion. Their contrasting ideas of mercy may create friction, though both prioritize the mission.
- **Wren (unconfirmed):** Priest killed by Shayann while protecting Kiara.

## Campaign History & Knowledge

### Session 1 — [[Leaky Tights to Freaky Fights]] 
Kiara favored diplomacy with the goblins and opposed needless killing, especially after Revelar killed two unconscious goblins. The incident raised a direct challenge to how she intends to uphold her [[Oath of Redemption]] while pursuing [[The Stolen Artifact]]. She traveled with the party into the goblin cave and was among those displaced to an unfamiliar wasteland.

### Before Session 1
- Xurxus personally selected Kiara for a mission to recover a stolen artifact whose misuse could have dire consequences.
- The artifact's identity, powers, and location are unknown. Goblins are suspected of involvement, but this is **unconfirmed**.
- Kiara described the artifact as important on a kingdom-wide scale and speculated that it must be portable; these are **her interpretations**, not established properties.
- Kiara and Revelar were directed to **Stal'hgite** to find the **Keeper of Knowledge**, starting their inquiries at a local tavern.
- In their introductory conversation, Kiara and Revelar established their shared devotion to Xurxus but expressed different views about the use of lethal force and mercy. Kiara stated that she must extend mercy even to goblins.

### Session 2 — [[The Things That Haunt Us]]
In the Wasteland, Kiara used [[Locate Object]] to sense the stolen artifact moving rapidly toward the spire, and helped pull [[Revelar]] free of the black ichor. She pressed [[Noctis]] about his changed speech and heard his account of imprisonment and devotion to [[Enos]]. During her vision, she chased the voice of [[Shayann]] through an autumn forest, failed repeatedly to recognize a significant clearing, and found an incurably suffering deer pierced by black ichor. She tried healing it and considered her [[Oath of Redemption]] before killing it to end its suffering. The body then appeared to be Shayann's. **This was a manipulated vision, not evidence that Shayann is dead.**

## Questions to follow
- Who is the Keeper of Knowledge, and what do they know?
- What is the artifact, and who took it?
- Where is Shayann now? What evidence might lead to him?
- What does Xurxus know about the priest's actions and Shayann's banishment?


### Session 3 — [[Through the Eyes of Creation]]
Kiara prayed to Xurxus during the Mind Gourger fight, but a different maternal presence answered and repeatedly healed the party. She used [[Calm Emotions]] to suppress fear before the creature broke her concentration. The voice later intervened directly, and Kiara met [[Xethra]], who claimed to be the mother of the gods.

Kiara has distrusted the [[Church of Xurxus]] since its handling and cover-up of [[Shayann]]'s banishment. She has nevertheless grown to believe firmly in the principles of her [[Oath of Redemption]] independently of the Church. Meeting Xethra introduced new questions about **Xurxus himself**, whom she has **not** renounced. Kiara recognizes how little she understands, but genuinely trusts Xethra, wants to offer her compassion and the possibility of redemption or understanding, and above all hopes for help finding Shayann.

Kiara accepted Xethra's voluntary offer to share her sight. Xethra offered aid regarding her brother and said she could hide her presence from Xurxus, though neither the arrangement's practical effects nor the promised powers are known. Xethra gave Kiara an apparently identical **duplicate** of the artifact while retaining the original. Kiara does not know the copy's full properties. The party returned near Xurxus's floating capital; the original retrieval assignment remains unfinished.

## Additional Details

### Lore awaiting confirmation
- Whether the priest's name was **Wren**.
- Exact dates of the Hell conflict, Shayann's banishment, and the red beacon.
- Exact name of Xurxus's mountain capital (possibly **Xurxus' Peak**).
- Details of Kiara's Winter and Spring expressions.

### Roleplay reference
Kiara generally approaches strangers with Autumn warmth and sincere curiosity. When confronted with cruelty or injustice, her Summer determination may surface. She is willing to disagree openly with allies, but prefers cooperation and conversation over hostility.

*Interpretive prompt, not established fact:* Is the greatest obstacle to Shayann's return his supposed guilt—or the community's refusal to admit it was wrong?

**Player-only DM clarification:** Kiara failed the vision. Poor recognition rolls materially affected her experience. The DM said a different killing method—stabbing rather than beheading—would have allowed Shayann to speak. Do not treat this OOC branch information as Kiara's knowledge.

**Follow-up:** The clearing resembled the setting of the incident involving Shayann; whether its details were faithfully represented is uncertain.
