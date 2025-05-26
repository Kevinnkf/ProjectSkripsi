// services/axios.js
import { useUserStore } from '@/components/Stores/UserStore.vue';
import axios from 'axios';



const api = axios.create({
<<<<<<< HEAD
  baseURL: 'https://be-service-production.up.railway.app/',
=======
  baseURL: 'https://be-service-production.up.railway.app/api',
>>>>>>> 82104710609e9e494f3b67cfc3ebcf02e2e310c9
  withCredentials: true,
});

api.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const token = userStore.token || localStorage.getItem('token');
    console.log('Axios interceptor sending token:', token); 
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
return config;
});

export default api;