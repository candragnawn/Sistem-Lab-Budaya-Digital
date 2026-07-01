import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Interceptor untuk menambahkan Bearer token ke setiap request
api.interceptors.request.use((config) => {
  // Paksa header Accept agar Laravel selalu tahu ini adalah API request
  if (config.headers.set) {
    config.headers.set('Accept', 'application/json');
  } else {
    config.headers['Accept'] = 'application/json';
  }

  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.access_token) {
          if (config.headers.set) {
            config.headers.set('Authorization', `Bearer ${user.access_token}`);
          } else {
            config.headers['Authorization'] = `Bearer ${user.access_token}`;
          }
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
