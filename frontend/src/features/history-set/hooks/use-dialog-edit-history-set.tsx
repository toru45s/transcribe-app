import { DESKTOP_BREAKPOINT } from "@/client/constants/global";
import { useMediaQuery } from "@/client/hooks/use-media-query";
import { useDialogEditHistoryStore } from "../stores/use-dialog-edit-history-store";

export const useDialogEditHistorySet = () => {
  const { isOpen, onClose } = useDialogEditHistoryStore();
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  return {
    isOpen,
    onClose,
    isDesktop,
  };
};
