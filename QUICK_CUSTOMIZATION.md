# Quick Customization Guide - Plain District Map

## 🎨 Change Colors (30 seconds)

### Background Color
**File:** `src/components/BalochistanDoctorMap.jsx` (Line ~52)

```javascript
paint: {
  "background-color": "#f5f5f5",  // ← Change this
}
```

**Options:**
- `#ffffff` - White
- `#f0f0f0` - Light gray (lighter)
- `#e8f5e9` - Very light green
- `#e3f2fd` - Light blue

---

### District Fill Color
**File:** `src/components/BalochistanDoctorMap.jsx` (Line ~75)

```javascript
paint: {
  "fill-color": "#81c784",  // ← Change this
  "fill-opacity": 0.4,      // ← Change this (0.0 - 1.0)
}
```

**Popular colors:**
- `#81c784` - Green (current)
- `#64b5f6` - Blue
- `#a78bfa` - Purple
- `#ffd54f` - Yellow
- `#f48fb1` - Pink

---

### District Boundary Color
**File:** `src/components/BalochistanDoctorMap.jsx` (Line ~84)

```javascript
paint: {
  "line-color": "#2d5016",  // ← Change this
  "line-width": 1.5,        // ← Change this (thicker/thinner)
}
```

**Options:**
- Thicker borders: `"line-width": 2` or `3`
- Thinner borders: `"line-width": 1` or `0.5`
- Dashed lines: Add `"line-dasharray": [4, 2]`

---

## 🗺️ Adjust Map View (15 seconds)

**File:** `src/components/BalochistanDoctorMap.jsx` (Line ~60)

```javascript
center: [66.0, 28.5],  // ← [longitude, latitude]
zoom: 6.5,             // ← Higher = more zoomed in
```

**Tips:**
- Zoom out: `zoom: 5` or `4`
- Zoom in: `zoom: 7` or `8`
- Move center: Use different coordinates

---

## 📍 Marker Customization

### Marker Colors
**File:** `src/components/BalochistanDoctorMap.jsx` (Line ~23-35)

```javascript
const districtColors = {
  Panjgur: "#e57373",    // ← Change these
  Nushki: "#ba68c8",
  // ... etc
}
```

### Marker Size Range
**File:** `src/components/BalochistanDoctorMap.jsx` (Line ~113-114)

```javascript
const baseSize = 20;   // ← Min size (small districts)
const maxSize = 80;    // ← Max size (Quetta)
```

---

## 🎯 Common Color Schemes

### Scheme 1: Blue Ocean
```javascript
// Background
"background-color": "#e3f2fd"

// Districts
"fill-color": "#64b5f6"
"line-color": "#1565c0"
```

### Scheme 2: Purple Royal
```javascript
// Background
"background-color": "#f3e5f5"

// Districts
"fill-color": "#a78bfa"
"line-color": "#6d28d9"
```

### Scheme 3: Red/Pink
```javascript
// Background
"background-color": "#fce4ec"

// Districts
"fill-color": "#f48fb1"
"line-color": "#c2185b"
```

### Scheme 4: Neutral Gray
```javascript
// Background
"background-color": "#f5f5f5"

// Districts
"fill-color": "#9ca3af"
"line-color": "#374151"
```

---

## 🔧 Quick Fixes

### Districts Too Bright?
Lower the opacity:
```javascript
"fill-opacity": 0.3,  // Was 0.4
```

### Borders Too Thin?
Increase line width:
```javascript
"line-width": 2.5,  // Was 1.5
```

### Want Dashed Borders?
Add dash array:
```javascript
"line-dasharray": [4, 2],  // [dash length, gap length]
```

### Can't See Districts?
1. Check file exists: `public/Balochistan.geojson`
2. Open browser console (F12) and check for errors
3. Try increasing opacity: `"fill-opacity": 0.6`

---

## 💡 Pro Tips

1. **Color Picker:** Use https://coolors.co to generate palettes
2. **Test Changes:** Save file and refresh browser (Ctrl+R)
3. **Revert:** Use Git to undo: `git checkout src/components/BalochistanDoctorMap.jsx`
4. **Dark Mode:** Use `#1f2937` background with light district colors

---

## 📏 Quick Reference: Line Widths

- `0.5` - Very thin (subtle)
- `1.0` - Thin
- `1.5` - Normal (current)
- `2.0` - Medium thick
- `3.0` - Thick
- `4.0` - Very thick (bold)

---

## 🌈 Quick Reference: Opacity Values

- `0.1` - Almost transparent
- `0.3` - Very light
- `0.4` - Light (current)
- `0.5` - Medium
- `0.7` - Visible
- `1.0` - Solid (no transparency)

---

## 🚀 Apply Changes

1. Edit the file
2. Save (Ctrl+S)
3. Browser auto-refreshes
4. Done!

---

**Need More Help?**
- Detailed guide: `PLAIN_MAP_IMPLEMENTATION.md`
- All changes: `CHANGES_SUMMARY.md`
- Project README: `README.md`
