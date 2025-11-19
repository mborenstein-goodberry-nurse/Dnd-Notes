---
type: Vehicle
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
summary:
status:
tags:
---

# [[<% tp.file.title %>]]

#### Overview 
![Placeholder Iconography|200x140](ImagePlaceholder.png)

**Transport Medium**: `INPUT[inlineSelect(option(Land), option(Water), option(Air), option(Space), option(Time), option(Dimensional), option(Other)):transport]`
**Transport Type**: `INPUT[inlineSelect(option(Animal), option(Cart), option(Construct), option(Ship), option(Airship), option(Spaceship), option(Timeship), option(Other)):transportType]`
**Status**: `INPUT[text:status]`
**Summary**: `INPUT[text:summary]`

#### Features


#### Stats 
```statblock
name: VehicleName
stats: [10, 10, 10, 10, 10, 10]
size: Large
damage_resistances: poison
damage_immunities: psychic
speed: 60 ft
dice: true
actions:
  - name: Test
    desc: "Test action with `dice: 3d8 * 5` integrated"
```

### Notes
