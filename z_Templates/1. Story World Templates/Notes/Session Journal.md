---
type: Session Journal
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
sessionNum: <% tp.user.getThisGameNum(tp) %>
fc-calendar: <% tp.user.getThisCampaign(tp) %>
fc-date:
  year: <% tp.user.getThisDate(tp)[0] %>
  month: <% tp.user.getThisDate(tp)[1] %>
  day: <% tp.user.getThisDate(tp)[2] %>
fc-category: Sessions
summary:
tags:
---
<div class="session-hero">
  <img class="session-hero-frame" src="z_Assets/System/Medieval-Banner.png" alt="">
</div> 
<% await tp.file.rename(`Session `+tp.user.getThisGameNum(tp)) %>

## ✧ Session Notes
> [!fas-infobox|right no-title] Session Overview
> ## ✧ Session Overview ✧
> > [!blank]
> > |   |   | 
> > | --- | --- |
> > | ✦ Session | *Session `=this.sessionNum`* |
> > | ✦ Date| *`=this.date`* |
> > | ✦ Game | *`=this.fc-date`* |`*
> 
> > *`=this.summary`*
> 
> > [!blank]
> > ### Party 
> > - Me
>
> > [!todo|cyan no-title no-icon]
> > - Gains scene 1
> > ---
> > - Gains scene 2
>
> > [!todo|brown no-title no-icon]
> > ## Locations
> > - Places <span class="new-tag">new</span>
> 
> > [!todo|green no-title no-icon] 
> > ## People 
> > - Person 
> 
> > [!footer] 
> > ## Previous Session 
> > [[<% tp.user.getLastGameTitleAlias(tp) %>]]

## Log
