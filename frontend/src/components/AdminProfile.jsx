import React, { useState } from "react";
import {
  User,
  Shield,
  Settings,
  Camera,
  Save,
  Edit3,
  Calendar,
} from "lucide-react";
import "../styles/AdminProfilePage.css";

import api from "../api/axios"; 
import ChangePasswordModal from "./ChangePasswordModal";  

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    department: "",
    joinDate: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/users/profile");
        // Map snake_case from DB to camelCase for the form
        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          role: data.role || "",
          department: data.department || "",
          joinDate: data.join_date || "",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []); 


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try{
      await api.put('/users/profile', formData);
      setIsEditing(false);
    }
    catch(err){
      console.error(err);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return <div className="admin-page-container">Loading profile...</div>;
  }


  const renderProfileTab = () => (
    <div className="tab-pane">
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {formData.firstName[0]}
            {formData.lastName[0]}
          </div>
          <button className="avatar-edit-button">
            <Camera size={16} />
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-info-header">
            <h2 className="profile-name">
              {formData.firstName} {formData.lastName}
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="edit-profile-button"
            >
              <Edit3 size={16} />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>
          <p className="profile-role">{formData.role}</p>
          <p className="profile-department">{formData.department}</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
      </div>

      <div className="input-group">
        <label>Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="textarea-field"
        />
      </div>

      {isEditing && (
        <div className="form-actions">
          <button onClick={() => setIsEditing(false)} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary-green">
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="tab-pane">
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
        }}
      >
        Security Settings
      </h3>
      <div className="list-item">
        <div>
          <h4>Password</h4>
          <p>Last changed 3 months ago</p>
        </div>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="btn-primary-blue"
        >
          Change Password
        </button>
      </div>
      <div className="list-item">
        <div>
          <h4>Two-Factor Authentication</h4>
          <p>Add an extra layer of security</p>
        </div>
        <button className="btn-primary-green">Enable 2FA</button>
      </div>
      <div className="list-item">
        <div>
          <h4>Active Sessions</h4>
          <p>Manage your active login sessions</p>
        </div>
        <button className="btn-secondary">View Sessions</button>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="tab-pane">
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
        }}
      >
        General Settings
      </h3>
      <div className="list-item">
        <div>
          <h4>Language</h4>
          <p>Choose your preferred language</p>
        </div>
        <select className="select-field">
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>Spanish</option>
        </select>
      </div>
      <div className="list-item">
        <div>
          <h4>Time Zone</h4>
          <p>Set your local time zone</p>
        </div>
        <select className="select-field">
          <option>Eastern Time (ET)</option>
          <option>Central Time (CT)</option>
          <option>Pacific Time (PT)</option>
        </select>
      </div>
      <div className="list-item">
        <div>
          <h4>Theme</h4>
          <p>Choose your interface theme</p>
        </div>
        <select className="select-field">
          <option>Light</option>
          <option>Dark</option>
          <option>Auto</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
      <div className="admin-page-container">
        <div className="admin-page-content">
          <header className="admin-page-header">
            <h1>Admin Profile</h1>
            <p>Manage your account settings and preferences</p>
          </header>

          <main className="main-card">
            <nav className="tab-navigation">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="tab-content">
              {activeTab === "profile" && renderProfileTab()}
              {activeTab === "security" && renderSecurityTab()}
              {activeTab === "settings" && renderSettingsTab()}
            </div>
          </main>

          <section className="quick-stats-grid">
            <div className="stat-card">
              <Calendar className="icon-blue" />
              <div className="stat-info">
                <p className="stat-label">Member Since</p>
                <p className="stat-value">
                  {new Date(formData.joinDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <Shield className="icon-green" />
              <div className="stat-info">
                <p className="stat-label">Security Score</p>
                <p className="stat-value">85%</p>
              </div>
            </div>
            <div className="stat-card">
              <User className="icon-purple" />
              <div className="stat-info">
                <p className="stat-label">Role Level</p>
                <p className="stat-value">Admin</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
