import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutService } from "@/features/auth/token/services/logout-services";
import { useAlertInvalidTokenStore } from "../stores/use-alert-invalid-token-store";

export const useAlertInvalidToken = () => {
  const router = useRouter();

  const { isOpen, onClose } = useAlertInvalidTokenStore();

  const onClickLogInAgain = async () => {
    try {
      const { error } = await logoutService();
      if (error) {
        toast.error("Failed to log out.");
        return;
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      router.push("/");
      onClose();
    }
  };

  return {
    isOpen,
    onClickLogInAgain,
    onClose,
  };
};
