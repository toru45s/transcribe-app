"use client";

import * as React from "react";

import { useMediaQuery } from "@/client/hooks/use-media-query";
import { Button } from "@/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/client/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/client/components/ui/drawer";

import { useLoginDialogStore } from "@/features/auth/token/stores/use-login-dialog-store";
import { LoginForm } from "@/features/auth/token/components/login-form";
import { DESKTOP_BREAKPOINT } from "@/client/constants/global";

export function LoginDialog() {
  const { isOpen, onClose } = useLoginDialogStore();
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Please fill in the following information to login.
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Login</DrawerTitle>
          <DrawerDescription>
            Please fill in the following information to login.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <LoginForm />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
