import React, { useState, useMemo, useRef } from "react";
import countriesData from "../data/countriesminified.json";
import projectsData from "../data/projects.json"; // Using centralized data
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

  // --- New Region Definitions ---
  const newRegions = {
    "North America": (country) =>
      country.region === "Americas" && country.subregion !== "South America",
    "South America": (country) =>
      country.region === "Americas" && country.subregion === "South America",
    Europe: (country) => country.region === "Europe",
    "Asia Pacific": (country) =>
      (country.region === "Asia" && country.name !== "India") ||
      country.region === "Oceania",
    Africa: (country) => country.region === "Africa",
    India: (country) => country.name === "India",
  };

  const regionOptions = Object.keys(newRegions);

  const countryOptions = useMemo(() => {
    if (!selectedRegion) return [];
    return countriesData
      .filter((country) => newRegions[selectedRegion](country))
      .map((c) => c.name)
      .sort();
  }, [selectedRegion]);

  const projects = useMemo(() => projectsData, []);

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
    const project = projects.find((p) => p.id === projectId);
    if (project && project.link) {
      window.open(project.link, "_blank");
    } else {
      console.error("Project link not found for ID:", projectId);
      // Fallback to a default link if needed
      window.open("https://cyient.com/projects", "_blank");
    }
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
    // In a real app, you would filter the projects state here
    console.log("Deleting projects with IDs:", selectedProjects);
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

  // --- Memoized Filtered Projects (with updated logic) ---
  const filteredProjects = useMemo(() => {
    if (activeTab === "ongoing") {
      return projects.filter((p) => p.status === "in-progress");
    }
    if (activeTab === "completed") {
      return projects.filter((p) => p.status === "completed");
    }
    if (activeTab === "regions") {
      let projectsToFilter = projects;
      if (selectedRegion) {
        const countrySet = new Set(countryOptions);
        projectsToFilter = projects.filter((p) => countrySet.has(p.country));
      }
      if (selectedCountry) {
        projectsToFilter = projectsToFilter.filter(
          (p) => p.country === selectedCountry
        );
      }
      return projectsToFilter;
    }
    return projects;
  }, [activeTab, projects, selectedRegion, selectedCountry, countryOptions]);

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
                  <td
                    colSpan={showCheckboxes ? 10 : 9}
                    style={{ textAlign: "center" }}
                  >
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
