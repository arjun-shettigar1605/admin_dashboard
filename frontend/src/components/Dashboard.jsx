import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/Dashboard.css";
import { Outlet, useLocation} from "react-router-dom";

const Dashboard = ({ setIsLoggedIn }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const location = useLocation(); 

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/project-list")) {
      setActiveMenuItem("projects");
    } else if (path.startsWith("/presales")) {
      setActiveMenuItem("presales");
    } else if (path.startsWith("/report")) {
      setActiveMenuItem("report");
    } else if (path.startsWith("/admin")) {
      setActiveMenuItem("admin");
    } else if (path.startsWith("/support")) {
      setActiveMenuItem("support");
    } else if (path === "/" || path.startsWith("/projects/")) {
      setActiveMenuItem("dashboard");
    } else {
      setActiveMenuItem("dashboard"); 
    }
  }, [location]);

  return (
    <div className="dashboard-layout">
      <Sidebar activeItem={activeMenuItem} setActiveItem={setActiveMenuItem} />
      <div className="main-content">
        <Header activeMenuItem={activeMenuItem} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
