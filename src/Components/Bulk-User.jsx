import React, { useState } from "react";
import API from "../api/axiosInstance"; // Ensure API instance is configured properly
import "../styles/BulkUser.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // For success/error messages
  const [isUploading, setIsUploading] = useState(false); // Track upload status

  const allowedFileTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setUploadStatus({ success: false, message: "Unsupported file format! Please upload a CSV or Excel file." });
        setSelectedFile(null);
      } else {
        setUploadStatus(null); // Clear any previous errors
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a valid CSV or Excel file to upload.");
      return;
    }
  
    setIsUploading(true); // Show uploading state
    setUploadStatus({ success: null, message: "Uploading... Please wait." });
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await API.post("/admin/users/bulk_upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        setUploadStatus({ success: true, message: "File uploaded successfully!" });
        setSelectedFile(null);
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: error.response?.data?.error || "File upload failed. Please try again.",
      });
    } finally {
      setIsUploading(false); // ✅ Ensures the state is reset after the API call
    }
  };
  

  return (
    <div>
      {/* <Navbar /> */}
      <div className="home-container1">
        {/* <Sidebar /> */}
        <div className="upload-container">
          {/* <div className="upload-header">Upload File</div> */}
          <div className="upload-area">
            <label htmlFor="file-input" className="upload-button">
              <div className="cloud-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  <polyline points="9 15 12 12 15 15" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                </svg>
              </div>
              Select file to upload
            </label>
            <input type="file" id="file-input" onChange={handleFileChange} className="file-input" />
          </div>

          {selectedFile && <div className="file-info">Selected file: {selectedFile.name}</div>}

          <button className="upload-submit-button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload File"}
          </button>

          {uploadStatus && (
            <div className={`upload-status ${uploadStatus.success ? "success" : "error"}`}>
              {uploadStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
