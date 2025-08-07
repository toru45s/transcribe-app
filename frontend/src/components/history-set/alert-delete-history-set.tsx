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
import { useAlertDeleteHistorySetStore } from "@/stores/history-set/use-alert-delete-history-set-store";
// import { deleteHistorySet } from "@/actions/history-set";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const AlertDeleteHistorySet = () => {
  const router = useRouter();

  const {
    isOpen,
    onClose: onCloseDeleteHistorySetAlert,
    historySetId,
    historySetTitle,
  } = useAlertDeleteHistorySetStore();

  const onClickDeleteHistorySet = async () => {
    try {
      // await deleteHistorySet({ historySetId });
      toast.success("History set deleted successfully");
      router.push("/histories");
    } catch (error) {
      console.error("Error deleting history set:", error);
      toast.error("Error deleting history set");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCloseDeleteHistorySetAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {historySetTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this history set?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onClickDeleteHistorySet} variant="destructive">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
