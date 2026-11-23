---
type: Reconstruction Review
campaign: Sands of Desolation
world: Astodan
date: 2026-11-23
tags: []
---
# Historical Clarifications — Integration and QA (Sessions 0–28)

## Scope and baseline

- **Baseline:** user-provided `Batch 10 Initial.zip` (SOD-Migration vault snapshot).
- **Content:** spoiler-limited retrospective answers from DM Wiley, character-build clarification from player Emily, and the note-taker's own confirmations, supplied November 2026.
- **Coverage:** historical Sessions 0–28; this work **does not** reconstruct Sessions 29–33 or modify the original photographs, transcripts, templates, plugin settings or source ledgers.
- **Import state:** files prepared for a merge/overlay; no local branch, Git commit or live Obsidian import was verified. Review against any newer vault edits before replacing the same files.

## What changed

| Group | Result |
|:--|:--|
| Session journals | 17 edited: 5, 6, 8, 9, 15.5, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 and 28. Only source-supported or clearly labeled retrospective additions. |
| Character biographies | Arthur, Damien, Soren, Falatir, Grayson, Weary and Noisy Owlbear updated; Johnwick's already-correct spelling retained. |
| World notes | Jonks Jr, Cinderfang, Warrick, Tower of Icarus and Luciferian Caldera updated. |
| Mystery notes | Billy and Outskirts settlement moved to **Partially Answered**; remaining motives, timing and the Fox Coin properties remain unknown. |
| Reconstruction documentation | New historical clarification ledger, this QA note, and a reference in the Phase 3 status tracker. |

**Significant guardrail:** Wiley's description of a surprising encounter with Warrick was offered in response to a question about missing Session 18, but **the surviving history explicitly places the reunion in Session 19**. The patch therefore **does not invent a Session 18 reconstruction**. The recollection is qualified in Session 19, and Session 18 stays evidence-limited.

**Other evidence conflicts:** Wiley tentatively remembered that Potion Mix #5 had not been used, but Session 20's earlier handwritten account records Grayson consuming it. Neither source is silently overwritten; the effect remains unknown.

**Tentative answers preserved as tentative:** Thornwick possibly winning the Session 19 contest; Jonks possibly combining the hemispheres; Machaimia possibly referring to Noisy Owlbear's religion rather than a city; Sovereign's estimated 2–3 remaining hearts.

**Knowledge boundaries:** Grayson's Havoc bargain was private; the Fox Coins were not explained; the reason the skeletal pursuer stopped remained unknown; the Soren confession is only assigned to the four recalled witnesses, not everyone; Damien's subclass is a **homebrew Treachery** adaptation and receives no invented spell/rules note.

## Static QA completed

- All modified/created Markdown files with original YAML frontmatter parse correctly; the existing Phase 3 status tracker intentionally has no YAML.
- All **10 newly introduced Obsidian wiki link targets** resolve in the snapshot + patch file set.
- **24 relationship metadata entries** in edited notes have valid target paths. Six shared-body relation edges among **Arthur–Damien–Soren** are reciprocated and directionally consistent. No `relations` entries were added or removed during this pass.
- Four older relationship references without explicit inverse entries were noticed in the baseline (Grayson → Xerac; Weary → Ernon Quest, Divari Quest and Havoc). No unrequested relationship redesign was performed; these are outside the clarification patch's new relationship changes.
- Existing Markdown blockquote dashboards, metadata schemas and first-appearance `NEW` tag behavior preserved; the unverified settlement is identified by description rather than incorrectly promoted to a confirmed new place name.
- Original CRLF line-ending format retained for files that already used CRLF, minimizing Git diff noise.

## Import recommendation

The patch ZIP contains only changed/new Markdown files, using the same relative paths as the vault. With a clean, current SOD-Migration working tree, back up or commit first; extract the patch **over the vault root**, preserving folder paths, then inspect Git diff. If any files have changed locally since `Batch 10 Initial.zip`, reconcile those files before overwriting. No files from Batch 10 Sessions 29–33 are included.

## Next step

Resume **Batch 10, Session 29 — Infinidungeon Explorers**, using the clarified Session 28 transition. The new ledger supplies background for cross-session inference while preventing intentional mysteries and OOC material from being treated as already known by the characters.
