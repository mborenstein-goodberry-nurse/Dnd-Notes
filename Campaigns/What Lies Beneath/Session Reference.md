---
type: Reference
campaign: What Lies Beneath
world: What Lies Beneath
aliases:
  - WLB Session Reference
  - At the Table
---
# ✧ Session Reference

> [!info] At the Table
> A quick-access shelf for **What Lies Beneath**. Keep this note open as your third gameplay tab, alongside the pinned campaign and Session Journal tabs. Your Bestiary, Dice Roller, Initiative Tracker, and Calendarium can remain in the existing right sidebar.

## ✦ Campaign & Character

| Character | Campaign | Personal Quest |
| :--- | :--- | :--- |
| [[Kiara Bashara]] | [[Campaigns/What Lies Beneath/What Lies Beneath\|What Lies Beneath]] | [[Finding Shayann]] |

**Other useful references:** [[Revelar]] · [[Xurxus]] · [[Darian Pageweather]]

### Latest Session Journal

```dataviewjs
const sessions = dv.pages('"Campaigns/What Lies Beneath/Session Journal"')
    .where(p => p.type === "Session Journal" && Number(p.sessionNum) > 0)
    .sort(p => Number(p.sessionNum), "desc");

const latest = sessions.first();
if (latest) {
    dv.paragraph(latest.file.link);
} else {
    dv.paragraph("_No numbered Session Journals found yet._");
}
```

## ✦ Kiara's Abilities

> [!note] Character-sheet reminder
> These are **reference links**, not a record of Kiara's current HP, spell slots, uses of class abilities, or prepared spells. Use her character sheet as the authority for those values.

```dataviewjs
// Quick-reference items are matched against existing Wanderer's Guide notes.
// Rename or add an item below to customize the shelf.
const guide = "The Wanderer's Guide to the Multiverse/";
const index = new Map();
for (const file of app.vault.getMarkdownFiles()) {
    if (!file.path.startsWith(guide)) continue;
    const key = file.basename.toLowerCase();
    if (!index.has(key)) index.set(key, []);
    index.get(key).push(file);
}
function ref(name, preferredFolder = "") {
    const candidates = index.get(name.toLowerCase()) ?? [];
    const hit = candidates.find(f => preferredFolder && f.path.startsWith(guide + preferredFolder + "/")) ?? candidates[0];
    return hit ? dv.fileLink(hit.path, false, name) : `${name} (not found)`;
}
function columns(headings, lists, preferredFolders = []) {
    const length = Math.max(...lists.map(list => list.length));
    const rows = Array.from({length}, (_, i) =>
        lists.map((list, j) => list[i] ? ref(list[i], preferredFolders[j] ?? "") : ""));
    dv.table(headings, rows);
}

columns(
    ["Paladin", "Redemption / Eladrin"],
    [
        ["Paladin", "Lay on Hands", "Divine Smite", "Channel Divinity"],
        ["Oath of Redemption", "Emissary of Peace", "Rebuke the Violent", "Fey Step"]
    ],
    ["Classes/Paladin", "Classes/Paladin"]
);

// These four are 2014 Redemption oath spell references at paladin level 5.
// They are NOT a statement about what Kiara has personally prepared.
dv.header(3, "Oath Spell References");
columns(
    ["1st-level oath spells", "2nd-level oath spells"],
    [["Sanctuary", "Sleep"], ["Calm Emotions", "Hold Person"]],
    ["Spells", "Spells"]
);

dv.header(2, "✦ Your Turn");
columns(
    ["Actions", "Tactics / Movement", "Core Rules"],
    [
        ["Your Turn", "Attack", "Cast a Spell", "Help", "Ready"],
        ["Dash", "Disengage", "Dodge", "Hide", "Grappling"],
        ["Opportunity Attack", "Concentration", "Cover", "Surprise", "Death Saving Throws"]
    ],
    ["Dictionary", "Dictionary", "Dictionary"]
);

dv.header(2, "✦ Conditions");
columns(
    ["Conditions A–G", "Conditions I–P", "Conditions R–U"],
    [
        ["Blinded", "Charmed", "Deafened", "Exhaustion", "Frightened", "Grappled"],
        ["Incapacitated", "Invisible", "Paralyzed", "Petrified", "Poisoned", "Prone"],
        ["Restrained", "Stunned", "Unconscious"]
    ],
    ["Dictionary", "Dictionary", "Dictionary"]
);
```

## ✦ My Prepared Spells

*Add links to the spells Kiara actually has prepared here. This is intentionally left blank rather than guessing from her class or oath.*

<!-- Example after verifying your character sheet: [[Bless]] · [[Cure Wounds]] -->

---

> [!tip] Fast Navigation
> **Ctrl + O** — Find a note by name  
> **Ctrl + Shift + P** — Toggle pin for active tab *(your custom hotkey)*  
> **Alt + 1 / 2 / 3** — Jump between your first three main tabs *(with your Pane Relief hotkeys)*

<!-- v2 NOTE: This first version uses only built-in Obsidian and your existing Dataview plugin. Items marked '(not found)' did not resolve by filename within the Wanderer's Guide. Edit their names in the DataviewJS lists above to match your actual note filenames. No placeholder note will be created by those items. -->
