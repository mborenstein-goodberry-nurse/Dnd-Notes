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
status: Active
summary: Find the hidden artifact to combat the encroaching [[The Wastes|Wastes]]
tags: []
questGiver: "[[Queen Isabel]]"
assigned: "[[It Begins...]]"
people: []
places:
  - "[[Towers of Icarus]]"
  - "[[Gilded Lands]]"
organizations: []
mysteries: []
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



Commissioned by [[Queen Isabel]] during [[It Begins...|Session 1]]: investigate the [[Towers of Icarus]], locate any powerful relics or magic that might counter the spread of [[The Wastes|the Wastes]], and report or return what the party learns. At the time of the assignment, the towers were believed to be of celestial origin and dangerous to approach.

#### Progression




- [x] Receive Queen Isabel's assignment in Session 1.
- [ ] Reach the Towers of Icarus.
- [ ] Investigate powerful magic or relics that might counter the Wastes.
- [ ] Report findings or recover useful magic, if possible.

#### Developments

- **Session 1:** Assigned by [[Queen Isabel]]; party leaves [[Isabel's Castle]] and heads toward the Gilded Lands.
- **Session 2:** En route, the party is captured by [[Duke Ingrail]] and cannot immediately continue.
- **Session 3:** A powerful rose-masked woman offers conditional free passage to the towers if the captives survive the Blood Games. Her motives and identity remain uncertain.


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
