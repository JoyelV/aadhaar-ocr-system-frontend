import React from "react";
import { AadhaarData } from "../../types/Aadhaar";
import styles from "../../components/AadhaarUpload/AadhaarUpload.module.css";

interface Props {
  data: AadhaarData;
  extractTextAfterSIO: (text: string) => string; 
}

const ParsedDataView: React.FC<Props> = ({ data, extractTextAfterSIO }) => {
  const address = data.address || "EE en Em N aR Rafts gga Sifter As 4 URGuEIGEnCationAuhoRty of India ZZ KAGHAAR Address EE oe or TE aE SIO K X Varghese, Komaroth House, Pattath ai mer ei any, ER Road, Chalikkavattom, Vennala, PO re SVennala";
  const textAfterSIO = extractTextAfterSIO(address);

  return (
    <div className={styles.dataBox}>
      <div className={styles.dataGrid}>
        <div className={styles.dataField}>
          <label className={styles.dataLabel}>Address:</label>
          <span className={styles.dataValue}>{textAfterSIO}</span>
        </div>
      </div>
    </div>
  );
};

export default ParsedDataView;