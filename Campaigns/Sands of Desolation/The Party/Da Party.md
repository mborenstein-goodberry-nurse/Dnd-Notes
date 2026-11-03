---
type: Reference Sheet
date: 12-01-2025
campaign: Sands of Desolation
world: Astodan
---
# The Party

```dataviewjs
const current = dv.current();
const party = dv.pages(`"Campaigns/${current.campaign}/The Party"`)
    .where(p => p.type === "Creature" && ["PC", "NPC"].includes(p.subtype))
    .sort(p => p.file.name, "asc");

if (party.length) {
    dv.table(["Character", "Role", "Status", "Summary"], party.map(p => [
        p.file.link, p.subtype === "PC" ? "Player Character" : "NPC", p.status ?? "-", p.summary ?? "-"
    ]));
} else {
    dv.paragraph("*No party characters recorded.*");
}
```
