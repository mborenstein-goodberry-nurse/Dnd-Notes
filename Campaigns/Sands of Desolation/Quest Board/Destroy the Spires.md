---
type: Quest
subtype: Delivery
priority: 2
questNum: 49
date: 04-09-2026
campaign: Sands of Desolation
world: Astodan
location: null
fc-calendar: Sands of Desolation
fc-date:
  year: 0
  month: 0
  day: 0
pixel-banner-flag-color: blue
fc-category: Quests
status: Undiscovered
reconstructionOriginalStatus: Active
summary: Destroy 2-3 Beacon Spires to interfere with the Planes merging
tags: []
questGiver: []
assigned: null
people: []
places: []
organizations: []
mysteries: []
---
### [[Destroy the Spires]]

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



There are 3 great beacons working to converge the planes together. If we can disable 2 of them, we stand a fighting chance to prevent the planes merging. We'll use their light bombs (2 per) at the base of the spires to disable them. We could gain their assistance if we did, and it would prevent the planes merging. She can also provide a way into the [[City of Brass]]

#### Progression



- [x] Procure means of Destruction (Light Bombs)
- [x] Find our way to the First Beacon 
- [x] Plant Bombs
- [x] Detonate Bombs ([[#Additional Details|See below]])
- [ ] Find our way to the Second Beacon 
- [ ] Plant Bombs
- [ ] Detonate Bombs ([[#Additional Details|See below]])

#### Developments


#### Rewards



1. Gain the assistance of the remaining armies of [[Ember's Rest]] and the [[Shadar-Kai]] 
2. Prevent the planes merging 
3. Find a way into the City of Brass, to save [[Thornwick]]'s Son

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


How to ignite the [[Light Bomb]]s:  ^13b20e
1. Open the casing  ^441d5b
2. Pull out the large cylindrical switch, rotate it, and push it back down 
3. After 3 rounds, it will erupt, eradicating anything tainted by the [[Fox]] 
	1. Those cursed by the fox will also be eradicated 
	2. [[Nightwalker]]s will also be eradicated 
4. Once the timer starts, they ***cannot*** be stopped 
5. We ***MUST*** set both of them off on the **same turn** 

Something to note: When the creatures take notice of us, they will destroy anything associated with it
