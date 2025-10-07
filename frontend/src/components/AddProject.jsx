import React, { useState, useMemo, useEffect } from "react";
import { Check, Plus, X } from "lucide-react";
import "../styles/AddProject.css";
import countriesData from "../data/countriesminified.json";
import api from "../api/axios";

const AddProject = ({ projectData, closeForm, onSave }) => {
  const isEditMode = !!projectData;

  // Handles the new, complex data structure including nested location and clients
  const getInitialState = () => {
    if (isEditMode && projectData) {
      const [durationValue, durationType] = projectData.duration
        ? projectData.duration.split(" ")
        : ["", "Months"];

      const mainLocationData = projectData.location?.main_location || {};
      const clientsData = projectData.location?.clients || [];

      return {
        projectName: projectData.projectName || "",
        projectType: projectData.type || "geospatial",
        projectManager: projectData.projectManager || "",
        projectLink: projectData.link || "",
        clientName: projectData.clientName || "",
        createdAtDate: projectData.CreatedAtDate
          ? new Date(projectData.CreatedAtDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        durationValue: durationValue || "",
        durationType: durationType || "Months",
        status: projectData.status || "in-progress",
        progress: projectData.progress || 0,
        country: projectData.country || "",
        mainLocation: {
          city: mainLocationData.city || "",
          address: mainLocationData.address || "",
          coordinates: {
            lat: mainLocationData.coordinates?.lat || "",
            lon: mainLocationData.coordinates?.lon || "",
          },
        },
        clients: clientsData.map((client) => ({
          name: client.name || "",
          location: client.location || "",
          coordinates: {
            lat: client.coordinates?.lat || "",
            lon: client.coordinates?.lon || "",
          },
        })),
      };
    }
    // Default state for a new project
    return {
      projectName: "",
      projectType: "geospatial",
      projectManager: "",
      projectLink: "",
      clientName: "",
      createdAtDate: new Date().toISOString().split("T")[0],
      durationValue: "",
      durationType: "Months",
      status: "in-progress",
      progress: 0,
      country: "",
      mainLocation: {
        city: "",
        address: "",
        coordinates: { lat: "", lon: "" },
      },
      clients: [],
    };
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(getInitialState());

  // Set the default address to the selected country if the address is empty
  useEffect(() => {
    if (formData.country && !formData.mainLocation.address) {
      setFormData((prev) => ({
        ...prev,
        mainLocation: { ...prev.mainLocation, address: prev.country },
      }));
    }
  }, [formData.country]);

  const countryOptions = useMemo(
    () => countriesData.map((c) => c.name).sort(),
    []
  );
  const totalSteps = 3;
  const stepperLabels = ["Project Setup", "Configuration", "Location"];

  // Generic handler for top-level form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for nested mainLocation data
  const handleMainLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      mainLocation: { ...prev.mainLocation, [name]: value },
    }));
  };

  // Handler for nested mainLocation coordinate data
  const handleMainLocationCoordsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      mainLocation: {
        ...prev.mainLocation,
        coordinates: { ...prev.mainLocation.coordinates, [name]: value },
      },
    }));
  };

  // Handlers for dynamic clients array
  const addClient = () => {
    setFormData((prev) => ({
      ...prev,
      clients: [
        ...prev.clients,
        { name: "", location: "", coordinates: { lat: "", lon: "" } },
      ],
    }));
  };

  const removeClient = (index) => {
    setFormData((prev) => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index),
    }));
  };

  const handleClientChange = (index, e) => {
    const { name, value } = e.target;
    const newClients = [...formData.clients];
    newClients[index][name] = value;
    setFormData((prev) => ({ ...prev, clients: newClients }));
  };

  const handleClientCoordsChange = (index, e) => {
    const { name, value } = e.target;
    const newClients = [...formData.clients];
    newClients[index].coordinates[name] = value;
    setFormData((prev) => ({ ...prev, clients: newClients }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assemble the final payload, especially the nested location_data
    const payload = {
      ProjectName: formData.projectName,
      ProjectType: formData.projectType,
      ProjectManager: formData.projectManager,
      ProjectLink: formData.projectLink,
      ClientName: formData.clientName,
      CreatedAtDate: formData.CreatedAtDate,
      Duration: `${formData.durationValue} ${formData.durationType}`,
      Status: formData.status,
      Progress: formData.progress,
      Country: formData.country,
      Location: {
        main_location: formData.mainLocation,
        clients: formData.clients,
      },
    };

    try {
      if (isEditMode) {
        await api.put(`/projects/${projectData.id}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      onSave();
      closeForm();
    } catch (err) {
      console.error("Failed to save project", err);
      alert("An error occurred while saving the project.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Project Setup
        return (
          <>
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="geospatial">Geospatial</option>
                  <option value="utilities">Utilities</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="projectManager">Project Manager</label>
                <input
                  type="text"
                  id="projectManager"
                  name="projectManager"
                  value={formData.projectManager}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="projectLink">Project Link</label>
                <input
                  type="text"
                  id="projectLink"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="clientName">Customer Name</label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        );
      case 2: // Project Configuration
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="createdAtDate">Created At Date</label>
                <input
                  type="date"
                  id="createdAtDate"
                  name="createdAtDate"
                  value={formData.createdAtDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group duration-group">
                <label htmlFor="durationValue">Project Duration</label>
                <div className="duration-inputs">
                  <input
                    type="number"
                    id="durationValue"
                    name="durationValue"
                    value={formData.durationValue}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 12"
                  />
                  <select
                    id="durationType"
                    name="durationType"
                    value={formData.durationType}
                    onChange={handleChange}
                  >
                    <option>Months</option>
                    <option>Years</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">On Hold</option>
              </select>
            </div>
            <div className="form-group progress-group">
              <label htmlFor="progress">Progress: {formData.progress}%</label>
              <input
                type="range"
                id="progress"
                name="progress"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case 3: // Location
        return (
          <>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select a country...</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="form-fieldset">
              <legend>Main Location (Mandatory)</legend>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.mainLocation.city}
                    onChange={handleMainLocationChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.mainLocation.address}
                    onChange={handleMainLocationChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.mainLocation.coordinates.lat}
                    onChange={handleMainLocationCoordsChange}
                    placeholder="e.g., 52.300"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="lon"
                    value={formData.mainLocation.coordinates.lon}
                    onChange={handleMainLocationCoordsChange}
                    placeholder="e.g., -122.48"
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Client Locations (Optional)</legend>
              {formData.clients.map((client, index) => (
                <div key={index} className="client-entry">
                  <div className="client-header">
                    <h5>Client #{index + 1}</h5>
                    <button
                      type="button"
                      className="btn-remove-client"
                      onClick={() => removeClient(index)}
                      title="Remove this client"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Client Name</label>
                      <input
                        type="text"
                        name="name"
                        value={client.name}
                        onChange={(e) => handleClientChange(index, e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Location (City)</label>
                      <input
                        type="text"
                        name="location"
                        value={client.location}
                        onChange={(e) => handleClientChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Latitude</label>
                      <input
                        type="number"
                        step="any"
                        name="lat"
                        value={client.coordinates.lat}
                        onChange={(e) => handleClientCoordsChange(index, e)}
                        placeholder="e.g., 52.300"
                      />
                    </div>
                    <div className="form-group">
                      <label>Longitude</label>
                      <input
                        type="number"
                        step="any"
                        name="lon"
                        value={client.coordinates.lon}
                        onChange={(e) => handleClientCoordsChange(index, e)}
                        placeholder="e.g., -122.48"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn-add-client"
                onClick={addClient}
              >
                <Plus size={16} /> Add Client
              </button>
            </fieldset>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-container-v2 modal-form">
        <h2 className="form-title">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h2>
        <div className="stepper-v2">
          {stepperLabels.map((label, index) => (
            <React.Fragment key={label}>
              <div
                className={`step-item-v2 ${
                  currentStep > index + 1 ? "completed" : ""
                } ${currentStep === index + 1 ? "active" : ""}`}
              >
                <div className="step-icon-v2">
                  {currentStep > index + 1 ? (
                    <Check size={16} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="step-label-v2">{label}</div>
              </div>
              {index < stepperLabels.length - 1 && (
                <div
                  className={`step-connector ${
                    currentStep > index + 1 ? "completed" : ""
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext}>
          <div className="form-content-area">{renderStepContent()}</div>
          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="btn-prev" onClick={handlePrev}>
                Previous
              </button>
            )}
            <div className="actions-right">
              <button type="button" className="btn-cancel" onClick={closeForm}>
                Cancel
              </button>
              {currentStep < totalSteps ? (
                <button type="submit" className="btn-next">
                  Next Step
                </button>
              ) : (
                <button type="submit" className="btn-submit">
                  {isEditMode ? "Update Project" : "Create Project"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
