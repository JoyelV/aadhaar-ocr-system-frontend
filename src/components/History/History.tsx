import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getScanHistory, deleteScan } from '../../services/historyService'; 
import styles from './History.module.css';
import { ClipLoader } from 'react-spinners';

interface Scan {
  _id: string;
  frontImage: string;
  backImage: string;
  parsedData: {
    aadhaarNumber?: string;
    name?: string;
    dob?: string;
    gender?: string;
    address?: string;
    error?: string;
  };
  createdAt: string;
}

const History: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getScanHistory();
        setScans(data);
      } catch (error: any) {
        toast.error('Failed to load scan history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleView = (scan: Scan) => {
    setSelectedScan(scan);
  };

  const closeModal = () => {
    setSelectedScan(null);
  };

  // New function to handle scan deletion
  const handleDelete = async (scanId: string) => {
    if (!window.confirm('Are you sure you want to delete this scan?')) {
      return; // Cancel if user does not confirm
    }

    try {
      await deleteScan(scanId); // Call delete service
      setScans(scans.filter((scan) => scan._id !== scanId)); // Remove scan from state
      if (selectedScan?._id === scanId) {
        setSelectedScan(null); // Close modal if the deleted scan is open
      }
      toast.success('Scan deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete scan');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <ClipLoader size={60} color='#4f46e5' />
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Scan History</h2>
      {scans.length === 0 ? (
        <p>No scans found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan._id}>
                <td>{`${scan.parsedData?.name || 'N/A'}`}</td>
                <td>{new Date(scan.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleView(scan)}
                    className={styles.viewButton}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(scan._id)} // Add delete button
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedScan && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Scan Details</h3>
            <button onClick={closeModal} className={styles.closeButton}>Close</button>
            <div className={styles.imageContainer}>
              <div>
                <h4>Front Image</h4>
                <img src={selectedScan.frontImage} alt='Front' className={styles.image} />
              </div>
              <div>
                <h4>Back Image</h4>
                <img src={selectedScan.backImage} alt='Back' className={styles.image} />
              </div>
            </div>
            <div className={styles.details}>
              <h4>Extracted Data</h4>
              {selectedScan.parsedData.error ? (
                <p className={styles.error}>{selectedScan.parsedData.error}</p>
              ) : (
                <>
                  <p><strong>Aadhaar Number:</strong> {selectedScan.parsedData.aadhaarNumber || 'N/A'}</p>
                  <p><strong>Name:</strong> {selectedScan.parsedData.name || 'N/A'}</p>
                  <p><strong>Date of Birth:</strong> {selectedScan.parsedData.dob || 'N/A'}</p>
                  <p><strong>Gender:</strong> {selectedScan.parsedData.gender || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedScan.parsedData.address || 'N/A'}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;