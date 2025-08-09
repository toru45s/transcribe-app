import { HistorySetResponse } from "@/features/transcript/types/transcript";
import { useEffect, useState } from "react";

export const useHistorySetTable = () => {
  const [historySetList, setHistorySetList] = useState<HistorySetResponse[]>(
    []
  );

  const fetchHistorySetList = async () => {
    try {
      const response = await fetch(`/api/v1/history-set/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("response", response);

      const { data, error } = await response.json();
      console.log("data", data);
      console.log("error", error);
      setHistorySetList(data);
    } catch (error) {
      console.log("error", error);
      setHistorySetList([]);
    }
  };

  useEffect(() => {
    fetchHistorySetList();
  }, []);

  return { historySetList, fetchHistorySetList };
};
