import React, { useState, useMemo, useRef } from "react";
import countriesData from "../data/countriesminified.json";
import api from "../api/axios";
import projectsData from "../data/projects.json"; // Using centralized data
import { Plus, FolderEdit, Trash2 } from "lucide-react";
import ConfirmationPopup from "./ConfirmationPopup";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddProject from "./AddProject";
import Pagination from "./Pagination";

const ProjectTable2 = () => {
  const [activeTab, setActiveTab] = useState("regions");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const ROWS_PER_PAGE = 10;

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

  // const projects = useMemo(() => projectsData, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");
      // Map backend data to match frontend field names
      const formattedProjects = res.data.map((p) => ({
        id: p.Project_Id,
        projectName: p.ProjectName,
        projectManager: p.ProjectManager,
        duration: p.Duration,
        status: p.Status,
        progress: p.Progress,
        clientName: p.ClientName,
        country: p.Country,
        link: p.ProjectLink,
        type: p.ProjectType,
        location: p.Location,
        CreatedAtDate: p.CreatedAtDate,
        // Add any other fields your component expects
      }));
      setProjects(formattedProjects);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedRegion, selectedCountry]);

  // --- Status Helpers ---
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-progress";
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
      default:
        return status;
    }
  };

  const handleViewProject = (link) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("Project link not found.");
    }
  };

  // Modify handleEdit to use modal instead of navigation
  const handleEdit = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setProjectToEdit(project);
    setShowEditForm(true);
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

  const handleConfirmDelete = async () => {
    try {
      // Send DELETE request with the array of selected IDs
      await api.delete("/projects", { data: { ids: selectedProjects } });
      handleCancelDelete(); // Close the popup
      // Refresh the data to show changes
      fetchProjects();
      setShowCheckboxes(false);
      setSelectedProjects([]);
    } catch (err) {
      console.error("Failed to delete projects:", err);
      alert("An error occurred while deleting.");
    }
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


  const paginatedProjects = useMemo(() => {
    const indexOfLastRow = currentPage * ROWS_PER_PAGE;
    const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
    return filteredProjects.slice(indexOfFirstRow, indexOfLastRow);
  }, [filteredProjects, currentPage]);


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
          onSave={fetchProjects}
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
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((project) => (
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
                        onClick={() => handleViewProject(project.link)}
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

        <Pagination
          currentPage={currentPage}
          totalRows={filteredProjects.length}
          rowsPerPage={ROWS_PER_PAGE}
          onPageChange={(page) => setCurrentPage(page)}
        />
        
      </div>
    </>
  );
};

export default ProjectTable2;
