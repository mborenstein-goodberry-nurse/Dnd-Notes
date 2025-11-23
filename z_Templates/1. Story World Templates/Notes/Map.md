---
type: map
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
---
```leaflet
id: <% tp.file.title %>
image: [[ImagePlaceholder.png]]
bounds: 
 - [0,0]
 - [192,256]
unit: miles
lat: 96
long: 128
minZoom: 1
maxZoom: 10
defaultZoom: 1.5
zoomDelta: 0.5
recenter: true
```
