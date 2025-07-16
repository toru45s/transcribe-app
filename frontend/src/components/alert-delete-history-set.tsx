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
import { useDeleteHistorySetAlertStore } from "@/stores/use-delete-history-set-alert-store";

export const AlertDeleteHistorySet = () => {
  const { isOpen, onClose: onCloseDeleteHistorySetAlert } =
    useDeleteHistorySetAlertStore();

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
