import axios from "axios";
import { useUserStore } from "../store/userStore";

// 환경에 따른 baseURL 설정
// 개발 환경: json-server (localhost:3001)
// 프로덕션 환경: Vercel API (같은 도메인의 /api)
const getBaseURL = () => {
  // Vercel 배포 환경에서는 같은 도메인의 /api 사용
  if (import.meta.env.PROD) {
    // 프로덕션에서는 상대 경로 사용 (같은 도메인)
    return "/api";
  }
  // 개발 환경에서는 json-server 사용
  return import.meta.env.VITE_API_URL || "http://localhost:3001";
};

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: API 요청 전에 토큰을 헤더에 자동 추가
api.interceptors.request.use(
  (config) => {
    // userStore에서 토큰 가져오기
    const token = useUserStore.getState().token;

    // 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 자동 로그아웃 (선택사항)
api.interceptors.response.use(
  (response) => {
    // 성공 응답은 그대로 반환
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 시 자동 로그아웃
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      // 필요시 로그인 페이지로 리다이렉트
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
