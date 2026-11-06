# Sands of Desolation — Phase 3 / Batch 2 Initial Reconstruction Review

> **DRAFT FOR PLAYER REVIEW — NOT A FINAL CLOSEOUT.** Prepared from the supplied current vault, reconstruction archive, original Google Docs PDF, B04–B10 TXT/SRT and the Guide. Import on `SOD-Migration` only after reviewing the decisions below. This ZIP contains only intended additions/overwrites, not the full source vault.

## Files and coverage

- Three reconstructed journals: Sessions 4, 5, 6. All existing filenames are preserved; Session 4 includes the first player-review revisions.
- Character/NPC updates: Grayson, Xerac, Gideon, The Fox, and the note currently called `Lunatir`; new party pages for **Cain** and **Krieg**. Added `startingLevel: 9` to the new companion notes.
- Places updated: Towers of Icarus and Dwarven Forge. A campaign-neutral Glabrezu Bestiary rules/statblock entry is included.
- Quest advances: Escape from Ingrail **Completed**; Towers relic mission still **Active pending report/verification**; Caldera mission remains **Active**.
- Mysteries: Falatir's Search enriched; new mysteries **The Hemisphere of Gideon** and **The Golden Eye of Icarus**. All six pre-existing mysteries are preserved; only Falatir's Search is edited here. Their existing statuses remain unchanged.

## Original source hierarchy

1. B04 DM recap of the end of the Session 3 arena; B04 live dialogue through the first half of the lich bargaining.
2. B06 continued lich contract and introductions, departure, veil dispelling, wild-surge Glabrezu combat beginning.
3. B07 approach, first Radiant Idol investigation, urination incident, and first combat round.
4. B08 defeat/aftermath of first idol, second idol and eye, entrance to Gideon's chamber. **Boundary between Sessions 4 and 5 is unproven**; narrative bridge assigned provisionally to Session 5.
5. Historical Session 5 original journal + Google Doc for Gideon's introduction, AC/magic resistance, and combat initiation. **No complete Gideon battle is on the supplied recordings.**
6. B09 after Gideon, hemisphere, rebuilding towers, aerial escape and cave camp.
7. B10 Fox, token, Arthur's confidences, Diane's vision, Weary's Lunitari vision, entry into Dwarven Forge territory.
8. B05 is short OOC talk; do not count as a separate substantive session. Google Docs PDF: Session 6 pp. 23–24, Session 5 pp. 24–25 and Session 4 pp. 25–26 (document is reverse chronological).

## Important historical corrections

- **Urination incident:** B07 records Arthur and Cain urinating on/around the pedestal and invisible idol, while Diane physically restrains Weary from joining. The original journal's statement that *Weary peed on the idol* should not become fact.
- **Falatir:** B04/B06 show him signing the lich's after-death soul-service contract and obtaining a second card via shard fusion. Talk about his dead wife and reunion goals was in mixed OOC dialogue and should not be retroactively inserted as public in-character knowledge. The Fox's follow-up is private to Falatir.
- **Lich naming:** B06 speech recognizer produces `Severac`; older written source gives `Sevrath`. Batch 1 establishes **Xerac** as the intended character. Do not create a second lich from this mismatch. The speech is not crystal clear; review with the player if needed.
- **Other names:** `Krieg` is clearly spelled by players in B06, rather than `Kreig`. B10's DM explicitly spells **Lunitari** aloud (L-U-N-I-T-A-R-I), while the current vault filename is `Lunatir.md`; this patch deliberately preserves the filename/links but adds aliases and uses correct visible spelling.
- **Gideon:** The historical Session 6 journal credits Thornwick with removing the hemisphere. No recording captures that exact attack. Gideon's `Dead` status is retained from the historical note, qualified by that source.
- **Radiant Idols:** Two prisoners appear in sequence, with the first fought. The surviving second idol works on stabilizing/rebuilding the central tower; it does not attack during B09. There are no dedicated creature entries in the Guide supplied.
- **Arthur/Thornwick:** The secret that Arthur is disguising himself was given privately to Thornwick at camp, not to Diane and the wider party. Do not insert his eventual true identity.
- **Diane:** A traumatic vision of her childhood village destruction includes her mother's death and father's rescue. This is a recalled/vision scene, not another external attack at camp.
- **Lunitari:** Weary's neutral surge attracts a **neutral patron's influence**; it is not proof he worshipped this goddess before Session 6. His scene was private, not shared party exposition.
- **Towers:** From three separate spires to one stable central spire; vegetation starts recovering but the original audio says that full recovery will be slow.

## Session 4 player-review updates (2026-11-06)

- **Player confirmation:** Everyone in the Session 4 party was **level 9**. This was remembered retrospectively, not stated in the audio. Session 4 journal now records the party level. Newly introduced Cain, Krieg and Grayson have `startingLevel: 9`; `level` stays null, because that field can represent the latest/current character sheet, not solely historical Session 4 level. Diane and Weary already have `startingLevel: 9`, while Falatir, Arthur and Thornwick already have `level: 9` in the provided snapshot.
- **Spell links:** Verified existing notes in the supplied Guide and linked **Dispel Magic**, **Faerie Fire**, and **Lesser Restoration** in Session 4.
- **Diva/deva wording:** The recording transcribes both homophonic forms. Player suspects **"diva"** was intended; the journal now quotes it as informal speech without asserting that the figure was a D&D deva. Actual revealed name: **Radiant Idol**.
- **Glabrezu:** Added a campaign-neutral Glabrezu mechanics note under `The Wanderer's Guide to the Multiverse/Bestiary/Glabrezu.md`, with a 2014 SRD 5.1 inline Fantasy Statblocks entry. Session 4 keeps only its link and encounter description.
- **Cain:** Player recalls that Cain's player attended infrequently later; this does not alter Cain's documented Session 4 participation or assert a later departure date.
- **Session 4 journal:** Approved in principle by player, with the above targeted corrections. Session 5 and Session 6 were subsequently approved with targeted updates.

## Decisions needing player review

1. Confirm the intended **Session 4 vs 5 boundary** for B08; the historic S5 journal begins after the first idol incident, while B08 begins just after the idol is killed.
2. **Late Session 3 addendum:** B04 DM recap **explicitly says the party fought Susie, a manticore, and a chimera** and a hydra was immediately killed by Xerac. OOC party discussion also says **Charles's minotaur died in that fight**, and dialogue implies Ingrail had been killed. These are retrospective evidence, not surviving Session 3 audio; decide whether to add this confirmed recap and OOC death note to Session 3. This patch leaves Session 3 untouched.
3. Does the party consider the **Towers relic mission completed upon retrieval**, or only upon delivering/reporting it to Queen Isabel? The draft conservatively leaves it Active after artifact recovery.
4. Approve the **Lunatir → Lunitari Obsidian rename** later; no physical rename is included in this ZIP.
5. Confirm whether Cain and Krieg should remain dedicated **Party Member** pages. Their given roles are directly from B06, but precise classes and some names/visual details are not verified.
6. Consider whether the hemisphere and golden eye merit permanent **Mystery** records, or whether either should remain only journal questions.

## Safety and import

Extract ZIP to the **vault root** on `SOD-Migration`, after checking SourceTree is clean. This overwrites 3 session journals, selected entity/quest/metadata pages and adds new party/mystery notes; it does **not** touch original recordings, Phase 2 ledgers, handwritten photographs, the Google Docs PDF, or unrelated sessions. Compare the file list first and review in Obsidian before committing.

If a Dataview view seems wrong despite correct frontmatter, **fully restart Obsidian first** before changing queries or metadata. This has been a recurring cache issue, not a need to rewrite properly formed notes. Once reviewed, produce a Batch 2 final closeout and update the reconstruction status tracker.

## Session 5 player-review updates (2026-11-06)

- **Creature link:** Added a Radiant Idol rules/statblock note based on *Eberron: Rising from the Last War* (2019), p. 308; linked the creature in Sessions 4, 5, and 6. The Guide note contains no Astodan or Sands of Desolation history.
- **Spell link:** Linked *Mage Hand* in Session 5 to the existing Guide note.
- **Thornwick's recovery:** Player directly confirms that Thornwick passed a **Strength check** to tear the hemisphere from Gideon's chest in the final stretch of the Session 5 fight. The original Session 6 journal names Thornwick and inspiration; the supplied B08-B09 recordings omit the actual battle. Session 5 now documents the confirmed action, while Session 6 keeps the aftermath. Gideon's precise state immediately after extraction remains unknown from the missing audio.
- **Eye/Gideon hypothesis:** The player suspects the moving golden eye belonged to / was operated by Gideon. That is plausible from its position and behavior but **not explicitly confirmed**. Logged as a new separate `Player Knowledge & Theories` note, referenced from the existing mystery. Mystery remains Unresolved; no assertion of in-world knowledge.
- **Review status:** Session 5 was approved by the player, with the targeted corrections incorporated.

## Session 6 player-review updates (2026-11-06)

- **Spell links:** Linked the two previously unlinked spell mentions, *Vortex Warp* and *Polymorph*, to their existing Guide entries. *Nystul's Magic Aura* and *Mordenkainen's Private Sanctum* were already linked and verified.
- **Lunitari spelling:** The player acknowledged the DM's B10 spelling **Lunitari**, noting that they had previously called her *Lunatir* for many sessions. For safe import, the physical world note filename remains `Lunatir.md`, while the note's visible heading and session journal display **Lunitari**. Rename inside Obsidian with automatic link updates when ready, rather than moving it blindly via ZIP.
- **Review status:** Session 6 approved by player, with only spell-link improvements requested. Sessions 4-6 have now had their first player-review pass; Batch 2 closeout and the outstanding source-boundary/quest decisions remain separate.

## Guide / Campaign Separation (player clarification, November 6, 2026)

- **Guide scope:** `The Wanderer's Guide to the Multiverse` is a **campaign-neutral mechanics reference**, not a repository for encounter lore or Astodan historical details.
- **Glabrezu:** Replaced the earlier campaign-lore placeholder with 2014 D&D 5e SRD 5.1 mechanics, with an inline Fantasy Statblocks-compatible statblock.
- **Radiant Idol:** Replaced the campaign-lore placeholder with a concise paraphrased mechanical entry and inline Fantasy Statblocks-compatible statblock from *Eberron: Rising from the Last War* (2019), p. 308. This creature is not in SRD 5.1.
- Session journals and any appropriate Astodan world notes retain campaign-specific facts; the creature references in Sessions 4–6 continue pointing to the two Guide files.
- No other Batch 2 entries were changed in this correction.
