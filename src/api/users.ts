import api from "./axios";
import type { User } from "../types/user";

// 환경에 따른 데이터 로드 방식
const loadStaticUsers = async (): Promise<User[]> => {
  // 프로덕션 환경에서는 정적 JSON 파일 사용
  const response = await fetch("/users.json");
  const data = await response.json();
  return data.map((u: any) => ({
    ...u,
    id: Number(u.id),
  }));
};

// 모든 사용자 조회
export const getUsers = async (): Promise<User[]> => {
  // 프로덕션 환경에서는 정적 데이터 사용
  if (import.meta.env.PROD) {
    return loadStaticUsers();
  }
  // 개발 환경에서는 API 호출
  const response = await api.get("/users");
  return response.data.map((u: any) => ({
    ...u,
    id: Number(u.id),
  }));
};
