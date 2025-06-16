import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/history`;

export const getScanHistory = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(`${API_URL}/scans`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};

// New function to delete a scan
export const deleteScan = async (scanId: string) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.delete(`${API_URL}/scans/${scanId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};