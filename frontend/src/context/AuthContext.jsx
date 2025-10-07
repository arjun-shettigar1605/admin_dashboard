// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // On initial load, verify token and user data
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      setAuth({ user, token, isAuthenticated: true, loading: false });
    } else {
      setAuth({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setAuth({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      loading: false,
    });
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
    navigate("/login", { replace: true });
  };

  const value = { ...auth, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};
