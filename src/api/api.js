import axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_URL ||
  'https://portfolio-admin-backend-alpha-6rwz3wcuy.vercel.app/api';

const API = axios.create({ baseURL });

export default API;
