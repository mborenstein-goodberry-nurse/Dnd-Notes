---
type: Reference Sheet
date: null
campaign: Sands of Desolation
world: Astodan
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
