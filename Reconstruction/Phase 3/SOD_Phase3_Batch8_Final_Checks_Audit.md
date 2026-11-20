# Sands of Desolation — Batch 8 Final Checks

**Baseline:** User's `Batch 8 Final Checks.zip` vault snapshot, not the earlier Batch 8 starting or midway archive.  
**Scope:** Reconstructed Sessions 22–24 and the related Batch 8 Party, World, Other, Quest, and Mystery notes. This is a *scoped* final-check audit, not a global rewrite of unrelated vault notes.  
**Patch contents:** Three session journals plus Jonks's Party Member history. Four vault-relative replacements total. The ZIP does not modify templates, other characters, or campaign dashboards.

## Audit outcome

| Check | Outcome |
|---|---|
| Session 22–24 source chronology | Pass; the Session 23 restoration and March 28 reunion remain in their proper sessions |
| Session dates | Session 22 March 7, 2025; Session 23 March 14, 2025; Session 24 March 28, 2025 |
| Session dashboards | Two `[!grid\|col-2]` groups, five intact cards, scene callout and footer in each |
| Existing and newly added journal links | Every target resolves to an exact Markdown note in this snapshot |
| Party Member linking rule | Checked by scene and Log paragraph; significant moments now linked; no redundant links on every mention |
| YAML front matter of four replacement files | Parsed YAML unchanged before and after; no status, relationships, or links in YAML modified |
| Historical campaign entries in principal affected notes | Chronological as recorded; no new session-group subheadings |
| Scoped relationship audit | 19 relevant relationship-bearing notes, 53 relationship rows; all targets and expected reciprocal links present |
| Source limitations | No new mechanics, identities, outcomes, or OOC spoilers promoted into the in-character narrative |
| Archive verification | ZIP integrity and exact included-file bytes verified |

## Session link-density correction

| Session | Before | After | Added links |
|---|---:|---:|---:|
| Away to the Caldera! | 63 | 96 | 33 |
| Free of the Sword | 33 | 45 | 12 |
| A Soul of Light | 95 | 104 | 9 |

The additions include **party links** for Jonks, Weary, Diane, Grayson, Thornwick, Arthur, Damien and others at scene boundaries, after intervening paragraphs, or at significant events. A few **existing NPC notes** are now directly linked in their session overview cards (Cinderfang, Skylia, Luz, Jonks Jr. and Ursula). No text was changed in the session narratives apart from wiki-link markup.

**Additional Party Member correction:** Jonks's Session 17 Campaign History now distinguishes what the original journal recorded (acquiring and intending to animate a body) from the player's later confirmation (this was the creation of Jonks Jr.). No history entry was moved or rewritten beyond that clarification.

## Worldbuilding and knowledge boundary spot checks

- **Grayson:** `Presumed Dead` as of *Free of the Sword*, not established permanently Dead or established sword imprisonment.
- **Weary / Havoc:** Soul restoration in Session 23; the exact exchange remains unresolved. Creator/arch-being relationships remain in the appropriate retrospective context.
- **Cinderfang:** `Alive` at the end of Session 24, with later death and use of his skull recorded only as OOC player recollection awaiting the Sovereign fight reconstruction. Links to Jonks, Ursula, Skylia are appropriately reciprocal.
- **The Sovereign:** `status: Unknown`, `attitude: Hostile` at this checkpoint.
- **Ursula:** `Dead`, `attitude: Unknown`, confirmed marriage to Jonks and death caused by Cinderfang; intentionality disputed.
- **Jonks Jr.:** Creation originally in Session 17 by player retrospective confirmation; remains loyal and appears as tanarukk in Session 24, with summoning mechanics uncertain.
- **Luz:** Temporary name, manifested whole soul; no later true identity or speculative relation inserted.
- **The hemispheres:** Recovery quest is `Completed` based on the player's later recollection, with exact completion session unresolved. The delivery quest is distinct and `Active`. This is **not** interpreted as proof the recovery had happened by Session 24.
- **Cain:** `Player Departed` administrative category is present; no invented in-world departure scene.
- **Shared-body relationships:** Arthur, Damien and Soren maintain reciprocal `Shares physical body` links. Soren's name remains OOC-only where its in-character introduction was unconfirmed.

## Remaining uncertainties (preserved, not errors)

1. How Cinderfang was released, whether a binding bargain was made, and the exact timing of his death at the Sovereign's hands.
2. The complete terms of Grayson/Havoc's Session 23 exchange and Grayson's actual final fate.
3. Luz's true identity, the source of the obelisk, and the later fate/mechanics of Jonks Jr.'s summons.
4. The exact session in which the second hemisphere was recovered and the delivery quest formally began.
5. Session 24's recording ends during the crater-rim approach; the staircase and the Sovereign's stronghold are not treated as reached.

## Import instructions

Extract **`SOD_Batch8_Final_Checks_Import_Patch.zip`** into the root of your current SOD-Migration vault, preserving the existing directory structure. The patch contains only:

- `Campaigns/Sands of Desolation/Session Journal/A Soul of Light.md`
- `Campaigns/Sands of Desolation/Session Journal/Away to the Caldera!.md`
- `Campaigns/Sands of Desolation/Session Journal/Free of the Sword.md`
- `Campaigns/Sands of Desolation/The Party/Jonks.md`

The patch was generated from the supplied **Final Checks** snapshot; if you have edited any of these four notes after taking the snapshot, compare those recent edits before overwriting. After import, reload Sessions 22–24 in Obsidian and confirm the cards, collapsed scene overview, and links visually.

**Verification limit:** Structural and link checks were conducted against the ZIP's Markdown contents. This does not substitute for a live render inside the user's Obsidian theme and plugins.
