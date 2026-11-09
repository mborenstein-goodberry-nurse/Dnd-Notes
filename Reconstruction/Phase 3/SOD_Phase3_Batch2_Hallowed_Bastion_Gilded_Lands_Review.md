# Sands of Desolation — Phase 3 Batch 2 Places review
## Hallowed Bastion and Gilded Lands

**Status:** Proposed for player review, not yet included in a final Batch 2 closeout.  
**Baseline:** `Catch Up.zip` (the latest provided vault snapshot), supplemented by the player-approved reconstructed Session 1–6 journals. This patch does **not** replace or rename `Tower of Icarus.md`, which the user renamed inside Obsidian after that snapshot.

### Hallowed Bastion
- Expanded its previously empty description using the recorded pale stone, purple roofs, burial routes, will-o'-wisps, and underground Blood Games arena.
- Replaced the terse Session 2–3 bullets with a chronological Session 2–4 account including the aftermath of the arena, Falatir's contract with Xerac, and the party's departure at dawn with Grayson, Krieg, and Cain.
- Updated `statusAsOf` from `[[On Death's Door]]` (Session 2) to `[[We Give a Celestial a Piss Kink]]` (Session 4).
- Preserved `status: Active`, `attitude: Unhelpful`, `locationType: Large Town`, and `parentLocation: [[Gilded Lands]]`. The Session 4 description of the site as *crumbling* does not prove its final destruction or that Xerac owns or rules it.

### Gilded Lands
- Replaced the colloquial summary with a concise description of the slaveholding kingdom, class inequality, and prejudice toward tieflings and other nonhuman travelers.
- Expanded the previously empty description using Session 1–2 evidence (Grand Exchange, Ingrail's Estate, borderland countryside).
- Added Session 4's journey through the kingdom's outskirts to the concealed towers and Session 6's travel beyond its border toward Dwarven Forge. No political changes are inferred.
- Updated `statusAsOf` from `[[Happy Hunger Games!]]` (Session 3) to `[[A Second Session has Hit the Towers]]` (Session 6), the latest session in this batch documenting their departure.
- Preserved `status: Active`, `attitude: Unhelpful`, `locationType: Kingdom`, `parentLocation: [[The Grand Eye]]`, and `mapmarker: Region/Nature`. No change to current geopolitical classification is asserted.
- All references to the tower's historical plural name now resolve to `[[Tower of Icarus|Towers of Icarus]]`, consistent with the user's verified Obsidian rename. Its exact location relative to the kingdom border remains unconfirmed.

### Evidence and chronology safeguards
- The hydra's defeat and the lich's involvement are corroborated by the historical Session 3 notes and the DM's Session 4 recap, not fully preserved by Session 3's recording.
- Xerac's claim of being confined in the Bastion for centuries is recorded as his statement, not a verified fact.
- The rose-masked woman offered *conditional* passage; her identity is not assumed.
- Neither the party's crossing of the Gilded Lands border nor Gideon's presumed fate proves a change in either location's political status.
- No new settlement, government, ownership, map coordinate, or cross-campaign spoiler has been invented.
- Original frontmatter was retained except for `summary` and `statusAsOf`; all eight DataviewJS blocks per note and original callouts remain byte-equivalent to the baseline.

### Import guidance
Import these two Markdown files into `Worlds/Astodan/Places/` in `SOD-Migration`, allowing them to replace only the corresponding files. The change-review document is written into `Reconstruction/Phase 3/` for traceability. Do **not** use this patch to overwrite the user-renamed `Tower of Icarus.md` or the reviewed Dwarven Forge note. Before committing, confirm metadata and links inside Obsidian. If Dataview displays stale metadata after import, fully restart Obsidian before debugging the notes.

### Remaining Batch 2 worldbuilding stages
Places: complete upon player approval of these two notes (and previously reviewed Tower of Icarus and Dwarven Forge). Next: Quests and Mysteries, followed by cross-linking, historical QC, consolidated closeout, and commit.
