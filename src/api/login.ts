import api from "./axios";
import type { LoginRequest, LoginResponse, User } from "../types/user";

// 정적 users 데이터 로드
const loadStaticUsers = async () => {
  const response = await fetch("/users.json");
  const data = await response.json();
  return data;
};

// 로그인 API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  let users;

  // 프로덕션 환경에서는 정적 데이터 사용
  if (import.meta.env.PROD) {
    users = await loadStaticUsers();
  } else {
    // 개발 환경에서는 API 호출
    const emailResponse = await api.get(`/users?email=${data.email}`);
    users = emailResponse.data;
  }

  // 이메일로 사용자 찾기
  const user = users.find((u: any) => u.email === data.email);

  // 이메일이 없으면
  if (!user) {
    throw new Error("등록된 가입정보가 없습니다!");
  }

  // 비밀번호 확인
  if (user.password !== data.password) {
    throw new Error("비밀번호가 잘못되었습니다.");
  }

  // 이메일과 비밀번호 맞으면 토큰 발급
  const { password, ...userWithoutPassword } = user;

  // id를 숫자로 변환
  const userData: User = {
    ...userWithoutPassword,
    id: Number(userWithoutPassword.id),
  };

  // 토큰 생성 (실제 서버가 없으므로 임시로 btoa 사용해서 토큰처럼 보이는 문자열 생성)
  const token = btoa(
    JSON.stringify({
      userId: userData.id,
      email: userData.email,
      timestamp: Date.now(),
    })
  );

  return {
    token,
    user: userData,
  };
};
