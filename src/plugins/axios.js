import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
  auth: {
    username: import.meta.env.VITE_API_AUTH_USERNAME,
    password: import.meta.env.VITE_API_AUTH_PASS,
  },
})

export default instance;
