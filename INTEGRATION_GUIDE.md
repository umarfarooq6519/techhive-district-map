# Quick Integration Guide

## Using the BalochistanDoctorMap Component

### Basic Usage

```jsx
import BalochistanDoctorMap from './components/BalochistanDoctorMap';

function App() {
  return (
    <div className="App">
      <BalochistanDoctorMap />
    </div>
  );
}
```

### Component Features

The `<BalochistanDoctorMap />` component is a self-contained, fully-featured map that includes:

- ✅ Map initialization and rendering
- ✅ Doctor data visualization with sized circles
- ✅ Interactive hover tooltips
- ✅ Legend and statistics
- ✅ Responsive design
- ✅ Purple theme styling

### Props (Future Enhancement)

Currently, the component has no props. You can extend it to accept:

```jsx
<BalochistanDoctorMap 
  data={customDoctorData}
  colorScheme="purple"
  zoom={6.5}
  center={[66.0, 28.5]}
/>
```

---

## Replacing the GeoJSON URL

### Current Implementation
Uses estimated coordinates for each district with circular markers.

### To Use Real GeoJSON Boundaries:

**Step 1**: Get a GeoJSON file
- Download from: https://github.com/your-source/balochistan.geojson
- Or create your own using QGIS or other GIS tools
- Place in `/public/balochistan-districts.geojson`

**Step 2**: Update the component

In `src/components/BalochistanDoctorMap.jsx`, find this line (around line 62):

```javascript
const geoJsonUrl = 'https://raw.githubusercontent.com/example/balochistan-geojson/main/districts.json';
```

Replace with:

```javascript
const geoJsonUrl = '/balochistan-districts.geojson';
```

**Step 3**: Uncomment the GeoJSON loading code

Find the commented section (lines 147-185) and uncomment it:

```javascript
fetch(geoJsonUrl)
  .then(response => response.json())
  .then(geojson => {
    // Add district boundaries as a layer
    map.current.addSource('districts', {
      type: 'geojson',
      data: geojson
    });
    
    // ... rest of the code
  });
```

**Step 4**: Ensure GeoJSON has a 'name' property

Your GeoJSON features should have a `name` property that matches the district names:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Quetta",
        "district_id": "QTA"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[...]]
      }
    }
  ]
}
```

---

## Matching District Names

The component automatically matches `doctorData.district` to GeoJSON feature names. 

### Name Matching Logic

```javascript
// Doctor data uses these names:
{ district: "Quetta", doctors: 14 }

// Should match GeoJSON property:
{ "name": "Quetta" }  // ✅ Exact match
{ "name": "quetta" }  // ❌ Case sensitive
{ "name": "Quetta District" }  // ❌ Different string
```

### Handling Mismatches

If names don't match exactly, add a mapping function:

```javascript
const districtNameMap = {
  "Quetta": "Quetta District",
  "Dera Murad Jamali": "Nasirabad",
  // Add mappings here
};

function getGeoJsonName(doctorDataName) {
  return districtNameMap[doctorDataName] || doctorDataName;
}
```

---

## Color Customization

### Marker Colors

In `BalochistanDoctorMap.jsx`, find this section (around line 95):

```javascript
// Color intensity based on doctor count
const opacity = 0.3 + (doctors / maxDoctors) * 0.7;
markerEl.style.backgroundColor = `rgba(139, 92, 246, ${opacity})`;
markerEl.style.border = '3px solid rgb(124, 58, 237)';
```

Change the RGB values:
- `139, 92, 246` = Purple (main color)
- `124, 58, 237` = Dark purple (border)

### CSS Color Theme

In `BalochistanDoctorMap.css`:

```css
/* Background gradient */
.map-container-wrapper {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
}

/* Header/Footer */
.map-header {
  background: rgba(30, 27, 75, 0.95);
  border-bottom: 3px solid #8b5cf6;  /* Purple accent */
}

/* Legend colors */
.legend-circle.small {
  background-color: rgba(139, 92, 246, 0.4);  /* Light purple */
}

.legend-circle.large {
  background-color: rgba(139, 92, 246, 0.9);  /* Dark purple */
}
```

### Color Palette Reference

Current purple theme:
- `#1e1b4b` - Dark blue-purple (background)
- `#312e81` - Medium purple (gradient)
- `#8b5cf6` - Bright purple (accents)
- `#a78bfa` - Light purple (text)
- `#c4b5fd` - Very light purple (highlights)

---

## Adding More Districts

### Step 1: Add to doctorData array

```javascript
const doctorData = [
  // Existing districts...
  { district: "Gwadar", doctors: 3 },
  { district: "Loralai", doctors: 2 },
  // Add more here
];
```

### Step 2: Add coordinates (if not using GeoJSON)

```javascript
const districtCoordinates = {
  // Existing coordinates...
  "Gwadar": [62.3250, 25.1264],
  "Loralai": [68.5978, 30.3704],
};
```

### Step 3: Component auto-updates

The map will automatically:
- Create markers for new districts
- Recalculate circle sizes
- Update total counts in footer
- Adjust legend if needed

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag dist/ folder to netlify.com
```

### GitHub Pages

```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

---

## Troubleshooting

### Map doesn't load
- Check browser console for errors
- Ensure MapLibre GL JS is installed: `npm list maplibre-gl`
- Verify internet connection (needs tile downloads)

### Districts don't match
- Check district name spelling in `doctorData`
- Compare with GeoJSON `name` property
- Add console.log to debug:
  ```javascript
  console.log('Doctor data:', doctorData.map(d => d.district));
  console.log('GeoJSON names:', geojson.features.map(f => f.properties.name));
  ```

### Markers are too small/large
- Adjust `baseSize` and `maxSize` in component
- Change the scaling formula:
  ```javascript
  const size = baseSize + (doctors / maxDoctors) * (maxSize - baseSize);
  ```

### Tooltips not showing
- Ensure MapLibre GL CSS is imported
- Check z-index in custom CSS
- Verify popup HTML structure

---

## API Reference

### doctorData Structure

```typescript
interface DoctorData {
  district: string;  // District name (must match GeoJSON)
  doctors: number;   // Number of doctors (positive integer)
}
```

### districtCoordinates Structure

```typescript
interface Coordinates {
  [districtName: string]: [longitude: number, latitude: number];
}
```

### GeoJSON Requirements

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "DistrictName"  // Required: matches doctorData.district
      },
      "geometry": {
        "type": "Polygon" | "MultiPolygon"
      }
    }
  ]
}
```

---

## Performance Tips

1. **Optimize GeoJSON**: Simplify polygons with tools like mapshaper.org
2. **Lazy loading**: Load GeoJSON only when map is visible
3. **Memoization**: Use React.memo for static components
4. **Tile caching**: Configure CDN for map tiles

---

## Credits & Resources

- **MapLibre GL JS Docs**: https://maplibre.org/maplibre-gl-js-docs/
- **GeoJSON Spec**: https://geojson.org/
- **Balochistan Data**: [Your data source]
- **OpenStreetMap**: https://www.openstreetmap.org/

---

**Need help? Open an issue on GitHub or contact the maintainer.**
