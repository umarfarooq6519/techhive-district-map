import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./BalochistanDoctorMap.css";

// Doctor data for each district
const doctorData = [
  { district: "Panjgur", doctors: 1 },
  { district: "Nushki", doctors: 1 },
  { district: "Ziarat", doctors: 1 },
  { district: "Khuzdar", doctors: 1 },
  { district: "Quetta", doctors: 14 },
  { district: "Dera Murad Jamali", doctors: 1 },
  { district: "Kharan", doctors: 2 },
  { district: "Naseerabad", doctors: 2 },
  { district: "Sibbi", doctors: 1 },
  { district: "Chaman", doctors: 2 },
  { district: "Kech", doctors: 1 },
];

const BalochistanDoctorMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Initialize the map with plain background (no tiles)
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center: [66.0, 28.5], // Center of Balochistan
      zoom: 6.5,
    });

    map.current.on("load", () => {
      // TODO: Replace this placeholder URL with actual Balochistan GeoJSON
      // You can host your own GeoJSON file or use a public dataset
      // Example: '/balochistan-districts.geojson' or a public URL
      // const geoJsonUrl = 'https://raw.githubusercontent.com/example/balochistan-geojson/main/districts.json';

      // District coordinates calculated from the GeoJSON centroid data
      const districtCoordinates = {
        Quetta: [67.0, 30.25],
        Panjgur: [64.0, 27.0],
        Nushki: [66.0, 29.55],
        Ziarat: [67.75, 30.4],
        Khuzdar: [66.6, 27.8],
        "Dera Murad Jamali": [68.25, 28.55],
        Kharan: [65.4, 28.6],
        Naseerabad: [67.9, 28.25],
        Sibbi: [67.85, 29.55],
        Chaman: [66.45, 30.95],
        Kech: [63.05, 26.2],
      };

      // Create a lookup map for doctor counts
      const doctorMap = {};
      doctorData.forEach((item) => {
        doctorMap[item.district] = item.doctors;
      });

      // Add markers for each district
      doctorData.forEach(({ district, doctors }) => {
        const coords = districtCoordinates[district];
        if (!coords) return;

        // Determine the CSS class based on doctor count
        let rangeClass = "low";
        let size = 25;
        if (doctors >= 8) {
          rangeClass = "high";
          size = 60;
        } else if (doctors >= 3) {
          rangeClass = "medium";
          size = 40;
        }

        // Create a custom marker element
        const markerEl = document.createElement("div");
        markerEl.className = `doctor-marker doctor-marker-${rangeClass}`;

        // Add district name label above the circle
        const districtLabel = document.createElement("div");
        districtLabel.className = "district-name-label";
        districtLabel.textContent = district;
        markerEl.appendChild(districtLabel);

        // Add doctor count label
        const label = document.createElement("div");
        label.className = "doctor-count-label";
        label.textContent = doctors;
        markerEl.appendChild(label);

        // Create popup for hover tooltip
        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: size / 2 + 10,
          className: "doctor-popup",
        }).setHTML(`
          <div class="popup-content">
            <strong>${district}</strong><br/>
            Doctors: ${doctors}
          </div>
        `);

        // Create marker
        new maplibregl.Marker({ element: markerEl })
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(map.current);

        // Show popup on hover
        markerEl.addEventListener("mouseenter", () => {
          popup.addTo(map.current);
        });

        markerEl.addEventListener("mouseleave", () => {
          popup.remove();
        });
      });

      /*
       * OPTIONAL: Load actual GeoJSON districts
       * Uncomment this section when you have a real GeoJSON file
       *
       * fetch(geoJsonUrl)
       *   .then(response => response.json())
       *   .then(geojson => {
       *     // Add district boundaries as a layer
       *     map.current.addSource('districts', {
       *       type: 'geojson',
       *       data: geojson
       *     });
       *
       *     map.current.addLayer({
       *       id: 'district-boundaries',
       *       type: 'line',
       *       source: 'districts',
       *       paint: {
       *         'line-color': '#8b5cf6',
       *         'line-width': 2,
       *         'line-opacity': 0.8
       *       }
       *     });
       *
       *     // Add district fills with color based on doctor count
       *     map.current.addLayer({
       *       id: 'district-fills',
       *       type: 'fill',
       *       source: 'districts',
       *       paint: {
       *         'fill-color': [
       *           'match',
       *           ['get', 'name'], // Assuming the GeoJSON has a 'name' property
       *           'Quetta', '#8b5cf6',
       *           'Kharan', '#a78bfa',
       *           'Naseerabad', '#a78bfa',
       *           'Chaman', '#a78bfa',
       *           '#c4b5fd' // default color for districts with 1 doctor
       *         ],
       *         'fill-opacity': 0.3
       *       }
       *     });
       *   })
       *   .catch(error => console.error('Error loading GeoJSON:', error));
       */
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="map-container-wrapper">
      <div className="map-header">
        <h1>Balochistan District Medical Coverage</h1>
        <p className="map-subtitle">Number of doctors per district</p>
      </div>

      <div className="map-legend">
        <h3>Legend</h3>
        <div className="legend-item">
          <div className="legend-circle small"></div>
          <span>1-2 doctors</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle medium"></div>
          <span>3-7 doctors</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle large"></div>
          <span>8+ doctors</span>
        </div>
      </div>

      <div ref={mapContainer} className="map-container" />

      <div className="map-footer">
        <p className="data-source">
          Total Districts: {doctorData.length} | Total Doctors:{" "}
          {doctorData.reduce((sum, d) => sum + d.doctors, 0)}
        </p>
      </div>
    </div>
  );
};

export default BalochistanDoctorMap;
