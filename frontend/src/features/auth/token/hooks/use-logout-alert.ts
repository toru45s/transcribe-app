import { logoutService } from "../services/logout-services";
import { useLogoutAlertStore } from "@/features/auth/token/stores/use-logout-alert-store";
import { useSideMenuStore } from "@/client/stores/use-side-menu-store";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function useLogoutAlert() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose: onCloseLogoutAlert } = useLogoutAlertStore();
  const { onClose: onCloseSideMenu } = useSideMenuStore();
  const { logout } = useUserStore();
  const router = useRouter();

  const onClickLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { error } = await logoutService();
      if (error) {
        toast.error("Logout failed.");
        return;
      }

      logout();
    } catch (e) {
      const msg = e instanceof Error ? e.message : undefined;
      toast.error("Logout failed.", {
        description: msg ?? "Please try again.",
      });
    } finally {
      setIsLoading(false);
      onCloseSideMenu();
      onCloseLogoutAlert();
      router.push("/logged-out");
    }
  };

  return { isOpen, onClickLogout };
}
