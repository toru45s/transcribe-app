"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSideMenuStore } from "@/stores/use-side-menu-store";
import { useRegisterDialogStore } from "@/stores/use-register-dialog-store";
import { useLoginDialogStore } from "@/stores/use-login-dialog-store";
import { useLogoutAlertStore } from "@/stores/use-login-alert-store";
import { KEY_COLOR_CLASS } from "@/constants";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/flex";

export const SideMenu = () => {
  const { isOpen, onClose } = useSideMenuStore();
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
            Please login or register to continue if you want full access to the
          </SheetDescription>
        </SheetHeader>

        <Flex as="nav" vertical gap="small" className="px-4">
          <Link href="/" onClick={() => onClose()}>
            Live Subtitles
          </Link>
          <Link href="/histories" onClick={() => onClose()}>
            Subtitle Histories
          </Link>
        </Flex>

        <SheetFooter>
          <Button onClick={onClickOpenLoginDialog} variant="outline">
            Login
          </Button>
          <Button onClick={onClickOpenRegisterDialog} variant="outline">
            Register
          </Button>
          <Button onClick={onClickLogout} variant="outline">
            Logout
          </Button>
          <span className="text-sm text-gray-500 text-right">
            Subtitles All rights reserved | v0.1.0
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
