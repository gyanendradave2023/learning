import axios from 'axios';
const token = localStorage.getItem("token");
export const axiosInstance = axios.create({   
    header: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    },
    
});
