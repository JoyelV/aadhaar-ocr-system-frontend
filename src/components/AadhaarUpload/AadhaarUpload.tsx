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
    toast.error('Both front and back Aadhaar images needed. No cat selfies or butter chicken, please!');
    return;
  }

  try {
    setLoading(true);
    const result = await uploadAadhaar(frontFile, backFile);

    // Validate response structure
    if (
      !result ||
      typeof result.name !== 'string' ||
      typeof result.aadhaarNumber !== 'string' ||
      typeof result.dob !== 'string' ||
      typeof result.gender !== 'string' ||
      typeof result.address !== 'string' ||
      typeof result.pinCode !== 'string'
    ) {
      toast.error('Invalid Aadhaar data. Try actual Aadhaar cards, not your dinner plate!');
      return;
    }

    if (Object.values(result).some(value => value === 'Not Found')) {
      toast.warn('Clearer Aadhaar images, please—no blurry curry shots!');
    } else {
      toast.success('Aadhaar nailed it!!');
    }
    setData(result);
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Processing failed. Upload valid Aadhaar images!';
    if (errorMessage.includes('QR code')) {
      toast.error('No QR code found. Aadhaar cards have QR codes—unlike cat pics!');
    } else if (errorMessage.includes('brightness')) {
      toast.error('Image too colorful or dark. Aadhaar cards aren’t as vibrant as butter chicken!');
    } else {
      toast.error(errorMessage);
    }
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
              onFileChange={(e) =>
                handleFileInput(e, setFrontFile, setFrontPreview)
              }
            />
            <UploadSection
              label="Aadhaar Back"
              preview={backPreview}
              onFileChange={(e) =>
                handleFileInput(e, setBackFile, setBackPreview)
              }
            />

            <button
              className={styles.uploadButton}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Processing..." : "🚀 Parse Aadhaar"}
            </button>
          </div>
        </div>

        <div className={styles.apiResponseWrapper}>
          <div className={styles.apiResponse}>
            <h3>API RESPONSE</h3>
            {loading ? (
              <div className={styles.loadingSection}>
                <div className={styles.spinner}></div>
                <div className={styles.loadingText}>
                  <p>Performing OCR on Aadhaar images..........</p>
                  <p>🔐 Validating Aadhaar number</p>
                </div>
              </div>
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
