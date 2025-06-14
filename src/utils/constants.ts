import { FieldMappings } from "../types/Aadhaar";

export const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const fieldMappings: FieldMappings = {
  'Full Name': 'name',
  'Aadhaar Number': 'aadhaarNumber',
  'Date of Birth': 'dob',
  'Gender': 'gender',
  'Address': 'address',
  'Pin Code': 'pinCode',
};
