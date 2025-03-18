import React, { useState, useCallback } from "react";
import { FileText } from "lucide-react";
import API from "../api/axiosInstance"; // ✅ Centralized Axios instance
import "../styles/UserReport.css";
import { useOutletContext, Navigate } from "react-router-dom";

const reports = [
  { id: 1, title: "All Users", description: "Posts, comments, and likes count", endpoint: "users_report" },
  { id: 2, title: "Active Users", description: "Having more than 10 posts/users", endpoint: "active_users_report" },
  { id: 3, title: "Postwise Report", description: "Title/description, comments, likes", endpoint: "posts_report" }
];

const UserReport = () => {
  const { isAdmin,setnavinput } = useOutletContext();
  setnavinput(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.data?.first_name);

  if (!isAdmin) return <Navigate to="/" />;

  const [selectedFormats, setSelectedFormats] = useState(
    reports.reduce((acc, report) => ({ ...acc, [report.id]: "xlsx" }), {})
  );

  // Handle format selection dynamically
  const handleFormatChange = (reportId, format) => {
    setSelectedFormats((prev) => ({ ...prev, [reportId]: format }));
  };

  // Optimized function to download reports
  const downloadReport = useCallback(async (endpoint, format) => {
    try {
      const response = await API.get(`/admin/reports/${endpoint}.${format}`, {
        responseType: "blob",
      });

      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${endpoint}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading report:", error.response?.data || error.message);
    }
  }, []);

  return (
    <div className="maze-main-content">
       <header className="maze_header">
                <div className="maze_header_title">
                  <h2>User Report</h2>
                </div>
                <div className="maze_admin_profile">
                  {/* <img src={Bunny} alt="Admin" className="maze_admin_avatar" /> */}
                  <div className="maze_admin_info">
                    <span className="maze_admin_name">{user?.data?.first_name}</span>
                    <span className="maze_admin_role">(Admin)</span>
                  </div>
                </div>
              </header>
      <div className="maze-reports-grid">
        {reports.map(({ id, title, description, endpoint }) => (
          <div key={id} className="maze-report-card">
            <div className="maze-report-icon-container">
              <FileText className="maze-report-icon" />
            </div>
            <h2 className="maze-report-title">{title}</h2>
            <p className="maze-report-description">{description}</p>

            <div className="maze-report-format">
              {["xlsx", "csv"].map((format) => (
                <label key={format} className="maze-format-option">
                  <input
                    type="radio"
                    name={`format${id}`}
                    value={format}
                    checked={selectedFormats[id] === format}
                    onChange={() => handleFormatChange(id, format)}
                    className="maze-radio"
                  />
                  <span className="maze-radio-label">{format.toUpperCase()}</span>
                </label>
              ))}
            </div>

            <button
              className="maze-download-button"
              onClick={() => downloadReport(endpoint, selectedFormats[id])}
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
