import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for the portal
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
} from "lucide-react";

const Header = ({ setIsLoggedIn }) => {

  const profileRef = useRef(null); // Ref for the profile button to get its position
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({});
  const navigate = useNavigate();

  // Calculate position of the dropdown when it opens
  useEffect(() => {
    if (isDropdownOpen) {
      const rect = profileRef.current.getBoundingClientRect();
      setDropdownCoords({
        // Position it below the button, aligning to the right edge
        top: rect.bottom + 10, // 10px below the button
        right: window.innerWidth - rect.right, // Align right edges
      });
    }
  }, [isDropdownOpen]);

  const handleSignout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Conditionally render the dropdown using a Portal
  const DropdownMenu = () => {
    const portalRoot = document.getElementById("portal-root");
    if (!portalRoot) return null;

    return ReactDOM.createPortal(
      <div className="profile-dropdown" style={dropdownCoords}>
        <ul>
          <li>
            <Link to="/admin" onClick={() => setIsDropdownOpen(false)}>
              <User size={16} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button onClick={handleSignout}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>,
      portalRoot
    );
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard</h1>
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

        <div className="profile-container">
          <div
            className="user-profile"
            ref={profileRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img src="/api/placeholder/32/32" alt="Admin" className="avatar" />
            <span className="username">Admin</span>
            {isDropdownOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
