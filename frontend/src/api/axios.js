// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // The proxy in package.json will handle this
  headers: {
    "Content-Type": "application/json",
  },
});

/* This is an interceptor. It runs before every request.
  It checks if we have a token in localStorage and adds it to the request header.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
