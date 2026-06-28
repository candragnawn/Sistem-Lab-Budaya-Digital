import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor untuk menambahkan Bearer token ke setiap request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.access_token) {
          config.headers.Authorization = `Bearer ${user.access_token}`;
        }
      } catch (e) {
        console.error('Error parsing user from localStorage');
      }
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
