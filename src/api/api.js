// src/api/api.js
import axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_URL ||
  'https://portfolio-admin-backend-pk.vercel.app/api';

const API = axios.create({ baseURL });

// Intercept any request URL containing "blogroutes" and rewrite it to "blogs"
API.interceptors.request.use(config => {
  if (config.url && config.url.includes('/blogroutes')) {
    config.url = config.url.replace('/blogroutes', '/blogs');
  }
  return config;
}, error => Promise.reject(error));

export default API;
