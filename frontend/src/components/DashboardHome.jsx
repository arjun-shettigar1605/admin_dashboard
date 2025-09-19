import React from "react";
import { Link } from "react-router-dom";
import { Zap, Globe } from "lucide-react"; // Icons for the tiles
import "../styles/DashboardHome.css"; // We will create this file next

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h1 className="dashboard-title">Geospatial and Utilities</h1>
      <div className="tiles-container">
        <Link to="/projects/utilities" className="dashboard-tile">
          <Zap size={48} className="tile-icon" />
          <h2 className="tile-title">Utilities</h2>
          <p className="tile-description">View all utility-based projects</p>
        </Link>
        <Link to="/projects/geospatial" className="dashboard-tile">
          <Globe size={48} className="tile-icon" />
          <h2 className="tile-title">Geospatial</h2>
          <p className="tile-description">Explore geospatial initiatives</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
