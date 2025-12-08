# Balochistan District Doctor Map

An interactive React web application that visualizes the distribution of doctors across districts in Balochistan, Pakistan. Built with React, Vite, and MapLibre GL JS.

![Balochistan Doctor Map](preview.png)

## Features

- **Interactive Map**: Pan and zoom to explore different districts
- **Visual Markers**: Circle markers sized proportionally to the number of doctors
- **Purple Theme**: Professional purple color scheme with gradients
- **Hover Tooltips**: Display district name and doctor count on hover
- **Legend**: Visual guide for understanding marker sizes
- **Responsive Design**: Works on desktop and mobile devices
- **Statistics Footer**: Shows total districts and doctors

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **MapLibre GL JS** - Open-source mapping library
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

### Changing the Color Theme

Customize colors in `src/components/BalochistanDoctorMap.css`:

- Marker colors: `.doctor-marker`
- Background: `.map-container-wrapper`
- Headers: `.map-header`

## Project Structure

```
src/
├── components/
│   ├── BalochistanDoctorMap.jsx    # Main map component
│   └── BalochistanDoctorMap.css    # Map styling
├── App.jsx                          # Root component
└── main.jsx                         # Entry point
```

## License

MIT
