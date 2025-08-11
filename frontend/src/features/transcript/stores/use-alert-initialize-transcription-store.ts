import { create } from "zustand";

type AlertInitializeTranscriptionStore = {
  isOpen: boolean;
  callback: (() => void) | null;
  onOpen: (callback?: () => void) => void;
  onClose: () => void;
};

export const useAlertInitializeTranscriptionStore =
  create<AlertInitializeTranscriptionStore>((set) => ({
    isOpen: false,
    callback: null,
    onOpen: (callback) => set({ isOpen: true, callback }),
    onClose: () => set({ isOpen: false, callback: null }),
  }));
