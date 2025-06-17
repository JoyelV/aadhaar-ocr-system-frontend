import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { isAuthenticated } = authContext;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Your Dashboard</h1>
        <p className={styles.subtitle}>
          {isAuthenticated ? (
            <>
              Ready to scan your Aadhaar card?{' '}
              <Link to="/upload" className={styles.viewLink}>
                Go to Upload
              </Link>
            </>
          ) : (
            <>
              Please <Link to="/login" className={styles.viewLink}>login</Link> to access Aadhaar scanning features.
            </>
          )}
        </p>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How to Scan Your Aadhaar Card</h2>
        <div className={styles.stepsGrid}>
          <article className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Step 1: Capture Images</h3>
            <p className={styles.stepDescription}>
              Take clear photos of the front and back of your Aadhaar card using a camera or smartphone.
            </p>
          </article>
          <article className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Step 2: Upload Images</h3>
            <p className={styles.stepDescription}>
              Go to the Upload page and select your front and back images for processing.
            </p>
          </article>
          <article className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Step 3: View Results</h3>
            <p className={styles.stepDescription}>
              Our OCR system will extract and display the information from your Aadhaar card.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;