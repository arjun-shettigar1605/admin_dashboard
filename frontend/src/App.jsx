import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx"; // Assuming Dashboard.jsx is in the pages folder
import Login from "./components/Login.jsx";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        isLoggedIn? <Home/>: <Navigate to="/login" replace />
      } />
      <Route path="/login" element={
        (!isLoggedIn) ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" replace />
      } />
    </Routes>
  </BrowserRouter>
  )
}

const Home = () => {
  return (
    <div className="App">
      <Dashboard />
    </div>
  )
}

export default App;
