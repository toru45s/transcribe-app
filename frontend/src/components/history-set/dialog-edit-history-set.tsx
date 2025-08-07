"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { DESKTOP_BREAKPOINT } from "@/constants/global";
import { useDialogEditHistoryStore } from "@/stores/history-set/use-dialog-edit-history-store";
import { FormEditHistorySet } from "@/components/history-set/form-edit-history-set";

export function DialogEditHistorySet() {
  const { isOpen, onClose } = useDialogEditHistoryStore();
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

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
