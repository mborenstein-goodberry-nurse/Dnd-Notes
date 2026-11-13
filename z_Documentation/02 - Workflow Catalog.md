# Workflow Catalog — Operating the Vault

**Status:** Process inventory, not yet full tutorials. The ordinary workflow is based on the Development framework and established practices; the historical reconstruction material is separately sourced from **SOD-Migration** and remains optional.

## Four levels, not one personal workflow

- **Core:** Vault features and actual technical requirements for their operation.
- **Recommended:** A readable, consistent way to keep journals and world notes; an editorial choice, not a required app.
- **Optional:** AI assistance, with or without recordings; **recording → transcription → AI** is a combined advanced tutorial. Recording alone can also be used to verify details. Historical reconstruction is another specialized optional process.
- **Maintainer-specific:** Our source project's Git branches, testing and migration routines. These are not instructions for ordinary users.

## Standard session lifecycle — no recordings, AI or Git

| Stage | Core tool | Recommended practice |
|---|---|---|
| **Campaign setup** | Create campaign, folder structure, Setup Quest, Session 0 and trackers; configure calendar for dated sessions | Fill in the party, character reference, world and starting objectives |
| **Before play** | Open dashboard, character reference, DM Screen and relevant notes | Review quests/mysteries and prepare a session journal or scratch notes |
| **During play** | Type in the Session Journal; create or open supporting notes as needed | Capture chronology, decisions, people, places, meaningful gains and questions |
| **After play** | Edit journal and relevant notes; inspect trackers | Produce a readable chronicle, link established entities, update statuses and open threads |
| **Occasional upkeep** | Check dates, links, assets, metadata and queries | Preserve historical accuracy and correct uncertain or stale information |

[[z_Documentation/05 - Your First Session|Your First Session]] is the beginner-friendly walkthrough.

## Recommended human post-session process

These are the **quality standards**, not extra software prerequisites:

1. Review the material you actually have, even if it is only your own handwritten or typed notes.
2. Arrange events chronologically. Avoid mistaking recaps, recollections or out-of-character conversation for new scenes.
3. Write a neutral Session Journal. Capture scene-specific loot, favors, discoveries, outcomes and changes; place outstanding questions in Questions & Mysteries.
4. Link established people, places, organizations, quests, mysteries, items, spells and rules when helpful. Don't invent missing details.
5. Update worldbuilding **after** reviewing the session account. Track statuses and knowledge as they stood in the recorded session.
6. Keep player theories, character beliefs and OOC spoilers distinguishable from confirmed world facts.
7. Check metadata, links, assets, displayed dates and trackers. When Dataview looks stale despite correct values, **reload or reopen the affected note first**; fully restart Obsidian if that fails, before modifying properties or queries.

A Git diff and commit are **not** standard post-session requirements. Use whatever ordinary backup or file-management approach is appropriate for your copy of the vault; the separate Maintainer's Workshop will describe the original project's Git workflow.

## Optional advanced routes (same quality checks)

| Route | Inputs | Why use it | What is *not* required |
|---|---|---|---|
| **AI from written notes** | Typed or handwritten notes converted to readable input; relevant current vault notes | Draft or reorganize journals and propose worldbuilding updates | No recording or transcription |
| **Recording + transcription + AI** | Session recording with participants' awareness/appropriate permission, transcript, notes and relevant vault context | Recover detail from spoken play and support reviewed session reconstruction | Not required for ordinary vault use |
| **Recording only** | Audio archive | Recheck disputes, names, chronology or historical details yourself | No transcription or AI |
| **Historical reconstruction** | Legacy notes, evidence inventory, missing-session markers, optionally media/transcripts | Migrate or repair a long-running archive with explicit provenance | Not a routine weekly session process |

For AI-assisted paths, the human remains responsible for checking what happened, reviewing uncertainty and accepting edits. The assistant should work from provided source material and not treat its inferred details as established facts.

## Evidence and knowledge boundaries

| Material | How to treat it |
|---|---|
| Contemporaneous notes / transcription | Source evidence; check unclear names and speech recognition |
| DM recap | May describe earlier events; do not date the event to the recap by default |
| Later player recollection | Historical clue; distinguish confirmed from tentative memory |
| Character belief | Document as a belief, not necessarily world truth |
| OOC revelation | Keep outside in-character public notes until learned in play |
| Player theory | Track separately from verified discoveries |
| Missing session/audio | State the gap; do not invent a scene to fill it |

## Optional recording → transcription → AI guide to write

The original maintainers have used Discord recordings and **Buzz/Whisper**, exporting **TXT and SRT**, as inputs to an AI-assisted review. Speaker identification may be unreliable. The Whisper initial prompt can help with D&D terms and names, but does not establish a guaranteed persistent dictionary; excessive names can introduce false matches.

**Source:** `z_System/Transcription Prompts.md` (its Sands example contains a copied campaign title and needs correction before publication).

**Detailed guide planned:** participant awareness and appropriate permission, recording, file naming/date preservation, storing originals, Buzz transcription settings, TXT/SRT, speaker/name correction, AI handoff, human review and fallback when media or AI is unavailable. This is one optional package, not a prerequisite for the main handbook.

## Optional historical reconstruction guide to write

SOD-Migration's work is an evidence-heavy **special operation**, not the normal way to use the vault. Its most reusable process is:

1. Preserve originals and create **source-batch ledgers**; never confuse recording ordinal with session number.
2. Create a **master session-to-evidence crosswalk** with candidate mappings, confidence and missing-evidence markers.
3. Use batches of roughly **3–5 sessions**, drawing on source audio, written journals, original notes, photographs and the previous closeout.
4. Separate historical timeline, DM recaps, original eyewitness records, later player memory and uncertain reconstruction.
5. Review session notes first; then audit People, Places, Party, Quests, Mysteries and Theories **as-of the batch checkpoint**.
6. Preserve the original evidence, intermediate decisions and OOC reconstruction provenance.
7. Create a final **closeout** with evidence, changes, questions, QC, and explicit import/commit status. Verify branch merges separately.

**Reference files from Reconstruction archive:**

- `Reconstruction/Phase 2/SOD_Phase_2_Master_Session_Evidence_Crosswalk.md` — overall evidence assignment and uncertainty.
- `Reconstruction/Phase 2/SOD_Phase_2_Batch_50_Ledger_Phone_Verified.md` — one source batch and source integrity.
- `Reconstruction/Phase 2/SOD_Phase_2_Batch_B_Recording_Evidence_Ledger.md` and `SOD_Phase_2_Batch_C_Recording_Evidence_Index.md` — independently sourced batches.
- `Reconstruction/Phase 2/SOD_Phase_2_Zach_Notes_Evidence_Index.md` — independent written evidence.
- `Reconstruction/Phase 3/SOD_Phase3_Batch1_Final_Closeout.md` and `SOD_Phase3_Batch2_Final_Closeout.md` — reviewed change/quality-control examples.
- `Reconstruction/Phase 3/SOD_Phase3_Reconstruction_Status.md` — historical checkpoint; **does not prove later commits or merges**.

These files remain in the Reconstruction archive and should not be duplicated into campaign-neutral framework instructions. Point to them as examples when needed.

## AI handoff and reproducibility checklist (optional)

A future, unfamiliar assistant needs a standalone note that includes:

- Vault structure and distinction between world records, campaign notes, the Guide, system scripts and templates.
- Exact task mode: ordinary session, historical reconstruction, or framework development.
- Relevant existing notes, source transcripts, dates, templates and assets.
- Evidence hierarchy; historical as-of constraints; OOC-vs-character-knowledge and theory boundaries.
- Formatting and metadata conventions; rules for links, status fields, map/banner assets and the independent Guide.
- Expected output: proposed patches or complete notes, citations to provided evidence, explicit uncertainties, review questions and testing checklist.
- A strict ban on claiming that something was imported, committed, merged, synchronized or tested without proof.

## Maintainer-specific history (not a usage prerequisite)

The original project uses **Master** (clean template), **Production** (active play), **Developments** (framework changes) and **SOD-Migration** (historical reconstruction). This is an example of one project's maintenance structure. The ordinary vault user never needs to reproduce it; documentation and release procedures belong in a separate **Maintainer's Workshop**.

Return to [[z_Documentation/The Archivist's Handbook|Handbook]].
