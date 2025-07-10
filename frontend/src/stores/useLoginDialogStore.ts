import { create } from "zustand";

type LoginDialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useLoginDialogStore = create<LoginDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
