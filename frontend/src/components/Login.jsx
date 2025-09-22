import React, { useState } from "react";
import "../styles/Login.css";
import loginVideo from "/loginVideo.mp4";
import "../styles/CyientLogo.css";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 138 25"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              <path
                d="M21.3194,19.687c-2.4301,3.1206-5.9632,4.6809-9.828,4.6809C5.63137,24.3679,0,19.3553,0,12.5537C0,5.42478,5.63137,0.631836,11.7066,0.631836c3.6452,0,7.1782,1.560284,9.3886,4.456674l-3.533,3.34475c-1.5469-2.00416-3.5331-2.89639-5.8556-2.89639-3.75722,0-6.8464,3.12057-6.8464,6.90923s3.09366,7.0212,6.8464,7.0212c2.318,0,4.4208-1.0043,5.9632-3.1205l3.6451,3.3447"
                fill="#fff"
              />
              <path
                d="M33.4475,14.4501L24.4445,1.20117h5.6134L35.909,10.0787l5.8914-8.87753h5.5238L38.3211,14.4501v9.2048h-4.8736v-9.2048Z"
                fill="#fff"
              />
              <path
                d="M57.4166,1.20117h-4.6898v22.45823h4.6898v-22.45823Z"
                fill="#fff"
              />
              <path
                d="M91.0973,1.20117h4.5912L106.265,15.5666v-14.36543h4.73v22.45373h-4.313L95.8275,8.96224v14.69266h-4.7302v-22.45373Z"
                fill="#fff"
              />
              <path
                d="M125.917,5.85064h-7.246v-4.64947h19.329v4.64947h-7.25v17.80426h-4.833v-17.80426Z"
                fill="#fff"
              />
              <path
                d="M67.2223,1.20117h16.2036v4.64947h-11.4555v13.24896h11.4555v4.5553h-16.2036v-22.45373Z"
                fill="#fff"
              />
              <path
                className="animatedPath"
                d="M75.0371,12.4283c0-1.7262,1.4303-3.12508,3.1968-3.12508s3.1968,1.39888,3.1968,3.12508-1.4303,3.125-3.1968,3.125-3.1968-1.3988-3.1968-3.125Z"
                fill="#fff"
              />
            </svg>
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
