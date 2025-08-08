import { Contents } from "@/components/contents";
import { Header } from "@/components/global/header";
import { Heading } from "@/components/heading";
import { HistorySetTable } from "@/components/history-set/history-set-table";

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
