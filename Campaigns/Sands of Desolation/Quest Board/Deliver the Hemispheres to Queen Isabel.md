---
type: Quest
subtype: Delivery
priority: 2
questNum: 6
date: 11-19-2026
campaign: Sands of Desolation
world: Astodan
fc-calendar: Sands of Desolation
fc-date:
  year: 0
  month: 0
  day: 0
pixel-banner-flag-color: blue
fc-category: Quests
status: Active
summary: "Bring the two recovered hemispheres to [[Worlds/Astodan/People/Queen Isabel|Queen Isabel]] at [[Worlds/Astodan/Places/Isabel's Castle|Isabel's Castle]] in the [[Worlds/Astodan/Places/Griffin Empire|Griffin Empire]]."
tags: []
questGiver: '[[Worlds/Astodan/People/Queen Isabel|Queen Isabel]]'
assigned: null
people: []
places:
  - "[[Worlds/Astodan/Places/Isabel's Castle|Isabel's Castle]]"
  - '[[Worlds/Astodan/Places/Griffin Empire|Griffin Empire]]'
  - '[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]'
organizations: []
mysteries:
  - '[[Campaigns/Sands of Desolation/Mysteries/The Hemisphere of Gideon|The Hemisphere of Gideon]]'
---
### [[Deliver the Hemispheres to Queen Isabel]]

> [!fas-infobox|right no-title] Quest Overview
> ## ✧ Quest Overview ✧
>
> *`=this.summary`*
>
> > [!blank]
> > **Completed:** `INPUT[toggle(offValue(Active), onValue(Completed)):status]`
> >
> > **Mission Type:** `INPUT[inlineSelect(option(Lore), option(Errand/Shopping), option(Fetch), option(Delivery), option(Infiltration), option(Investigation), option(Survival), option(Other)):subtype]`
> >
> > **Priority:** `INPUT[inlineSelect(option(1, Urgent and Important), option(2, Important), option(3, Urgent/Scheduled), option(4, Side Quest), option(5, Neutral)):priority]`
>
> > [!blank|brown]
> > **Quest Giver:** `=this.questGiver`
> >
> > **Assigned:** `=this.assigned`
> >
> > **Quest #:** `=this.questNum`

#### Overview

[[Worlds/Astodan/People/Queen Isabel|Queen Isabel]] originally commissioned the party to investigate two places for artifacts or magic that might help resist [[Worlds/Astodan/Places/The Wastes|the Wastes]]. Those two retrieval missions are tracked separately:

- [[Campaigns/Sands of Desolation/Quest Board/Find the Hidden Relic in the Towers (1 of 2)|Find the Hidden Relic in the Towers (1 of 2)]] — recovered the first, draining hemisphere from [[Worlds/Astodan/People/Gideon|Gideon]] in Session 5
- [[Campaigns/Sands of Desolation/Quest Board/Find the Hidden Relic in the Caldera (2 of 2)|Find the Hidden Relic in the Caldera (2 of 2)]] — the complementary hemisphere is recovered after the Sovereign's defeat in [[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight Part 2|Sovereign Fight Part 2]]

The new objective is to **bring the recovered hemispheres back to Queen Isabel at [[Worlds/Astodan/Places/Isabel's Castle|her castle]] in the [[Worlds/Astodan/Places/Griffin Empire|Griffin Empire]]** and report the results. This is a follow-up to the original assignment, **not evidence that Queen Isabel issued a separate recorded commission**. The hemispheres were held separately after the Session-26 recovery and still separate at the end of Session 27, but **joined by Session 28**. The player recalls they remained joined afterward, without confirming that separating them was impossible.

#### Progression

- [x] Recover the draining hemisphere from the Towers (Session 5)
- [x] Recover the complementary hemisphere from the Caldera (recovered by Session 26; Zach's notes and Session 27 recap)
- [ ] Return to [[Worlds/Astodan/Places/Isabel's Castle|Isabel's Castle]] in the [[Worlds/Astodan/Places/Griffin Empire|Griffin Empire]] with the recovered relics
- [ ] Present the hemispheres and report the findings to [[Worlds/Astodan/People/Queen Isabel|Queen Isabel]]

#### Developments

- **Session 1 — [[Campaigns/Sands of Desolation/Session Journal/It Begins...|It Begins...]]:** Queen Isabel assigned the party to investigate the Towers and the Caldera for possible means to oppose the Wastes. No separate delivery scene or formal delivery quest was assigned then.
- **Session 5:** First, draining hemisphere recovered from Gideon; the Towers retrieval is complete.
- **Sessions 22–24:** The party still sought the life-associated hemisphere in the Caldera. **No second-hemisphere recovery or return journey is shown by the end of Session 24.**
- **[[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight Part 2|Sovereign Fight Part 2]] (Session 26):** The life-associated hemisphere is recovered after the Sovereign's defeat; both halves are in party custody.
- **[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]] (Session 27):** The company escapes with the hemispheres **still separate** after an unsuccessful, dangerous attempt by Jonks to join them.
- **[[Campaigns/Sands of Desolation/Session Journal/To the Infinidungeon!|To the Infinidungeon!]] (Session 28):** The hemispheres are now joined. Who assembled them, the permanence of the joining, and their power remain unconfirmed. The party **has not returned them to Queen Isabel** by the end of Session 28.

#### Rewards

No reward for delivery is established by the evidence currently reviewed. The relics' potential role against the Wastes remains an unresolved question.

#### Related Entities
```dataviewjs
const quest = dv.current();

// Convert metadata values into clickable links.
function resolveLink(value) {
    if (!value) return null;

    if (value.path) return value;

    const parsed = dv.parse(String(value));

    return parsed?.path ? parsed : null;
}

// Build the People table, including the quest giver.
const people = new Map();

if (quest.questGiver) {
    const giver = resolveLink(quest.questGiver);

    if (giver) {
        people.set(giver.path, {
            link: giver,
            role: "Quest Giver"
        });
    }
}

for (const value of quest.people ?? []) {
    const person = resolveLink(value);
    if (!person) continue;

    if (!people.has(person.path)) {
        people.set(person.path, {
            link: person,
            role: "Involved"
        });
    }
}

if (people.size) {
    dv.header(5, "People");

    dv.table(
        ["Person", "Involvement"],
        [...people.values()].map(p => [
            p.link,
            p.role
        ])
    );
}

// Display other significantly involved entities.
const categories = [
    ["Places", quest.places],
    ["Organizations", quest.organizations],
    ["Mysteries", quest.mysteries]
];

for (const [heading, values] of categories) {

    // Normalize Dataview arrays, regular arrays,
    // and individual values into a standard array.
    const items = values == null
        ? []
        : Array.isArray(values)
            ? values
            : typeof values.array === "function"
                ? values.array()
                : [values];

    const links = items
        .map(resolveLink)
        .filter(Boolean);

    if (links.length) {
        dv.header(5, heading);
        dv.list(links);
    }
}
```

#### Additional Details

> [!info]- Reconstruction provenance (OOC)
> The recovery is now anchored to [[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight Part 2|Sovereign Fight Part 2]] (Session 26), with assembled engine documented by [[Campaigns/Sands of Desolation/Session Journal/To the Infinidungeon!|To the Infinidungeon!]] (Session 28). `status: Active` reflects the outstanding delivery goal, not an earlier completion. `assigned: null` remains deliberate: no specific separate delivery commissioning scene is established. Keep this separate from **Return Queen Isabel**, which concerns restoring her to the throne in a distinct storyline.
