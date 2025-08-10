"use client";

import { Contents } from "@/client/components/contents";
import { Flex } from "@/client/components/flex";
import { Heading } from "@/client/components/heading";
import { SubtitleLog } from "@/client/components/subtitle-log";
import { ButtonEditHistorySet } from "@/features/history-set/components/button-edit-history-set";
import { ButtonDeleteHistorySet } from "@/features/history-set/components/button-delete-history-set";
import { retrieveHistorySetService } from "@/features/history-set/services/history-set-services";
import { useEffect, useState } from "react";
import {
  HistoryResponse,
  HistorySetResponse,
} from "@/features/transcript/types/transcript";
import { toast } from "sonner";
import { listHistoryService } from "@/features/history-set/services/history-services";
import { Skeleton } from "@/client/components/ui/skeleton";
import { SKELETON_LENGTH } from "@/features/history/constants/history-constants";
import { Breadcrumb } from "@/client/components/breadcrumb";

type Props = {
  historySetId: string;
};

export const HistoryContent = ({ historySetId }: Props) => {
  const [isLoadingHistorySet, setIsLoadingHistorySet] = useState(false);
  const [isLoadingHistories, setIsLoadingHistories] = useState(false);
  const [historySet, setHistorySet] = useState<HistorySetResponse | null>(null);
  const [histories, setHistories] = useState<HistoryResponse[]>([]);

  const fetchHistorySet = async () => {
    setIsLoadingHistorySet(true);
    setIsLoadingHistories(true);

    try {
      const { data: historySetData, error: historySetError } =
        await retrieveHistorySetService(historySetId);

      if (historySetError) {
        toast.error("Failed to fetch history set.", {
          description: historySetError?.message,
        });

        throw new Error(historySetError?.message);
      }

      if (!historySetData) {
        toast("History set not found", {
          description: "Please try again.",
        });
        throw new Error("History set not found");
      }

      setHistorySet(historySetData);

      const { data: historiesData, error: historiesError } =
        await listHistoryService(historySetId);

      if (historiesError) {
        toast.error("Failed to fetch histories.", {
          description: historiesError?.message,
        });
      }

      if (!historiesData) {
        toast("Histories not found", {
          description: "Please try again.",
        });
        throw new Error("Histories not found");
      }

      setHistories(historiesData as HistoryResponse[]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingHistories(false);
      setIsLoadingHistorySet(false);
    }
  };

  useEffect(() => {
    fetchHistorySet();
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Histories", href: "/histories" },
    { label: historySet?.title || "", href: `/histories/${historySetId}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} isLoading={isLoadingHistories} />

      <Contents>
        <Flex gap="small" align="center" justify="between" isFullWidth>
          <Heading as="h2" className="w-full">
            {isLoadingHistorySet ? (
              <Skeleton className="h-8 w-1/3" />
            ) : (
              historySet?.title
            )}
          </Heading>
          <Flex gap="small" align="center">
            {isLoadingHistorySet && historySet && (
              <>
                <ButtonEditHistorySet historySet={historySet} />
                <ButtonDeleteHistorySet historySet={historySet} />
              </>
            )}
          </Flex>
        </Flex>
        <Flex vertical isFullWidth>
          {isLoadingHistories ? (
            Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
              <SubtitleLog
                sentence={""}
                key={index}
                hasBackground={index % 2 === 0}
                isLoading={isLoadingHistories}
              />
            ))
          ) : (
            <>
              {histories.length > 0 &&
                histories.map((history: HistoryResponse, index: number) => (
                  <SubtitleLog
                    sentence={history.content}
                    key={index}
                    hasBackground={index % 2 === 0}
                  />
                ))}
            </>
          )}
        </Flex>
      </Contents>
    </>
  );
};
