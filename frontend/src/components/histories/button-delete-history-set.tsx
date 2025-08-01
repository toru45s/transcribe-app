"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAlertDeleteHistorySetStore } from "@/stores/use-alert-delete-history-set-store";

type HistorySet = {
  id: string;
  title: string;
};

export const ButtonDeleteHistorySet = ({
  historySet,
}: {
  historySet: HistorySet;
}) => {
  const { onOpen: onOpenDeleteHistorySetAlert } =
    useAlertDeleteHistorySetStore();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-8 cursor-pointer"
      onClick={() =>
        onOpenDeleteHistorySetAlert({
          historySetId: historySet.id,
          historySetTitle: historySet.title,
        })
      }
    >
      <Trash2 className="size-4" />
    </Button>
  );
};
