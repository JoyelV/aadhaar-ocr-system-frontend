import axios from "axios";
import { AadhaarData } from "../types/Aadhaar";

export const uploadAadhaar = async (front: File, back: File): Promise<AadhaarData> => {
  const formData = new FormData();
  formData.append("aadhaarFront", front);
  formData.append("aadhaarBack", back);

  const response = await axios.post<{ data: AadhaarData }>(
    `https://aadhaar-ocr-backend-g1c6.onrender.com/api/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.data;
};
