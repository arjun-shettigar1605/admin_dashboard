import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProjectTable from "./ProjectTable";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  return (
    <div className="dashboard-layout">
      <Sidebar activeItem={activeMenuItem} setActiveItem={setActiveMenuItem} />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <ProjectTable />
          {/* CORRECTED: Changed className to "bottom-content" to match the CSS */}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
