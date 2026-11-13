# Getting Started

**Category:** Core functionality  
**Audience:** Someone opening this vault for the first time  
**Source check:** Development framework ZIP, November 10, 2026  
**Verification:** File/configuration review; live clean-install test still required

> [!tip] Your first assignment
> Find the Campaign Index, explore the DM Screen, and create one campaign. The most daunting part is choosing a name. (The paperwork comes later.)

## What is this vault?

This is an Obsidian-based system for organizing tabletop roleplaying campaigns, worlds, characters, places, quests, mysteries, session histories and reusable game references. Notes are ordinary Markdown files; Obsidian and its plugins turn them into linked dashboards, buttons and trackers.

The important areas are:

| Location | What belongs here |
|---|---|
| `Campaigns/Campaign Index.md` | Main landing page and **Add New Campaign** button |
| `Campaigns/<Campaign>/` | That campaign's dashboard, Session Journal, Party, Quests, Mysteries and other campaign-specific notes |
| `Worlds/<World>/` | Shared world information: People, Places, Organizations and Maps |
| `DM Screen/` | General rules and at-the-table reference |
| `The Wanderer's Guide to the Multiverse/` | Campaign-independent rules, spells, creatures and game references |
| `z_Documentation/` | The handbook you are reading |
| `z_Templates/`, `z_Scripts/`, `z_System/` | Machinery behind the vault; ordinary use does not require editing these |
| `z_Assets/` | Images and other referenced assets |
| `z_Scratch Notes/` | Personal scratch material |

**World vs. campaign:** More than one campaign can refer to a world. A recurring NPC or town belongs in that world's records; your party roster, session history and campaign-specific quests belong to the campaign. A campaign's established interpretation of events need not be the same as the world's objective truth.

## Before you begin

1. Install and open **Obsidian**. Open the provided vault folder using **Open folder as vault**; do not create a second empty vault and paste individual notes into it.
2. Make sure the complete folder structure and `.obsidian` configuration were copied with the vault. The `.obsidian` folder is hidden on some systems. It contains plugin and appearance settings; copying only Markdown notes will not replicate the system.
3. In Obsidian's **Settings → Community plugins**, enable community plugins as appropriate and verify that the bundled ones load. Only use plugins and files from a trusted source. If Obsidian asks you to review third-party plugins, do so before enabling them.
4. Open **`Campaigns/Campaign Index.md`**. The vault's saved Homepage configuration is set to open that file on startup, but you can navigate to it manually.
5. Confirm you see **Add New Campaign** and the campaign listing. The listing may be empty in a fresh template. Try opening `DM Screen/DM Screen.md` and a reference from The Wanderer's Guide.

### What depends on plugins?

The system's interface uses several community plugins. The source configuration includes **QuickAdd** (creation macros), **Templater** (note generation), **Dataview** (dynamic lists), **Meta Bind** (interactive property controls), **Calendarium** (in-game dates), **Buttons** (clickable commands), **Homepage** (landing page), and plugins providing layouts, callouts, maps and rules-related displays.

For ordinary use, these are **features of the supplied vault**, not extra applications you are expected to configure from scratch every time. A full clean-install dependency checklist and exact tested plugin versions will be provided after installation validation; the current archive proves configured plugins are present, not that every installation will behave identically.

If a block displays as code instead of a button or list, check whether its relevant plugin is enabled. If query results appear stale after editing metadata, first reload the affected note (for example, use **Reload Page** through QuickAdd or reopen the note). If that does not resolve it, fully close and reopen Obsidian before investigating scripts or properties.

## Your first five minutes

- [ ] Open the Campaign Index.
- [ ] Locate the **Add New Campaign** button, but do not use it for a campaign that already exists.
- [ ] Open the DM Screen and look at its sections.
- [ ] Find a rule, spell or creature in the Wanderer's Guide.
- [ ] Return to the Campaign Index.
- [ ] Follow [[z_Documentation/04 - Creating Your First Campaign|Creating Your First Campaign]].

## Troubleshooting the landing page

| Symptom | First check |
|---|---|
| No homepage on startup | Open `Campaigns/Campaign Index.md` manually; check Homepage plugin if needed |
| Buttons show as plain fenced text | Check Buttons and QuickAdd plugin activation |
| Campaign lists missing | Check Dataview is enabled and that the campaign notes exist and have valid properties |
| A layout looks different | Check theme, CSS snippets and relevant layout plugins; basic Markdown content should still be accessible |
| Content appears out of date | Reload or reopen the affected note; if still stale, fully restart Obsidian |

**Next:** [[z_Documentation/04 - Creating Your First Campaign|Creating Your First Campaign]].  
**Return:** [[z_Documentation/The Archivist's Handbook|Handbook]]
