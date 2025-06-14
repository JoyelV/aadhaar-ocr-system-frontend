import axios from 'axios';

const API_URL = `${process.env.BACKEND_URL}/history`;

export const getScanHistory = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(`${API_URL}/scans`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};