import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  UserCog,
  LifeBuoy,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20}/>,
      path:"/",
    },
    { id: "projects", label: "Projects", path: "/project-list", icon: <Briefcase size={20} /> },
    { id: "report", label: "Report", path: "/report", icon: <BarChart3 size={20} /> },
    { id: "admin", label: "Admin", path: "/admin", icon: <UserCog size={20} /> },
    { id: "support", label: "Support", path: "/support", icon: <LifeBuoy size={20} /> },
  ];

  const handleItemClick = (item)=>{
    setActiveItem(item.id);
    navigate(item.path);
  }

  return (
    <div className="sidebar">
      <div className="logo1">
        <img
          className="logo"
          src="https://www.cyient.com/hubfs/Logo_main_animation1.svg"
          alt="Cyient"
        ></img>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item)} // Updated onClick handler
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
