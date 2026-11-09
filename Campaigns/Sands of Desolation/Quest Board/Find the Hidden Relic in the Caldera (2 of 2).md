---
type: Quest
subtype: Lore
priority: 2
questNum: 2
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
status: Active
summary: Investigate the [[Luciferian Caldera]] for a possible relic or magic that might help resist the Wastes.
tags: []
questGiver: '[[Queen Isabel]]'
assigned: '[[It Begins...]]'
people: []
places: ['[[Luciferian Caldera]]']
organizations: []
mysteries: []
---
### [[Find the Hidden Relic in the Caldera (2 of 2)]]

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

In [[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]], [[Queen Isabel]] commissioned the party to investigate the [[Luciferian Caldera]] as the **second** possible source of magic or an artifact to oppose the [[The Wastes|Wastes]]. It was described as a dangerous pit in [[Foo Fighters|Foo Fighter territory]] reaching toward a layer of Hell. The description does not establish that a usable artifact is definitely there.

The party has **not entered or investigated the caldera** by the end of [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]].

#### Progression

- [x] Receive the second investigative assignment from [[Queen Isabel]] ([[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]]).
- [x] Reaffirm the caldera as an intended destination after the Towers expedition ([[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]).
- [ ] Reach the [[Luciferian Caldera]].
- [ ] Investigate the site's possible magical resources or relics.
- [ ] Recover anything useful and report the outcome to Queen Isabel, as appropriate.

#### Developments

- **Session 1 — [[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]]:** Queen Isabel names the Luciferian Caldera as the second investigative destination.
- **Sessions 2–3:** Captivity and the Blood Games delay the original assignments.
- **Sessions 4–5:** The party prioritizes the Towers of Icarus commission rather than traveling to the caldera.
- **Session 6 — [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]:** With the hemisphere recovered, the party discusses the caldera as the next major site but elects to travel first toward the [[Dwarven Forge]], where [[Drax]] was believed to be reachable. **The caldera remains unvisited.**

#### Rewards

No specific payment or artifact is established by Session 6. The mission remains exploratory.

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
> This is the party's **second** original mission, not evidence that a caldera artifact was already found. The Dwarven Forge is a planned route/staging destination, not the caldera itself. No later-session revelations have been incorporated.
