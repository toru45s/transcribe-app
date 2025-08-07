import { create } from "zustand";

type AlertDeleteHistorySetState = {
  isOpen: boolean;
  historySetId: string;
  historySetTitle: string;
  onOpen: (props: { historySetId: string; historySetTitle: string }) => void;
  onClose: () => void;
};

export const useAlertDeleteHistorySetStore = create<AlertDeleteHistorySetState>(
  (set) => ({
    isOpen: false,
    historySetId: "",
    historySetTitle: "",
    onOpen: ({ historySetId, historySetTitle }) =>
      set({ isOpen: true, historySetId, historySetTitle }),
    onClose: () =>
      set({ isOpen: false, historySetId: "", historySetTitle: "" }),
  })
);
