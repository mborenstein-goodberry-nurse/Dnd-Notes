# Sands of Desolation — Batch 8, Session 23 Player Review and Source Ledger

**Session:** 23 — [[Campaigns/Sands of Desolation/Session Journal/Free of the Sword|Free of the Sword]]  
**Real-world date:** 2025-03-14 (original journal year: 2026; player confirmed correction)  
**Disposition:** Player-reviewed. Ready as a vault-relative import patch; later evidence can still justify targeted edits.

## Evidence inventory

| Evidence | Session assignment | What it supports | Caveats |
|---|---|---|---|
| Original `Campaigns/Sands of Desolation/Session Journal/Free of the Sword.md` | 23 direct original | Havoc exchange; Weary freed with full soul | Sparse text; other entries appear to belong to next session |
| `400 McCarthur Dr 3 3.28.2025` TXT/SRT opening DM recap | 24 audio, retrospective account of 23 | Grayson took sword and vanished in black smoke; Havoc's public appearance; obelisk collapse; enlarged Thornwick; luminous being; fiend army | Recap is not a live recording of S23; omissions and mistaken names possible |
| Same March 28 audio after recap | 24 direct events | Confirmed full soul; expanded conversations about luminous being, obelisk; reunion on Caldera rim | **Do not backdate** these newly played events into S23 |
| Zach photo evidence index | — | No session 23 photo match | Cannot supply missing S23 combat/scene mechanics |
| Session 22 player-reviewed journal and Cinderfang evidence | 22 | Cinderfang freed; Havoc still held a fragment during private vision | Don't move S23 bargain backward |

## Reconstructed chronology and confidence

1. **Grayson takes Hero's Bane, vanishes in black smoke** — High for what the recap reports. Exact exchange/price unknown.
2. **Havoc appears publicly as Archdemon of Hostility** — High. He mentions observing the coming Sovereign encounter and possible future reward.
3. **Weary regains missing soul fragment** — High (original Session 23 journal, plus March 28 independent dialogue). No guarantee external appearance or scars fully revert.
4. **Party divides** — High for Diane, Weary and Jonks remaining back; other named companions investigate obelisk.
5. **Obelisk destroyed; enlarged Thornwick flies around the Caldera** — High for results, low for exact sequence or causes.
6. **Faceless luminous being brought from obelisk** — High for emergence/transport; its nature and name unknown at this boundary.
7. **Fiends respond to destruction; Cinderfang moves into Caldera** — Medium-high. Their precise numbers and what happened to Cinderfang remain unconfirmed.
8. **Group reunion** — **Reserved for Session 24 opening**, where March 28 recording actively depicts encounter and dialogue.

## Chronology correction — crucial

The original Session 23 note includes:

- “Light Lady is fiendish abjuration magic”
- “The Obelisk was acting as a lightning rod in reverse, helping demons find a way to the material plane”
- “There is a bit of necromancy within the lady ... A whole soul taking form”
- “3 types of demons around the caldera”

These details are spoken or examined in the **March 28 recording** during live Session 24 play, rather than necessarily known by the end of Session 23. This strongly suggests the old journal captured a later continuation. Preserve the original as evidence, but assign the researched discoveries to Session 24 if consistent with that session's full reconstruction. The name *Luz* is also proposed during Session 24 and should not appear prematurely in S23.

## Player review decisions and remaining source questions

1. **Grayson — resolved status:** Player prefers Missing or Presumed Dead; the recorded party belief that Grayson died supports **Presumed Dead**, effective Session 23. Set Party Member YAML `status: Presumed Dead` and `statusAsOf` to this session. Do not mistake this for permanent, verified death or assert a destination for his soul.
2. **Havoc and Weary:** Is it fair to record only that the exchange freed Weary's soul and that Havoc appeared, while leaving the contractual terms unknown? This is the evidence-supported option.
3. **Luminous figure:** Was she definitely found *within* the obelisk, or only near it after the collapse? The Session 24 participants described her as being “in the obelisk” but the recap is indirect.
4. **Date — confirmed:** Player confirms **March 14, 2025**. Original 2026 year was erroneous; preserve month and day.
5. **Reunion:** Leave the full party's reunion for the following session unless player recollection establishes it already occurred in S23.

## Import scope

- **Replace** `Campaigns/Sands of Desolation/Session Journal/Free of the Sword.md` with the player-reviewed journal.
- **Replace** `Campaigns/Sands of Desolation/The Party/Grayson.md` to update status, statusAsOf and one chronological history paragraph only.
- **Add** `Reconstruction/Phase 3/SOD_Phase3_Batch8_Session23_Player_Review.md`.
- All linked targets in the journal have been checked against `Batch 8 Initial.zip`.
- Grayson is the **only** changed worldbuilding note. No other Party, NPC, Item, Quest, or Mystery YAML is modified. Any later revisions may be issued as focused patches.

## Dashboard formatting correction

The screenshot from the previous Session 22 import exposed a literal `[!grid|col-2]` line caused by the second nested grid within the foldable dashboard. This patch uses a single two-column grid containing four nested cards (Party, Locations, People, Gains), followed by the full-width Conditions card. The Session 22 note receives the same targeted repair in a separate ZIP; the optional template repair is separate.
