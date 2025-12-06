import api from "./axios";
import type { LoginRequest, LoginResponse, User } from "../types/user";

// 로그인 API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const emailResponse = await api.get(`/users?email=${data.email}`);

  // 이메일이 없으면
  if (emailResponse.data.length === 0) {
    throw new Error("등록된 가입정보가 없습니다!");
  }

  // 2단계: 사용자는 있는데 비밀번호 확인
  const user = emailResponse.data[0];
  if (user.password !== data.password) {
    throw new Error("비밀번호가 잘못되었습니다.");
  }

  // 이메일과 비밀번호 맞으면 토큰 발급
  const { password, ...userWithoutPassword } = user;

  // 토큰 생성 (실제 서버가 없으므로 임시로 btoa 사용해서 토큰처럼 보이는 문자열 생성)
  const token = btoa(
    JSON.stringify({
      userId: userWithoutPassword.id,
      email: userWithoutPassword.email,
      timestamp: Date.now(),
    })
  );

  return {
    token,
    user: userWithoutPassword as User,
  };
};
