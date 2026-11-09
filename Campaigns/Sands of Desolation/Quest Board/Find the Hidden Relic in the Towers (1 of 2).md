---
type: Quest
subtype: Lore
priority: 2
questNum: 1
date: 04-24-2026
campaign: Sands of Desolation
world: Astodan
fc-calendar: Sands of Desolation
fc-date:
  year: 0
  month: 0
  day: 0
pixel-banner-flag-color: blue
fc-category: Quests
status: Completed
summary: "Recovered the mysterious hemisphere from [[Gideon]] at the [[Tower of Icarus|Towers of Icarus]] in Session 5; its function against the [[The Wastes|Wastes]] remains unknown."
tags: []
questGiver: "[[Queen Isabel]]"
assigned: "[[It Begins...]]"
people:
  - "[[Gideon]]"
  - "[[Thornwick]]"
places:
  - "[[Tower of Icarus]]"
  - "[[Gilded Lands]]"
organizations: []
mysteries:
  - "[[The Hemisphere of Gideon]]"
---
### [[Find the Hidden Relic in the Towers (1 of 2)]]

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

Commissioned by [[Queen Isabel]] in [[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]], the party was to investigate the [[Tower of Icarus|Towers of Icarus]] in the [[Gilded Lands]] for magic or an artifact that might help stop the [[The Wastes|Wastes]]. At the time, the three towers were thought to be celestial in origin and dangerous to approach.

The party completed the **Towers retrieval objective in [[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|Session 5]]**, when [[Thornwick]] successfully tore an unidentified **hemisphere** from [[Gideon]]'s chest. Its identity, its function, and whether it can counter the Wastes remain **unverified** as of [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]. Returning to [[Queen Isabel]] is a possible follow-up, **not a condition for this quest's completion**.

#### Progression

- [x] Receive [[Queen Isabel]]'s assignment ([[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]]).
- [x] Reach the concealed Towers of Icarus ([[Campaigns/Sands of Desolation/Session Journal/We Give a Celestial a Piss Kink|Session 4]]).
- [x] Investigate the towers' extraordinary magic and the being maintaining their barriers ([[Campaigns/Sands of Desolation/Session Journal/We Give a Celestial a Piss Kink|Session 4]]–[[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|Session 5]]).
- [x] Recover the hemisphere from [[Gideon]] through [[Thornwick]]'s successful Strength check ([[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|Session 5]]).
#### Aftermath and open follow-ups (not required for quest completion)

- The party escapes with the hemisphere when the towers consolidate into a single spire ([[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]).
- Determine the hemisphere's identity and whether it can help against the Wastes; tracked separately in [[The Hemisphere of Gideon]].
- Report the findings or deliver the object to [[Queen Isabel]] if the party later decides to do so.

#### Developments

- **Session 1 — [[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]]:** Queen Isabel assigns two investigative destinations: the Towers of Icarus and the [[Luciferian Caldera]]. The party sets out toward the Gilded Lands.
- **Session 2 — [[Campaigns/Sands of Desolation/Session Journal/On Death's Door|Session 2]]:** [[Duke Ingrail]]'s captivity interrupts the original mission.
- **Session 3 — [[Campaigns/Sands of Desolation/Session Journal/Happy Hunger Games!|Session 3]]:** The Blood Games and the rose-masked woman's conditional offer complicate the route toward the towers.
- **Session 4 — [[Campaigns/Sands of Desolation/Session Journal/We Give a Celestial a Piss Kink|Session 4]]:** The party finds the hidden three-tower site, dispels its concealment, encounters a wild-magic demon and discovers a captive [[The Wanderer's Guide to the Multiverse/Bestiary/Radiant Idol|Radiant Idol]].
- **Session 5 — [[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|Session 5]]:** After the first idol is overcome, the party explores the middle tower, reaches [[Gideon]] and fights him. [[Thornwick]] succeeds on a Strength check to tear the hemisphere from Gideon's chest, **completing this retrieval quest**. The full fight was not recorded.
- **Session 6 — [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]:** The party escapes with the object as the three towers become one [[Tower of Icarus]]; [[Weary]] obscures the object's magical aura. The party heads for the [[Dwarven Forge]] while keeping the second commission at the caldera in view. The hemisphere's identity and use are still unknown.

**Checkpoint status:** **Completed in Session 5**, upon the hemisphere's recovery. Questions about its significance and any eventual report to the queen remain separate follow-ups.

#### Rewards

No specific payment was confirmed by Session 6. The party possesses a mysterious hemisphere; **its value as a reward or anti-Wastes artifact is not yet known**.

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
> The hemisphere extraction is placed in **Session 5**, based on the old journal and the player's direct confirmation of Thornwick's Strength check. B08 is assigned to Session 5 with **high confidence** on transcript sequence and retrospective player recollection; it does not contain the missing Gideon combat. B09 begins with the hemisphere already recovered. The player explicitly confirmed that the quest **counts as Completed in Session 5** when Thornwick recovered the hemisphere, regardless of unresolved questions about its function or any report to Queen Isabel. Historical reference: [[Campaigns/Sands of Desolation/Session Journal/We Give a Celestial a Piss Kink|Session 4]], [[Campaigns/Sands of Desolation/Session Journal/Battle for the Bulge|Session 5]], [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]].
