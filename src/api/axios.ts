import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:3001", // JSON Server 주소
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
