# Plain District-Based Map Implementation

## Overview

The map has been updated to use a **plain district-based style** instead of OpenStreetMap raster tiles. This creates a clean, minimalist visualization showing only district boundaries with a simple background.

## What Changed

### Before
- Used OpenStreetMap raster tiles with roads, buildings, and terrain
- External dependency on tile servers
- Busy background that competed with data visualization

### After
- Plain light gray background (`#f5f5f5`)
- District boundaries loaded from GeoJSON
- Clean, simple appearance focusing on the data
- No external tile dependencies (except for the map library itself)

---

## Implementation Details

### 1. Map Style Configuration

**File:** `src/components/BalochistanDoctorMap.jsx`

The map now uses a plain background instead of raster tiles:

```javascript
style: {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#f5f5f5", // Light gray background
      },
    },
  ],
}
```

### 2. GeoJSON Data Source

**Location:** `public/Balochistan.geojson`

The district boundaries are loaded from the GeoJSON file:

```javascript
fetch("/Balochistan.geojson")
  .then((response) => response.json())
  .then((geojson) => {
    map.current.addSource("districts", {
      type: "geojson",
      data: geojson,
    });
    // ... add layers
  });
```

### 3. District Visualization Layers

Two layers are added to visualize the districts:

#### Layer 1: District Fills
- **ID:** `district-fills`
- **Type:** `fill`
- **Color:** `#81c784` (Green)
- **Opacity:** `0.4`
- **Purpose:** Shows the district areas

#### Layer 2: District Boundaries
- **ID:** `district-boundaries`
- **Type:** `line`
- **Color:** `#2d5016` (Dark green)
- **Width:** `1.5px`
- **Opacity:** `0.8`
- **Purpose:** Shows district borders clearly

---

## Customization Guide

### Change Background Color

Edit the background layer in the map style:

```javascript
{
  id: "background",
  type: "background",
  paint: {
    "background-color": "#ffffff", // Change to white, gray, or any color
  },
}
```

**Recommended colors:**
- `#f5f5f5` - Light gray (current)
- `#ffffff` - Pure white
- `#e5e7eb` - Slightly darker gray
- `#f0f9ff` - Light blue tint
- `#fafaf9` - Warm white

### Change District Colors

#### Option A: Single Color for All Districts

Edit the `district-fills` layer:

```javascript
map.current.addLayer({
  id: "district-fills",
  type: "fill",
  source: "districts",
  paint: {
    "fill-color": "#your-color-here",
    "fill-opacity": 0.4,
  },
});
```

#### Option B: Color by Doctor Count

Use data-driven styling based on the `name` property in GeoJSON:

```javascript
map.current.addLayer({
  id: "district-fills",
  type: "fill",
  source: "districts",
  paint: {
    "fill-color": [
      "match",
      ["get", "name"], // Get district name from GeoJSON
      "Quetta", "#81c784",      // 14 doctors - darker green
      "Kharan", "#a5d6a7",      // 2 doctors - medium green
      "Naseerabad", "#a5d6a7",  // 2 doctors
      "Chaman", "#a5d6a7",      // 2 doctors
      "#c8e6c9"                 // 1 doctor - light green (default)
    ],
    "fill-opacity": 0.5,
  },
});
```

#### Option C: Color Gradient by Doctor Count

Create a continuous color scale:

```javascript
paint: {
  "fill-color": [
    "interpolate",
    ["linear"],
    ["get", "doctors"], // Requires adding doctor count to GeoJSON properties
    1, "#c8e6c9",  // Light green for 1 doctor
    5, "#81c784",  // Medium green for 5 doctors
    14, "#388e3c" // Dark green for 14 doctors
  ],
  "fill-opacity": 0.5,
}
```

### Change Boundary Lines

Edit the `district-boundaries` layer:

```javascript
map.current.addLayer({
  id: "district-boundaries",
  type: "line",
  source: "districts",
  paint: {
    "line-color": "#2d5016",    // Line color
    "line-width": 1.5,          // Line thickness
    "line-opacity": 0.8,        // Line transparency
    "line-dasharray": [2, 2],   // Optional: dashed lines
  },
});
```

**Line style options:**
- Solid: Remove `line-dasharray`
- Dashed: `"line-dasharray": [4, 2]`
- Dotted: `"line-dasharray": [1, 2]`
- Thicker: `"line-width": 2` or `3`
- Thinner: `"line-width": 1` or `0.5`

---

## Color Schemes

### Matching the Reference Image

The reference image shows a green color scheme. Here are the exact settings:

```javascript
// District fills
"fill-color": "#81c784",  // Material Design Green 300
"fill-opacity": 0.4,

// District boundaries
"line-color": "#2d5016",  // Dark green
"line-width": 1.5,
```

### Alternative Color Schemes

#### Blue Theme
```javascript
"fill-color": "#64b5f6",     // Light blue
"line-color": "#1565c0",     // Dark blue
```

#### Purple Theme (original)
```javascript
"fill-color": "#a78bfa",     // Light purple
"line-color": "#6d28d9",     // Dark purple
```

#### Neutral/Gray Theme
```javascript
"fill-color": "#9ca3af",     // Gray
"line-color": "#374151",     // Dark gray
```

#### Red/Heat Theme
```javascript
"fill-color": "#f87171",     // Light red
"line-color": "#b91c1c",     // Dark red
```

---

## Adding District Names as Labels

To add text labels on each district:

```javascript
// After adding the boundary layers, add a symbol layer
map.current.addLayer({
  id: "district-labels",
  type: "symbol",
  source: "districts",
  layout: {
    "text-field": ["get", "name"], // Get name from GeoJSON properties
    "text-font": ["Open Sans Regular"],
    "text-size": 12,
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#1f2937",      // Dark gray text
    "text-halo-color": "#ffffff",  // White outline
    "text-halo-width": 2,
  },
});
```

---

## Performance Considerations

### Benefits of Plain Map Style

1. **Faster Loading:** No tile downloads required
2. **Offline Capable:** Works without internet (once GeoJSON is loaded)
3. **Lower Bandwidth:** Only one GeoJSON file vs. many tile images
4. **Consistent Rendering:** Same appearance at all zoom levels
5. **Full Control:** Complete styling control without tile constraints

### GeoJSON Optimization

If the GeoJSON file is large (>1MB), consider:

1. **Simplification:** Reduce coordinate precision
   ```bash
   mapshaper Balochistan.geojson -simplify 10% -o simplified.geojson
   ```

2. **Compression:** Use gzip compression on the server

3. **Split by District:** Load individual district files on demand

---

## Troubleshooting

### Districts Not Showing

1. **Check GeoJSON file exists:** Verify `public/Balochistan.geojson` is present
2. **Check console for errors:** Open browser DevTools Console
3. **Verify GeoJSON format:** Ensure it's valid GeoJSON
4. **Check coordinates:** Ensure they're in [longitude, latitude] format

### Colors Not Matching

1. **Check layer order:** Fills should be added before boundaries
2. **Verify opacity:** Lower opacity makes colors appear lighter
3. **Check background color:** Background affects how fill colors appear

### Performance Issues

1. **Simplify geometry:** Use tools like mapshaper to reduce coordinates
2. **Reduce opacity:** Lower opacity = faster rendering
3. **Limit zoom levels:** Set minzoom/maxzoom on layers

---

## File Structure

```
district-map/
├── public/
│   └── Balochistan.geojson          # District boundaries data
├── src/
│   └── components/
│       ├── BalochistanDoctorMap.jsx # Main map component
│       └── BalochistanDoctorMap.css # Map styling
└── PLAIN_MAP_IMPLEMENTATION.md      # This file
```

---

## Next Steps

### Enhance District Coloring

Add doctor count to GeoJSON properties and color districts accordingly:

1. Update `Balochistan.geojson` to include doctor data:
   ```json
   {
     "type": "Feature",
     "properties": {
       "name": "Quetta",
       "doctors": 14
     },
     "geometry": { ... }
   }
   ```

2. Use data-driven styling (see "Option C" above)

### Add Interactivity

1. **Click to highlight:** Select districts on click
2. **Hover effects:** Change color/opacity on hover
3. **Filter controls:** Show/hide districts by criteria

### Export Capabilities

Add buttons to:
- Download map as PNG
- Export data as CSV
- Print-friendly view

---

## Resources

- **MapLibre GL JS Docs:** https://maplibre.org/maplibre-gl-js/docs/
- **GeoJSON Spec:** https://geojson.org/
- **MapShaper (simplify GeoJSON):** https://mapshaper.org/
- **Color Picker:** https://colorhunt.co/ or https://coolors.co/

---

**Status:** ✅ Implemented and working

**Last Updated:** 2025

**Maintainer:** Add your name/team here