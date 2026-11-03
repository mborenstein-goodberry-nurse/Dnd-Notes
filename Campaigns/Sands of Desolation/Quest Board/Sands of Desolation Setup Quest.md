---
type: Quest
subtype: Lore
priority: 1
date: 12-01-2025
campaign: Sands of Desolation
world: Astodan
questNum: 0
pixel-banner-flag-color: blue
fc-category: Quests
status: Completed
summary: Final Setup Information for the Sands of Desolation Campaign!
tags: []
questGiver: []
assigned: null
people: []
places: []
organizations: []
mysteries: []
---
### [[Sands of Desolation Setup Quest]]

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



This is your first quest: to set up the campaign!

#### Progression



- [x] Create a Calendar (Title it the Campaign's Title)
- [x] Create your Character
	- [x] Create Character in [[Campaigns/Sands of Desolation/The Party/Da Party|The Party]]
	- [x] Link it in [[Campaigns/Sands of Desolation/Sands of Desolation|The Campaign]]
- [x] If there are any custom rules or modules:
	- [x] Put them in World Almanac/Other
	- [x] Link them in [[Campaigns/Sands of Desolation/Sands of Desolation|The Campaign]]
- [x] If there is a map available, create it in Maps
- [x] Enjoy!

#### Developments


#### Rewards



A complete experience

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
