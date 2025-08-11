import { useCallback, useEffect, useState } from "react";
import { HistoryResponse } from "@/features/histories/types/histories";
import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { retrieveHistorySetService } from "@/features/history-set/services/history-set-services";
import { listHistoryService } from "@/features/histories/services/histories-services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useHistoriesPage = (historySetId: string) => {
  const router = useRouter();
  const [historySet, setHistorySet] = useState<HistorySetResponse | null>(null);
  const [histories, setHistories] = useState<HistoryResponse[] | null>(null);
  const [isLoadingHistorySet, setIsLoadingHistorySet] = useState(false);
  const [isLoadingHistories, setIsLoadingHistories] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoadingHistorySet(true);
    setIsLoadingHistories(true);

    try {
      const [setRes, listRes] = await Promise.all([
        retrieveHistorySetService(historySetId),
        listHistoryService(historySetId),
      ]);

      if (setRes.error) {
        toast.error("Failed to fetch history set.", {
          description: setRes.error.message,
        });
        throw new Error(setRes.error.message);
      }

      if (!setRes.data) {
        toast("History set not found", { description: "Please try again." });
        throw new Error("History set not found");
      }

      setHistorySet(setRes.data);

      if (listRes.error) {
        toast.error("Failed to fetch histories.", {
          description: listRes.error.message,
        });
      }
      setHistories((listRes.data ?? []) as HistoryResponse[]);
      if (!setRes.data) {
        toast("History set not found", { description: "Please try again." });
        throw new Error("History set not found");
      }
      setHistorySet(setRes.data);

      if (listRes.error) {
        toast.error("Failed to fetch histories.", {
          description: listRes.error.message,
        });
      }
      setHistories((listRes.data ?? []) as HistoryResponse[]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingHistorySet(false);
      setIsLoadingHistories(false);
    }
  }, [historySetId]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Histories", href: "/histories" },
    { label: historySet?.title || "", href: `/histories/${historySetId}` },
  ];

  const redirectToHistorySetPage = () => {
    router.push("/histories");
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    isLoadingHistorySet,
    isLoadingHistories,
    historySet,
    histories,
    breadcrumbItems,
    fetch,
    redirectToHistorySetPage,
  };
};
