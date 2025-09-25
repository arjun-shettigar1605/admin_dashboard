// ConfirmationPopup.jsx

import React from "react";

const ConfirmationPopup = ({
  close,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "delete",
}) => {
  const handleConfirm = () => {
    onConfirm(); // First, run the original confirm logic (e.g., delete items)
    onClose(); // Then, close the popup
  };

  const handleOverlayClick = (e) => {
    // Close popup if clicking on the overlay (not the popup content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-card">
        <div className={`popup-icon ${type}`}>
          {type === "delete" && "🗑️"}
          {type === "logout" && "👋"}
        </div>
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <div className="popup-actions">
          <button className="popup-button cancel" onClick={close}>
            {cancelText}
          </button>
          <button
            className={`popup-button confirm ${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
