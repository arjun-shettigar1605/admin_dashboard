import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Globe } from "lucide-react";
import "../styles/DashboardHome.css";
import geospatial from "/geospatial.png";
import geospatialblacknwhite from "/geospatial-blacknwhite.png";
import utility from "/utilities.png";
import utilityblacknwhite from "/utilities-blacknwhite.png";
const DashboardHome = () => {
  const navigate = useNavigate();

  const handleTileClick = (projectType) => {
    navigate(`/projects/${projectType}`);
  };

  return (
    <div className="dashboard-home">
      {/* <h1 className="dashboard-title">Geospatial and Utilities</h1> */}
      <div className="tiles-container">
        <div
          className="dashboard-tile"
          onClick={() => handleTileClick("geospatial")}
        >
          <div className="tile-image-container">
            <img
              src={utilityblacknwhite}
              alt="Geospatial"
              className="tile-image default-image"
            />
            <img
              src={utility}
              alt="Geospatial Hover"
              className="tile-image hover-image"
            />
          </div>
          <div className="tile-content">
            <h2 className="tile-title">Geospatial</h2>
            {/* <p className="tile-description">Explore geospatial initiatives</p> */}
          </div>
          {/* <div className="view-button">View Projects</div> */}
        </div>
        <div
          className="dashboard-tile"
          onClick={() => handleTileClick("utilities")}
        >
          <div className="tile-image-container">
            <img
              src={geospatialblacknwhite}
              alt="Utilities"
              className="tile-image default-image"
            />
            <img
              src={geospatial}
              alt="Utilities Hover"
              className="tile-image hover-image"
            />
          </div>
          <div className="tile-content">
            <h2 className="tile-title">Utilities</h2>
            {/* <p className="tile-description">View all utility-based projects</p> */}
          </div>
          {/* <div className="view-button">View Projects</div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
