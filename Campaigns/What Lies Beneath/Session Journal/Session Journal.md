---
type: Reference Sheet
date: 10-26-2026
campaign: What Lies Beneath
world: What Lies Beneath
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
