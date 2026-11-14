---
type: Quest
subtype: Errand/Shopping
priority: 4
questNum: 5
date: 11-09-2026
campaign: Sands of Desolation
world: Astodan
fc-calendar: Sands of Desolation
gameDate: "Not verified"
pixel-banner-flag-color: blue
fc-category: Quests
status: Completed
summary: "The 300 gp equipment enchantment commissions were completed by the end of Session 12 (player-confirmed; exact delivery scene not recorded)."
tags: []
questGiver: "[[Drax]]"
assigned: "[[Cave Divers be Like]]"
people:
- "[[Drax]]"
- "[[Diane]]"
- "[[Weary]]"

places:
- "[[Anvil's Flame]]"

organizations:
- "[[Mechanical Wonders]]"

mysteries: []
---
### [[Collect the Mechanical Wonders' Enchantments]]

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

During [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]], Diane and Weary paid **300 gp total** for Drax to enchant two pieces of equipment. The items were handed over to be worked on. **The enchantments were completed by the end of Session 12**, as confirmed by the player during Batch 4 review. The exact completion and equipment-return scene is not documented in the surviving Sessions 10–12 recordings.

#### Progression

- [x] **100 gp** — commission +1 enhancement for Diane's scale mail.
- [x] **50 gp** — commission +1 enhancement for Weary's bloodwell vial.
- [x] **150 gp** — add one use of *[[The Wanderer's Guide to the Multiverse/Spells/Hex|Hex]]* per long rest to Weary's vial.
- [x] Pay **300 gp** in total. An **unidentified companion contributed 10 gp**; the source does not split the remaining payment by payer.
- [x] Hand both items to Drax for work.
- [x] Drax completed the paid enchantments (player-confirmed retrospectively, by the end of Session 12).
- [x] Close the commission based on the player’s confirmation; the exact pickup or delivery scene remains unverified.
- [ ] **Later inventory verification:** check each character’s equipment note before assigning item bonuses or an exact pickup date.

#### Developments

- **Session 7:** Items handed over for paid work ([[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]).
- **Through Session 9:** No confirmed completion or pickup.
- **By Session 12:** The player confirms both Diane’s and Weary’s enchantments were completed. The precise delivery date and scene are not known from the available recordings.

#### Rewards

- This is a **completed paid commission**, not a free reward. The item effects and prices are recorded above; do not infer an exact inventory handoff date.
- Thornwick's interest in a stronger weapon is **not** an established commission or purchase; it is not part of the 300 gp.

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
> Exact amounts are supported by Recording 12/B12. The player’s direct retrospective confirmation closes the commission, although the historical recordings do not document the delivery moment. Do not backdate the enchantments to Session 7 or award gear for an undocumented scene. Quest number 5 is proposed and should be checked against live data before final import.
