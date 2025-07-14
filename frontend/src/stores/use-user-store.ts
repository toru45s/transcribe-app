import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  token: string | null;
  refreshToken: string | null;
  email: string | null;
  login: (token: string, refreshToken: string, email: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      email: null,
      login: (token: string, refreshToken: string, email: string) =>
        set({ token, refreshToken, email }),
      logout: () => set({ token: null, refreshToken: null, email: null }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        email: state.email,
      }),
    }
  )
);
