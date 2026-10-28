---
type: Reference Sheet
date: 10-28-2026
campaign: Test World
world: "world: Test World"
---
```dataviewjs
const current = dv.current();

const sessions = dv.pages('"Campaigns"')
    .where(s =>
        String(s.type ?? "").toLowerCase() === "session journal" &&
        s.campaign === current.campaign
    )
    .sort(s => Number(s.sessionNum ?? -1), "desc");

if (sessions.length) {
    dv.table(
        ["Session", "Session #", "Date", "Summary"],
        sessions.map(s => [
            s.file.link,
            s.sessionNum ?? "-",
            s["date"] ?? s.date ?? "-",
            s.summary ?? "-"
        ])
    );
} else {
    dv.paragraph("*No sessions recorded yet.*");
}
```
