import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  UserCog,
  LifeBuoy,
  Settings,
} from "lucide-react";


const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "projects", label: "Projects", icon: <Briefcase size={20} /> },
    { id: "report", label: "Report", icon: <BarChart3 size={20} /> },
    { id: "admin", label: "Admin", icon: <UserCog size={20} /> },
    { id: "support", label: "Support", icon: <LifeBuoy size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo1">
        <img
          className="logo"
          src="https://www.cyient.com/hubfs/Logo_main_animation1.svg"
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
