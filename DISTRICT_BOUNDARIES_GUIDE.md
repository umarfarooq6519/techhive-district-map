# District Boundaries Implementation Guide

## Overview

The map now displays **proper district structure** with individual district polygons, internal boundaries, and color-coded districts based on doctor counts.

---

## What's New

### Before
- Single province boundary
- No internal district divisions
- Uniform green color

### After
- ✅ **11 Individual Districts** - Each district as a separate polygon
- ✅ **Internal Boundaries** - White lines separating districts
- ✅ **Color-Coded Districts** - Each district has unique color from legend
- ✅ **District Labels** - Names displayed on each district
- ✅ **Clear Structure** - Easy to see district divisions

---

## Visual Structure

### Layer Stack (bottom to top):
1. **Background** - Light gray (`#f5f5f5`)
2. **District Fills** - Color-coded polygons with 50% opacity
3. **District Boundaries** - White lines (2px) between districts
4. **District Outlines** - Thin dark green outline (0.5px)
5. **District Labels** - Black text with white halo
6. **Doctor Markers** - Circles on top with counts

---

## District Colors

Each district has a unique color matching the legend:

| District           | Color     | Hex       | Doctors |
|--------------------|-----------|-----------|---------|
| Quetta             | Green     | #81c784   | 14      |
| Panjgur            | Red       | #e57373   | 1       |
| Nushki             | Purple    | #ba68c8   | 1       |
| Ziarat             | Blue      | #64b5f6   | 1       |
| Khuzdar            | Yellow    | #ffd54f   | 1       |
| Dera Murad Jamali  | Cyan      | #4dd0e1   | 1       |
| Kharan             | Pink      | #f06292   | 2       |
| Naseerabad         | Purple    | #9575cd   | 2       |
| Sibbi              | Orange    | #ffb74d   | 1       |
| Chaman             | Lt Green  | #aed581   | 2       |
| Kech               | Lt Blue   | #4fc3f7   | 1       |

---

## Implementation Details

### Data Source
**File:** `public/balochistan-districts.geojson`

Contains 11 district features, each with:
- `name` - District name
- `district_id` - Short code
- `doctors` - Doctor count
- `geometry` - Polygon coordinates

### Layer Configuration

#### 1. District Fills
```javascript
{
  id: "district-fills",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", "name"],
      "Quetta", "#81c784",
      "Kharan", "#f06292",
      // ... etc
      "#c8e6c9" // default
    ],
    "fill-opacity": 0.5
  }
}
```

#### 2. Internal Boundaries (White Lines)
```javascript
{
  id: "district-boundaries",
  type: "line",
  paint: {
    "line-color": "#ffffff",
    "line-width": 2,
    "line-opacity": 0.9
  }
}
```

#### 3. Outer Outlines (Dark Green)
```javascript
{
  id: "district-boundaries-outline",
  type: "line",
  paint: {
    "line-color": "#2d5016",
    "line-width": 0.5,
    "line-opacity": 0.6
  }
}
```

#### 4. District Labels
```javascript
{
  id: "district-labels",
  type: "symbol",
  layout: {
    "text-field": ["get", "name"],
    "text-size": 12,
    "text-anchor": "center"
  },
  paint: {
    "text-color": "#1f2937",
    "text-halo-color": "#ffffff",
    "text-halo-width": 2
  }
}
```

---

## Customization Options

### Change Boundary Color

**White boundaries (current):**
```javascript
"line-color": "#ffffff"
```

**Alternative colors:**
- `#000000` - Black (strong contrast)
- `#cccccc` - Light gray (subtle)
- `#2d5016` - Dark green (matches theme)
- `#1f2937` - Dark gray (professional)

### Change Boundary Thickness

**Current:** `"line-width": 2`

**Options:**
- `1` - Thin lines (subtle)
- `2` - Normal (current)
- `3` - Thick (bold)
- `4` - Very thick (prominent)

### Change Boundary Style

**Solid (current):** No dash array

**Dashed:**
```javascript
"line-dasharray": [4, 2]  // 4px dash, 2px gap
```

**Dotted:**
```javascript
"line-dasharray": [1, 2]  // 1px dot, 2px gap
```

### Hide District Labels

Remove or comment out the `district-labels` layer:
```javascript
// map.current.addLayer({
//   id: "district-labels",
//   ...
// });
```

### Change Label Size

**Current:** `"text-size": 12`

**Options:**
- `10` - Smaller
- `14` - Larger
- `16` - Much larger

### Change Label Color

**Current:** `"text-color": "#1f2937"` (dark gray)

**Options:**
- `#000000` - Black (stronger)
- `#ffffff` - White (for dark fills)
- `#2d5016` - Dark green
- District-specific colors using `match` expression

---

## Using Real District Data

### Current Status
The current GeoJSON uses **simplified rectangular polygons** for demonstration. These are approximate district locations.

### To Use Real Boundaries

1. **Obtain real district GeoJSON:**
   - Pakistan government GIS data
   - OpenStreetMap boundaries
   - GADM database (https://gadm.org/)
   - Humanitarian Data Exchange

2. **Replace the file:**
   ```bash
   # Backup current file
   cp public/balochistan-districts.geojson public/balochistan-districts-simple.geojson
   
   # Add your real data
   cp /path/to/real-data.geojson public/balochistan-districts.geojson
   ```

3. **Ensure GeoJSON properties include:**
   ```json
   {
     "properties": {
       "name": "Quetta",  // District name (required)
       "doctors": 14       // Optional: for data-driven styling
     }
   }
   ```

4. **Update color matching if needed:**
   - If district names differ, update the `match` expression in the component

---

## District Data Structure

### Minimum Required Properties
```json
{
  "type": "Feature",
  "properties": {
    "name": "Quetta"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[...]]]
  }
}
```

### Recommended Properties
```json
{
  "type": "Feature",
  "properties": {
    "name": "Quetta",
    "district_id": "QTA",
    "doctors": 14,
    "population": 2275699,
    "area_km2": 2653
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[...]]]
  }
}
```

---

## Styling Tips

### Highlight Specific Districts

Add a hover effect layer:
```javascript
map.current.addLayer({
  id: "district-hover",
  type: "fill",
  source: "districts",
  paint: {
    "fill-color": "#ffffff",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.3,
      0
    ]
  }
});

// Add hover listener
let hoveredDistrictId = null;

map.current.on("mousemove", "district-fills", (e) => {
  if (e.features.length > 0) {
    if (hoveredDistrictId) {
      map.current.setFeatureState(
        { source: "districts", id: hoveredDistrictId },
        { hover: false }
      );
    }
    hoveredDistrictId = e.features[0].id;
    map.current.setFeatureState(
      { source: "districts", id: hoveredDistrictId },
      { hover: true }
    );
  }
});
```

### Color by Data Value

Use doctor count for gradient:
```javascript
"fill-color": [
  "interpolate",
  ["linear"],
  ["get", "doctors"],
  1, "#c8e6c9",   // 1 doctor - light green
  7, "#81c784",   // 7 doctors - medium green
  14, "#388e3c"   // 14 doctors - dark green
]
```

### Add Shadow/Depth Effect

Add multiple boundary layers:
```javascript
// Shadow layer
map.current.addLayer({
  id: "district-shadow",
  type: "line",
  source: "districts",
  paint: {
    "line-color": "#000000",
    "line-width": 3,
    "line-opacity": 0.2,
    "line-offset": 2
  }
});
```

---

## Performance Optimization

### Simplify Geometry

If using complex real boundaries:
```bash
# Using mapshaper
mapshaper input.geojson -simplify 5% -o output.geojson

# Or online at https://mapshaper.org/
```

### Reduce File Size
```bash
# Remove unnecessary properties
mapshaper input.geojson -filter-fields name,doctors -o output.geojson

# Compress coordinates
mapshaper input.geojson -o precision=0.0001 output.geojson
```

---

## Troubleshooting

### Districts Not Showing
1. **Check file exists:** `public/balochistan-districts.geojson`
2. **Verify JSON syntax:** Use online validator or `python -m json.tool`
3. **Check console:** Look for fetch errors in browser DevTools
4. **Verify coordinates:** Should be `[longitude, latitude]` format

### Boundaries Not Visible
1. **Check line color:** White lines on white background won't show
2. **Increase line width:** Try `"line-width": 3`
3. **Check layer order:** Boundaries should be above fills
4. **Verify opacity:** Should be > 0.5 for visibility

### Labels Not Showing
1. **Check text-field:** Ensure `["get", "name"]` matches property
2. **Increase text-size:** Try `14` or `16`
3. **Check text-color:** Ensure contrast with background
4. **Verify zoom level:** Labels may have min/max zoom

### Colors Not Matching
1. **Check property names:** `["get", "name"]` must match GeoJSON
2. **Verify match expression:** District names must be exact
3. **Check default color:** Last value in match array is default
4. **Case sensitivity:** "Quetta" ≠ "quetta"

---

## Examples

### Minimal Boundaries (Gray on White)
```javascript
// Background
"background-color": "#ffffff"

// Districts
"fill-color": "#e0e0e0"
"fill-opacity": 0.3

// Boundaries
"line-color": "#757575"
"line-width": 1
```

### High Contrast (Black Boundaries)
```javascript
// Boundaries
"line-color": "#000000"
"line-width": 2.5
"line-opacity": 1.0
```

### Subtle Style (Thin Gray Lines)
```javascript
// Boundaries
"line-color": "#cccccc"
"line-width": 0.5
"line-opacity": 0.5
```

---

## Resources

- **MapLibre Style Spec:** https://maplibre.org/maplibre-style-spec/
- **GeoJSON Validator:** https://geojsonlint.com/
- **Mapshaper (simplify):** https://mapshaper.org/
- **GADM (boundaries):** https://gadm.org/
- **OpenStreetMap:** https://www.openstreetmap.org/

---

## Next Steps

1. **Get real district boundaries** from official sources
2. **Add more data properties** (population, area, etc.)
3. **Implement click interactions** (show details panel)
4. **Add district search/filter** functionality
5. **Export map as image** or PDF

---

**Status:** ✅ Implemented with 11 districts and color-coded boundaries

**Last Updated:** 2025