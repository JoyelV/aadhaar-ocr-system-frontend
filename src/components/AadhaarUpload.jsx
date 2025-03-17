import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./AadhaarUpload.css";

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

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!frontFile || !backFile) {
      toast.error("Upload both front and back images");
      return;
    }
    const formData = new FormData();
    formData.append("aadhaarFront", frontFile);
    formData.append("aadhaarBack", backFile);

    try {
      const response = await axios.post(`${process.env.BACKEND_URI}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response,"response");
      setData(response.data.data);
      toast.success("OCR Completed Successfully!");
    } catch (error) {
      toast.error("Error Extracting data!");
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
                <img src={item.preview} alt={`${item.label} Preview`} className="preview" />
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
        <button onClick={handleUpload} className="upload-button">Parse Aadhaar</button>
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
      ):(
        <div className="data-box">
          <h3 className="data-title">API RESPONSE</h3>
          <p>Start performing OCR processing by uploading images</p>
        </div>
      )}
    </div>
  );
}
