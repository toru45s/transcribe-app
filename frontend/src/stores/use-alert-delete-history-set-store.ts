import { create } from "zustand";

type AlertDeleteHistorySetState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAlertDeleteHistorySetStore = create<AlertDeleteHistorySetState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
