# Batch 8 — Player Departed pilot (SOD-Migration)

## Scope (two existing vault files only)

1. `Campaigns/Sands of Desolation/The Party/Cain.md`: change `status` from `Retired` to `Player Departed`; add `Player Departed` to Cain's Meta Bind status selector. The `statusAsOf` link is **unchanged**: it continues to point to his last documented historical appearance, not to an invented exit scene.
2. `Campaigns/Sands of Desolation/Sands of Desolation.md`: append `Player Departed` after `Dead` in the Party table's status sort. Existing seven statuses retain their exact priority and alphabetical tie-breaks.

`Player Departed` is an **out-of-character administrative roster category** indicating that the player has definitively left the campaign while the character has no established in-world exit. It is **not evidence that Cain was killed, went missing in-story, or voluntarily retired**. User explicitly confirmed permanent player departure. Do not add a fictional goodbye or use Session 22–24 as `statusAsOf`.

## What this does not update

- The shared Party Member and Campaign templates (held for pilot approval).
- Other existing Party Member selectors, either in SOD or What Lies Beneath (held for pilot approval).
- Session journals, quest notes, mysteries, worldbuilding, or other code.
- Global scripts or Git branches.

## Smoke test in Obsidian

1. Import into **SOD-Migration**, keeping the same vault-relative folder paths. Take a backup or review any manual edits to Cain/Campaign since the Batch 8 starting snapshot.
2. Open `Cain.md`; confirm the status displays `Player Departed` and is available in the inline dropdown.
3. Open the Sands of Desolation campaign note's **The Party** table. Cain should appear below the `Dead` characters and remain visible, with status `Player Departed`.
4. Confirm the seven original status categories still sort as before and the page's controls/other sections still work.
5. If the table is stale, reload the note, then fully restart Obsidian if necessary.

Once verified, prepare a **separate shared-template patch** for SOD-Migration and Developments. It will modify:
- `z_Templates/1. Story World Templates/Creatures/Party Member.md` — add the eighth Meta Bind option.
- `z_Templates/1. Story World Templates/Notes/Campaign.md` — add the eighth sort rank.

Because the new template only affects *newly created* Party Member notes, a broader rollout to **existing** members' selectors should be separately scoped to avoid overwriting manual edits (especially newer SOD worldbuilding). The current pilot is intentionally minimal.

## Scoped YAML relationship audit

Cain's existing `relations: []`, `affiliations: []`, and `statusAsOf` anchor remain untouched. No relationship was added or removed and no reciprocal links are required. No other metadata changed. This is a static verification, not a live Obsidian UI test.
