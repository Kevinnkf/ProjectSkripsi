// services/ragAxios.js
import axios from 'axios';

const ragApi = axios.create({
  baseURL: import.meta.env.VITE_RAG_API,
});

export default ragApi;
