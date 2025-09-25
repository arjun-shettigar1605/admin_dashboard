import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import countriesData from "../data/countriesminified.json";
import { Plus, FolderEdit, Trash2 } from "lucide-react";
import ConfirmationPopup from "./ConfirmationPopup";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddProject from "./AddProject";

const ProjectTable2 = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btnRef.current.style.setProperty("--x", `${x}px`);
      btnRef.current.style.setProperty("--y", `${y}px`);
    }
  };

  // --- Custom Regions
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
  }, [customRegions]); // Empty dependency array ensures this runs only once

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
  }, [selectedRegion, customRegions]); // Re-calculate whenever selectedRegion changes

  // --- Projects Data ---
  const projects = useMemo(
    () => [
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
        type: "utilities",
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
        type: "utilities",
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
        type: "geospatial",
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
        type: "geospatial",
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
        type: "geospatial",
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
        type: "utilities",
      },
    ],
    []
  );

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
    window.open("https://omni-vmadev.corp.cyient.com/portal/apps/experiencebuilder/experience/?id=ca11306b21e45fadb54dc4d8b7c690e", "_blank");
  };

  // Modify handleEdit to use modal instead of navigation
  const handleEdit = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setProjectToEdit(project);
      setShowEditForm(true);
    } else {
      alert("Project not found!");
    }
  };

  const handleDeleteClick = (projectId) => {
    setShowCheckboxes(true);
    setSelectedProjects([projectId]);
  };

  const handleCheckboxChange = (projectId) => {
    setSelectedProjects((prev) => {
      if (prev.includes(projectId)) {
        return prev.filter((id) => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleBulkDelete = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    setShowCheckboxes(false);
    setSelectedProjects([]);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const cancelSelection = () => {
    setShowCheckboxes(false);
    setSelectedProjects([]);
  };

  // --- Memoized Filtered Projects ---
  const filteredProjects = useMemo(() => {
    if (activeTab === "ongoing") {
      return projects.filter((p) => p.status === "in-progress");
    } else if (activeTab === "completed") {
      return projects.filter((p) => p.status === "completed");
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

  const deleteMessage = `Are you sure you want to delete the selected project${
    selectedProjects.length > 1 ? "s" : ""
  }? This action cannot be undone.`;

  return (
    <>
      <Popup
        open={showEditForm}
        closeOnDocumentClick={false}
        onClose={() => setShowEditForm(false)}
        modal
      >
        <AddProject
          projectData={projectToEdit}
          closeForm={() => setShowEditForm(false)}
        />
      </Popup>

      <Popup
        open={showDeletePopup}
        closeOnDocumentClick={false}
        onClose={handleCancelDelete}
        modal
      >
        {(close) => (
          <ConfirmationPopup
            close={close}
            onConfirm={handleConfirmDelete}
            title="Delete Project(s)"
            message={deleteMessage}
            confirmText="Yes, Delete"
            type="delete"
          />
        )}
      </Popup>

      <div className="project-summary">
        <div className="summary-header">
          <h2>Project List</h2>
          <span className="header-right">
            {showCheckboxes && (
              <>
                <button
                  className="delete-selected-btn"
                  onClick={handleBulkDelete}
                  disabled={selectedProjects.length === 0}
                >
                  Delete (
                  {selectedProjects.length > 0
                    ? ` ${selectedProjects.length}`
                    : ""}
                  )
                </button>
                <button
                  className="cancel-selection-btn"
                  onClick={cancelSelection}
                >
                  Cancel
                </button>
              </>
            )}
            <button
              className="add-project-btn"
              onClick={() => {
                setProjectToEdit(null);
                setShowEditForm(true);
              }}
              ref={btnRef}
              onMouseMove={handleMouseMove}
            >
              <Plus className="plus-icon" size={18} />
              Add New Project
            </button>
          </span>
        </div>

        <div className="tabs">
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
                {showCheckboxes && (
                  <th className="checkbox-column sticky-col sticky-checkbox">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProjects(
                            filteredProjects.map((p) => p.id)
                          );
                        } else {
                          setSelectedProjects([]);
                        }
                      }}
                      checked={
                        selectedProjects.length === filteredProjects.length &&
                        filteredProjects.length > 0
                      }
                    />
                  </th>
                )}
                <th>Project Name</th>
                <th>Project Manager</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Client Name</th>
                <th>Country</th>
                <th className="sticky-col sticky-overview">Project Overview</th>
                <th className="sticky-col sticky-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id}>
                    {showCheckboxes && (
                      <td className="checkbox-column sticky-col sticky-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project.id)}
                          onChange={() => handleCheckboxChange(project.id)}
                        />
                      </td>
                    )}
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
                        <span className="progress-text">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td>{project.clientName}</td>
                    <td>{project.country}</td>

                    <td className="sticky-col sticky-overview">
                      <button
                        className="view-project-btn"
                        onClick={() => handleViewProject(project.id)}
                      >
                        View Project
                      </button>
                    </td>
                    <td className="sticky-col sticky-actions">
                      <div className="action-icons">
                        <FolderEdit
                          className="edit-icon"
                          size={21}
                          onClick={() => handleEdit(project.id)}
                        />
                        <Trash2
                          className="delete-icon"
                          size={21}
                          onClick={() => handleDeleteClick(project.id)}
                        />
                      </div>
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
    </>
  );
};

export default ProjectTable2;
