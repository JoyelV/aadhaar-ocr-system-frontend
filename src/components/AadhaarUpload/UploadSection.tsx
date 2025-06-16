import React from 'react';
import styles from './UploadSection.module.css';

interface UploadSectionProps {
  label: string;
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void; 
}

const UploadSection: React.FC<UploadSectionProps> = ({ label, preview, onFileChange, onRemove }) => {
  const inputName = label === 'Aadhaar Front' ? 'front' : 'back';

  return (
    <div className={styles.uploadSection}>
      <label className={styles.uploadLabel}>{label}</label>
      <div className={styles.uploadArea}>
        <p>Click to select or drag & drop file</p>
        <input
          type="file"
          name={inputName}
          accept="image/*"
          onChange={onFileChange}
          className={styles.fileInput}
        />
      </div>
      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt={`${label} Preview`} className={styles.previewImage} />
          <button className={styles.removeButton} onClick={onRemove}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadSection;