"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/client/components/ui/alert-dialog";
import { Button } from "@/client/components/ui/button";
import { useAlertInitializeTranscriptionStore } from "@/features/transcript/stores/use-alert-initialize-transcription-store";

export const AlertInitializeTranscription = () => {
  const { isOpen, onClose, callback } = useAlertInitializeTranscriptionStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Initialize Current Transcription</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to initialize the current transcription?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => callback?.()} variant="destructive">
              Initialize
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
