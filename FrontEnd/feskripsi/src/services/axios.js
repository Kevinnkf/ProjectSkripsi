// services/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-service-production.up.railway.app/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  console.log('Axios interceptor sending token:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn('Token expired or unauthorized, logging out...');
      localStorage.removeItem('token');
      this.$router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default api;


// import { useUserStore } from '@/components/Stores/UserStore.vue';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://be-service-production.up.railway.app/',
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//     const userStore = useUserStore()
//     const token = userStore.token || localStorage.getItem('token');
//     console.log('Axios interceptor sending token:', token); 
//     if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     }
// return config;
// });

// export default api;