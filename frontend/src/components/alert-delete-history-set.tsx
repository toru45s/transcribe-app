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
import { useAlertDeleteHistorySetStore } from "@/stores/use-alert-delete-history-set-store";

export const AlertDeleteHistorySet = () => {
  const { isOpen, onClose: onCloseDeleteHistorySetAlert } =
    useAlertDeleteHistorySetStore();

  const onClickDeleteHistorySet = () => {
    onCloseDeleteHistorySetAlert();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCloseDeleteHistorySetAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete History Set</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this history set?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClickDeleteHistorySet}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
