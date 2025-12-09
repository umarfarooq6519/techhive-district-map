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

// Assign a unique color to each district
const districtColors = {
  Panjgur: "#e57373",
  Nushki: "#ba68c8",
  Ziarat: "#64b5f6",
  Khuzdar: "#ffd54f",
  Quetta: "#81c784",
  "Dera Murad Jamali": "#4dd0e1",
  Kharan: "#f06292",
  Naseerabad: "#9575cd",
  Sibbi: "#ffb74d",
  Chaman: "#aed581",
  Kech: "#4fc3f7",
};

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
      },
      center: [66.0, 28.5], // Center of Balochistan
      zoom: 6.5,
    });

    map.current.on("load", () => {
      // Load Balochistan GeoJSON for district boundaries
      fetch("/Balochistan.geojson")
        .then((response) => response.json())
        .then((geojson) => {
          // Add district boundaries as a source
          map.current.addSource("districts", {
            type: "geojson",
            data: geojson,
          });

          // Add district fill layer with color based on district
          map.current.addLayer({
            id: "district-fills",
            type: "fill",
            source: "districts",
            paint: {
              "fill-color": "#81c784", // Green fill for districts
              "fill-opacity": 0.4,
            },
          });

          // Add district boundary lines
          map.current.addLayer({
            id: "district-boundaries",
            type: "line",
            source: "districts",
            paint: {
              "line-color": "#2d5016", // Dark green for boundaries
              "line-width": 1.5,
              "line-opacity": 0.8,
            },
          });
        })
        .catch((error) => console.error("Error loading GeoJSON:", error));

      // Estimated coordinates for each district (these should come from your GeoJSON)
      const districtCoordinates = {
        Quetta: [66.975, 30.183],
        Panjgur: [64.095, 26.97],
        Nushki: [66.022, 29.552],
        Ziarat: [67.726, 30.382],
        Khuzdar: [66.611, 27.8118],
        "Dera Murad Jamali": [68.225, 28.55],
        Kharan: [65.415, 28.584],
        Naseerabad: [67.916, 28.277],
        Sibbi: [67.878, 29.543],
        Chaman: [66.452, 30.923],
        Kech: [63.05, 26.2],
      };

      // Create a lookup map for doctor counts
      const doctorMap = {};
      doctorData.forEach((item) => {
        doctorMap[item.district] = item.doctors;
      });

      // Calculate max doctors for scaling
      const maxDoctors = Math.max(...doctorData.map((d) => d.doctors));

      // Add markers and labels for each district
      doctorData.forEach(({ district, doctors }) => {
        const coords = districtCoordinates[district];
        if (!coords) return;

        // Get unique color for this district
        const color = districtColors[district] || "#8b5cf6";

        // Calculate circle size based on doctor count (min 20px, max 80px)
        const baseSize = 20;
        const maxSize = 80;
        const size = baseSize + (doctors / maxDoctors) * (maxSize - baseSize);

        // Create a custom marker element
        const markerEl = document.createElement("div");
        markerEl.className = "doctor-marker";
        markerEl.style.width = `${size}px`;
        markerEl.style.height = `${size}px`;
        // Store color as CSS custom property for label styling
        markerEl.style.setProperty("--district-color", color);

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

        // Add district label above the marker
        const labelEl = document.createElement("div");
        labelEl.className = "district-label";
        labelEl.textContent = district;
        markerEl.appendChild(labelEl);

        // Show popup on hover
        markerEl.addEventListener("mouseenter", () => {
          popup.addTo(map.current);
        });

        markerEl.addEventListener("mouseleave", () => {
          popup.remove();
        });
      });
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

      {/* District color legend card */}
      <div className="map-legend district-legend-card">
        <h3>District Colors</h3>
        {doctorData.map(({ district }) => (
          <div className="legend-item" key={district}>
            <span
              className="legend-color-box"
              style={{ backgroundColor: districtColors[district] || "#8b5cf6" }}
            ></span>
            <span className="legend-district-name">{district}</span>
          </div>
        ))}
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
