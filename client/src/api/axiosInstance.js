import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // backend's base API URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // get the token from localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach it in "Bearer <token>" format
  }

  return config;
});

export default axiosInstance;