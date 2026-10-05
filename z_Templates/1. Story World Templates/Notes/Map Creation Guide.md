---
date: <% tp.date.now("MM-DD-YYYY") %>
campaign: <% tp.user.getThisCampaign(tp) %>
world: <% tp.user.getThisWorld(tp) %>
map_height_y: 748
map_width_x: 1080
scale_pixels: 48
scale_pixels_range: 50
mapCalc1: 1.0416666666666667
---
[[How to Make a Map|For Guidance, see me]] 

> [!NOTE]- Quick Calculator  
> Map Width in Pixels: `INPUT[number:map_width_x]`  
> Map Height in Pixels: `INPUT[number:map_height_y]`  
> lat: `VIEW[{map_height_y} / 2][math]`  
> long: `VIEW[{map_width_x} / 2][math]`  
> How Many Pixels In Scale: `INPUT[number:scale_pixels]`  
> How Many Units in Scale: `INPUT[number:scale_pixels_range]`  
> Scale: `VIEW[1/({scale_pixels}/{scale_pixels_range})][math:mapCalc1]`

![[Template Map.jpg]]

```leaflet  
id: <%tp.date.now("MM-DD-YYYY")%>MapTemplate ### Must be unique with no spaces  
image: [[Template Map.jpg]] ### Link to the map image file. Do not add a ! in front of the image  
bounds: [[0,0], [748, 1080]] ### Size of the map in px Height_y, Width_x. Ignore 0,0    
height: 500px ### Size of the leaflet embed in px on your screen
width: 95% ### Size of the leaflet embed in your note  
lat: 374 ### To center the map, make this half of the map height.  
long: 540 ### To center the map, make this half of the map width.  
minZoom: -0.5 ### Controls how far away from the map you can zoom out. Hover over the target icon to see the current level.  
maxZoom: 1 ### Controls how far towards the map you can zoom in. Hover over the target icon to see the current level.  
defaultZoom: -0.5 ### Sets the default zoom level when the map loads. Hover over the target icon to see the current level.  
zoomDelta: 0.25 ### Adjust how much the zoom changes when you zoom in or out.  
unit: feet ### The value displayed when measuring so you know what type of unit is being measure.  
scale: 1.0416666666666667 ### Real units/px (resolution) of your map  
recenter: false  
darkmode: false ### marker
```
