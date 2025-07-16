import { create } from "zustand";

type DeleteHistorySetAlertState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeleteHistorySetAlertStore = create<DeleteHistorySetAlertState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
