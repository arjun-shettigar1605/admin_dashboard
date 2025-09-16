import React from "react";

const SummaryCards = () => {
  const summaryData = [
    { icon: "📁", label: "Project", value: "10" },
    { icon: "👥", label: "Client", value: "10" },
    { icon: "📊", label: "Revenue", value: "10" },
    { icon: "💰", label: "Income", value: "10" },
    { icon: "💳", label: "Expense", value: "10" },
  ];

  return (
    <div className="summary-section">
      <h3>Over all Summary</h3>
      <div className="summary-cards">
        {summaryData.map((item, index) => (
          <div key={index} className="summary-card">
            <div className="card-icon">{item.icon}</div>
            <div className="card-content">
              <span className="card-label">{item.label}</span>
              <span className="card-value">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
