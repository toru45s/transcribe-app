import { HistorySetResponse } from "@/features/transcript/types/transcript";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/client/types/api";
import { listHistorySetService } from "@/features/history-set/services/history-set-services";

export const useHistorySetPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [historySetList, setHistorySetList] = useState<HistorySetResponse[]>(
    []
  );

  const fetch = async () => {
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Histories", href: "/histories" },
  ];

  useEffect(() => {
    fetch();
  }, []);

  return { historySetList, isLoading, fetch, breadcrumbItems };
};
