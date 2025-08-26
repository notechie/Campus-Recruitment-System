import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL:  "http://localhost:3000", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    console.error("[ERROR RESPONSE]", error.response?.status, error.response?.data);

    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
        window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
