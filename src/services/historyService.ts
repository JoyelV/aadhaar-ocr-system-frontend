import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/history`;

export const getScanHistory = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_URL}/scans`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch scan history');
  }
};

export const deleteScan = async (scanId: string) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.delete(`${API_URL}/scans/${scanId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Delete scan error for ID ${scanId}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete scan');
  }
};