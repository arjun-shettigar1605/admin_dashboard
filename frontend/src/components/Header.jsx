import React from "react";

const Header = () => {
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
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="header-right">
        <button className="add-project-btn">
          <span className="plus-icon">+</span>
          Add New Project
        </button>
        <div className="notification-icon">🔔</div>
        <div className="user-profile">
          <img
            src="/api/placeholder/32/32"
            alt="Alexander"
            className="avatar"
          />
          <span className="username">Admin</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
