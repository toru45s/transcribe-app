"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/client/components/ui/sheet";
import { Button } from "@/client/components/ui/button";
import { useSideMenuStore } from "@/client/stores/use-side-menu-store";
import { useRegisterDialogStore } from "@/features/auth/register/stores/use-register-dialog-store";
import { useLoginDialogStore } from "@/features/auth/token/stores/use-login-dialog-store";
import { useLogoutAlertStore } from "@/features/auth/token/stores/use-logout-alert-store";
import { KEY_COLOR_CLASS } from "@/client/constants/global";
import { Link } from "@/client/components/link";
import { cn } from "@/client/lib/utils";
import { Flex } from "@/client/components/flex";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { VERSION } from "@/shared/constants/config";
import { refreshTokenService } from "@/features/auth/token/services/refresh-token-services";

const menuItems = [
  {
    label: "About Subtitles",
    href: "/about",
  },
  {
    label: "Live Subtitles",
    href: "/",
  },
  {
    label: "Subtitle Histories",
    href: "/histories",
    isPrivate: true,
  },
];

export const SideMenu = () => {
  const { isOpen, onClose } = useSideMenuStore();
  const { email, isAuthenticated } = useUserStore();

  const { onOpen: onOpenRegisterDialog } = useRegisterDialogStore();
  const { onOpen: onOpenLoginDialog } = useLoginDialogStore();
  const { onOpen: onOpenLogoutAlert } = useLogoutAlertStore();

  const onClickOpenLoginDialog = () => {
    onOpenLoginDialog();
  };

  const onClickOpenRegisterDialog = () => {
    onOpenRegisterDialog();
  };

  const onClickLogout = () => {
    onOpenLogoutAlert();
  };

  const onClickRefreshToken = async () => {
    try {
      const { data } = await refreshTokenService();

      if (data?.access) {
        console.log("access", data.access);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Welcome to{" "}
            <span className={cn(KEY_COLOR_CLASS, "italic font-extrabold")}>
              Subtitles
            </span>
          </SheetTitle>
          <SheetDescription>
            {email
              ? `Hi there, you are logged in as ${email}.`
              : "Please login or register to continue if you want full access to the"}
          </SheetDescription>
        </SheetHeader>

        <Flex as="nav" vertical gap="small" className="px-4">
          {menuItems.map((item) => {
            if (item.isPrivate && !isAuthenticated) {
              return null;
            }

            return (
              <Link key={item.href} href={item.href} onClick={() => onClose()}>
                {item.label}
              </Link>
            );
          })}
        </Flex>

        <SheetFooter>
          {isAuthenticated ? (
            <>
              <Button onClick={onClickLogout} variant="outline">
                Logout
              </Button>
              <Button onClick={onClickRefreshToken} variant="outline">
                Refresh Token
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onClickOpenLoginDialog} variant="outline">
                Login
              </Button>
              <Button onClick={onClickOpenRegisterDialog} variant="outline">
                Register
              </Button>
            </>
          )}

          <span className="text-sm text-gray-500 text-right">v{VERSION}</span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
