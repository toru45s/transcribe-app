import { create } from "zustand";

type LogoutAlertState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useLogoutAlertStore = create<LogoutAlertState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
