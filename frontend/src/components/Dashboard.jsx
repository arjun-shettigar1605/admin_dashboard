import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
// import ProjectTable from "./ProjectTable";
import "../styles/Dashboard.css";
import { Outlet } from "react-router-dom";

const Dashboard = ({ setIsLoggedIn }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  return (
    <div className="dashboard-layout">
      <Sidebar activeItem={activeMenuItem} setActiveItem={setActiveMenuItem} />
      <div className="main-content">
        <Header setIsLoggedIn={setIsLoggedIn}/>
        <div className="content-area">
          <Outlet/>
          {/* CORRECTED: Changed className to "bottom-content" to match the CSS */}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
