// src/api/api.js

import axios from 'axios';

// Determine baseURL from environment (CRA or Vite) or fallback
const baseURL =
  // CRA
  (typeof process !== 'undefined' &&
    process.env.REACT_APP_API_URL) ||
  // Vite
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  // Fallback
  'http://localhost:5000/api';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
