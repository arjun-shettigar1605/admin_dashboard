import React, { useState, useEffect, useMemo } from "react";
import countriesData from "../data/countriesminified.json"; // local JSON

const ProjectTable = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // --- Custom Regions ---
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

  // --- Static Lists for Select Components ---
  const regionOptions = useMemo(() => {
    // Extract unique regions from countriesData
    const regionsFromFile = Array.from(
      new Set(countriesData.map((c) => c.region).filter((r) => r))
    );

    // Get the keys (region names) from customRegions
    const customRegionNames = Object.keys(customRegions);

    // Combine and get a unique list of all region names
    const allUniqueRegionNames = new Set([
      ...regionsFromFile,
      ...customRegionNames,
    ]);

    // Convert the Set to a sorted array
    return Array.from(allUniqueRegionNames).sort();
  }, []); // Empty dependency array ensures this runs only once

  const countryOptions = useMemo(() => {
    if (!selectedRegion) {
      return [];
    }
    if (customRegions[selectedRegion]) {
      return customRegions[selectedRegion].map((c) => c.name);
    } else {
      return countriesData
        .filter((c) => c.region === selectedRegion)
        .map((c) => c.name)
        .sort(); // Sort countries alphabetically
    }
  }, [selectedRegion]); // Re-calculate whenever selectedRegion changes

  // --- Projects Data ---
  const projects = [
    {
      id: 1,
      projectName: "Project Alpha",
      projectManager: "Alice Johnson",
      reportingManager: "Robert Brown",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      duration: "11.5 Months",
      status: "completed",
      progress: 100,
      budget: "$250,000",
      clientName: "Innovate Corp",
      country: "United States",
      region: "Americas",
    },
    {
      id: 2,
      projectName: "Project Beta",
      projectManager: "Bob Williams",
      reportingManager: "Susan Davis",
      startDate: "2023-03-01",
      endDate: "2024-02-28",
      duration: "12 Months",
      status: "in-progress",
      progress: 55,
      budget: "$450,000",
      clientName: "Tech Solutions Ltd.",
      country: "Canada",
      region: "Americas",
    },
    {
      id: 3,
      projectName: "Project Gamma",
      projectManager: "Charlie Green",
      reportingManager: "Robert Brown",
      startDate: "2023-06-10",
      endDate: "2023-11-20",
      duration: "5.3 Months",
      status: "completed",
      progress: 100,
      budget: "$120,000",
      clientName: "Global Exports",
      country: "United Kingdom",
      region: "Europe",
    },
    {
      id: 4,
      projectName: "Project Delta",
      projectManager: "Diana Prince",
      reportingManager: "Susan Davis",
      startDate: "2023-08-20",
      endDate: "2024-05-30",
      duration: "9.3 Months",
      status: "in-progress",
      progress: 24,
      budget: "$800,000",
      clientName: "Future Systems",
      country: "Germany",
      region: "Europe",
    },
    {
      id: 5,
      projectName: "Project Epsilon",
      projectManager: "Eve Adams",
      reportingManager: "Robert Brown",
      startDate: "2023-09-01",
      endDate: "2023-10-15",
      duration: "1.5 Months",
      status: "rejected",
      progress: 0,
      budget: "$50,000",
      clientName: "Data Ventures",
      country: "India",
      region: "Asia Pacific",
    },
    {
      id: 6,
      projectName: "Project Zeta",
      projectManager: "Farah Khan",
      reportingManager: "Susan Davis",
      startDate: "2024-01-10",
      endDate: "2024-09-30",
      duration: "8.7 Months",
      status: "in-progress",
      progress: 15,
      budget: "$600,000",
      clientName: "Gulf Innovations",
      country: "United Arab Emirates",
      region: "Middle East",
    },
  ];

  // --- Status Helpers ---
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
    alert(`Navigating to overview for project ID: ${projectId}`);
  };

  // --- Memoized Filtered Projects ---
  const filteredProjects = useMemo(() => {
    if (activeTab === "ongoing") {
      return projects.filter((p) => p.status === "in-progress");
    } else if (activeTab === "completed") {
      return projects.filter((p) => p.status === "completed");
    } else if (activeTab === "negotiation") {
      return projects.filter((p) => p.status === "rejected");
    } else if (activeTab === "regions") {
      return projects.filter((p) => {
        const matchesRegion = !selectedRegion || p.region === selectedRegion;
        const matchesCountry =
          !selectedCountry || p.country === selectedCountry;
        return matchesRegion && matchesCountry;
      });
    }
    return projects;
  }, [activeTab, projects, selectedRegion, selectedCountry]);

  return (
    <div className="project-summary">
      <div className="summary-header">
        <h2>Project List</h2>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "ongoing" ? "active" : ""}`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </div>
        <div
          className={`tab ${activeTab === "negotiation" ? "active" : ""}`}
          onClick={() => setActiveTab("negotiation")}
        >
          Negotiation
        </div>
        <div
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </div>
        <div
          className={`tab ${activeTab === "regions" ? "active" : ""}`}
          onClick={() => setActiveTab("regions")}
        >
          Regions
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
            disabled={!selectedRegion}
            style={{ padding: "0.5rem", borderRadius: "6px" }}
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
              <th>Reporting Manager</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Budget</th>
              <th>Client Name</th>
              <th>Country</th>
              <th>Project Overview</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectName}</td>
                  <td>{project.projectManager}</td>
                  <td>{project.reportingManager}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
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
                  <td>{project.budget}</td>
                  <td>{project.clientName}</td>
                  <td>{project.country}</td>
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
    </div>
  );
};

export default ProjectTable;
