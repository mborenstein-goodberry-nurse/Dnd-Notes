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
summary: Find the hidden artifact in the [[Luciferian Caldera]] to help combat the Wastes
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



Commissioned by [[Queen Isabel]] in [[It Begins...|Session 1]] as the other site to investigate for powerful magic or relics against the advancing Wastes. The [[Luciferian Caldera]], in Foo Fighter territory, was described as a pit reaching toward a layer of Hell. The party had **not visited** it during Sessions 1–3.

#### Progression




- [x] Receive Queen Isabel's second assignment in Session 1.
- [ ] Travel to the Luciferian Caldera.
- [ ] Investigate whether powerful magic or a relic can be recovered.
- [ ] Report findings or recover useful magic, if possible.

#### Developments

- **Session 6:** After recovering the hemisphere at the Towers, the party reaffirmed the Luciferian Caldera as the next main investigative destination, choosing to travel via the Dwarven Forge. The caldera had **not yet been visited**.

- **Session 1:** The caldera is named as the second investigative destination.
- **Sessions 2–3:** The party travels toward the Towers of Icarus instead; no recovered caldera artifact in this batch.


#### Rewards




No specific reward confirmed in Sessions 1–3.

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
