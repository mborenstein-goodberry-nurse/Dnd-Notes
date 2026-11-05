# Sands of Desolation — Phase 3 / Batch 0 (v5) Change Review

## What to import

**Use only `SOD_Phase3_Batch0_Foundations_Patch_v5.zip`** if you have not imported v1–v4. This ZIP is a **complete, consolidated replacement for v4**, not a delta. Extract to the vault root while on `SOD-Migration`, and inspect SourceTree before committing.

The original 47-page Google Docs PDF remains in the player's own `Reconstruction` folder and is **not duplicated** in this patch. Obsidian links refer to its exact uploaded filename, `Old Original Notes - Diane and Weary Quest - Google Docs.pdf`; check the link if you renamed the file upon importing.

## Scope and chronology

- Adds only pre-Session-1 lore, recovered pre-session worldbuilding, and **starting** character levels. Does **not** import spoilers or resolutions found in the original PDF's Sessions 1–27 sections.
- Historical designs/hobbies in the PDF are **undated** within the compiled Google Doc; they are recorded as original character references, not proven features at a particular session.
- The player's recollection that [[Aceso Aid]] was received **after the marriage** is tentative; no exact gift date or giver is invented.
- **Original PDF source:** Diane appearance and hobbies pp. 5–6; Weary appearance and hobbies pp. 7–8; Aceso Aid p. 9; starting levels pp. 3–4; personal records pp. 38–39; kingdoms pp. 40–43; pre-session DM worldbuilding pp. 46–47.
- Existing Session 1–90 journals, recording ledgers, character artwork, the original Google Docs PDF, and the reconstruction evidence index are **not modified**.
- The old Google Doc includes an apparent copy-paste error describing Divari as Weary's father despite calling her Ernon's wife; the note explicitly flags this ambiguity.
- Retrospective recollection names Wonder as Warrick's wife while an older POI entry is less certain; the provenance discrepancy is retained.
- Weary's childhood magical buildup remains **narrative backstory**, not a rule implied by *DC Wild Magic Bundle*.
- **Current character levels remain `null`** in the PC frontmatter; `startingLevel: 9` is added to preserve history without asserting current Session 90 levels. Weary's level-6 Bend Magic was within his starting class range, assuming this homebrew was in use.
- The campaign-specific homebrew [[Wild Magic - Revised]] remains in the campaign's Other folder; the copyrighted 300-effect surge table has **not** been copied into the patch.

## Changes from v3

### New notes (4)

1. `Campaigns/Sands of Desolation/Other/Aceso Aid.md` — New `type: Vehicle` note matching the v2 vehicle category, with cottage-on-wheels description, Dawn and Dusk, and clearly tentative dating.
2. `Worlds/Astodan/People/Ernon Quest.md` — Weary's father, metalworking family, missing at the opening.
3. `Worlds/Astodan/People/Divari Quest.md` — Weary's mother per family context, with source labeling discrepancy preserved.
4. `Worlds/Astodan/Places/Meridian.md` — Diane's hometown and Gavin's residence within Sirvanna; sub-kingdom and dragon-attack location left unconfirmed.

### Enriched existing v3 notes

- `The Party/Diane.md`: starting level 9, sourced appearance/gear, hobbies, Meridian and cart background, period-limited personality details.
- `The Party/Weary.md`: starting level 9, parental links, historic character visual design, pendant, hobbies, caravan.
- `Diane - Character Reference.md` and `Weary - Character Reference.md`: beginning levels and wagon links; Weary's 6th-level homebrew ability applicability clarified.
- `Session Journal/Session 0.md`: source labels, opening levels, parent's names, cart and horses, stronger evidence for Resurgence profitability.
- `People/Gavin Aceso.md`: Knight of Justice, human appearance, Meridian residence, relationship to Weary.
- `People/Warrick.md`: blue tiefling/warlock details from original POI and visible-scar contradiction flagged.
- `People/Wonder.md`: Celestial Warlock and historical uncertainty around relationship description.
- `Places/Sirvanna.md`, `Places/Sun Home.md`, `Places/Resurgence.md`: pre-session political-religious context; original spelling variants retained.
- `Places/Griffin Empire.md`, `Places/Tangambalanga.md`: Queen Isabel, original worldbuilding, family links.
- `Mysteries/The Disappearance of Weary's Family.md`: family names, still **Unresolved** at campaign start.
- `Sands of Desolation.md`: updated overview links for the couple's cart and starting-level evidence.

### Unchanged since v3

- `Other/Wild Magic - Revised.md`, `Other/Havoc's Sword.md`, `People/Havoc.md`, `Mysteries/What Became of Havoc.md`, and `Mysteries/The Necrotic Spires.md`.
- Existing world and campaign assets; all historical session journals and recordings.

## Suggested SourceTree check

Expect **4 new notes** beyond v3 and targeted edits to existing v3 notes; this ZIP also includes all v3 changes. Confirm that the v2 PC frontmatter and original DataviewJS blocks remain intact. The import is additive relative to the original vault; many files that were "existing v3" will appear as **new** in SourceTree if you have not imported any previous patch.

## Later work, not in Batch 0

Process the original Google Docs Session 1–27 notes against the recording ledger and existing historical journal entries **chronologically**. Preserve uncertainty about timing and nomenclature rather than rewriting later discoveries as though they were known on day one.

## Changes from v4: establishing Session 0

- Confirmed that the provided vault has **no** `Session 0` journal for Sands of Desolation.
- **Replaces (not duplicates)** the proposed `Sands of Desolation - Before Session 1.md` with `Campaigns/Sands of Desolation/Session Journal/Session 0.md`.
- The new note has `type: Session Journal`, `sessionNum: 0`, campaign/world metadata, `fc-calendar`, `fc-category`, the v2 Session 0-style infobox, and the pre-campaign chronicle under `## Log`.
- Sets `date: null`, `gameDate: Not recorded`, and omits `fc-date`: **no actual Session 0 meeting or in-game date is evidenced**. The 2024-09-21 date belongs to Session 1.
- Preserves the narrative, original source attribution, mystery links, starting-level snapshot, and a spoiler-conscious transition to Session 1.
- Adjusts cross-links in the other Batch 0 notes and campaign overview to target a **fully qualified Session 0 link** (avoids collisions with Session 0 notes in other campaigns).
- No pre-existing session journal, template, macro, or Phase 2 evidence was changed. Existing highest-positive-`sessionNum` counting continues to exclude this Session 0.
- Folder used is the `Campaigns/Sands of Desolation/Session Journal/` folder present in the supplied vault. If you have moved all journals into `Notes` since exporting that ZIP, relocate `Session 0.md` into the same folder as your other journals in the current branch; Obsidian should update internal links upon moving it from inside Obsidian.

**Import:** Since no earlier patch was applied, extract only v5. The superseded `Sands of Desolation - Before Session 1.md` is **not included** in v5.
