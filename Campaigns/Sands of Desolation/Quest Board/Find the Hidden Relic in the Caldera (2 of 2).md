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
status: Completed
summary: "The complementary life-associated engine hemisphere was recovered in the Sovereign's chamber after the Session 26 victory; delivery to Queen Isabel remains a separate active quest."
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

In [[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]], [[Queen Isabel]] commissioned the party to investigate the [[Luciferian Caldera]] as the **second** possible source of magic or an artifact to oppose the [[The Wastes|Wastes]]. It was described as a dangerous pit in [[Foo Fighters|Foo Fighter territory]] reaching toward a layer of Hell. The assignment initially concerned a **possible** artifact, not a guaranteed discovery. The reconstructed Session 26 battle and Session 27 aftermath establish that the complementary life-associated hemisphere was recovered from the Sovereign's chamber following the victory.

The party had **not entered or investigated the caldera** by the end of [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]. Its planned investigation remains separate from the completed Towers retrieval mission and from the guild's duergar-related work.

#### Progression

- [x] Receive the second investigative assignment from [[Queen Isabel]] ([[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]]).
- [x] Reaffirm the caldera as an intended destination after the Towers expedition ([[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]).
- [x] Reach the [[Luciferian Caldera]].
- [x] Investigate the Caldera and recover the complementary hemisphere. **Recovered by Session 26, supported by Zach's notes and Session 27's recorded aftermath.**
- [x] Establish the next objective: [[Campaigns/Sands of Desolation/Quest Board/Deliver the Hemispheres to Queen Isabel|deliver the recovered hemispheres to Queen Isabel]]. **The delivery is a separate Active quest, not part of completing this retrieval.**

#### Developments

- **Session 1 — [[Campaigns/Sands of Desolation/Session Journal/It Begins...|Session 1]]:** Queen Isabel names the Luciferian Caldera as the second investigative destination.
- **Sessions 2–3:** Captivity and the Blood Games delay the original assignments.
- **Sessions 4–5:** The party prioritizes the Towers of Icarus commission rather than traveling to the caldera.
- **Session 6 — [[Campaigns/Sands of Desolation/Session Journal/A Second Session has Hit the Towers|Session 6]]:** With the hemisphere recovered, the party discusses the caldera as the next major site but elects to travel first toward the [[Dwarven Forge]], where [[Drax]] was believed to be reachable. **The caldera remains unvisited.**

- **Session 7 — [[Campaigns/Sands of Desolation/Session Journal/Cave Divers be Like|Session 7]]:** While consulting the Mechanical Wonders about the recovered hemisphere, the company again described the Luciferian Caldera as a planned second destination. Its current effort focused on obtaining guild assistance and handling the duergar raids; no caldera journey occurred.
- **Sessions 8–9 — [[Campaigns/Sands of Desolation/Session Journal/Falatir's Sacrifice|Session 9]]:** The evidence covers the guild's mining-equipment recovery, duergar confrontation, and Falatir's departure. **No visit to the caldera is documented.** The mission therefore remains Active.
- **[[Campaigns/Sands of Desolation/Session Journal/Travel & Lore for Weary|Travel & Lore for Weary]]:** Narci identifies an open approach and the hazardous but passable tunnel. The party chooses the tunnel and camps before entry.
- **[[Campaigns/Sands of Desolation/Session Journal/Into the Fiery Butthole|Into the Fiery Butthole]]:** The group enters the Caldera by tunnel, fights fiends, and finds a sword in an animated mound. The second relic objective remains unfulfilled.
- **[[Campaigns/Sands of Desolation/Session Journal/A Mound of Flesh|A Mound of Flesh]]:** The mound is defeated and Hero's Bane is recovered. **Do not equate the recovered personal sword with the quest's still-unconfirmed Wastes-restoring relic.** Quest remains **Active**.

- **[[Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!|Away to the Caldera!]]:** The recovered **draining** hemisphere breached the gate, but its dangerous surface consumed one metal covering. The party learned that [[Worlds/Astodan/People/The Sovereign|The Sovereign]] was thought to possess the complementary life-associated half; this is **not a recovery** of it.
- **[[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]:** The party became entangled with the obelisk and the exchange involving Hero's Bane; the quest artifact was not retrieved.
- **[[Campaigns/Sands of Desolation/Session Journal/A Soul of Light|A Soul of Light]]:** The group sought a descent into the Caldera, found a possible staircase and continued toward the stronghold. The second hemisphere had **not yet been recovered by the end of Session 24**. This session remains a historical in-progress entry, not the completion date.

- **[[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight Part 2|Sovereign Fight Part 2]] (Session 26):** The Sovereign is defeated and the complementary engine hemisphere is recovered from one of the yellow spheres. The party later has both pieces in hand, completing this retrieval objective.
- **[[Campaigns/Sands of Desolation/Session Journal/Leaving the Battlefield|Leaving the Battlefield]] (Session 27):** The party leaves the Caldera carrying the halves separately. The next outstanding goal remains [[Campaigns/Sands of Desolation/Quest Board/Deliver the Hemispheres to Queen Isabel|Deliver the Hemispheres to Queen Isabel]]; it is not part of this completed retrieval.

#### Rewards

The recovered hemisphere is the outcome of this retrieval. No independent monetary reward is established.

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
> This is the party's **second** original investigation, separate from delivering its results to Queen Isabel. The Dwarven Forge was a planned route/staging destination, not the caldera itself. **Chronology:** `status: Completed` now reflects the documented recovery by [[Campaigns/Sands of Desolation/Session Journal/Sovereign Fight Part 2|Sovereign Fight Part 2]] (Session 26), corroborated in the following session's recap. The earlier Sessions 22–24 entries remain correctly in progress. The retrieval objective is distinct from Queen Isabel's outstanding delivery quest.
