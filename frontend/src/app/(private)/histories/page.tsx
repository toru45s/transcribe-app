"use client";

import { Breadcrumb } from "@/client/components/breadcrumb";
import { Contents } from "@/client/components/contents";
import { Header } from "@/client/components/header";
import { Heading } from "@/client/components/heading";
import { HistorySetTable } from "@/features/history-set/components/history-set-table";
import { AlertDeleteHistorySet } from "@/features/history-set/components/alert-delete-history-set";
import { DialogEditHistorySet } from "@/features/history-set/components/dialog-edit-history-set";
import { useHistorySetPage } from "@/features/history-set/hooks/use-history-set-page";

export default function HistorySetPage() {
  const { historySetList, isLoading, breadcrumbItems, fetch } =
    useHistorySetPage();

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Contents>
        <Heading as="h2">Subtitle Histories</Heading>
        <HistorySetTable
          historySetList={historySetList}
          isLoading={isLoading}
        />
      </Contents>

      <AlertDeleteHistorySet callback={fetch} />
      <DialogEditHistorySet callback={fetch} />
    </>
  );
}
