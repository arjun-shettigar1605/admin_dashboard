import React from "react";

const ProjectChart = () => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>All Projects</h3>
      </div>
      <div className="chart-content">
        <div className="chart-circle">
          <div className="circle-chart">
            <div className="circle-inner">
              <span className="chart-number">62</span>
              <span className="chart-label">Complete</span>
            </div>
          </div>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot complete"></div>
            <span>Complete</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot pending"></div>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot not-started"></div>
            <span>Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChart;
