import { useAlertInvalidTokenStore } from "../stores/use-alert-invalid-token-store";

export const useAlertInvalidToken = () => {
  const { isOpen, onClose } = useAlertInvalidTokenStore();

  const onClickLogInAgain = async () => {
    if (typeof window !== "undefined") {
      window.location.href = "/logged-out";
    }
  };

  return {
    isOpen,
    onClickLogInAgain,
    onClose,
  };
};
