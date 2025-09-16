import React, { useState } from "react";

const ProjectTable = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  // Updated project data with placeholders
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
      country: "USA",
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
      country: "UK",
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
      country: "USA",
    },
  ];

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

  // A simple handler for the button click
  const handleViewProject = (projectId) => {
    // In a real application, you would use a router to navigate
    // For example: history.push(`/projects/${projectId}`);
    alert(`Navigating to overview for project ID: ${projectId}`);
  };

  return (
    <div className="project-summary">
      <div className="summary-header">
        <h2>Project List</h2>
        <div className="filter-dropdown">
          <select>
            <option>All Project</option>
          </select>
        </div>
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
      </div>

      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name.</th>
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
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>{project.projectManager}</td>
                <td>{project.reportingManager}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.duration}</td>
                <td>
                  <span className={`status ${getStatusClass(project.status)}`}>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
