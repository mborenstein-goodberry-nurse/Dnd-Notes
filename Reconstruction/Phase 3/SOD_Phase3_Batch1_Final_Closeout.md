# Sands of Desolation - Phase 3 / Batch 1 Final Closeout

> **Status:** Historical content reviewed through the end of Session 3 (including Session 0 and interlude 2.5). **Ready for commit on `SOD-Migration`** following the player's final SourceTree check; this note does **not** assert that a commit or merge to Production has already happened. Review completed November 5, 2026.
>
> **Read this for the final state.** [[Reconstruction/Phase 3/SOD_Phase3_Batch1_Change_Review|Batch 1 Change Review]] documents the **initial reconstruction package**, not the numerous subsequent review corrections. This closeout supersedes its proposed metadata and unresolved initial-review questions where they differ.

## Reconstructed timeline and source boundaries

| Journal | Working real-world date | Principal evidence | Key caveat |
|---|---|---|---|
| [[Campaigns/Sands of Desolation/Session Journal/Session 0|Session 0]] | No event date established | Original pre-campaign notes, character references, player clarifications | Historical starting context, not proof of a live Session 0 meeting |
| [[Campaigns/Sands of Desolation/Session Journal/It Begins....|Session 1]] | 2024-09-21 | Original journal, Google Docs, **DM recap at the beginning of B01** | No confirmed live Session 1 audio |
| [[Campaigns/Sands of Desolation/Session Journal/On Death's Door|Session 2]] | 2024-09-28 | B01 TXT/SRT plus written sources | Recording ends before all capture events; player's recollection clarifies Diane's surrender |
| [[Campaigns/Sands of Desolation/Session Journal/Prison Scheming|Session 2.5]] | **2024-09-30, tentative** | Historical journal, original Google Docs, player recollection | Google Docs labels the flexible interlude '2.1'; old vault's **2026-09-30** was erroneous; no independent recording confirmed |
| [[Campaigns/Sands of Desolation/Session Journal/Happy Hunger Games!|Session 3]] | 2024-10-05 | B02 and B03 TXT/SRT plus written sources | Audio ends before all arena events described in original journal; revisit against B04 Session 4 recap |

**Recording mapping:** B01 = Session 2 (with Session 1 recap); B02 + B03 = Session 3. Session 1 and Session 2.5 have no independently identified live recording. B01 November 4, 2026 transcription is the primary text; October 20/28 transcriptions are alternate interpretations of the *same* recording. The B batch's original ordinal identifiers remain unchanged.

**Other preserved sources:** [[Reconstruction/Phase 2/SOD_Phase_2_Master_Session_Evidence_Crosswalk|Phase 2 Master Crosswalk]], [[Reconstruction/Phase 2/SOD_Phase_2_Batch_B_Recording_Evidence_Ledger|Batch B Recording Ledger]], [[Reconstruction/Phase 2/SOD_Phase_2_Zach_Notes_Evidence_Index|Zach Notes Evidence Index]], and the original Google Docs PDF in `Reconstruction/Sources`. The Phase 2 documents are historical evidence snapshots. Their old **2026** Session 2.5 date describes an earlier *unfixed* journal state and is superseded by the tentative correction above; do not alter the original source or pretend this date was independently verified.

## Important decisions reached during review

- **Diane's surrender:** After the others fell, Diane negotiated an agreement that they would live if she surrendered; Duke Ingrail accepted. Player recollection supports this nuance beyond the recorded fight's endpoint.
- **Drax:** The Session 3 encounter presented him as a helpful red dragonborn called Drax the Founder. His later dragon identity and the Mechanical Wonders connection were *not* known then. The dragon-pierced-by-a-sword insignia was intended, by tentative player recollection, to help Diane find him again. The **Dwarven Forge is a place he said he could be found**, not confirmed `home`.
- **Xerac:** His name was known in Session 3; 'Lich Diddy' is a joking OOC nickname. The old 'Sevrath' in legacy worldbuilding is **probably a transcription/note-taking mistake**, not evidence of a second lich. His control of the Hallowed Bastion is a later-revealed relationship and must not be inserted as known during Session 3.
- **Rose and Pleasure:** Keep separate as known identities at this checkpoint. The proposed connection is an unresolved question, not a fact.
- **Billy:** His identity remains unresolved. Do not use the later Arthur/Damien information to disclose it. The character known to the early party is **Arthur Morgan**; link display name **Arthur**, even where the note retains archival aliases for later links.
- **Falatir:** At this point the party knows only of his search for an important pale, white-haired woman and a mysterious shadowy figure. His wife's soul fragments and resurrection goal are **retrospective player knowledge**, not established public Session 1 disclosure; keep in OOC provenance until the timeline supports disclosure.
- **Queen Isabel/Biara:** Session 1 quest assignment was by Queen Isabel as understood then. Later impersonation or leadership revelations were not known at the opening; the timing of the substitution has not been established.
- **Weary's family:** Disappearance remains unresolved in the starting-era story; do not apply its much later answer retrospectively.
- **Session knowledge:** Frontmatter `status`, `attitude`, `statusAsOf`, `location`, and analogous Place/Quest metadata represent the latest *reconstructed* checkpoint, not the original archive's much later state. Preserve later facts only with a clear chronological distinction or OOC/provenance section.

## Content and system at the Session 3 checkpoint

- **Session journals:** Session 0, 1, 2, 2.5, and 3 reviewed. The obsolete `Sands of Desolation - Before Session 1.md` was deleted and incoming links redirected to Session 0.
- **People and Places:** Rose (Masked Woman), Joey, and Ingrail's Estate gained separate notes. Known `home`, `origin`, `location`, `affiliations`, `relationships`, `parentLocation`, and attitudes were checked; unverified fields remain unasserted. The world is **Astodan**; **Astofen** is the elven kingdom; **The Grand Eye** is a continent. Do not confuse Astodan with the legacy map name/spelling 'Astrodan'.
- **Guide:** Added significant encounter references for Basilisk, Manticore, and Chimera and magic-item references for Astral Shard and Amulet of the Devout (+2). Existing spell references, including Mordenkainen's Private Sanctum, are linked when present. Susie the Desecrator lacks a verified custom stat block; no mechanics have been invented. Hydra reference may still need a Guide check.
- **Quests:** **3 Active** (the two Queen Isabel relic investigations and Escape from Ingrail); **1 Completed** (Setup Quest); **9 Undiscovered** (later quests retained but hidden). Escape from Ingrail is the current Main Quest. Quest numbers and priority gaps are intentionally unchanged. The pre-migration states of future quests are retained in `reconstructionOriginalStatus`. **Do not use the Active/Completed Meta Bind toggle while a quest is Undiscovered.**
- **Mysteries:** **6 Unresolved**: Weary's missing family, the Necrotic Spires, Havoc's fate, Billy's identity, Rose's identity, and Falatir's search. Their Dataview sections now show journal references, status-filtered related quests, and associated People/Places; they do not assert that every reference is a novel discovery. No free-standing retroactive Theory notes were invented.
- **Reverse links:** Related Quests queries in reviewed campaign and Astodan notes were updated to exclude `Undiscovered` quests. Corresponding **shared templates** should receive the same filter separately through the `Developments` branch before subsequent new notes are created.
- **Presentation:** Use `[[folder/path/Note|Readable Name]]` for path-qualified wikilinks. Keep OOC reconstruction provenance in collapsible sections, and retain source ledgers/provenance after eventual Production integration.

## Final quality control and known limits

The final validation used `Quality Check.zip` plus the supplied Guide and other assets, then produced the importable `SOD_Batch1_Final_QC_Combined_Manual_Overwrite.zip`. YAML, affected DataviewJS syntax, relevant early-session/mystery wikilinks, and ZIP integrity were checked. The player visually confirmed the Rose mystery's **People (5) / Places (2)** after restarting Obsidian. Initial quest-status and related-mystery display mismatches were stale Obsidian/Dataview metadata; **restart Obsidian before changing correct source notes** if this recurs.

Final touchups include Session 3's Dwarven Forge wording, current-checkpoint summaries for Arthur/Falatir/Drax, the Astodan spelling in The Grand Eye metadata, and `Undiscovered` filtering in 80 Related Quests views. The final patch was prepared and the player reported the reviewed notes looked good while beginning the commit. Verify the actual Git commit in SourceTree locally; this archive cannot establish that it completed.

**Nonblocking follow-ups:** Existing later-session archive links and metadata have not been broadly rewritten; handle when each later batch is reconstructed. Keep the original recordings, PDF, Zach photos, evidence indexes, and crosswalks unchanged. Temporary imports, diagnostic notes, and intermediate patches are not enduring source evidence.

## Batch 2 handoff (Sessions 4-6)

| Session | Phase 2 starting audio candidates | Caveat |
|---|---|---|
| 4 | B04, B06, B07, potentially B08 | B04 begins with a recap of late Session 3 events. B05 is about one minute of unreliable OOC material; B08 may cross the 4/5 boundary. |
| 5 | B08? | Session 5 action may not be captured; the major Gideon combat is not independently proven to be on the available audio. |
| 6 | B09, B10 | High-confidence post-Gideon/tower aftermath, camp and transition toward Dwarven Forge territory. |

- Use current `SOD-Migration` Campaign and Worlds files **after** Batch 1 changes, the Session 4-6 transcripts (TXT and SRT), and the unchanged Phase 2 crosswalk/ledgers. Work in a separate Batch 2 chat.
- Reinspect B04's recap for the late Session 3 arena conclusion, but attribute any supplement as a **Session 4 recap** and revise Session 3 only if new evidence warrants it.
- B06's Phase 2 ledger says 'Sevrath' in the lich-pact summary, while the player now believes that name was a mistaken rendering of **Xerac**. Recheck the transcript/context and **do not** create a separate Sevrath NPC without evidence.
- Keep the identities of Rose/Pleasure and Billy, Drax's nature, Xerac's leadership, Falatir's family goal, and Biara's later role strictly chronological.
- Carry forward the flow: reconstruct journals -> review People/Places and current metadata -> advance quests and mysteries -> verify significant creature/item/spell references -> final QC -> archive source decisions -> commit.

**Boundary:** This closes the Batch 1 *review*, not the overall Sands of Desolation reconstruction project, nor the eventual merge to Production.
