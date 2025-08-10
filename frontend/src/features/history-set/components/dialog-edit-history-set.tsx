"use client";

import * as React from "react";

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

import { FormEditHistorySet } from "@/features/history-set/components/form-edit-history-set";
import { useDialogEditHistorySet } from "@/features/history-set/hooks/use-dialog-edit-history-set";

export function DialogEditHistorySet() {
  const { isOpen, onClose, isDesktop } = useDialogEditHistorySet();

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit History Set</DialogTitle>
            <DialogDescription>
              Please fill in the following information to edit the history set.
            </DialogDescription>
          </DialogHeader>
          <FormEditHistorySet />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit History Set</DrawerTitle>
          <DrawerDescription>
            Please fill in the following information to edit the history set.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <FormEditHistorySet />
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
