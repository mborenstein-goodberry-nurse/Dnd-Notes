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
tags: inbox
art: ""
---
# [[<% tp.file.title %>]]

## Session Summary

 > [!tldr] [[<% tp.file.title %>]]
>  ^summary

---

## Log
