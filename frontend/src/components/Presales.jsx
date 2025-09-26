import React, { useState } from "react";
import "../styles/Presales.css";
import { FileText, Video, Award, Clock, CheckCircle } from "lucide-react";

const Presales = () => {
  const [activeTab, setActiveTab] = useState("presentation");
  const [activePresentationCategory, setActivePresentationCategory] =
    useState("ppts");

  return (
    <div className="presales-page">
      <header className="presales-header">
        <h1>Presales</h1>
      </header>

      <div className="presales-tabs">
        <button
          className={`tab ${activeTab === "presentation" ? "active" : ""}`}
          onClick={() => setActiveTab("presentation")}
        >
          Presentation
        </button>
        <button
          className={`tab ${activeTab === "bids" ? "active" : ""}`}
          onClick={() => setActiveTab("bids")}
        >
          BIDS
        </button>
      </div>

      <div className="presales-content">
        {activeTab === "presentation" && (
          <div className="presentation-section">
            <div className="presentation-category-selector">
              <button
                className={`category-button ${
                  activePresentationCategory === "ppts" ? "active" : ""
                }`}
                onClick={() => setActivePresentationCategory("ppts")}
              >
                PPTs
              </button>
              <button
                className={`category-button ${
                  activePresentationCategory === "vids" ? "active" : ""
                }`}
                onClick={() => setActivePresentationCategory("vids")}
              >
                Vids
              </button>
            </div>

            <div className="presentation-display-area">
              {activePresentationCategory === "ppts" && (
                <div className="ppts-grid">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="content-thumbnail">
                      <FileText size={60} strokeWidth={1.5} />
                      <h4>PPT {i}</h4>
                    </div>
                  ))}
                </div>
              )}

              {activePresentationCategory === "vids" && (
                <div className="vids-grid">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="content-thumbnail">
                      <Video size={60} strokeWidth={1.5} />
                      <h4>Video {i}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "bids" && (
          <div className="bids-section">
            <div className="bid-tile submitted">
              <div className="bid-tile-header">
                <CheckCircle size={32} />
                <span className="bid-count">12</span>
              </div>
              <h4>Submitted</h4>
              <a href="#" className="bid-action-link"></a>
            </div>
            <div className="bid-tile in-progress">
              <div className="bid-tile-header">
                <Clock size={32} />
                <span className="bid-count">5</span>
              </div>
              <h4>In-Progress</h4>
              <a href="#" className="bid-action-link"></a>
            </div>
            <div className="bid-tile awarded">
              <div className="bid-tile-header">
                <Award size={32} />
                <span className="bid-count">28</span>
              </div>
              <h4>Awarded</h4>
              <a href="#" className="bid-action-link"></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Presales;
