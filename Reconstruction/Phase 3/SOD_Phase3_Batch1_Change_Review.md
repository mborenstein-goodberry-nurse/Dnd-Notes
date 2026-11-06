# Sands of Desolation — Phase 3 / Batch 1 Reconstruction Review

> **ARCHIVAL NOTE (added after final review):** This is the **initial Batch 1 reconstruction/import review**, not the final as-built record. Later player review changed quest statuses, NPC metadata, item/creature references, six-mystery coverage, related-quest filters and chronology details. See [[Reconstruction/Phase 3/SOD_Phase3_Batch1_Final_Closeout|Batch 1 Final Closeout]] for the reviewed state and Batch 2 handoff. Original descriptions below remain as an audit of the initial package, not current instructions to reimport it.

**Working scope:** Session 1 (2024-09-21), Session 2 (2024-09-28), Session 2.5 (tentative 2024-09-30), Session 3 (2024-10-05). Prepared from the three archives supplied November 5, 2026.

## Sources actually used

- Historical Obsidian journals: `It Begins....md`, `On Death's Door.md`, `Prison Scheming.md`, `Happy Hunger Games!.md`.
- `Reconstruction/Sources/Old Original Notes - Diane and Weary Quest - Google Docs.pdf`, especially physical PDF pp. **26–30**; those pages run *backward* through sessions and have text that straddles page boundaries.
- B01 `Recording (transcribed on 04-Nov-2026 18-03-37).txt` and `.srt` (~3:41:13): **Session 2**, opening with a firsthand **DM recap of Session 1**. Earlier transcriptions from October 20 and 28 are alternate outputs of the same recording, **not other recordings**.
- B02 `Recording 2 (transcribed on 04-Nov-2026 13-07-59).txt` and `.srt` (~36:57): Session 3, part 1.
- B03 `Recording 3 (transcribed on 04-Nov-2026 13-27-14).txt` and `.srt` (~1:32:31): Session 3, part 2.
- Phase 2 master crosswalk and per-batch evidence ledgers for candidate mapping; Phase 3 Batch 0 review for pre-Session-1 continuity.
- Zach's photographic notes were inventoried but **do not include a Session 1–3 match in the crosswalk**; not used to imply extra evidence.

## Critical chronology decisions

| Session | Evidence level | Decision |
|---|---|---|
| 1 | Historical journal + original PDF + DM recap in Session 2 audio | Reconstruct, clearly label that **no live Session 1 recording** is available. |
| 2 | Live B01 audio + journal + original PDF | Detailed scene reconstruction. Recording cuts off during capture fight; Session 3 recap confirms enslaved outcome. |
| 2.5 | Historical journal + original PDF; no associated audio | Keep sessionNum **2.5**. The PDF's “2.1” was flexible original numbering, not a separate session. |
| 3 | B02/B03 audio + journal + original PDF | The audio reaches the beginning of the arena battle. Susie's defeat and red lich/hydra events are preserved from **written historical notes** only. |

## Date and in-game calendar

- Session 2.5 is dated **2024-09-30** at the player's request based on a **tentative recollection** that it took place two days after Session 2; the 2026 year was incorrect. Do not call September 30 independently confirmed.
- Game-world calendar dates are **not known**. Removed invalid `fc-date: {year: 0, month: 0, day: 0}` values from these four journals rather than assigning invented days; `fc-calendar` and `fc-category` remain. This parallels the Session 0 choice to omit `fc-date` without a known in-game date.

## Important distinctions / things not silently resolved

1. **Rose and Pleasure:** Session 1 letter is signed “Pleasure”; the Session 3 masked woman is called “Rose” by Diane as a provisional nickname. The old PDF explicitly asks *Is she Pleasure?*; the journals and Pleasure's history now preserve that uncertainty. Do not merge the identities as settled.
2. **Billy and Arthur/Damien:** Billy shares familiar eyes/clothing, gives warnings and a lockpick, and may be disguised. Identity is **not** established as fact.
3. **Falatir's loved one and the shadowy figure:** early evidence shows an important pale woman and a mysterious figure; descriptions like “the Fox” are not treated as confirmed identification in the Session 1 log.
4. **Ingrail's current status:** existing NPC metadata reflects the much later campaign. The new historical note section records only his behavior as seen in Sessions 2–3; existing global status and other future facts were not rewritten.
5. **Drax:** helpful in the Session 3 encounter; do not backdate later NPC attitude, affiliations or events into this first appearance.
6. **Arena:** sources for Susie's defeat and the lich/hydra moment are the historic notes, not B03 audio. More details may become available from the opening recap of Session 4, which was intentionally **not** provided in this batch.
7. **No invented treasure:** the notes only mention specific recovered/restored items (Weary's bloodwell vial and a lockpick, Thornwick's belt, Drax's insignia); they do not assume all confiscated belongings were returned.
8. **Session 0 cleanup:** the obsolete `Sands of Desolation - Before Session 1.md` was removed manually by the player, and its incoming links were updated in the earlier cleanup. This package **does not resurrect the deleted file**.

## What is in the import ZIP

- Four reconstructed existing session journals, **preserving original filenames**, Obsidian infobox organization, frontmatter types, campaign/world mapping, and `sessionNum` values.
- Ten existing Astodan people/place notes get **dated Campaign History & Knowledge entries only**, without changing v2 macros or current metadata.
- Three existing quest notes gain historical assignment/developments without changing their current completion statuses or old progression checkboxes.
- Two new unresolved mystery notes track the identity of **Billy** and **Rose** as genuinely unconfirmed, with first-discovery sessions and evidence provenance.
- This report is included as `Reconstruction/Phase 3/SOD_Phase3_Batch1_Change_Review.md` for the long-term historical evidence audit.
- Nothing outside that list was changed; no photographs, PDFs, recordings, ledgers, other sessions, user macros, or Obsidian workspace settings were overwritten.

## Suggested manual import / verification

1. Extract `SOD_Phase3_Batch1_Reconstruction_Overwrite.zip` into the vault root on **SOD-Migration**, allowing the same-named Markdown notes to overwrite. Verify that the archive does not contain the deleted pre-Session-1 reference.
2. Review the SourceTree diff before committing. Expect four session journal rewrites, ten world note history updates, three quest updates, two new mystery notes, and one new Batch 1 review note.
3. Open Sessions 1, 2, 2.5, and 3 in Obsidian; verify the infobox, Session 0 and other prior-session links, and that Session 2.5 still says **09-30-2024**.
4. Spot-check the **Rose/Pleasure** and **Billy/Arthur** uncertainties in their new mystery notes; correct as later in-game evidence becomes available.
5. Keep all original source archives intact; this package is an editable historical reconstruction, not a replacement for evidence.

## Recommended second-pass questions

- Do you remember whether the Rose-masked woman actually introduced herself as Pleasure during Session 3, or was this identification made much later?
- Do you recall the name of Charles's minotaur character? The early transcript clearly identifies him as a minotaur but does not reliably give the character name.
- Should the term **bloodwell vial** be capitalized or linked to an existing item note? The audio identifies the item, but its exact custom properties aren't established.

**Confidence policy:** High = directly spoken in a relevant recording or repeated in multiple early sources; Medium = original notebook only or an audio recap; Tentative = player's retrospective timing, theory, or incomplete name; unverified = no contemporaneous basis.
