---
type: Map
date: 10-23-2026
world: What Lies Beneath
campaign: What Lies Beneath
map_height_y: 2048
map_width_x: 2048
scale_pixels: 48
scale_pixels_range: 50
mapCalc1: 1.0416666666666667
mapUnit: miles
mapDisplayHeight: 500
mapMinZoom: -1.5
mapMaxZoom: 1
mapDefaultZoom: -1.5
mapZoomDelta: 0.25
mapMarkerMode: assigned
mapImage: z_Assets/What Lies Beneath/World Map.jpg
description: Map of the Continent of [[Dehl`Rune]]
---

# Dehl`Rune Map

```leaflet
id: what-lies-beneath-dehl-rune-map
image: [[z_Assets/What Lies Beneath/World Map.jpg]]
bounds: [[0,0], [2048,2048]]
height: 500px
width: 95%
lat: 1024
long: 1024
minZoom: -1.5
maxZoom: 1
defaultZoom: -1.5
zoomDelta: 0.25
unit: miles
scale: 1.0416666666666667
recenter: false
darkMode: false
linksTo: [[Dehl`Rune Map]]
# markerFolder: Worlds/What Lies Beneath/Places
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
