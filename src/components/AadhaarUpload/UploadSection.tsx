import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import styles from "./AadhaarUpload.module.css";

interface UploadSectionProps {
  label: string;
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Icon = FaCloudUploadAlt as React.FC<React.SVGProps<SVGSVGElement>>;

const UploadSection: React.FC<UploadSectionProps> = ({ label, preview, onFileChange }) => (
  <div className={styles.uploadArea}>
    {preview ? (
      <img src={preview} alt={`${label} Preview`} className={styles.preview} />
    ) : null}
    <label className={styles.uploadLabel}>
    <Icon className={styles.icon} />
    <p>{label}</p>
      <input type="file" accept="image/*" className={styles.hidden} onChange={onFileChange} />
    </label>
  </div>
);

export default UploadSection; 
