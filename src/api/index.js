// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.chungs.store", // 실제 서버 주소로 변경하세요
  headers: {
    "Content-Type": "application/json",
  },
});

// 필요 시 인터셉터를 활용해 로컬스토리지의 JWT 토큰을 자동으로 첨부할 수 있습니다.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
