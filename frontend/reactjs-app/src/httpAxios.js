import axios from "axios";
import { urlAPI } from "./config";

const httpAxios = axios.create({
  baseURL: urlAPI,
  headers: {
    // 'Accept': 'application/json',
    "X-Custom-Header": "foobar"
  },
});

// Tự động thêm mã token vào headers của mỗi yêu cầu
httpAxios.interceptors.request.use(config => {
  // Kiểm tra xem có mã token trong Session Storage không
  const storedUserAdmin = sessionStorage.getItem('useradmin');
  if (storedUserAdmin) {
    const token = JSON.parse(storedUserAdmin).token;
    // Thêm mã token vào headers của yêu cầu
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpAxios.interceptors.response.use((response) => {
  return response.data;
});

export default httpAxios;