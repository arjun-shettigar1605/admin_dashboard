import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";
import "../styles/AddProject.css";
import countriesData from "../data/countriesminified.json";

const AddProject = ({ projectData, closeForm }) => {
  const isEditMode = !!projectData;

  const getInitialState = () => {
    if (isEditMode) {
      const [durationValue, durationType] = projectData.duration.split(" ");
      return {
        projectName: projectData.projectName || "",
        clientName: projectData.clientName || "",
        projectManager: projectData.projectManager || "",
        durationValue: durationValue,
        durationType: durationType || "Months",
        country: projectData.country || "",
        status: projectData.status || "in-progress",
        budget: projectData.budget || "",
        progress: projectData.progress || 0,
      };
    }
    return {
      projectName: "",
      clientName: "",
      projectManager: "",
      durationValue: "",
      durationType: "Months",
      country: "",
      status: "in-progress",
      budget: "",
      progress: 0,
    };
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(getInitialState());

  const countryOptions = useMemo(
    () => countriesData.map((c) => c.name).sort(),
    []
  );

  const totalSteps = 3;
  const stepperLabels = ["Project Setup", "Configuration", "Budget & Progress"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      duration: `${formData.durationValue} ${formData.durationType}`,
    };

    if (isEditMode) {
      console.log("Updating Project Data:", {
        id: projectData.id,
        ...finalData,
      });
      alert("Project updated successfully!");
    } else {
      console.log("Submitting New Project Data:", finalData);
      alert("New project created successfully!");
    }
    closeForm();
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
              <div className="form-row">
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
        case 2: // Configuration
          return (
            <>
              <div className="form-row">
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
              </div>
              <div className="form-group">
                <label htmlFor="status">Initial Status</label>
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
            </>
          );
        case 3: // Budget & Progress
          return (
            <>
              <div className="form-group">
                <label htmlFor="budget">Project Budget ($)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  placeholder="e.g., 50000"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group progress-group">
                <label htmlFor="progress">
                  Initial Progress: {formData.progress}%
                </label>
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
        default:
          return null;
      }
    };
  
    return (
      <div className="form-container-v2 modal-form">
        <h2 className="form-title">
          {iseditMode ? "Edit Project" : "Add New Project"}
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
                  {iseditMode ? "Update Project" : "Create Project"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default AddProject;