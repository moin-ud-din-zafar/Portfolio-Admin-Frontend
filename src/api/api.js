// src/api/api.js
import axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_URL ||
  'https://portfolio-admin-backend-pk.vercel.app/api';

const API = axios.create({ baseURL });

// Rewrite legacy route segments before each request
API.interceptors.request.use(config => {
  if (!config.url) return config;

  // blogroutes → blogs
  if (config.url.includes('/blogroutes')) {
    config.url = config.url.replace('/blogroutes', '/blogs');
  }

  // projectroutes → projects
  if (config.url.includes('/projectroutes')) {
    config.url = config.url.replace('/projectroutes', '/projects');
  }

  return config;
}, error => Promise.reject(error));

export default API;
