"use client";

import { Contents } from "@/client/components/contents";
import { Flex } from "@/client/components/flex";
import { Heading } from "@/client/components/heading";
import { SubtitleLog } from "@/client/components/subtitle-log";
import { ButtonEditHistorySet } from "@/features/history-set/components/button-edit-history-set";
import { ButtonDeleteHistorySet } from "@/features/history-set/components/button-delete-history-set";
import { HistoryResponse } from "@/features/histories/types/histories";
import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { Skeleton } from "@/client/components/ui/skeleton";
import { SKELETON_LENGTH } from "@/features/histories/constants/histories-constants";

type Props = {
  isLoadingHistorySet: boolean;
  historySet: HistorySetResponse | null;
  histories: HistoryResponse[] | null;
  isLoadingHistories: boolean;
};

export const HistoriesContent = ({
  isLoadingHistorySet,
  historySet,
  histories,
  isLoadingHistories,
}: Props) => {
  return (
    <>
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
            {!isLoadingHistorySet && historySet && (
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
              {histories &&
                histories.length > 0 &&
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
