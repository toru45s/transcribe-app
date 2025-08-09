import { DESKTOP_BREAKPOINT } from "@/client/constants/global";
import { useLoginDialogStore } from "../stores/use-login-dialog-store";
import { useMediaQuery } from "@/client/hooks/use-media-query";

export function useLoginDialog() {
  const { isOpen, onClose } = useLoginDialogStore();
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  return {
    isOpen,
    onClose,
    isDesktop,
  };
}
