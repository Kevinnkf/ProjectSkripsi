// services/axios.js
import { useUserStore } from '@/components/Stores/UserStore.vue';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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