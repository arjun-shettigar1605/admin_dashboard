import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";

const Header = ({ activeMenuItem }) => {
  const { logout } = useAuth();

  const handleSignout = () => {
    logout();
  };

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case "dashboard":
        return "Dashboard";
      case "projects":
        return "Projects";
      case "presales":
        return "Presales";
      case "report":
        return "Reports";
      case "admin":
        return "Admin";
      case "support":  
        return "Support";
      default:
        return "Dashboard";
    }
  };
  return (
    <header className="header">
      <div className="header-left">
        <h1>{getPageTitle()}</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="search project or client"  
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>

      <div className="header-right">
        {/* Profile Link */}
        <Link to="/admin" className="header-action-link">
          <User size={18} />
          <span>Profile</span>
        </Link>

        {/* Logout Button */}
        <button onClick={handleSignout} className="header-logout-link">
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

        {/* User Avatar
        <div className="user-avatar">
          <img
            src="/api/placeholder/36/36"
            alt="Admin"
            className="avatar-img"
          />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
