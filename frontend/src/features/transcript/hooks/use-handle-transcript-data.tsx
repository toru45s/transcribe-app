import { useCallback, useState } from "react";
import { createHistorySetService } from "@/features/history-set/services/history-set-services";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/client/constants/global";
import { toast } from "sonner";
import { createHistoryService } from "@/features/histories/services/histories-services";

export const useHandleTranscriptData = () => {
  const [historySetId, setHistorySetId] = useState<string | null>(null);

  const createHistorySet = useCallback(async (_title?: string) => {
    try {
      const title = _title || `Subtitle of ${dayjs().format(DATE_FORMAT)}`;
      const { data, error } = await createHistorySetService({ title });

      if (error) {
        console.error("error", error);
        toast.error("Failed to create history set");
      }

      if (data) {
        console.log("data", data);
        setHistorySetId(data.id);

        return data.id;
      }
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  const createHistory = useCallback(
    async (content: string) => {
      if (!historySetId) {
        toast.error("History set is not ready yet.");
        return;
      }

      const contentTrimmed = content.trim();

      if (!contentTrimmed) return;

      try {
        const { data, error } = await createHistoryService({
          id: historySetId,
          content: contentTrimmed,
        });

        if (error) {
          console.error("error", error);
          toast.error("Failed to update history set");
        }

        if (data) {
          console.log("data", data);
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    [historySetId]
  );

  const initializeHistorySetId = useCallback(async () => {
    if (historySetId) {
      setHistorySetId(null);
    }
  }, [historySetId]);

  return {
    createHistorySet,
    createHistory,
    initializeHistorySetId,
  };
};
