import React, { useContext, } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Your Dashboard</h1>
        <p className={styles.subtitle}>
          {isAuthenticated
            ? 'Ready to scan your Aadhaar card? Follow the steps below!'
            : 'Please log in to access Aadhaar scanning features.'}
        </p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How to Scan Your Aadhaar Card</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Step 1: Capture Images</h3>
            <p className={styles.stepDescription}>
              Take clear photos of the front and back of your Aadhaar card using a camera or smartphone.
            </p>
          </div>
          <div className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Step 2: Upload Images</h3>
            <p className={styles.stepDescription}>
              Go to the Upload page and select your front and back images for processing.
            </p>
          </div>
          <div className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Step 3: View Results</h3>
            <p className={styles.stepDescription}>
              Our OCR system will extract and display the information from your Aadhaar card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;