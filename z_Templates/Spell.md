### [[<%tp.file.title%>]]

<%*
let text = await tp.system.clipboard() || "";

// ------------------------------------------------------------
// 1) Linkify the spell school on the level line
// ------------------------------------------------------------
text = text.replace(
  /^(\d+(st|nd|rd|th)-level )([a-zA-Z]+)\b/gm,
  `$1[[\$3]]`
);

// ------------------------------------------------------------
// 2) Linkify (ritual) if present
// ------------------------------------------------------------
text = text.replace(/\(ritual\)/gi, "([[ritual]])");

// ------------------------------------------------------------
// 3) Italicize entire level line
// ------------------------------------------------------------
text = text.replace(/^(\d+(st|nd|rd|th)-level .*?)$/gm, `*$1*`);

// ------------------------------------------------------------
// 4) Bold the standard labels
// ------------------------------------------------------------
const fields = ["Casting Time", "Range", "Components", "Duration"];
fields.forEach(f => {
  const regex = new RegExp(`^${f}:`, "gm");
  text = text.replace(regex, `**${f}**:`);
});

// ------------------------------------------------------------
// 5) Linkify "Concentration" in Duration
// ------------------------------------------------------------
text = text.replace(/(\*\*Duration\*\*: )Concentration,/i, `$1[[Concentration]],`);

// ------------------------------------------------------------
// 6) Bold "At Higher Levels"
// ------------------------------------------------------------
text = text.replace(/^At Higher Levels\./gm, `**At Higher Levels**.`);

// ------------------------------------------------------------
// 7) Link & bold ability-score saving throws
// ------------------------------------------------------------
const abilities = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
abilities.forEach(a => {
  const regex = new RegExp(`\\b(${a}) saving throw\\b`, "gi");
  text = text.replace(regex, (_match, ability) => `**[[${ability}]] saving throw**`);
});

// ------------------------------------------------------------
// 8) Auto-link damage types
// ------------------------------------------------------------
const damageTypes = ["acid","bludgeoning","cold","fire","force","lightning",
  "necrotic","piercing","poison","psychic","radiant","slashing","thunder"];
const dmgRegex = new RegExp(`(\\d+d\\d+)\\s+(${damageTypes.join("|")})`, "gi");
text = text.replace(dmgRegex, (_match, dice, type) => `**${dice} [[${type}]]**`);

// ------------------------------------------------------------
// 9) Auto-link conditions
// ------------------------------------------------------------
const conditions = ["blinded","charmed","deafened","frightened","grappled","incapacitated",
"invisible","paralyzed","petrified","poisoned","prone","restrained","stunned","unconscious"];
conditions.forEach(c => {
  const regex = new RegExp(`\\b(${c})\\b`, "gi");
  text = text.replace(regex, (_match, condition) => `[[${condition}]]`);
});

// ------------------------------------------------------------
// 10) Link special mechanics/effects
// ------------------------------------------------------------
const mechanics = ["temporary hit points","bonus action","reaction","action"];
mechanics.forEach(m => {
  const regex = new RegExp(`\\b(${m})\\b`, "gi");
  text = text.replace(regex, (_match, mech) => `[[${mech}]]`);
});

// ------------------------------------------------------------
// 11) Bold dice and distances with exceptions
// ------------------------------------------------------------
text = text.replace(/(?<!\*\*)\b\d+d\d+\b(?!\*\*)/gi, match => `**${match}**`);
text = text.replace(/^(?!\*\*Range\*\*:).*/gm, line => line.replace(/\b\d+\s+(feet|foot|inch)\b/gi, match => `**${match}**`));

// ------------------------------------------------------------
// 12) Bold times and creature counts outside Casting Time / Duration lines
// ------------------------------------------------------------
text = text.replace(/^(?!\*\*Casting Time\*\*:|^\*\*Duration\*\*:).*/gm, line => {
  let newLine = line;
  newLine = newLine.replace(/\b\d+\s+(rounds?|minutes?|hours?)\b/gi, match => `**${match}**`);
  newLine = newLine.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\s+creature(s)?\b/gi, match => `**${match}**`);
  return newLine;
});

// ------------------------------------------------------------
// 13) Bold area shapes (cones, spheres, cubes, lines, radii) safely
// Excludes frontmatter lines like Range:, Casting Time:, Duration:
// ------------------------------------------------------------
text = text.replace(/^(?!\*\*(Range|Casting Time|Duration)\*\*:).*/gm, line => {
  return line.replace(/\b\d+-foot(-radius)?\s+(cone|radius|sphere|line|cube)\b/gi, match => `**${match}**`);
});
// ------------------------------------------------------------
// 14) Bold "half" (as in "half damage") safely
// Excludes frontmatter lines
// ------------------------------------------------------------
text = text.replace(/^(?!\*\*(Casting Time|Range|Duration)\*\*:).*/gm, line => {
  return line.replace(/\bhalf\b/gi, match => `**${match}**`);
});


tR += text;
%>

**Spell Lists.** <%*
let classes = tp.frontmatter["Class"];

// Ensure classes is always an array even if the frontmatter only has 1 value
if (!Array.isArray(classes)) {
    classes = [classes];
}

// Map each class to the desired link format
let links = classes.map(c => `[[${c} Spells|${c}]]`);

// Join them with comma + space
tR += links.join(", ");
%>
