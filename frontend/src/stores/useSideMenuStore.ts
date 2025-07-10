import { create } from "zustand";

type SideMenuState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSideMenuStore = create<SideMenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
