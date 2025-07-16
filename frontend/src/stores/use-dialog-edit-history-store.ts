import { create } from "zustand";

type DialogEditHistoryState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDialogEditHistoryStore = create<DialogEditHistoryState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
