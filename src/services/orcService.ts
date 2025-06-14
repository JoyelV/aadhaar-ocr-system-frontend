import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

export const uploadAadhaar = async (frontFile: File, backFile: File) => {
  const formData = new FormData();
  formData.append('front', frontFile);
  formData.append('back', backFile);

  // Debug: Log FormData keys
  for (const pair of formData.entries()) {
    console.log(`FormData field: ${pair[0]}, File: ${pair[1]}`);
  }

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(`${API_URL}/api/upload-aadhaar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Upload Error:', error.message, error.code);
    throw error;
  }
};