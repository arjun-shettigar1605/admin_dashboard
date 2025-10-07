import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import ProjectTable from "./components/ProjectTable";
import AdminProfile from "./components/AdminProfile";
import Login from "./components/Login";
import ProjectTable2 from "./components/ProjectTable2";
import AddProject from "./components/AddProject";
import Presales from "./components/Presales";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

const Placeholder = ({ title }) => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{title}</h1>
    <p style={{ fontSize: "1.2rem", color: "#666" }}>
      This page is under construction.
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="projects/:projectType" element={<ProjectTable />} />
            <Route path="project-list" element={<ProjectTable2 />} />
            <Route path="admin" element={<AdminProfile />} />
            <Route path="report" element={<Placeholder title="Reports" />} />
            <Route path="presales" element={<Presales />} />
            <Route path="support" element={<Placeholder title="Support" />} />
            {/* The route for editing a project */}
            <Route path="edit-project/:id" element={<ProjectTable2 />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
