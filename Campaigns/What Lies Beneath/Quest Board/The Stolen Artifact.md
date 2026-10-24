---
type: Quest
subtype: Fetch
priority: 2
questNum: 2
date: 10-23-2026
campaign: What Lies Beneath
world: What Lies Beneath
fc-calendar: What Lies Beneath
fc-date:
  year: <% tp.user.getThisDate(tp)[0] %>
  month: <% tp.user.getThisDate(tp)[1] %>
  day: <% tp.user.getThisDate(tp)[2] %>
pixel-banner-flag-color: blue
fc-category: Quests
status: Active
summary: Recover a dangerous stolen artifact on behalf of Xurxus before it falls into the wrong hands.
questGiver: "[[Xurxus]]"
assigned:
  - "[[Kiara Bashara]]"
  - "[[Revelar]]"
people:
  - "[[Kiara Bashara]]"
  - "[[Revelar]]"
places:
  - "[[Stal'hgite]]"
  - "[[Iron Hills]]"
organizations:
  - "[[Church of Xurxus]]"
mysteries: 
  - "[[The Mystery of the Stolen Artifact]]"
tags: []
---
### [[The Stolen Artifact]]

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
> > **Priority:** `INPUT[inlineSelect(option(1, Time-Critical), option(2, Important), option(3, Scheduled), option(4, Side Quest), option(5, Neutral)):priority]`
>
> > [!blank|brown]
> > **Quest Giver:** `=this.questGiver`
> >
> > **Assigned:** `=this.assigned`
> >
> > **Quest #:** `=this.questNum`

#### Overview

**[[Xurxus]]**, God of Balance, personally summoned **[[Kiara Bashara]]** and **[[Revelar]]** and entrusted them with recovering a stolen artifact.

Xurxus warned that the artifact could have extremely dire consequences if it fell into the wrong hands. Its name, appearance, properties, current location, and the identity of its thief remain unknown.

The two companions have traveled to **[[Stal'hgite]]**, a town in the **[[Iron Hills]]**, to locate the **Keeper of Knowledge**. They were instructed to begin their search at a local tavern.

Kiara regards the mission as a sacred duty and an opportunity to prove herself worthy of greater trust from Xurxus.

#### Progression

- [x] Receive the assignment from Xurxus.
- [x] Travel to Stal'hgite in the Iron Hills.
- [x] Visit the local tavern and ask about the Keeper of Knowledge.
- [x] Locate and speak with the Keeper of Knowledge.
- [x] Discover the artifact's identity and significance.
- [x] Determine who stole the artifact and where it was taken.
- [ ] Recover the stolen artifact.
- [ ] Return the artifact to Xurxus or his designated representatives.

#### Developments

##### Before Session 1

- Kiara and Revelar were independently chosen to undertake the mission.
- Both serve Xurxus, although their approaches to mercy and violence differ considerably.
- Goblins have been suggested as possible suspects, but their involvement is **unconfirmed**.
- Kiara believes the artifact may be small enough to transport and important on a kingdom-wide scale. These are her interpretations rather than verified facts.
- Revelar described the artifact as potentially volatile, but its actual properties are unknown.
- Their first lead is the Keeper of Knowledge, whom they must locate through inquiries in Stal'hgite.

#### Rewards

**Unknown.**

Kiara hopes that successfully completing this assignment will earn Xurxus's trust and eventually help her secure justice for [[Shayann]]. No specific reward has been promised.

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

##### Questions to Investigate

- What exactly is the stolen artifact?
- Why is it dangerous?
- Who stole it, and for what purpose?
- Who is the Keeper of Knowledge?
- Are goblins actually involved, or is this an assumption?
- Why did Xurxus choose Kiara and Revelar specifically?
- What consequences could follow if the artifact is not recovered?

##### Character Considerations

**Kiara:** She intends to fulfill the mission without compromising her Oath of Redemption. She believes suspected thieves should be offered the opportunity for mercy before violence becomes necessary.

**Revelar:** He is more pragmatic about using lethal force and may disagree with Kiara's approach. Nevertheless, both share the same assignment and devotion to Xurxus.
