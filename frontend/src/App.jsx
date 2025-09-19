import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import ProjectTable from "./components/ProjectTable.jsx";
import AddProject from "./components/AddProject.jsx";
import AdminProfilePage from "./components/AdminProfile.jsx";
import ProjectTable2 from "./components/ProjectTable2.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const Placeholder = ({ title }) => (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{title}</h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>
        This page is under construction.
      </p>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/*"
          element={
            // Pass setIsLoggedIn to the Dashboard component
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<ProjectTable />} />
          <Route path="project-list" element={<ProjectTable2 />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="admin" element={<AdminProfilePage />} />
          <Route path="report" element={<Placeholder title="Reports" />} />
          <Route path="support" element={<Placeholder title="Support" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  