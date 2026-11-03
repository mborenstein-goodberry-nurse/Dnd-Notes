---
type: Map
date: 04-30-2026
world: Astodan
campaigns:
- Sands of Desolation
---
```leaflet  
markerFolder: Worlds/Astodan/Places
id: Astrodan ### Must be unique with no spaces  
image: [[Astrodan_Updated.jpg]] ### Link to the map image file. Do not add a ! in front of the image  
bounds: [[0,0], [1536, 2048]] ### Size of the map in px Height_y, Width_x. Ignore 0,0    
height: 500px ### Size of the leaflet embed in px on your screen
width: 95% ### Size of the leaflet embed in your note  
lat: 768 ### To center the map, make this half of the map height.  
long: 1024 ### To center the map, make this half of the map width.  
minZoom: -1.5 ### Controls how far away from the map you can zoom out. Hover over the target icon to see the current level.  
maxZoom: .5 ### Controls how far towards the map you can zoom in. Hover over the target icon to see the current level.  
defaultZoom: -1.5 ### Sets the default zoom level when the map loads. Hover over the target icon to see the current level.  
zoomDelta: 0.25 ### Adjust how much the zoom changes when you zoom in or out.  
unit: feet ### The value displayed when measuring so you know what type of unit is being measure.  
scale: 1.0416666666666667 ### Real units/px (resolution) of your map  
recenter: false  
darkmode: false ### marker
```
