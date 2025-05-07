import React from "react";
import { AadhaarData } from "../../types/Aadhaar";
import { fieldMappings } from "../../utils/constants";
import styles from "../../components/AadhaarUpload/AadhaarUpload.module.css";

interface Props {
  data: AadhaarData;
}

const ParsedDataView: React.FC<Props> = ({ data }) => (
  <div className={styles.dataBox}>
    <h3 className={styles.dataTitle}>Parsed Data</h3>
    <div className={styles.dataGrid}>
      {Object.entries(fieldMappings).map(([label, key], index) => (
        <div key={index} className={styles.dataField}>
          <label className={styles.dataLabel}>{label}:</label>
          <span className={styles.dataValue}>{data?.[key] || "N/A"}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ParsedDataView;
