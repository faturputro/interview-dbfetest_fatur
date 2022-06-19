import axios from 'axios';
import { ElMessage } from 'element-plus'

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

instance.interceptors.response.use((res) => res, (err) => {
  ElMessage({
    message: err.response.data.message,
    type: 'error',
  });
  return Promise.reject(err)
})

export default instance;
