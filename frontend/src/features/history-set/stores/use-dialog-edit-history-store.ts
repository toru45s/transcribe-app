import { create } from "zustand";

type DialogEditHistoryState = {
  isOpen: boolean;
  historySetTitle: string | null;
  historySetId: string | null;
  onOpen: ({ historySetId, historySetTitle }: { historySetId: string; historySetTitle: string }) => void;
  onClose: () => void;
};

export const useDialogEditHistoryStore = create<DialogEditHistoryState>(
  (set) => ({
    isOpen: false,
    historySetTitle: null,
    historySetId: null,
    onOpen: ({ historySetId, historySetTitle }: { historySetId: string; historySetTitle: string }) =>
      set({ isOpen: true, historySetId, historySetTitle }),
    onClose: () => set({ isOpen: false, historySetId: null, historySetTitle: null }),
  })
);
