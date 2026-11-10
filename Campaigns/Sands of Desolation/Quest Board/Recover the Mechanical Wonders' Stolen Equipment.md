---
type: Quest
subtype: Fetch
priority: 4
questNum: 4
date: 11-09-2026
campaign: Sands of Desolation
world: Astodan
fc-calendar: Sands of Desolation
gameDate: "Not verified"
pixel-banner-flag-color: blue
fc-category: Quests
status: Completed
summary: "Recover the Mechanical Wonders' stolen mining equipment to earn assistance against the duergar raids."
tags: []
questGiver: "[[Drax]]"
assigned: "[[Cave Divers be Like]]"
people:
  - "[[Drax]]"
  - "[[Thrax]]"
  - "[[Thornwick]]"

places:
  - "[[Anvil's Flame]]"
  - "[[Dwarven Forge]]"

organizations:
  - "[[Mechanical Wonders]]"

mysteries:
  - "[[Who Is Behind the Duergar Raids?]]"

---
### [[Recover the Mechanical Wonders' Stolen Equipment]]

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
>
> > **Assigned:** `=this.assigned`
>
> > **Quest #:** `=this.questNum`

#### Overview

In [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]], Founders Drax and Thrax of the [[Worlds/Astodan/Organizations/Mechanical Wonders|Mechanical Wonders]] offered help examining Gideon's hemisphere if the party recovered stolen specialist mining equipment and opposed the duergar. **This tracker defines success as recovering the equipment**, not delivering it back to the guild.

#### Progression

- [x] Learn of the stolen equipment and duergar raids ([[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]).
- [x] Recover the missing mining equipment (known from [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]'s recap of the previous session).
- [ ] **Unconfirmed follow-up (not part of this quest's completion):** Determine whether the equipment was returned to the guild.
- [ ] **Unconfirmed:** Determine whether the promised deeper hemisphere analysis occurred.

#### Developments

- **Session 7:** Guild offered assistance in exchange for recovering equipment.
- **Session 8 / reported in Session 9:** Equipment reportedly recovered while Diane was absent; sequence and return not preserved ([[Campaigns/Sands of Desolation/Session Journal/Missed Session|Session 8]], [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]).

#### Rewards

- Founders promised cooperation and possible further analysis, neither verified as delivered.
- An unusually powerful stolen battleaxe was mentioned as possible loot **only if recovered**. The party's possession of it is not documented.

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
> The equipment-recovery claim originates from Session 9 retrospective recap, not surviving Session 8 audio. Status Completed applies to **recovery**, not return. The quest number 4 is a proposed historically sequential number; verify against live vault before final import.
