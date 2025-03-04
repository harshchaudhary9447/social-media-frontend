import React from 'react';
import { FileText } from "lucide-react";
import "../styles/UserReport.css";

const reports = [
  { id: 1, title: "All Users", description: "Posts, comments and likes count", endpoint: "users_report" },
  { id: 2, title: "Active Users", description: "Having more than 10 posts/users", endpoint: "active_users_report" },
  { id: 3, title: "Postwise Report", description: "Title/description, comments, likes", endpoint: "posts_report" }
];

const UserReport = () => {
  const downloadReport = async (endpoint, format) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/reports/${endpoint}.${format}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${endpoint}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="maze-main-content">
      <div className="maze-reports-grid">
        {reports.map(({ id, title, description, endpoint }) => (
          <div key={id} className="maze-report-card">
            <div className="maze-report-icon-container">
              <FileText className="maze-report-icon" />
            </div>
            <h2 className="maze-report-title">{title}</h2>
            <p className="maze-report-description">{description}</p>

            <div className="maze-report-format">
              <label className="maze-format-option">
                <input type="radio" name={`format${id}`} value="xlsx" className="maze-radio" defaultChecked />
                <span className="maze-radio-label">Excel</span>
              </label>
              <label className="maze-format-option">
                <input type="radio" name={`format${id}`} value="csv" className="maze-radio" />
                <span className="maze-radio-label">CSV</span>
              </label>
            </div>

            <button
              className="maze-download-button"
              onClick={() => {
                const format = document.querySelector(`input[name='format${id}']:checked`).value;
                downloadReport(endpoint, format);
              }}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReport;
