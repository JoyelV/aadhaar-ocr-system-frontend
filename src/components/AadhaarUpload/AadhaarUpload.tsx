import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadSection from "./UploadSection";
import ParsedDataView from "./ParsedDataView";
import { AadhaarData } from "../../types/Aadhaar";
import { validateFile } from "../../utils/fileValidator";
import { uploadAadhaar } from "../../services/orcService";
import styles from "../../components/AadhaarUpload/AadhaarUpload.module.css";

const AadhaarUpload: React.FC = () => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [data, setData] = useState<AadhaarData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    setFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpload = async () => {
    if (!frontFile || !backFile) {
      toast.error("Upload both front and back images.");
      return;
    }
  
    try {
      setLoading(true);
      const result = await uploadAadhaar(frontFile, backFile);
      const extractedText = JSON.stringify(result).toLowerCase(); 
  
      const hasAadhaarKeywords =
        extractedText.includes("government of india") ||
        extractedText.includes("uidai") ||
        extractedText.includes("aadhaar") ||
        /\b\d{4}\s\d{4}\s\d{4}\b/.test(extractedText); 
  
      if (!hasAadhaarKeywords) {
        toast.error("Uploaded image doesn't appear to be an Aadhaar card.");
        return;
      }
      console.log("Parsed Data:", result); 
      setData(result);
      toast.success("OCR Completed Successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.uploadSectionWrapper}>
          <div className={styles.uploadBox}>
            <UploadSection
              label="Aadhaar Front"
              preview={frontPreview}
              onFileChange={(e) => handleFileInput(e, setFrontFile, setFrontPreview)}
            />
            <UploadSection
              label="Aadhaar Back"
              preview={backPreview}
              onFileChange={(e) => handleFileInput(e, setBackFile, setBackPreview)}
            />

            <button
              className={styles.uploadButton}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Processing..." : "PARSE AADHAAR"}
            </button>
          </div>
        </div>

        <div className={styles.apiResponseWrapper}>
          <div className={styles.apiResponse}>
            <h3>API RESPONSE</h3>
            {loading ? (
              <p>"Performing OCR by inputing your Aadhaar front and back"</p>
            ) : data ? (
              <ParsedDataView data={data} />
            ) : (
              <p>No data available. Please upload Aadhaar images.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarUpload;