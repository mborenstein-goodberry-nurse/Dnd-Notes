---
type: session
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
sessionNum: <% tp.user.getThisGameNum(tp) %>
location:
fc-calendar: <% tp.user.getThisWorld(tp) %>
fc-date:
  year: <% tp.user.getThisDate(tp)[0] %>
  month: <% tp.user.getThisDate(tp)[1] %>
  day: <% tp.user.getThisDate(tp)[2] %>
fc-category: Sessions
long_rest: false
short_rest: false
summary: 
tags: inbox
art: ""
banner: z_Assets/Wizard Reading.jpg
pixel-banner-flag-color: blue-fade-light
banner-height: 350
---
# [[<% tp.file.title %>]]

## Session Summary

 > [!tldr] [[<% tp.file.title %>]]
>  ^summary

---

## Log
