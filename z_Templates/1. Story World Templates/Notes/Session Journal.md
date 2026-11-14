---
<%*
// Use the campaign's name to select its matching Calendarium calendar.
const campaignCalendar = tp.user.getThisCampaign(tp);
let calendarAPI = null;
try {
    calendarAPI = window.Calendarium?.getAPI?.(campaignCalendar) ?? null;
} catch (error) {
    // Calendarium throws when a named calendar does not exist.
    console.warn(`No Calendarium calendar for "${campaignCalendar}":`, error);
}

if (!calendarAPI) {
    throw new Error(`No Calendarium calendar named "${campaignCalendar}" was found. Open Settings > Calendarium, create a calendar with that exact name, set its current date, then create a new Session Journal.`);
}

// Capture the in-game date ONCE when this session note is created.
const sessionCalDate = calendarAPI.getCurrentDate();
if (!sessionCalDate || ![sessionCalDate.year, sessionCalDate.month, sessionCalDate.day].every(Number.isFinite)) {
    throw new Error(`Calendarium returned no valid current date for "${campaignCalendar}".`);
}

const sessionCalDateDisplay = calendarAPI.toDisplayDate(sessionCalDate);
-%>
type: Session Journal
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
sessionNum: <% tp.user.getThisGameNum(tp) %>
fc-calendar: <% campaignCalendar %>
fc-date:
  year: <% sessionCalDate.year %>
  month: <% sessionCalDate.month + 1 %>
  day: <% sessionCalDate.day %>
gameDate: <% JSON.stringify(sessionCalDateDisplay) %>
fc-category: Sessions
summary:
<%* tR += await tp.user.getCampaignBanner(tp, 380) -%>
tags:
---
<div class="session-hero">
  <img class="session-hero-frame" src="z_Assets/System/Medieval-Banner.png" alt="">
</div> 
<% await tp.file.rename(`Session `+tp.user.getThisGameNum(tp)) %>

## ✧ Session Notes
> [!fas-infobox|full-width no-title session-dashboard] Session Overview
> ## ✧ Session Overview ✧
> | ✦ Session | ✦ Date | ✦ In-game date |
> |:---|:---|:---|
> | *Session `=this.sessionNum`* | *`=this.date`* | *`=this.gameDate`* |
>
> *`=this.summary`*
>
> > [!note|session-cards no-icon]+ Session details — Party · Locations · People · Gains & Conditions
> >
> > > [!grid|col-2]
> > > > [!todo|cyan no-title no-icon]
> > > > ### Party
> > > > -
> > >
> > > > [!todo|brown no-title no-icon]
> > > > ### Locations
> > > > -
> >
> > > [!grid|col-2]
> > > > [!todo|green no-title no-icon]
> > > > ### People
> > > > -
> > >
> > > > [!todo|purple no-title no-icon]
> > > > ### Gains & Conditions
> > > > -
>
> > [!tip|session-scenes]- Detailed scene overview (expand)
> > -
>
<%*
const previousSessionLink = tp.user.getLastGameTitleAlias(tp);
if (previousSessionLink && previousSessionLink !== "No games found") {
    tR += `> > [!footer]\n> > **Previous Session:** [[${previousSessionLink}]]\n`;
}
-%>

## Log

## ✧ Questions & Mysteries

<!-- Record unanswered questions raised during play. Link recurring mysteries to dedicated notes; keep theories elsewhere. -->
