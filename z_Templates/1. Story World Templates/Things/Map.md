---
type: Map
date: <% tp.date.now("MM-DD-YYYY") %>
world: "{{VALUE:world}}"
campaign: "{{VALUE:campaign}}"
map_height_y: 748
map_width_x: 1080
scale_pixels: 48
scale_pixels_range: 50
mapCalc1: 1.0416666666666667
mapUnit: miles
mapDisplayHeight: 500
mapMinZoom: -0.5
mapMaxZoom: 1
mapDefaultZoom: -0.5
mapZoomDelta: 0.25
mapMarkerMode: assigned
---

# <% tp.file.title %>

```leaflet
id: <% (`{{VALUE:world}}-${tp.file.title}`).toLowerCase().replace(/[^a-z0-9]+/g, "-") %>
image: [[z_Assets/System/Template Map.jpg]]
bounds: [[0,0], [748,1080]]
height: 500px
width: 95%
lat: 374
long: 540
minZoom: -0.5
maxZoom: 1
defaultZoom: -0.5
zoomDelta: 0.25
unit: miles
scale: 1.0416666666666667
recenter: false
darkMode: false
linksTo: [[Map]]
# markerFolder: Worlds/{{VALUE:world}}/Places
```

> [!note]- ✧ Map Setup
> **Map Dimensions**
>
> Width (px): `INPUT[number:map_width_x]`
>
> Height (px): `INPUT[number:map_height_y]`
>
> Center Latitude: `VIEW[{map_height_y} / 2][math]`
>
> Center Longitude: `VIEW[{map_width_x} / 2][math]`
>
> **Distance Scale**
>
> Pixels in Scale: `INPUT[number:scale_pixels]`
> 
> Map Units: `INPUT[inlineSelect(option(feet), option(miles), option(km), option(meters)):mapUnit]`
>
> Units in Scale: `INPUT[number:scale_pixels_range]`
>
> Units per Pixel: `VIEW[{scale_pixels_range} / {scale_pixels}][math:mapCalc1]`
>
> **Display**
> 
> Map Image: `INPUT[imageSuggester(optionQuery("z_Assets")):mapImage]`
>
> Map Height (px): `INPUT[number:mapDisplayHeight]`
>
> Minimum Zoom: `INPUT[number:mapMinZoom]`
>
> Maximum Zoom: `INPUT[number:mapMaxZoom]`
>
> Default Zoom: `INPUT[number:mapDefaultZoom]`
>
> Zoom Increment: `INPUT[number:mapZoomDelta]`
> ### Markers
> 
> Marker Discovery: `INPUT[inlineSelect(option(assigned, Assigned Places), option(all, All World Places), option(manual, Manual Only)):mapMarkerMode]`
> 
> ```button
> name Apply Map Settings 
> type command
> action QuickAdd: Macro - Apply Map Settings 
> ```

## Map Notes
