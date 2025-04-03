import api from "@/lib/axios";

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  // dob: string;
  isSouthAfrican: "yes" | "no";
  saIdNumber?: string;
  title: "Mr" | "Ms" | "Mrs";
  physicalAddress?: string;
}) => {
  try {
    console.log("Sending registration request:", userData); // Debugging
    const response = await api.post("/auth/register", userData);
    console.log("Registration success:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (userData: { userName: string; password: string }) => {
  try {
    console.log("Sending login request:", userData); // Debugging
    const response = await api.post("/auth/login", userData);
    console.log("Login success:", response.data);
    return response.data; // Returns token
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};