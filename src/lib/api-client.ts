import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('feathers-jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      const isAuthPage = window.location.pathname.startsWith('/auth/');
      
      // Only remove token and redirect if we're not already on an auth page
      if (!isAuthPage) {
        localStorage.removeItem('feathers-jwt');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);
