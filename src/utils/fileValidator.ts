import { allowedFormats, MAX_FILE_SIZE } from "./constants";

export const validateFile = (file: File | null): string | null => {
  if (!file) return "File is required.";
  if (!allowedFormats.includes(file.type)) {
    return "Invalid file format. Only JPG, JPEG, and PNG allowed.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds 5MB.";
  }
  return null;
};
