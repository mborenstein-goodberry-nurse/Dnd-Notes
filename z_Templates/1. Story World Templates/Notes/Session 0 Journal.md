---
<%*
// Read the current in-game date from the calendar named for this campaign.
// Session 0 and Quest notes may be created before their calendar is configured.
const campaignCalendar = tp.user.getThisCampaign(tp);
let currentCalDate = null;
let currentCalDateDisplay = "Not set";

try {
    const calendarAPI = window.Calendarium?.getAPI?.(campaignCalendar);
    const date = calendarAPI?.getCurrentDate?.();
    if (date && [date.year, date.month, date.day].every(Number.isFinite)) {
        const display = calendarAPI.toDisplayDate(date);
        currentCalDate = date;
        currentCalDateDisplay = display;
    }
} catch (error) {
    console.warn(`Calendarium date unavailable for "${campaignCalendar}":`, error);
}

// Match the month conversion already used by the working Session Journal.
// If the calendar isn't configured, omit fc-date rather than writing 0/0/0.
const calendarDateYaml = currentCalDate
    ? `fc-date:\n  year: ${currentCalDate.year}\n  month: ${currentCalDate.month + 1}\n  day: ${currentCalDate.day}\n`
    : "";
-%>
type: Session Journal
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
sessionNum: 0
fc-calendar: <% campaignCalendar %>
<% calendarDateYaml %>gameDate: <% JSON.stringify(currentCalDateDisplay) %>
fc-category: Sessions
summary: The session that sets up initial rules, facts, and backstory
tags:
---
<div class="session-hero">
  <img class="session-hero-frame" src="z_Assets/System/Medieval-Banner.png" alt="">
</div> 
<% await tp.file.rename(`Session 0`) %>

## ✧ Session Notes
> [!fas-infobox|right no-title] Session Overview
> ## ✧ Session Overview ✧
> > [!blank]
> > |   |   | 
> > | --- | --- |
> > | ✦ Session | *Session `=this.sessionNum`* |
> > | ✦ Date| *`=this.date`* |
> > | ✦ Game | *`=this.gameDate`* |
> 
> > *`=this.summary`*
> 
> > [!blank]
> > ### Party 
> > -
>
> > [!todo|cyan no-title no-icon]
> > -
>
> > [!todo|brown no-title no-icon]
> > ## Locations
> > -
> 
> > [!todo|green no-title no-icon] 
> > ## People 
> > -
> 

## Log

## ✧ Questions & Mysteries

<!-- Record unanswered questions raised during play. Link recurring mysteries to dedicated notes; keep theories elsewhere. -->

