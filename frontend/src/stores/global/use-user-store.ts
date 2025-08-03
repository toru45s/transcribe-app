import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      email: null,
      login: (email: string) => set({ isLoggedIn: true, email }),
      logout: () => set({ isLoggedIn: false, email: null }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        email: state.email,
      }),
    }
  )
);
