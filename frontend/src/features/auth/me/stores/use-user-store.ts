import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  email: string | null;
  isAuthenticated: boolean;
  login: ({ email }: { email: string }) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      isAuthenticated: false,
      login: ({ email }: { email: string }) =>
        set({ email, isAuthenticated: true }),
      logout: () => set({ email: null, isAuthenticated: false }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
