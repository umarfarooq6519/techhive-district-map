# Balochistan District Doctor Map

An interactive React web application that visualizes the distribution of doctors across districts in Balochistan, Pakistan. Built with React, Vite, and MapLibre GL JS.

![Balochistan Doctor Map](preview.png)

## Features

- **Plain District-Based Map**: Clean, minimalist map showing only district boundaries
- **Interactive Visualization**: Pan and zoom to explore different districts
- **Visual Markers**: Circle markers sized proportionally to the number of doctors
- **District Boundaries**: Vector-based district polygons with customizable colors
- **No External Tiles**: Self-contained map using GeoJSON data (no OSM tiles)
- **Hover Tooltips**: Display district name and doctor count on hover
- **Color-Coded Legend**: Visual guide for understanding districts and markers
- **Responsive Design**: Works on desktop and mobile devices
- **Statistics Footer**: Shows total districts and doctors

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **MapLibre GL JS** - Open-source mapping library
- **GeoJSON** - District boundary data
- **CSS3** - Custom styling with gradients and animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 to view the app.

### Build for Production

```bash
npm run build
```

## Map Style

The map now uses a **plain district-based style** instead of OpenStreetMap tiles:

- **Background**: Light gray (`#f5f5f5`)
- **Districts**: Green fill (`#81c784`) with 40% opacity
- **Boundaries**: Dark green lines (`#2d5016`)
- **Performance**: Faster loading, no external tile dependencies

### Quick Customization

See `QUICK_CUSTOMIZATION.md` for 30-second color changes!

**Change background color** (Line ~52 in `BalochistanDoctorMap.jsx`):
```javascript
"background-color": "#f5f5f5"  // Change to white, blue, etc.
```

**Change district fill** (Line ~75):
```javascript
"fill-color": "#81c784"  // Try #64b5f6 (blue), #a78bfa (purple)
"fill-opacity": 0.4      // 0.0 (transparent) to 1.0 (solid)
```

**Change boundary lines** (Line ~84):
```javascript
"line-color": "#2d5016"  // Border color
"line-width": 1.5        // Thickness (try 2 or 3)
```

For detailed customization options, see:
- `PLAIN_MAP_IMPLEMENTATION.md` - Complete guide
- `QUICK_CUSTOMIZATION.md` - Quick reference
- `CHANGES_SUMMARY.md` - What changed

### Updating Doctor Data

Edit the `doctorData` array in `src/components/BalochistanDoctorMap.jsx`:

```javascript
const doctorData = [
  { district: "Panjgur", doctors: 1 },
  { district: "Quetta", doctors: 14 },
  // Add or modify districts here
];
```

### Updating Marker Colors

Edit district marker colors in `src/components/BalochistanDoctorMap.jsx`:

```javascript
const districtColors = {
  Panjgur: "#e57373",
  Quetta: "#81c784",
  // ... modify as needed
};
```

### Changing UI Theme

Customize UI colors in `src/components/BalochistanDoctorMap.css`:

- Header/footer: `.map-header`, `.map-footer`
- Background: `.map-container-wrapper`
- Legend: `.map-legend`

## Project Structure

```
district-map/
├── public/
│   └── Balochistan.geojson              # District boundaries data
├── src/
│   └── components/
│       ├── BalochistanDoctorMap.jsx     # Main map component
│       └── BalochistanDoctorMap.css     # Map styling
├── PLAIN_MAP_IMPLEMENTATION.md          # Detailed customization guide
├── QUICK_CUSTOMIZATION.md               # Quick reference for colors
├── CHANGES_SUMMARY.md                   # Implementation changes
└── README.md                            # This file
```

## Documentation

- **QUICK_CUSTOMIZATION.md** - Fast color and style changes (30 seconds!)
- **PLAIN_MAP_IMPLEMENTATION.md** - Complete implementation details and advanced customization
- **CHANGES_SUMMARY.md** - Summary of changes from OSM tiles to plain map
- **INTEGRATION_GUIDE.md** - Integration instructions

## License

MIT
