import { FieldMappings } from "../types/Aadhaar";

export const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const fieldMappings: FieldMappings = {
  "Aadhaar Number": "aadhaarNumber",
  "Name as in Aadhaar": "name",
  "D.O.B": "dob",
  "Gender": "gender",
  "Address": "address",
  "Pin code": "pinCode",
  "District": "district",
  "State": "state",
};
