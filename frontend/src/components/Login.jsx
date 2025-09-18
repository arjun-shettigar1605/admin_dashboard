import React, { useState } from "react";
import "../styles/Login.css";
import loginVideo from "/loginVideo.mp4";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Email:", email, "Password:", password);
    if (email && password) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      {/* Left Side - Video */}
      <div className="video-section">
        <video className="login-video" autoPlay loop muted playsInline>
          <source src={loginVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <div className="video-content"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="form-section">
        <div className="form-container">
          <div className="form-logo">
            <img
              src="https://www.cyient.com/hubfs/Logo_main_animation1.svg"
              alt="Logo"
              loading="lazy"
              className="logo-image"
            />
          </div>
          <div className="form-header">
            <h2 className="brand-title">Welcome</h2>
            <p className="brand-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  id="email"
                />
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22,6 12,13 2,6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  id="password"
                />
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L17.94 17.94Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M1 1l22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19L9.9 4.24Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14m-7-7 7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account?{" "}
              <a href="#" className="signup-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
