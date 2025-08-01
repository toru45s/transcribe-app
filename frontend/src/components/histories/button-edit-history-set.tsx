"use client";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useDialogEditHistoryStore } from "@/stores/use-dialog-edit-history-store";

type HistorySet = {
  id: string;
  title: string;
};

export const ButtonEditHistorySet = ({
  historySet,
}: {
  historySet: HistorySet;
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
