# Phase 3 Batch 2 — Party Member metadata audit

**Source of truth:** The latest `Catch Up.zip`, the earlier `Batch2_Party_Worldbuilding_Review.zip` (not yet known to be imported), and the player-reviewed Session 4–6 journals. This package **supersedes** the earlier Party Member worldbuilding patch; do not import both afterward. No changes to files outside the Party Member review.

## Verified

- The eight core Batch 2 Party Members (Diane, Weary, Arthur Morgan, Falatir, Thornwick, Cain, Grayson, Krieg) have `type: Creature`, `subtype: PC`, `campaign: Sands of Desolation`, and `world: Astodan`.
- Party session roster names and linked files exist. No alias paths need renaming.
- The prospective relationships (`Falatir` ↔ `Xerac`; `Falatir` ↔ `The Fox`; `Weary` ↔ `Lunatir` [display name Lunitari]) have correct `person`, `type`, and `certainty` YAML structure. We do not infer unseen or reciprocal ties.
- The available confirmed historical party level is **9 at Session 4**. `startingLevel: 9` is already on Diane, Weary, Cain, Grayson and Krieg; Arthur, Falatir and Thornwick have `level: 9`.
- `level` is the live-character reference displayed by their infobox; in several characters it remains blank in the current vault. Do **not** fill these with historically level-9 values unless a current-sheet level is verified, especially as SOD has continued long after Session 6.
- Preserve later-era metadata such as Arthur's `status: Missing` / `statusAsOf: [[On Death's Door]]` and Falatir's `statusAsOf` when doing historical retrospective notes. Don't leak later findings into session narratives.
- Preserve present null/unknown race, class, location and affiliation values rather than guess them.

## Correction included in this patch

`Cain` and `Krieg` were individually confirmed in Session 4. The Session 5 and 6 rosters explicitly leave their attendance, especially during the missing Gideon battle and cave camp, uncertain. Their previous `statusAsOf: [[A Second Session has Hit the Towers]]` implied a more recent confirmed appearance than the evidence supports. Changed each to `[[We Give a Celestial a Piss Kink]]` and qualified their Sessions 5–6 history appropriately.

`Grayson` remains linked to Session 6: the journal confirms his presence at camp through dialogue.

## Future follow-up, not a blocker

The Party Member infobox displays `level` rather than `startingLevel` (so blank `level` fields currently render blank). When the campaign catches up to live note maintenance, verify current character levels from sheets, and consider displaying `startingLevel` in a separate historical field if desired. No template changes or metadata schema inventions in this pass.

## Next pass

Places: Towers of Icarus, Dwarven Forge, Hallowed Bastion and nearby geography; then Quests/Mysteries, final QC and closeout.
