# Batch 9 — Luz/Wonder Canonical Identity & Attitude Correction

**Apply after** the main Batch 9 Worldbuilding Review Patch. This focused ZIP overwrites only the three files below; it does not change session journals, templates, or the People Viewer.

## Changes

- `Worlds/Astodan/People/Wonder.md` — `attitude: Mixed`; retains `status: Alive` as of Session 27. Removes obsolete pending-conversion language and makes Wonder explicitly the sole canonical NPC.
- `Worlds/Astodan/People/Luz.md` — converted from a duplicate Creature/NPC record to a non-roster `Reference` / `Historical Alias` note. Removes independent status, attitude, relationships, NPC infobox, and NPC-only Dataview queries. Preserves the existing path, early appearance description, historical journal links, mystery link, and chronological knowledge boundaries. Points clearly to Wonder for current information.
- `Campaigns/Sands of Desolation/Mysteries/Who Is Luz.md` — removes Luz from the `people` metadata array (Wonder already remains listed) and adds a link to the historical reference under Related Notes. The mystery stays Partially Answered because the separation and reunification mechanisms are not explained.

## Rationale

The campaign People Viewer only includes notes with `type: Creature` and `subtype: NPC`. Luz no longer meets these conditions, so Wonder appears once in the NPC roster while old `[[Luz]]` / full-path historical links still open the preserved alias note.

**No new NPC status options** and **no new Dataview or template logic** are required.

## Evidence / chronology safeguards

Through Session 24, the party did not know Luz was Wonder. Identity was established in Session 27 when the luminous soul merged with Wonder's body. The alias note retains those distinct information checkpoints; the mystery remains partially unanswered.

## Validation

Both source frontmatters and the modified mystery frontmatter parsed as YAML, the canonical and alias note targets resolve in the included vault snapshot, and the People Viewer type filter excludes the reference note.
