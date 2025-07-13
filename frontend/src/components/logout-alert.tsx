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
} from "@/components/ui/alert-dialog";

import { useLogoutAlertStore } from "@/stores/use-login-alert-store";
import { useSideMenuStore } from "@/stores/use-side-menu-store";
import { useUserStore } from "@/stores/use-user-store";
import { useRouter } from "next/navigation";

export const LogoutAlert = () => {
  const { isOpen, onClose: onCloseLogoutAlert } = useLogoutAlertStore();
  const { onClose: onCloseSideMenu } = useSideMenuStore();
  const { logout } = useUserStore();
  const router = useRouter();

  const onClickLogout = () => {
    onCloseLogoutAlert();
    onCloseSideMenu();
    logout();
    router.push("/logged-out");
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
