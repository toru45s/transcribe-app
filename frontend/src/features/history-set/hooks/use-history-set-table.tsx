import { HistorySetResponse } from "@/features/transcript/types/transcript";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/client/types/api";
import { listHistorySetService } from "@/features/history-set/services/history-set-services";

export const useHistorySetTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [historySetList, setHistorySetList] = useState<HistorySetResponse[]>(
    []
  );

  const fetchHistorySetList = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data, error } = await listHistorySetService();

      if (error) {
        toast.error("Failed to fetch history set list.", {
          description: error?.message,
        });

        return;
      }

      setHistorySetList(data as HistorySetResponse[]);
    } catch (error) {
      const responseError = error as ResponseError;
      toast.error("Failed to fetch history set list.", {
        description: String(responseError?.message),
      });

      setHistorySetList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorySetList();
  }, []);

  return { historySetList, isLoading, fetchHistorySetList };
};
