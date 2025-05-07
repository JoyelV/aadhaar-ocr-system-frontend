export type AadhaarData = {
    aadhaarNumber?: string;
    name?: string;
    dob?: string;
    gender?: string;
    address?: string;
    pinCode?: string;
    district?: string;
    state?: string;
  };
  
  export type FieldMappings = {
    [key: string]: keyof AadhaarData;
  };
  