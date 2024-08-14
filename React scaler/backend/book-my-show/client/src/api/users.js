//const {axiosInstance} = require('.')
import { axiosInstance } from ".";


//Register new User
export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//Login User
export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/login", value);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetCurrentUser = async () =>{
  try{
    const response = await axiosInstance.get("api/users/get-current-user");
    return response.data;
  }catch(err){
    console.log(err);
  }
}

// import { axiosInstance } from ".";

// // Helper function to make a POST request
// const postRequest = async (url, data) => {
//   try {
//     const response = await axiosInstance.post(url, data);  
//     return response.data;
//   } catch (err) {
//     // Log detailed error information
//     if (err.response) {
//       // Server responded with a status other than 2xx
//       console.error("API Request Error:", err.response.data || err.response.statusText || "Unknown error");
//     } else if (err.request) {
//       // Request was made but no response was received
//       console.error("API Request Error: No response received from server", err.request);
//     } else {
//       // Something else triggered an error
//       console.error("API Request Error:", err.message);
//     }
//     throw err; // Re-throw the error to allow the calling function to handle it
//   }
// };

// // Register new User
// export const RegisterUser = async (value) => {
//   return postRequest("api/users/register", value);
// };

// // Login User
// export const LoginUser = async (value) => {
//   return postRequest("api/users/login", value);
// };
