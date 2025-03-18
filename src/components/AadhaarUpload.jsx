import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./AadhaarUpload.css";

const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

const fieldMappings = {
  "Aadhaar Number": "aadhaarNumber",
  "Name as in Aadhaar": "name",
  "D.O.B": "dob",
  "Gender": "gender",
  "Address": "address",
  "Pin code": "pinCode",
  "District": "district",
  "State": "state"
};

export default function AadhaarUpload() {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file) => {
    if (!file) return "File is required.";
    if (!allowedFormats.includes(file.type)) return "Invalid file format. Only JPG, JPEG, and PNG allowed.";
    if (file.size > MAX_FILE_SIZE) return "File size exceeds 5MB.";
    return null;
  };

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    const validationError = validateFile(file);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!frontFile || !backFile) {
      toast.error("Upload both front and back images.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("aadhaarFront", frontFile);
    formData.append("aadhaarBack", backFile);

    try {
      const response = await axios.post(
        `https://aadhaar-ocr-backend-g1c6.onrender.com/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setData(response.data.data);
      toast.success("OCR Completed Successfully!");
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Server error"}`);
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="upload-box">
        <h2 className="title">Aadhaar OCR System</h2>
        <p className="description">
          Upload both the front and back images of your Aadhaar card. Ensure the images are clear and legible.
        </p>
        <div className="upload-grid">
          {[{ preview: frontPreview, setFile: setFrontFile, setPreview: setFrontPreview, label: "Upload Front" },
          { preview: backPreview, setFile: setBackFile, setPreview: setBackPreview, label: "Upload Back" }].map((item, index) => (
            <div key={index} className="upload-area">
              {item.preview ? (
                <>
                  <img src={item.preview} alt={`${item.label} Preview`} className="preview" />
                  <label className="upload-label">
                    <FaCloudUploadAlt className="icon" />
                    <p>{item.label}</p>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, item.setFile, item.setPreview)} />
                  </label>
                </>
              ) : (
                <label className="upload-label">
                  <FaCloudUploadAlt className="icon" />
                  <p>{item.label}</p>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, item.setFile, item.setPreview)} />
                </label>
              )}
            </div>
          ))}
        </div>
        <button onClick={handleUpload} className="upload-button" disabled={loading}>
          {loading ? "Processing..." : "Parse Aadhaar"}
        </button>
      </div>
      {data ? (
        <div className="data-box">
          <h3 className="data-title">Parsed Data</h3>
          <div className="data-grid">
            {Object.entries(fieldMappings).map(([label, key], index) => (
              <div key={index} className="data-field">
                <label className="data-label">{label}:</label>
                <span className="data-value">{data[key] || "N/A"}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="data-box">
          <h3 className="data-title">API RESPONSE</h3>
          <p>Start performing OCR processing by uploading images</p>
        </div>
      )}
    </div>
  );
}
