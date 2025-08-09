import { useMediaQuery } from "@/client/hooks/use-media-query";
import { useRegisterDialogStore } from "@/features/auth/register/stores/use-register-dialog-store";
import { DESKTOP_BREAKPOINT } from "@/client/constants/global";

export function useRegisterDialog() {
  const { isOpen, onClose } = useRegisterDialogStore();
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  return {
    isDesktop,
    isOpen,
    onClose,
  };
}
