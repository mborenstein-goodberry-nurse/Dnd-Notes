---
type: Quest
subtype: Survival
priority: 1
questNum: 3
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
summary: The group escaped Ingrail’s captivity after the Blood Games and a deal with Xerac.
tags: []
questGiver: []
assigned: '[[On Death''s Door]]'
people: ['[[Duke Ingrail]]', '[[Joey]]', '[[Pleasure|Rose]]']
places: ["[[Ingrail's Estate]]", '[[Grand Exchange]]', '[[Hallowed Bastion]]']
organizations: []
mysteries: ['[[Who Is Billy]]', '[[Identity of the Rose-Masked Woman]]']
---
### [[Escape from Ingrail]]

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



The party accepted [[Duke Ingrail]]'s hospitality at the [[Grand Exchange]] in [[On Death's Door|Session 2]], only to be poisoned, restrained, and enslaved. The immediate objective was to survive captivity, protect separated companions, and find a way out. At the end of Session 3, the party had not yet been confirmed free of Ingrail's control. The offer of possible passage following the Blood Games remained conditional.

#### Progression




- [x] Survive capture and learn where the party is being held.
- [x] Receive a possible means of escape when Billy gives Weary a lockpick.
- [x] Free the companions from Ingrail's captivity.
- [x] Regroup with the companions known to be present, including Arthur; not every earlier captive's fate is confirmed.
- [x] Leave Ingrail's control alive.

#### Developments

- **Session 4:** The party accepted Xerac's condition to take responsibility for his three unwanted charges, left the Hallowed Bastion, and retrieved belongings at the wagon. The captivity escape objective was completed.

- **Session 2:** Ingrail captures the party using poison, anti-magic restraints, and magical collars.
- **Session 2.5:** Diane and Weary are held separately; Billy secretly provides Weary a lockpick.
- **Session 3:** Prisoners are forced to work and then fight in the Blood Games. A rose-masked woman offers conditional passage if they survive; the archive does not establish that the party actually escaped during the supplied audio.


#### Rewards




Freedom from Ingrail's captivity, secured in Session 4. No additional reward is independently established.

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
