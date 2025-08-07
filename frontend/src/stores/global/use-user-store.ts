import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  token: string | null;
  email: string | null;
  login: ({ token, email }: { token: string; email: string }) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      login: ({ token, email }: { token: string; email: string }) =>
        set({ token, email }),
      logout: () => set({ token: null, email: null }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        token: state.token,
        email: state.email,
      }),
    }
  )
);
