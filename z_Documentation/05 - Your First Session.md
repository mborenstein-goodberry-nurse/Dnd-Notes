# Your First Session

**Category:** Core features and recommended note-taking practice  
**Audience:** Any campaign participant using the vault  
**Source check:** Development Campaign and Session Journal templates  
**Verification:** Source review only; live click-through still pending

This is the everyday workflow for preparing a session, recording what happens, and keeping your campaign records current.

## Before the game

1. Open the campaign dashboard from the [[Campaigns/Campaign Index|Campaign Index]].
2. Review the **Quest Board** and active mysteries, and open any useful NPC or place notes.
3. Keep your **Character Reference** and the [[DM Screen/DM Screen|DM Screen]] accessible if helpful.
4. Check Calendarium's **current in-game date**, especially if there has been a time skip.
5. Use **New Session** on the campaign dashboard to create the journal for the upcoming session.

The journal template sets the session number, campaign and world, a real-world creation date, and the current in-game date. It creates a note in `Campaigns/<Campaign>/Session Journal/` and renames it `Session <number>`. **Session 0** is the pre-game synopsis; normal sessions begin at **Session 1**.

## While playing

Keep notes in the journal's **Log** and relevant sections. Consider recording:

- What happened, in the order it happened; important choices, conflicts, travel and conversations.
- Names and places encountered (link existing notes where appropriate).
- **Gains** such as loot, information, favors, discoveries and consequential outcomes, recorded with the scene in which they occurred—not just a list of defeated creatures.
- Unresolved questions for the journal's **Questions & Mysteries** section.

**Recommended convention, not a software requirement:** Write events as a neutral chronicle. A player theory or out-of-character revelation should not silently become an established fact about the world. You can keep these in separate notes and link them when useful.

## After playing

1. Review the journal while the session is fresh. Fill in confusing abbreviations and reorder events chronologically when necessary.
2. Add or correct established people, places, organizations and references using the dashboard controls.
3. Review changes to **Quests** and **Mysteries**, keeping unresolved questions visible without revealing unearned answers.
4. Check any images or linked assets you added, and verify session and in-game dates.
5. Return to the campaign dashboard to ensure session lists, quests and other trackers show the expected changes.

If a tracker seems outdated despite correct notes and metadata, **reload or reopen the affected note first**. If that does not help, fully close and reopen Obsidian. Only investigate the underlying query or properties if the problem persists.


### If New Session reports a missing calendar

A normal journal requires a Calendarium calendar whose name matches the campaign **exactly**. The new-campaign macro normally creates a starter calendar, but older campaigns or incomplete setup may not have one.

1. Check the Session Journal folder for a partially created `New Session` note before retrying.
2. Open **Settings → Calendarium** and check for the campaign-named calendar. Create it if missing.
3. Set a valid **current** in-game year, month and day.
4. Return to the campaign dashboard and create a session, after checking that you are not duplicating a partial journal.

This recovery procedure remains useful even with automatic calendar creation; it also covers older campaigns.

## Expected result

Your campaign has a readable journal for the session, its trackers reflect any updated notes, and open questions remain available for future play.

**Next:** [[z_Documentation/06 - The Campaign Dashboard|The Campaign Dashboard]].  
**Return:** [[z_Documentation/The Archivist's Handbook|Handbook]]
