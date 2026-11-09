# Sands of Desolation — Phase 3 Batch 2 Mysteries & Theories Review

**Scope:** Reconstructed Sessions 4–6; historical knowledge cutoff at the end of Session 6. This is a proposal for review before final cross-linking and Batch 2 closeout.

## Decisions already established

- **B08 belongs to Session 5 with high confidence** (player 2026-11-08 recollection plus contiguous narrative), not by independently dated metadata.
- **Towers relic quest Completed in Session 5**, when Thornwick removed the hemisphere from Gideon's chest. **The Hemisphere of Gideon remains Unresolved** because the artifact's nature/use has not been determined.
- **Gideon is Presumed Dead** in the user's newer NPC note. This patch never overwrites Gideon's note.
- The location is now **Tower of Icarus**; earlier phases use the display name *Towers of Icarus*.

## Proposed revisions to existing trackers

1. **The Hemisphere of Gideon:** Keep `Unresolved`. Separate the Session 5 extraction from Session 6 concealment; explicitly link the Completed quest and update the Place link to singular.
2. **The Golden Eye of Icarus:** Keep `Unresolved`. Replace the obsolete B08 transition-uncertainty with its **high-confidence Session 5 assignment**. Do not identify the eye as Gideon's.
3. **Gideons Golden Eye Theory:** Keep `Unconfirmed` and `characterKnowledge: Unknown`. Apply the Tower rename, correct B08 chronology, and retain alternate explanations.
4. **Falatir's Search:** Keep `Unresolved`; add verified Xerac and Fox associations, the signed after-death bargain, and the two-shard private conversation. The deceased-wife/soul-restoration explanation remains **OOC** until an in-world disclosure is supported.
5. **Identity of the Rose-Masked Woman:** Keep `Unresolved`. Add Diane's Session 6 explanation to her companions, updating `lastSeen` to reflect disclosure, **not** confirming that Rose and Pleasure are the same person.

## Proposed new mystery trackers

6. **The Fox's Token:** Two distinct private events in Session 6: the Fox's iron token with Falatir and the similar impression Thornwick recognized with sorrow. They are **not confirmed identical**, and the significance is unknown. No details from Waffles' pre-campaign history are presented as SOD party knowledge.
7. **The Corruption of the Tower of Icarus:** Why the celestial idols were imprisoned, how Gideon exercised judgment, what corrupted the three towers, and whether their transformation fully healed the site. No cause is invented. This is distinct from the **Hemisphere** mystery.

## Existing mysteries that should NOT be modified yet

- **Who Is Billy:** The separately approved Duke Ingrail correction already records the tentative Arthur/Billy recollection in collapsed OOC provenance. The mystery remains Unresolved.
- **The Disappearance of Weary's Family:** No relevant new answer in Sessions 4–6.
- **What Became of Havoc:** No relevant new answer in Sessions 4–6.
- **The Necrotic Spires:** No new confirmed explanation in Sessions 4–6.

## Questions we're deliberately NOT turning into additional mysteries now

- **Cain's brother:** Mentioned by Cain in Session 4 but not yet actively pursued; can become a tracker if a later session develops the lead.
- **The Fox's full agenda / Falatir's separate legal obligations:** Partly captured in Falatir's Search, the Fox's character note, and the new token mystery. Avoid duplicating tracking until evidence establishes a discrete investigation.
- **Lunitari's intentions:** The private encounter establishes her introduction, but neither broad party knowledge nor an independent investigation yet justifies a standalone new tracker.

## Technical/import notes

- The package edits **five existing trackers** and proposes **two new mystery notes**; this review document is included for evidence provenance.
- The Meta-Bind infobox and all three DataviewJS blocks on the Mystery note scaffold are preserved; the Player Knowledge theory DVJS is preserved.
- No journal, quest, NPC, party or Place file is overwritten. **This is intentionally incremental** to protect newer user edits outside the last uploaded `Catch Up.zip`.
- `[[Tower of Icarus]]` assumes the Obsidian rename the user already confirmed; it isn't present in the earlier archived snapshot under that name.
- After import, verify Obsidian's metadata cache is refreshed before diagnosing missing reverse links. If views seem stale, fully close and restart Obsidian first.
