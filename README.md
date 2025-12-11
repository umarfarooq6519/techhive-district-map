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

## Customization

### Using Real GeoJSON Data

To use actual district boundary polygons:

1. Obtain a GeoJSON file with Balochistan district boundaries
2. Place it in `/public/balochistan-districts.geojson`
3. Uncomment the GeoJSON loading code in `BalochistanDoctorMap.jsx` (lines 147-185)
4. Update the `geoJsonUrl` variable:

```javascript
const geoJsonUrl = "/balochistan-districts.geojson";
```

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

Customize colors in `src/components/BalochistanDoctorMap.css`:

- Marker colors: `.doctor-marker`
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
