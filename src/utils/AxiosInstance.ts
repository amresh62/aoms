// src/services/axiosInstance.ts
import axios from 'axios';

const apiUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies in requests
});

axiosInstance.interceptors.request.use(
  (config) => {    
    // const csrfToken = Cookies.get('XSRF-TOKEN'); // 'XSRF-TOKEN' is the default cookie name for the CSRF token
    // if (csrfToken) {
    //   config.headers['X-XSRF-TOKEN'] = csrfToken;
    //   console.log('CSRF Token:', csrfToken);
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
