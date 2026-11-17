# Sands of Desolation — Batch 6 Worldbuilding Patch and Review

**Checkpoint:** as of Session 17. Session 18 remains an undocumented gap; do not infer events from it.

**Source:** Batch 6 Initial.zip provided by the user, plus the agreed reviewed Sessions 15.5, 16, and 17 reconstructions and user corrections through 2026-11-16. All history entries added here advance chronologically. Existing DataviewJS/Meta-Bind code is preserved unchanged in modified notes.

**Import instructions:** Extract the ZIP into the **SOD-Migration** vault root (after reviewing diffs). If a target has changed since the Batch 6 Initial.zip snapshot, merge its sections instead of overwriting manual edits. The file paths below are vault-relative. Do not apply to Production directly. Historical IDs and dates on preexisting notes were not reset.

**Soren / Arthur warning:** The included Arthur file is drawn from the approved Session 17 reviewed patch, because it contains the agreed alias corrections; do not overwrite later manual changes to Arthur. The new Soren biography is reproduced unchanged from the reviewed Session 17 package. If you already imported those two files and have not modified them, they can be skipped.

**Session 18 rename:** The user intends to rename the journal to `The Lost Session.md` inside Obsidian. This patch intentionally does **not** perform that rename; let Obsidian update any incoming links. `sessionNum: 18` and the documented-gap content remain intact.

**Optional journal changes:** A separate `SOD_Batch6_Optional_Journal_Corrections.zip` contains narrow revisions of Sessions 15.5 and 16 to align the public chronicle with the later player confirmations (Weary personally witnessed Warrick’s ritual but kept quiet; Pleasure physically delivered Diane’s note). These are **not** inside their live vault paths in the main patch and should be compared manually, especially if the user edited either journal after import.

## Confirmations and source boundaries

- **Pleasure** physically delivered Diane’s written note. She is the most plausible author, **but authorship is not confirmed**. Her note and the later direct warning are separate events.
- **Anuberath, Skeletor, and Asriel** are known only through OOC DM/player hints for this checkpoint. Anuberath’s possible role in the warning is an **unverified theory**, recorded only in collapsed provenance in the warning mystery and Diane note.
- **Foo Fighters** pre-session worldbuilding: orc-claimed empire/kingdom; former internal conflict; united under green banner; minimal centralized law; rumored overarching chieftain; reportedly wars with neighbors roughly every three years. The Outskirts clan’s leader Kenneth is **not** identified as this alleged overarching leader.
- **Graves apparatus**: recognizable life support, extra functions and reason unknown, Graves never confirmed it verbally.
- **Warrick**: Weary personally witnessed the ritual and deliberately concealed that knowledge from Graves. Whose soul Graves described remains unknown.
- **Noisy Owlbear**: actual death in Session 16. **Grayson**: return by approximately Session 16, exact sequence unverified. **Jonks**: party member, kobold necromancy wizard, level 9 only provisional.
- **Soren’s responsibility** for the Outskirts massacre remains OOC only. An in-character mystery must remain open.
- **Iron Shadows**, **Guild of Legends**, and **Outskirts clan** do not get new Organization notes yet. No claim that the guild belongs among Graves’s five guilds.

## Included patch files

- **UPDATE** — `Campaigns/Sands of Desolation/The Party/Jonks.md`
- **UPDATE** — `Campaigns/Sands of Desolation/The Party/Noisy Owlbear.md`
- **UPDATE** — `Campaigns/Sands of Desolation/The Party/Grayson.md`
- **UPDATE** — `Campaigns/Sands of Desolation/The Party/Diane.md`
- **UPDATE** — `Campaigns/Sands of Desolation/The Party/Weary.md`
- **UPDATE** — `Campaigns/Sands of Desolation/The Party/Arthur Morgan.md`
- **NEW** — `Campaigns/Sands of Desolation/Other/Soren.md`
- **UPDATE** — `Worlds/Astodan/People/Graves Hellborne.md`
- **UPDATE** — `Worlds/Astodan/People/Pleasure.md`
- **UPDATE** — `Worlds/Astodan/People/Warrick.md`
- **UPDATE** — `Worlds/Astodan/People/The Fox.md`
- **NEW** — `Worlds/Astodan/People/Kenneth Stormjaw.md`
- **UPDATE** — `Worlds/Astodan/Places/New Phyrexia.md`
- **UPDATE** — `Worlds/Astodan/Places/The Wastes.md`
- **UPDATE** — `Worlds/Astodan/Places/Foo Fighters.md`
- **UPDATE** — `Campaigns/Sands of Desolation/Mysteries/The Necrotic Spires.md`
- **UPDATE** — `Campaigns/Sands of Desolation/Mysteries/The Fox's Token.md`
- **NEW** — `Campaigns/Sands of Desolation/Mysteries/Graves's Concealed Apparatus.md`
- **NEW** — `Campaigns/Sands of Desolation/Mysteries/Who Devastated the Outskirts Settlement.md`
- **NEW** — `Campaigns/Sands of Desolation/Mysteries/Who Is Pursuing Jonks.md`
- **NEW** — `Campaigns/Sands of Desolation/Mysteries/Who Sent Diane the Sun Home Note.md`
- **NEW** — `Campaigns/Sands of Desolation/Mysteries/Who Warned Diane at the Foo Fighter Border.md`

## Deliberately deferred

- New formal Organization notes for Iron Shadows, Guild of Legends, Outskirts clan
- Identity/statblock of massive skeletal pursuer; cause of storm/border protection
- True author/magic of Diane’s first note, identity of Anuberath as sender, connection between two messages
- Identity of Jonks’s necromancer pursuer and his former master; success of corpse reanimation
- Formal NPC biography for Creed, unknown terms of Grayson’s freedom, and definitive Ring of Mind Shielding disposal
- Level-up chronology, future sessions, unreconstructed current-campaign notes, and global framework templates

## Post-import checks

1. Open **Jonks**, **Noisy Owlbear**, **Grayson**, **Pleasure**, **Kenneth Stormjaw**, and **Foo Fighters**; confirm metadata/UI displays without broken selectors.
2. Open the **Campaign** Party table and verify `Active`/`Dead` statuses and sort; Grayson should return to Active, Owlbear to Dead, Jonks to Active.
3. Open each new mystery and verify the associated People/Places and firstSeen/lastSeen references. The two Diane mysteries must stay distinct.
4. Verify Soren remains a supplemental `Other` biography and that Arthur still provides the one shared-body roster anchor.
5. Rename Session 18 within Obsidian, and merge optional journal corrections only after comparing against live text.
6. If Dataview or Meta-Bind indexes appear stale, first reload the note; if still inconsistent, **fully close and reopen Obsidian** before changing any scripts or metadata.
