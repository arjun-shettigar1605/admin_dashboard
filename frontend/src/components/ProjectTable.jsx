// src/components/ProjectTable.jsx

import React, { useState, useEffect, useMemo } from "react";
import countriesData from "../data/countriesminified.json"; // Local JSON
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import projects from "../data/projects.json";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons for different project statuses
const createCustomIcon = (status) => {
  const iconColors = {
    completed: "#28a745",
    "in-progress": "#ffc107",
    rejected: "#dc3545",
  };

  return L.divIcon({
    html: `<div style="
      background-color: ${iconColors[status] || "#6c757d"};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: "custom-marker",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createClientIcon = () => {
  return L.divIcon({
    html: `<div style="background-color: #3b82f6; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
    className: "client-marker",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

// Component to fit map bounds to markers
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
};

const ProjectTable = () => {
  const { projectType } = useParams();
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [clientLocations, setClientLocations] = useState([]);

  const navigate = useNavigate();

  const customRegions = {
    "Middle East": [
      { name: "United Arab Emirates" },
      { name: "Saudi Arabia" },
      { name: "Qatar" },
      { name: "Oman" },
      { name: "Bahrain" },
      { name: "Kuwait" },
      { name: "Israel" },
      { name: "Jordan" },
      { name: "Lebanon" },
      { name: "Egypt" },
      { name: "Turkey" },
    ],
    "Asia Pacific": [
      { name: "China" },
      { name: "Japan" },
      { name: "South Korea" },
      { name: "India" },
      { name: "Australia" },
      { name: "New Zealand" },
      { name: "Singapore" },
      { name: "Malaysia" },
      { name: "Indonesia" },
      { name: "Thailand" },
      { name: "Vietnam" },
      { name: "Philippines" },
    ],
  };

  // New region definitions
  const newRegions = {
    "Asia Pacific": (country) =>
      (country.region === "Asia" && country.name !== "India") ||
      country.region === "Oceania",
    Africa: (country) => country.region === "Africa",
    Europe: (country) => country.region === "Europe",
    India: (country) => country.name === "India",
    "North America": (country) =>
      country.region === "Americas" && country.subregion !== "South America",
    "South America": (country) =>
      country.region === "Americas" && country.subregion === "South America",
    "Middle East": (country) =>
      customRegions["Middle East"].some((c) => c.name === country.name),
  };

  const regionOptions = Object.keys(newRegions);

  const countryOptions = useMemo(() => {
    if (!selectedRegion) return [];
    return countriesData
      .filter((country) => newRegions[selectedRegion](country))
      .map((c) => c.name)
      .sort();
  }, [selectedRegion]);

  useEffect(() => {
    const projectWithClients = projects.find(
      (p) => p.country === selectedCountry && p.clients
    );
    setClientLocations(projectWithClients ? projectWithClients.clients : []);
  }, [selectedCountry]);

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-progress";
      case "rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "Ongoing";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project && project.link) {
      window.open(project.link, "_blank");
    } else {
      console.error("Project link not found for ID:", projectId);
      // Fallback to a default link if needed
      window.open("https://cyient.com/projects", "_blank");
    }
  };

  // Corrected filtering logic
  const filteredProjects = useMemo(() => {
    let projectsToFilter = projects;

    if (activeTab === "ongoing") {
      projectsToFilter = projects.filter((p) => p.status === "in-progress");
    } else if (activeTab === "completed") {
      projectsToFilter = projects.filter((p) => p.status === "completed");
    } else if (activeTab === "regions") {
      if (selectedRegion) {
        const countrySet = new Set(countryOptions);
        projectsToFilter = projects.filter((p) => countrySet.has(p.country));
      }
      if (selectedCountry) {
        projectsToFilter = projectsToFilter.filter(
          (p) => p.country === selectedCountry
        );
      }
    }

    // Only apply the projectType filter if the active tab is NOT 'regions'
    if (activeTab !== "regions") {
      return projectsToFilter.filter(
        (p) => p.type.toLowerCase() === projectType.toLowerCase()
      );
    }

    return projectsToFilter;
  }, [
    activeTab,
    // projects,
    selectedRegion,
    selectedCountry,
    projectType,
    countryOptions,
  ]);

  const selectedCountryProjects = useMemo(() => {
    if (activeTab === "regions" && selectedCountry) {
      return filteredProjects.filter((p) => p.country === selectedCountry);
    }
    return [];
  }, [activeTab, selectedCountry, filteredProjects]);

  const mapBounds = useMemo(() => {
    const projectCoords = selectedCountryProjects.map((p) => [
      p.location.coordinates.lat,
      p.location.coordinates.lng,
    ]);
    const clientCoords = clientLocations.map((c) => [
      c.coordinates.lat,
      c.coordinates.lng,
    ]);
    return [...projectCoords, ...clientCoords];
  }, [selectedCountryProjects, clientLocations]);

  // Check if we should show the map
  const shouldShowMap =
    activeTab === "regions" &&
    selectedCountry &&
    selectedCountryProjects.length > 0;

  return (
    <div className="project-summary">
      <h2>Project List</h2>
      <div className="tabs">
        <div
          className={`tab ${activeTab === "regions" ? "active" : ""}`}
          onClick={() => setActiveTab("regions")}
        >
          Regions
        </div>
        <div
          className={`tab ${activeTab === "ongoing" ? "active" : ""}`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </div>
        <div
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </div>
      </div>

      {activeTab === "regions" && (
        <div
          className="region-filters"
          style={{
            display: "flex",
            gap: "1rem",
            margin: "1rem 0",
            alignItems: "center",
          }}
        >
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCountry("");
            }}
            style={{ padding: "0.5rem", borderRadius: "6px" }}
          >
            <option value="">Select Region</option>
            {regionOptions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "6px" }}
            disabled={!selectedRegion}
          >
            <option value="">Select Country</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectedRegion("");
              setSelectedCountry("");
            }}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            Clear Selection
          </button>
        </div>
      )}

      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Manager</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Customer Name</th>
              <th>Country</th>
              <th>Location</th>
              <th>Project Overview</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectName}</td>
                  <td>{project.projectManager}</td>
                  <td>{project.duration}</td>
                  <td>
                    <span
                      className={`status ${getStatusClass(project.status)}`}
                    >
                      {getStatusText(project.status)}
                    </span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{project.progress}%</span>
                    </div>
                  </td>
                  <td>{project.clientName}</td>
                  <td>{project.country}</td>
                  <td>
                    <div style={{ fontSize: "0.9rem" }}>
                      <div style={{ fontWeight: "500" }}>
                        {project.location.city}
                      </div>
                      <div style={{ color: "#666", fontSize: "0.8rem" }}>
                        {project.location.address}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="view-project-btn"
                      onClick={() => handleViewProject(project.id)}
                    >
                      View Project
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: "center" }}>
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {shouldShowMap && (
        <div className="map-section" style={{ marginTop: "2rem" }}>
          <h3>Project Locations in {selectedCountry}</h3>
          <div
            style={{
              height: "400px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={[
                selectedCountryProjects[0].location.coordinates.lat,
                selectedCountryProjects[0].location.coordinates.lng,
              ]}
              zoom={6}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <FitBounds bounds={mapBounds} />
              {selectedCountryProjects.map((project) => (
                <Marker
                  key={project.id}
                  position={[
                    project.location.coordinates.lat,
                    project.location.coordinates.lng,
                  ]}
                  icon={createCustomIcon(project.status)}
                >
                  <Popup>
                    <div style={{ minWidth: "200px" }}>
                      <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
                        {project.projectName}
                      </h4>
                      <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                        <strong>Manager:</strong> {project.projectManager}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                        <strong>Client:</strong> {project.clientName}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                        <strong>Status:</strong>
                        <span
                          className={`status ${getStatusClass(project.status)}`}
                          style={{ marginLeft: "5px" }}
                        >
                          {getStatusText(project.status)}
                        </span>
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                        <strong>Progress:</strong> {project.progress}%
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                        <strong>Location:</strong> {project.location.city}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 8px 0",
                          fontSize: "0.8rem",
                          color: "#666",
                        }}
                      >
                        {project.location.address}
                      </p>
                      <button
                        onClick={() => handleViewProject(project.id)}
                        style={{
                          padding: "4px 8px",
                          fontSize: "0.8rem",
                          border: "1px solid #007bff",
                          borderRadius: "4px",
                          backgroundColor: "#007bff",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {clientLocations.map((client, index) => (
                <Marker
                  key={`client-${index}`}
                  position={[client.coordinates.lat, client.coordinates.lng]}
                  icon={createClientIcon()}
                >
                  <Popup>
                    <div>
                      <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
                        {client.name}
                      </h4>
                      <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                        {client.location}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
