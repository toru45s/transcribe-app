"use client";

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
import { RegisterForm } from "./register-form";
import { useRegisterDialog } from "../hooks/use-register-dialog";

export function RegisterDialog() {
  const { isOpen, onClose, isDesktop } = useRegisterDialog();

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              Please fill in the following information to register.
            </DialogDescription>
          </DialogHeader>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Register</DrawerTitle>
          <DrawerDescription>
            Please fill in the following information to register.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <RegisterForm />
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
