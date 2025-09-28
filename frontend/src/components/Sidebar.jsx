import React from "react";
import "../styles/CyientLogo.css";

import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  UserCog,
  LifeBuoy,
  FileText,
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
    { id: "presales", label: "Presales", path: "/presales", icon: <FileText size={20} />},
    { id: "admin", label: "Admin", path: "/admin", icon: <UserCog size={20} /> },
  ];

  const handleItemClick = (item)=>{
    setActiveItem(item.id);
    navigate(item.path);
  }

  return (
    <div className="sidebar">
      <div className="logo1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 138 25"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <path
            d="M21.3194,19.687c-2.4301,3.1206-5.9632,4.6809-9.828,4.6809C5.63137,24.3679,0,19.3553,0,12.5537C0,5.42478,5.63137,0.631836,11.7066,0.631836c3.6452,0,7.1782,1.560284,9.3886,4.456674l-3.533,3.34475c-1.5469-2.00416-3.5331-2.89639-5.8556-2.89639-3.75722,0-6.8464,3.12057-6.8464,6.90923s3.09366,7.0212,6.8464,7.0212c2.318,0,4.4208-1.0043,5.9632-3.1205l3.6451,3.3447"
            fill="#fff"
          />
          <path
            d="M33.4475,14.4501L24.4445,1.20117h5.6134L35.909,10.0787l5.8914-8.87753h5.5238L38.3211,14.4501v9.2048h-4.8736v-9.2048Z"
            fill="#fff"
          />
          <path
            d="M57.4166,1.20117h-4.6898v22.45823h4.6898v-22.45823Z"
            fill="#fff"
          />
          <path
            d="M91.0973,1.20117h4.5912L106.265,15.5666v-14.36543h4.73v22.45373h-4.313L95.8275,8.96224v14.69266h-4.7302v-22.45373Z"
            fill="#fff"
          />
          <path
            d="M125.917,5.85064h-7.246v-4.64947h19.329v4.64947h-7.25v17.80426h-4.833v-17.80426Z"
            fill="#fff"
          />
          <path
            d="M67.2223,1.20117h16.2036v4.64947h-11.4555v13.24896h11.4555v4.5553h-16.2036v-22.45373Z"
            fill="#fff"
          />
          <path
            className="animatedPath"
            d="M75.0371,12.4283c0-1.7262,1.4303-3.12508,3.1968-3.12508s3.1968,1.39888,3.1968,3.12508-1.4303,3.125-3.1968,3.125-3.1968-1.3988-3.1968-3.125Z"
            fill="#fff"
          />
        </svg>
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
