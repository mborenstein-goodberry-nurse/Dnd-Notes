---
type: session
campaign: <% tp.user.getThisWorld(tp) %>
world:
sessionNum: <% tp.user.getThisGameNum(tp) %>
location:
date: <% tp.date.now("YYYY-MM-DD") %>
fc-calendar: <% tp.user.getThisWorld(tp) %>
fc-date:
  year: <% tp.user.getThisDate(tp)[0] %>
  month: <% tp.user.getThisDate(tp)[1] %>
  day: <% tp.user.getThisDate(tp)[2] %>
fc-category: Sessions
long_rest: false
short_rest: false
summary: ""
tags:
art: ""
banner: z_Assets/Campfire Night.jpg
banner-fade: -70
banner-radius: 38
banner-x: 53
banner-y: 37
pixel-banner-flag-color: blue
---
# [[<% tp.file.title %>]]
*`=this.summary`*

## Session Summary

 > [!tldr] [[<% tp.file.title %>]]
>  ^summary


## Recap

![[<% tp.user.getLastGameTitle(tp) %>#Session Summary]]

## Log
