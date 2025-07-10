import { create } from "zustand";

type RegisterDialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useRegisterDialogStore = create<RegisterDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
