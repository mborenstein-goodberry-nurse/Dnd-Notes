# Documentation Inventory and Roadmap

**Audit date:** November 10, 2026  
**Framework source:** `Current State.zip` — **Development vault**, as supplied by owner  
**Historical process source:** `Reconstruction.zip` — **SOD-Migration material**, as supplied by owner  
**Verification status:** Static review of files/configuration. Live Obsidian behavior, Git commits and merges are **not verified** by either ZIP.

## Source coverage

| Component | Verified | Notes |
|---|---:|---|
| Framework JavaScript files (`z_Scripts`) | 26 | Creation scripts, helpers, display/map/banner actions |
| Markdown templates (`z_Templates`) | 35 | Story World templates, mechanics templates, potential legacy files |
| Enabled community plugins | 28 | Listed in `.obsidian/community-plugins.json`; availability/behavior not live-tested |
| Reconstruction Markdown files | 19 | Phase 2 ledgers/crosswalk and Phase 3 reviews/closeouts |
| Vault entry points | Present | Campaign Index, DM Screen, reusable Campaign template |
| Populated campaign notes | Absent from Development snapshot | Obtain example/test context later if needed |
| Calendar definitions | None in Development Calendarium settings | Standard Session Journal needs matching campaign calendar |
| Git metadata | Absent | Branch/commit state must be verified separately |

## Architecture

The Handbook belongs in **`z_Documentation/`**, not in `z_System` (machinery), `z_Templates` (creation sources) or The Wanderer's Guide (campaign-independent rules). A single discreet link belongs on the Campaign Index; the index should remain focused on campaigns.

## Editorial architecture: four levels of separation

| Level | Audience | Status | Contents |
|---|---|---|---|
| **1. Core Vault Functionality** | All users | Required only when using the relevant feature | Buttons, folders, properties, calendar prerequisite for dated sessions |
| **2. Everyday Use & Best Practices** | All users | Recommended, not enforced | Session preparation, manual journal writing, worldbuilding, maintaining trackers |
| **3. Optional Advanced Workflows** | Interested users | Entirely opt-in | AI processing of written notes; recording + transcription + AI as a combined workflow; recording alone for verification; archival reconstruction |
| **4. Original Project / Maintainer Procedures** | Developers and original maintainers | Not part of normal vault use | The owners' Development/Production/Master/SOD-Migration branches, merge schedule and project migration history |

The general user handbook always presents the **simplest supported no-AI, no-recording, no-Git workflow first**. No one must use the original team's tooling or its Git topology. Recording/transcription and AI are taught together as one advanced path, with an independent AI-from-written-notes path. Audio alone is also valid evidence without processing.

## Target documentation sections

1. **Getting Started / First Campaign** (core) — opening the vault, configuration, first campaign and calendar.
2. **Feature-by-feature User Guide** (core) — buttons, note types, metadata, navigation, Character Reference, DM Screen, maps, images and banners.
3. **Everyday Workflows** (recommended) — preparation, journal keeping, post-session updates, worldbuilding; manual workflow is canonical.
4. **Advanced Workflows** (optional) — AI from written notes, recording → transcription → AI, recording for verification, source-heavy historical reconstruction.
5. **AI Handoff Reference** (optional) — portable context, prompts, human review and patch/import rules.
6. **Technical Reference & Troubleshooting** — dependencies and what to do when things fail.
7. **Maintainer's Workshop** (maintainer-specific) — project Git procedures and how to develop/release improvements; never a first-run step.

## Writing standards

- Each guide should state **audience, level, source/verification status, prerequisites, steps, expected result and recovery steps** as applicable.
- Present the normal human workflow before optional extensions.
- Separate a **technical requirement** from a **writing convention** and from **our team's particular habits**.
- Keep factual review standards consistent across manual and AI-assisted methods.
- Never require ChatGPT, Discord, Buzz, historical migration or Git merely to use the vault.
- Distinguish **verified in source files**, **live-tested**, and **not verified**.
- Avoid embedding campaign-specific spoilers, paths, private credentials or assumptions in reusable guides.
- Keep humor occasional and subordinate to clarity; never embed it in commands or risk warnings.
- Documentation should accompany framework changes, but the original project's branches and merge strategy are an internal example rather than a consumer instruction.

## Chapters drafted from the Development snapshot

- [[z_Documentation/03 - Getting Started|Getting Started]] — first-open orientation and basic dependency checks.
- [[z_Documentation/04 - Creating Your First Campaign|Creating Your First Campaign]] — what the New Campaign macro actually creates, the Setup Quest, calendar requirements and verification.
- [[z_Documentation/05 - Your First Session|Your First Session]] — ordinary session lifecycle.
- [[z_Documentation/06 - The Campaign Dashboard|The Campaign Dashboard]] — verified dashboard controls, contextual actions and dynamic sections.

These are **source-verified drafts**, not yet live-validated tutorials.

## Findings requiring review

- **Documentation-template consistency:** The generated `Setup Quest.md` currently mentions transcription in its Ready for Session 1 checklist and post-session tip. This conflicts with the user-first workflow; review as a separate template improvement, not a documentation prerequisite.

| Finding | Evidence | Next step |
|---|---|---|
| Campaign-specific calendar prerequisite | `Session Journal.md` requests `window.Calendarium.getAPI(campaignName)` and throws if absent; Development config has no calendars | Write calendar-setup instructions and test first Session Journal |
| Outdated first-run checklist | `z_System/First Time Setup.md` is only a few bullets and contains an editing artifact | Replace with full onboarding documentation |
| Stale DM Screen terminology | End of `DM Screen.md` still refers to `Session Reference` | Update to `Character Reference` after review |
| Sands prompt copy/paste mistake | `z_System/Transcription Prompts.md` uses `What Lies Beneath` under the Sands heading | Correct as part of optional transcription documentation |
| Suspicious legacy folder-template mapping | Templater maps `Campaigns/Sands of Desolation/Session Journals` to a nonexisting template path | Confirm unused before removing |
| Legacy-looking session helper | `getThisGameFilename.js` counts `type: session`, while current journals use `type: Session Journal`; macro still uses helper for path variables | Inspect dependency before any refactor, don't delete blindly |
| Reconstruction status not current Git truth | `SOD_Phase3_Reconstruction_Status.md` explicitly marks imports/commits unverified | Keep archival statements separate from branch verification |

## Writing & validation sequence

- [ ] Verify homepage and campaign creation with a disposable campaign.
- [ ] Verify new-world/existing-world creation and Setup Quest priority.
- [ ] Verify calendar creation, new Session Journal and in-game date capture.
- [ ] Test every campaign button and the two Character Reference modes.
- [ ] Validate Main Quest selection, mystery filtering, party sorting and last appearances.
- [ ] Verify maps, geography relationships, images and inherited banners.
- [ ] Validate saved plugin and hotkey configuration in a clean installation.
- [x] Draft the basic manual session overview; expand to a complete daily workflow.
- [ ] Draft optional AI-from-written-notes and recording/transcription/AI workflows as separate tutorials.
- [ ] Draft archival reconstruction guide using ledgers and reviewed closeouts.
- [ ] Have a new user follow the guides and an unfamiliar assistant follow the AI handoff.
- [ ] If maintaining the original project, confirm Git branch state before integrating framework updates. This is not required for ordinary users.

Return to [[z_Documentation/The Archivist's Handbook|Handbook]].
