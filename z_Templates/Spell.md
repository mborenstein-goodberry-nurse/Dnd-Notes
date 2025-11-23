<%*
/* ============================================================
   0) Get Clipboard
============================================================ */
let raw = await tp.system.clipboard() || "";

/* ============================================================
   Extract Level + School from clipboard (line containing "-level")
============================================================ */
let lines = raw.split("\n");

// Find the first line that contains "-level"
let levelLine = lines.find(l => l.toLowerCase().includes("-level")) || "";

let level = "";
let school = "";

// Extract level (e.g., "1st-level")
let levelMatch = levelLine.match(/^(\d+)(st|nd|rd|th)-level/i);
if (levelMatch) {
    level = Number(levelMatch[1]);
}

// Extract school after the "-level" keyword
let schoolMatch = levelLine.match(/\d+(?:st|nd|rd|th)-level\s+([a-zA-Z]+)/i);
if (schoolMatch) {
    school = schoolMatch[1].charAt(0).toUpperCase() + schoolMatch[1].slice(1);
}

/* ============================================================
   Detect Ritual + Concentration
============================================================ */

let isRitual = false;
let isConcentration = false;

// --- Ritual detection ---
// If the line containing "-level" also includes "(ritual)"
if (levelLine.toLowerCase().includes("(ritual)")) {
    isRitual = true;
}

// --- Concentration detection ---
// Look for the "Duration:" line
let durationLine = lines.find(l => l.toLowerCase().startsWith("duration"));
if (durationLine && durationLine.toLowerCase().includes("concentration")) {
    isConcentration = true;
}

/* ============================================================
   2) Extract "Spell Lists. X, Y, Z" line
============================================================ */
const spellListLine = raw.match(/^Spell Lists\.\s*(.*)$/im);
let classEntries = [];

if (spellListLine) {
    const classPart = spellListLine[1].trim();
    classEntries = classPart.split(/\s*,\s*/).map(e => e.trim());
}

/* ============================================================
   3) Parse class names + optional tags
============================================================ */
let parsedClasses = classEntries.map(entry => {
    const optional = entry.match(/\(Optional\)/i) ? " (Optional)" : "";
    const baseClass = entry.replace(/\(Optional\)/i, "").trim();
    return { base: baseClass, optional: optional };
});

/* ============================================================
   4) Build formatted Spell Lists line
============================================================ */
let formattedSpellLists = parsedClasses
    .map(obj => `[[${obj.base} Spells|${obj.base}]]${obj.optional}`)
    .join(", ");

let spellListsOutput = `**Spell Lists**. ${formattedSpellLists}`;

/* ============================================================
   5) Build FRONTMATTER
============================================================ */
tR += `---\n`;
tR += `type: Spell\n`;
tR += `Level: ${level || ""}\n`;
tR += `School: ${school || ""}\n`;
tR += `Class:\n`;
parsedClasses.forEach(obj => tR += `  - ${obj.base}\n`);
tR += `Subclass:\n`;
tR += `Ritual: ${isRitual}\n`;
tR += `Concentration: ${isConcentration}\n`;
tR += `aliases:\n`;
tR += `---`;
%>
### [[<% tp.file.title %>]]

<%*
/* ============================================================
   6) Begin FULL SPELL TEXT PROCESSING
============================================================ */
let text = raw;
// Remove the original spell lists line from the text
text = text.replace(/^Spell Lists\..*$/gim, "");

/* -------------------- 1) Linkify school -------------------- */
text = text.replace(
  /^(\d+(st|nd|rd|th)-level )([a-zA-Z]+)\b/gm,
  `$1[[\$3]]`
);

/* -------------------- 2) Linkify (ritual) -------------------- */
text = text.replace(/\(ritual\)/gi, "([[ritual]])");

/* -------------------- 3) Italicize level line -------------------- */
text = text.replace(/^(\d+(st|nd|rd|th)-level .*?)$/gm, `*$1*`);

/* -------------------- 4) Bold standard labels -------------------- */
const fields = ["Casting Time", "Range", "Components", "Duration"];
fields.forEach(f => {
  const regex = new RegExp(`^${f}:`, "gm");
  text = text.replace(regex, `**${f}**:`);
});

/* -------------------- 5) Linkify Concentration -------------------- */
text = text.replace(/(\*\*Duration\*\*: )Concentration,/i, `$1[[Concentration]],`);

/* -------------------- 6) Bold At Higher Levels -------------------- */
text = text.replace(/^At Higher Levels\./gm, `**At Higher Levels**.`);

/* -------------------- 7) Link + bold ability saves -------------------- */
const abilities = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
abilities.forEach(a => {
  const regex = new RegExp(`\\b(${a}) saving throw\\b`, "gi");
  text = text.replace(regex, (_m, ability) => `**[[${ability}]] saving throw**`);
});
abilities.forEach(a => {
  const regex = new RegExp(`\\b(${a}) saving throws\\b`, "gi");
  text = text.replace(regex, (_m, ability) => `**[[${ability}]] saving throws**`);
});

/* -------------------- 8) Link damage types -------------------- */
const damageTypes = ["acid","bludgeoning","cold","fire","force","lightning",
  "necrotic","piercing","poison","psychic","radiant","slashing","thunder", "hit points"];
const dmgRegex = new RegExp(`(\\d+d\\d+)\\s+(${damageTypes.join("|")})`, "gi");
text = text.replace(dmgRegex, (_m, dice, type) => `**${dice} [[${type}]]**`);

/* -------------------- 9) Link conditions -------------------- */
const conditions = ["blinded","charmed","deafened","frightened","grappled","incapacitated",
"invisible","paralyzed","petrified","poisoned","prone","restrained","stunned","unconscious"];
conditions.forEach(c => {
  const regex = new RegExp(`\\b(${c})\\b`, "gi");
  text = text.replace(regex, (_m, cond) => `[[${cond}]]`);
});

/* -------------------- 10) Link mechanics -------------------- */
const mechanics = ["temporary hit points","bonus action","reaction","action","opportunity attack","difficult terrain","advantage","disadvantage","initiative","heavily obscured","long rest","short rest"];
mechanics.forEach(m => {
  const regex = new RegExp(`\\b(${m})\\b`, "gi");
  text = text.replace(regex, (_m, mech) => `[[${mech}]]`);
});

/* -------------------- 11) Bold dice/distances -------------------- */
text = text.replace(/(?<!\*\*)\b\d+d\d+\b(?!\*\*)/gi, m => `**${m}**`);
text = text.replace(/^(?!\*\*Range\*\*:).*/gm, line =>
  line.replace(/\b\d+\s+(pounds|miles|mile|feet|foot|inch)\b/gi, m => `**${m}**`)
);

/* -------------------- 12) Bold times and creature counts -------------------- */
text = text.replace(/^(?!\*\*Casting Time\*\*:|^\*\*Duration\*\*:).*/gm, line => {
  let newLine = line;
  newLine = newLine.replace(/\b\d+\s+(rounds?|minutes?|hours?)\b/gi, m => `**${m}**`);
  newLine = newLine.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\s+creature(s)?\b/gi, m => `**${m}**`);
  return newLine;
});
/* -------------------- 13) Bold area shapes -------------------- */
text = text.replace(/^(?!\*\*(Range|Casting Time|Duration)\*\*:).*/gm, line =>
  line.replace(
    /\b\d+-foot(?:-radius)?(?:\s+|-)(circle|square|cone|radius|sphere|line|cube)\b/gi,
    m => `**${m}**`
  )
);

/* -------------------- 14) Bold "half" -------------------- */
text = text.replace(/^(?!\*\*(Casting Time|Range|Duration)\*\*:).*/gm, line =>
  line.replace(/\bhalf\b/gi, m => `**${m}**`)
);

/* -------------------- 15) Linkify Ability Checks (plural only) -------------------- */
text = text.replace(/\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s+checks\b/gi,
  (match, ability) => {
    const cap = ability.charAt(0).toUpperCase() + ability.slice(1).toLowerCase();
    return `[[${cap}#Skills|${cap} Checks]]`;
  }
);

/* Add processed spell text */
tR += text.trimEnd() + "\n\n";

/* ============================================================
   7) Output Spell Lists (formatted)
============================================================ */
tR += spellListsOutput;
%>
