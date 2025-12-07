import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface UserStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Zustand 스토어 생성
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      token: null,
      isLoggedIn: false,

      // 로그인 함수
      login: (user, token) => {
        set({
          user,
          token,
          isLoggedIn: true,
        });
      },

      // 로그아웃 함수
      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "user-storage", // 로컬 스토어 이름
    }
  )
);
