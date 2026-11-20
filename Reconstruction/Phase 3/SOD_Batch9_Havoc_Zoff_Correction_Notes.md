# Sands of Desolation — Batch 9 NPC Metadata Correction

Small, overwrite-safe follow-up to the **Batch 9 Worldbuilding Review Patch**. Import the main worldbuilding patch first, then overwrite the two files in this ZIP.

## Changes

- **Havoc:** `location` is now `[[Worlds/Astodan/Places/Luciferian Caldera|Luciferian Caldera]]`, reflecting his last documented direct appearance outside the company’s Caldera camp during Session 27. No new claims about his present whereabouts or intentions.
- **Zoff:** `attitude` changed from `Unknown` to `Friendly` based on player recollection. His counterfeit sale remains documented; attitude is not an endorsement of trustworthiness.

## Already correct in the main worldbuilding patch

- **Cinderfang:** `status: Dead` with `statusAsOf` Session 25 (first verified discovery of the prior death).
- **Wonder:** `status: Alive` as of Session 27.
- **Luz:** currently also `status: Alive`, and still `type: Creature`, `subtype: NPC` in the proposed main patch. That makes an unwanted duplicate in the People Viewer. No change to Luz is included here, pending a separate identity-model decision.

## Recommended subsequent alias treatment (not applied here)

Preserve the `Luz.md` file and historical journal links, but convert it to a **historical identity / reference** note pointing to canonical `Wonder.md`, rather than introducing NPC status `Other`. The campaign People Viewer currently filters to `type: Creature` + `subtype: NPC`; a non-NPC alias type would avoid a duplicate roster entry. The alias note should clearly identify Wonder as the canonical person, remove its independent live NPC status field and interactive NPC infobox, and retain the chronological history of the Luz identity. This conversion should be reviewed separately.

## Validation

Both revised Markdown files have valid YAML frontmatter. Exactly one metadata field changed in each file; all historical narratives, relationships and links are unchanged.
