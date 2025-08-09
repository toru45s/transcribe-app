"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/client/components/ui/alert-dialog";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useLogoutAlertStore } from "@/features/auth/token/stores/use-login-alert-store";
import { useSideMenuStore } from "@/client/stores/use-side-menu-store";
import { useRouter } from "next/navigation";
import { logoutService } from "@/features/auth/token/services/logout-services";

export const LogoutAlert = () => {
  const { isOpen, onClose: onCloseLogoutAlert } = useLogoutAlertStore();
  const { onClose: onCloseSideMenu } = useSideMenuStore();
  const { logout } = useUserStore();
  const router = useRouter();

  const onClickLogout = async () => {
    onCloseSideMenu();
    onCloseLogoutAlert();
    router.push("/logged-out");

    logout();
    await logoutService();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCloseLogoutAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClickLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
