"use client";

import { Header } from "@/client/components/header";
import { HistoriesContent } from "@/features/histories/components/histories-content";
import { AlertDeleteHistorySet } from "@/features/history-set/components/alert-delete-history-set";
import { DialogEditHistorySet } from "@/features/history-set/components/dialog-edit-history-set";
import { useHistoriesPage } from "@/features/histories/hooks/use-histories-page";
import { use } from "react";
import { Breadcrumb } from "@/client/components/breadcrumb";

type Props = {
  params: Promise<{ id: string }>;
};

export default function HistoriesPage({ params }: Props) {
  const { id } = use(params);
  const {
    isLoadingHistorySet,
    isLoadingHistories,
    historySet,
    histories,
    breadcrumbItems,
    fetch,
    redirectToHistorySetPage,
  } = useHistoriesPage(id);

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} isLoading={isLoadingHistories} />
      <HistoriesContent
        isLoadingHistorySet={isLoadingHistorySet}
        historySet={historySet}
        histories={histories}
        isLoadingHistories={isLoadingHistories}
      />
      <AlertDeleteHistorySet callback={redirectToHistorySetPage} />
      <DialogEditHistorySet callback={fetch} />
    </>
  );
}
