import { Contents } from "@/client/components/contents";
import { Header } from "@/client/components/header";
import { Heading } from "@/client/components/heading";
import { HistorySetTable } from "@/features/history-set/components/history-set-table";

export default async function Histories() {
  const breadcrumbItems = [{ label: "Subtitle Histories", href: "/histories" }];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <Contents>
        <Heading as="h2">Subtitle Histories</Heading>
        <HistorySetTable />
      </Contents>
    </>
  );
}
