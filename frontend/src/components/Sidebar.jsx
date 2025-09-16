import React from "react";
import logo from "/logo.png";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "projects", label: "Projects", icon: "🏠" },
    { id: "report", label: "Report", icon: "📋" },
    { id: "admin", label: "Admin", icon: "👥" },
    { id: "support", label: "Support", icon: "💬" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="sidebar">
      <div className="logo1">
        <img
          className="logo"
          src={logo}
        ></img>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => setActiveItem(item.id)}
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
