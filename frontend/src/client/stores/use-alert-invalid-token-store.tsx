import { create } from "zustand";

type AlertInvalidTokenStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useAlertInvalidTokenStore = create<AlertInvalidTokenStore>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);
