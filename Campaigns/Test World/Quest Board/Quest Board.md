---
type: Quest Board
date: 10-20-2026
campaign: Test World
world: Test World
banner: z_Assets/System/Quest Board.png
banner-x: 49
banner-y: 62
---
### Main Quest 
```dataviewjs
const current = dv.current();

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "active"
    )
    .array()
    .sort((a, b) =>
        Number(a.priority ?? 999999) - Number(b.priority ?? 999999) ||
        Number(a.questNum ?? 999999) - Number(b.questNum ?? 999999)
    );

if (quests.length) {
    const mainQuest = quests[0];

    dv.paragraph(`![[${mainQuest.file.path}]]`);
} else {
    dv.paragraph("*No active quests found.*");
}
```
```button
name New Quest  
type command
action QuickAdd: Macro - New Quest
```
### Active
```dataviewjs
const current = dv.current();

const priorityLabels = {
    0: "Initial Setup",
    1: "Time-Critical",
    2: "Important",
    3: "Scheduled",
    4: "Side Quest",
    5: "Neutral"
};

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "active"
    )
    .array()
    .sort((a, b) =>
        Number(a.priority ?? 999999) - Number(b.priority ?? 999999) ||
        Number(a.questNum ?? 999999) - Number(b.questNum ?? 999999)
    );

const otherQuests = quests.slice(1);

if (otherQuests.length) {
    dv.table(
        ["Quest", "Quest #", "Priority", "Summary"],
        otherQuests.map(q => [
            q.file.link,
            q.questNum ?? "-",
            priorityLabels[q.priority] ?? "Unknown",
            q.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No additional active quests.*");
}
```

### Completed
```dataviewjs
const current = dv.current();

const priorityLabels = {
    0: "Initial Setup",
    1: "Time-Critical",
    2: "Important",
    3: "Scheduled",
    4: "Side Quest",
    5: "Neutral"
};

const quests = dv.pages('"Campaigns"')
    .where(q =>
        q.type === "Quest" &&
        q.campaign === current.campaign &&
        String(q.status ?? "").toLowerCase() === "completed"
    )
    .sort(q => Number(q.questNum ?? -1), "desc");

if (quests.length) {
    dv.table(
        ["Quest", "Quest #", "Priority", "Summary"],
        quests.map(q => [
            q.file.link,
            q.questNum ?? "-",
            priorityLabels[q.priority] ?? "Unknown",
            q.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No completed quests yet.*");
}
```

