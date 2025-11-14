---
type: Quest
campaign: <% tp.user.getThisWorld(tp) %>
world:
questNum: <% tp.user.getThisQuestNum(tp) %>
date: <% tp.date.now("MM-DD-YYYY") %>
pixel-banner-flag-color: blue
fc-category: Quests
status: Active
tags:
---
### [[<% tp.file.title %>]]
#### Overview 
This is your first quest: to set up the campaign! 

#### Progression
- [ ] Create a Calendar (Title it the Campaign's Title)
- [ ] Create your Character
	- [ ] Create Character in [[Campaign/<% tp.file.campaign %>/Da Party|Da Party]]
	- [ ] Link it in [[Campaign/<% tp.file.campaign %>/<% tp.file.campaign %>|The Campaign]]
- [ ] If there are any custom rules or modules:
	- [ ] Put them in World Almanac/Other
	- [ ] Link them in [[Campaign/<% tp.file.campaign %>/<% tp.file.campaign %>|The Campaign]]
- [ ] If there is a map available, create it in Maps
- [ ] Enjoy!

**Completed**: `INPUT[toggle(offValue(Active), onValue(Completed)):status]`

#### Rewards 
A complete experience

#### Additional Details 
