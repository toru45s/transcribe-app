import { create } from "zustand";

type AlertInvalidTokenStore = {
  isOpen: boolean;
  onClose: () => void;
};

export const useAlertInvalidTokenStore = create<AlertInvalidTokenStore>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
  })
);
