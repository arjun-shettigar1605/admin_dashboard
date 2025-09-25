// src/components/ProjectTable.jsx

import React, { useState, useEffect, useMemo } from "react";
import countriesData from "../data/countriesminified.json"; // Local JSON
import { useParams, useNavigate } from "react-router-dom";

const ProjectTable = () => {
    const { projectType } = useParams();
    const [activeTab, setActiveTab] = useState("ongoing");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");

    const navigate = useNavigate();

    // Custom Regions
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

    // Static Lists for Select Components
    const regionOptions = useMemo(() => {
        const regionsFromData = Array.from(
            new Set(countriesData.map((c) => c.region).filter((r) => r))
        );
        const customRegionNames = Object.keys(customRegions);
        const allUniqueRegionNames = new Set([
            ...regionsFromData,
            ...customRegionNames,
        ]);
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

    // Projects Data
    const projects = [
        {
            id: 1,
            projectName: "Project Alpha",
            projectManager: "Alice Johnson",
            duration: "11.5 Months",
            status: "completed",
            progress: 100,
            clientName: "Innovate Corp",
            country: "United States",
            region: "Americas",
            type: "utilities",
        },
        {
            id: 2,
            projectName: "Project Beta",
            projectManager: "Bob Williams",
            duration: "12 Months",
            status: "in-progress",
            progress: 55,
            clientName: "Tech Solutions Ltd.",
            country: "Canada",
            region: "Americas",
            type: "utilities",
        },
        {
            id: 3,
            projectName: "Project Gamma",
            projectManager: "Charlie Green",
            duration: "5.3 Months",
            status: "completed",
            progress: 100,
            clientName: "Global Exports",
            country: "United Kingdom",
            region: "Europe",
            type: "geospatial",
        },
        {
            id: 4,
            projectName: "Project Delta",
            projectManager: "Diana Prince",
            duration: "8.3 Months",
            status: "in-progress",
            progress: 24,
            clientName: "Future Systems",
            country: "Germany",
            region: "Europe",
            type: "geospatial",
        },
        {
            id: 5,
            projectName: "Project Epsilon",
            projectManager: "Eve Adams",
            duration: "1.5 Months",
            status: "rejected",
            progress: 0,
            clientName: "Data Ventures",
            country: "India",
            region: "Asia Pacific",
            type: "geospatial",
        },
        {
            id: 6,
            projectName: "Project Zeta",
            projectManager: "Farah Khan",
            duration: "8.7 Months",
            status: "in-progress",
            progress: 15,
            clientName: "Gulf Innovations",
            country: "United Arab Emirates",
            region: "Middle East",
            type: "utilities",
        },
    ];

    // Status Helpers
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

    // Memoized Filtered Projects
    const filteredProjects = useMemo(() => {
        if (activeTab === "ongoing") {
            return projects.filter((p) => p.status === "in-progress");
        }
        if (activeTab === "completed") {
            return projects.filter((p) => p.status === "completed");
        }
        if (activeTab === "regions") {
            return projects.filter((p) => {
                const matchesRegion = !selectedRegion || p.region === selectedRegion;
                const matchesCountry = !selectedCountry || p.country === selectedCountry;
                return matchesRegion && matchesCountry;
            });
        }
        return projects;
    }, [activeTab, projects, selectedRegion, selectedCountry]);

    // Filter projects based on projectType
    const projectTypeFilteredProjects = useMemo(() => {
        return projects.filter(
            (project) => project.type.toLowerCase() === projectType.toLowerCase()
        );
    }, [projectType, projects]);

    return (
        <div className="project-summary">
            <h2>Project List</h2>
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
                <div className="region-filters" style={{ display: "flex", gap: "1rem", margin: "1rem 0", alignItems: "center" }}>
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