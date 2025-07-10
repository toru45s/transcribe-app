import { create } from "zustand";

type UserState = {
  token: string | null;
  mail: string | null;
  login: (token: string, mail: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  token: null,
  mail: null,
  login: (token: string, mail: string) => set({ token, mail }),
  logout: () => set({ token: null, mail: null }),
}));
