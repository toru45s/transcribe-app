"use client";

import { Button } from "@/client/components/ui/button";
import { Pen } from "lucide-react";
import { useDialogEditHistoryStore } from "@/features/history-set/stores/use-dialog-edit-history-store";
import { HistorySetResponse } from "@/features/history-set/types/history-set";

export const ButtonEditHistorySet = ({
  historySet,
}: {
  historySet: HistorySetResponse;
}) => {
  const { onOpen: onOpenEditHistorySet } = useDialogEditHistoryStore();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-8 cursor-pointer"
      onClick={() =>
        onOpenEditHistorySet({
          historySetId: historySet.id,
          historySetTitle: historySet.title,
        })
      }
    >
      <Pen className="size-4" />
    </Button>
  );
};
