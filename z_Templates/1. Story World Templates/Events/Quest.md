---
<%*
// Read the current in-game date from the calendar named for this campaign.
// Session 0 and Quest notes may be created before their calendar is configured.
const campaignCalendar = tp.user.getThisCampaign(tp);
let currentCalDate = null;
let currentCalDateDisplay = "Not set";

try {
    const calendarAPI = window.Calendarium?.getAPI?.(campaignCalendar);
    const date = calendarAPI?.getCurrentDate?.();
    if (date && [date.year, date.month, date.day].every(Number.isFinite)) {
        const display = calendarAPI.toDisplayDate(date);
        currentCalDate = date;
        currentCalDateDisplay = display;
    }
} catch (error) {
    console.warn(`Calendarium date unavailable for "${campaignCalendar}":`, error);
}

// Match the month conversion already used by the working Session Journal.
// If the calendar isn't configured, omit fc-date rather than writing 0/0/0.
const calendarDateYaml = currentCalDate
    ? `fc-date:\n  year: ${currentCalDate.year}\n  month: ${currentCalDate.month + 1}\n  day: ${currentCalDate.day}\n`
    : "";
-%>
type: Quest
subtype: Other
priority: 5
questNum: <% tp.user.getThisQuestNum(tp) %>
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
fc-calendar: <% campaignCalendar %>
<% calendarDateYaml %>gameDate: <% JSON.stringify(currentCalDateDisplay) %>
pixel-banner-flag-color: blue
fc-category: Quests
status: Active
questGiver: []
assigned:
people: []
places: []
organizations: []
mysteries: []
<%* tR += await tp.user.getCampaignBanner(tp, 380) -%>
tags:
---
### [[<% tp.file.title %>]]

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


#### Progression


#### Developments


#### Rewards


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
