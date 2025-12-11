# Map Layer Structure - Visual Reference

## 🎨 Complete Layer Stack (Bottom to Top)

```
┌─────────────────────────────────────────┐
│  7. HOVER TOOLTIPS (on interaction)     │  ← Popup windows
│     • Show district name + doctor count │
│     • Appear on marker hover            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  6. DOCTOR MARKERS (DOM elements)       │  ← Circular markers
│     • Sized by doctor count             │
│     • Color-coded by district           │
│     • Numbers inside circles            │
│     • District labels below circles     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  5. DISTRICT LABELS (symbol layer)      │  ← Text on map
│     ID: "district-labels"               │
│     • District names                    │
│     • Black text (#1f2937)              │
│     • White halo (2px)                  │
│     • Size: 12px                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  4. OUTER OUTLINES (line layer)         │  ← Subtle definition
│     ID: "district-boundaries-outline"   │
│     • Dark green (#2d5016)              │
│     • Width: 0.5px                      │
│     • Opacity: 60%                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  3. INTERNAL BOUNDARIES (line layer)    │  ← White separators
│     ID: "district-boundaries"           │
│     • White (#ffffff)                   │
│     • Width: 2px                        │
│     • Opacity: 90%                      │
│     • Separates districts clearly       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  2. DISTRICT FILLS (fill layer)         │  ← Colored polygons
│     ID: "district-fills"                │
│     • Color-coded by district:          │
│       - Quetta: Green (#81c784)         │
│       - Kharan: Pink (#f06292)          │
│       - Naseerabad: Purple (#9575cd)    │
│       - Chaman: Lt Green (#aed581)      │
│       - Panjgur: Red (#e57373)          │
│       - Nushki: Purple (#ba68c8)        │
│       - Ziarat: Blue (#64b5f6)          │
│       - Khuzdar: Yellow (#ffd54f)       │
│       - DMJ: Cyan (#4dd0e1)             │
│       - Sibbi: Orange (#ffb74d)         │
│       - Kech: Lt Blue (#4fc3f7)         │
│     • Opacity: 50%                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  1. BACKGROUND (background layer)       │  ← Base layer
│     ID: "background"                    │
│     • Light gray (#f5f5f5)              │
│     • Plain, no patterns                │
└─────────────────────────────────────────┘
```

---

## 📊 Layer Details

### Layer 1: Background
**Type:** `background`  
**Purpose:** Plain base for the map  
**Style:**
```javascript
{
  id: "background",
  type: "background",
  paint: {
    "background-color": "#f5f5f5"
  }
}
```

---

### Layer 2: District Fills
**Type:** `fill`  
**Source:** `districts` (GeoJSON)  
**Purpose:** Show each district as colored polygon  
**Style:**
```javascript
{
  id: "district-fills",
  type: "fill",
  source: "districts",
  paint: {
    "fill-color": [match expression with 11 district colors],
    "fill-opacity": 0.5
  }
}
```

**Colors:**
- 🟢 Quetta (14 doctors) - Green
- 🩷 Kharan (2 doctors) - Pink
- 🟣 Naseerabad (2 doctors) - Purple
- 🍏 Chaman (2 doctors) - Light Green
- 🔴 Panjgur (1 doctor) - Red
- 🟣 Nushki (1 doctor) - Purple
- 🔵 Ziarat (1 doctor) - Blue
- 🟡 Khuzdar (1 doctor) - Yellow
- 🩵 Dera Murad Jamali (1 doctor) - Cyan
- 🟠 Sibbi (1 doctor) - Orange
- 🩵 Kech (1 doctor) - Light Blue

---

### Layer 3: Internal Boundaries
**Type:** `line`  
**Source:** `districts` (GeoJSON)  
**Purpose:** Separate districts with clear white lines  
**Style:**
```javascript
{
  id: "district-boundaries",
  type: "line",
  source: "districts",
  paint: {
    "line-color": "#ffffff",
    "line-width": 2,
    "line-opacity": 0.9
  }
}
```

**Visual:** Draws **white lines** along the edges of each district polygon.

---

### Layer 4: Outer Outlines
**Type:** `line`  
**Source:** `districts` (GeoJSON)  
**Purpose:** Subtle outer boundary definition  
**Style:**
```javascript
{
  id: "district-boundaries-outline",
  type: "line",
  source: "districts",
  paint: {
    "line-color": "#2d5016",
    "line-width": 0.5,
    "line-opacity": 0.6
  }
}
```

**Visual:** Very thin **dark green** lines for extra definition.

---

### Layer 5: District Labels
**Type:** `symbol`  
**Source:** `districts` (GeoJSON)  
**Purpose:** Show district names on map  
**Style:**
```javascript
{
  id: "district-labels",
  type: "symbol",
  source: "districts",
  layout: {
    "text-field": ["get", "name"],
    "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
    "text-size": 12,
    "text-anchor": "center"
  },
  paint: {
    "text-color": "#1f2937",
    "text-halo-color": "#ffffff",
    "text-halo-width": 2,
    "text-halo-blur": 1
  }
}
```

**Visual:** Black text with white outline, centered on each district.

---

### Layer 6: Doctor Markers
**Type:** DOM Markers (not MapLibre layer)  
**Source:** `doctorData` array in component  
**Purpose:** Show doctor counts with visual markers  
**Implementation:**
```javascript
doctorData.forEach(({ district, doctors }) => {
  const markerEl = document.createElement("div");
  markerEl.className = "doctor-marker";
  // Sized based on doctor count
  // Contains number label
  new maplibregl.Marker({ element: markerEl })
    .setLngLat(coords)
    .addTo(map);
});
```

**Visual:** Circular bubbles with:
- Size proportional to doctor count (20px - 80px)
- Color matching district color
- Number label inside
- District name label below

---

### Layer 7: Hover Tooltips
**Type:** Popup (MapLibre GL JS component)  
**Purpose:** Show details on hover  
**Implementation:**
```javascript
const popup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: false
}).setHTML(`
  <div class="popup-content">
    <strong>${district}</strong><br/>
    Doctors: ${doctors}
  </div>
`);
```

**Visual:** White popup box appearing when hovering over markers.

---

## 🎯 Visual Hierarchy

### Z-Index Order:
```
High → Tooltips (temporary, on hover)
  ↑    Markers (always visible, DOM elements)
  ↑    Labels (always visible, MapLibre layer)
  ↑    Outer Outlines (subtle)
  ↑    Internal Boundaries (prominent)
  ↑    District Fills (colored)
Low →  Background (static)
```

---

## 🔍 Interaction Flow

1. **User loads page**
   - Background renders first (gray)
   - Districts fill with colors (50% opacity)
   - Boundaries draw (white lines)
   - Labels appear (black text)
   - Markers place on top (circles)

2. **User hovers over marker**
   - Tooltip appears above marker
   - Shows district name + doctor count

3. **User moves mouse away**
   - Tooltip disappears

4. **User zooms/pans**
   - All layers move together
   - Labels stay readable
   - Markers maintain positions

---

## 🎨 Color Relationships

### Background → Fills:
- **Background:** Light gray (#f5f5f5)
- **Fills:** Various colors at 50% opacity
- **Result:** Pastel appearance, soft colors

### Fills → Boundaries:
- **Fills:** Colored polygons
- **Boundaries:** White (2px)
- **Result:** Clear separation between districts

### Boundaries → Outlines:
- **Boundaries:** White (bright, 2px)
- **Outlines:** Dark green (subtle, 0.5px)
- **Result:** Defined edges with depth

### Labels → Background:
- **Labels:** Black text (#1f2937)
- **Halo:** White (2px)
- **Result:** Readable on any fill color

---

## 📏 Size Reference

### Line Widths:
- Internal boundaries: **2px** (prominent)
- Outer outlines: **0.5px** (subtle)

### Text Sizes:
- District labels: **12px** (readable)
- Doctor count in markers: **varies** (CSS controlled)

### Marker Sizes:
- Minimum: **20px** (1 doctor)
- Maximum: **80px** (14 doctors in Quetta)
- Formula: `20 + (doctors / 14) * 60`

### Opacity Values:
- District fills: **50%** (semi-transparent)
- Internal boundaries: **90%** (very visible)
- Outer outlines: **60%** (subtle)

---

## 🛠️ Customization Hierarchy

### To Change Background:
Edit Layer 1 (background) - affects overall mood

### To Change District Colors:
Edit Layer 2 (district-fills) - changes fill colors

### To Change Separation Lines:
Edit Layer 3 (district-boundaries) - affects white lines

### To Add/Remove Labels:
Edit Layer 5 (district-labels) - show/hide names

### To Adjust Markers:
Edit component code - change sizes, colors

---

## 📊 Data Flow

```
GeoJSON File (balochistan-districts.geojson)
  ↓
Loaded via fetch()
  ↓
Added as source: "districts"
  ↓
Used by 4 layers:
  - district-fills (polygons)
  - district-boundaries (lines)
  - district-boundaries-outline (lines)
  - district-labels (text)
  ↓
Markers placed on top using coordinates from doctorData
```

---

## 🎯 Quick Reference: Find in Code

| Element | File | Line (approx) |
|---------|------|---------------|
| Background | BalochistanDoctorMap.jsx | ~52 |
| District Fills | BalochistanDoctorMap.jsx | ~75 |
| Internal Boundaries | BalochistanDoctorMap.jsx | ~113 |
| Outer Outlines | BalochistanDoctorMap.jsx | ~124 |
| District Labels | BalochistanDoctorMap.jsx | ~136 |
| Doctor Markers | BalochistanDoctorMap.jsx | ~155+ |
| GeoJSON Load | BalochistanDoctorMap.jsx | ~64 |

---

## ✨ Pro Tips

1. **Layer order matters!** Layers are rendered in the order they're added
2. **Fills before lines** - Always add fill layers before line layers
3. **Labels on top** - Symbol layers render on top of other layers
4. **Markers above all** - DOM markers are outside the canvas, always on top
5. **Opacity for depth** - Use varying opacity to create visual hierarchy

---

**Last Updated:** 2025
**Map Running At:** http://localhost:5174/