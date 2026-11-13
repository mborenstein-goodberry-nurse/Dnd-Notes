# Development Note - Automatic Campaign Calendars

**Scope:** Framework maintenance; not part of the ordinary user guide.  
**Reference build:** Calendarium 2.1.0 in the supplied Development vault.  
**Status:** Source reviewed and static tests completed; requires a live Obsidian smoke test.

## New behavior

`z_Scripts/prepareNewCampaign.js` now attempts to create a starter calendar after campaign folders are prepared, using `z_System/Default Campaign Calendar.json` as its template. It uses Calendarium's internal `settings$.addCalendar` method (the same method invoked by its own settings interface in the inspected release). This **is not a documented public API** and should be reviewed after plugin upgrades.

- Calendar name exactly equals campaign name.
- Starts at January 1, Year 1; a placeholder for the player to customize.
- Weekdays/months and leap years follow a basic Gregorian arrangement, without imported holidays, campaign data, moons, or religious eras.
- All nested calendar IDs are regenerated per new campaign.
- Existing matching calendars are never modified.
- If Calendarium is unavailable or creation fails, campaign creation continues and warns that the calendar must be configured manually.
- Session Journal displays a clearer error on missing calendars.
- Setup Quest contains no transcripts or recording expectation.

## Smoke test (in Developments before porting to Master)

1. Back up the Development vault's `.obsidian/plugins/calendarium/data.json` and create a disposable test campaign.
2. Confirm one calendar is created with the campaign's exact name and current date Year 1/January 1.
3. Verify the calendar can be opened and edited in Calendarium, including changing year/month/day.
4. Create Session 1. Confirm `fc-calendar`, `fc-date`, and `gameDate` match the selected in-game date.
5. Confirm Session 0 is unchanged and the Setup Quest wording is generic.
6. Create a second test campaign and check that its calendar is distinct and the first calendar did not change.
7. Disable Calendarium temporarily and create another disposable campaign. The campaign should still be created, but a manual-calendar notice should appear.
8. Delete disposable campaigns **and their calendars** only after verifying no data is needed.
9. After successful testing, commit the framework files on Developments and merge or cherry-pick the specific framework commit into Master. Avoid pulling campaign-specific material into Master or Production.

## Compatibility

If Calendarium changes its internal settings API, automatic creation will stop working rather than silently modifying its data file. Follow the beginner troubleshooting guide to create a matching calendar manually until the integration is reviewed.
