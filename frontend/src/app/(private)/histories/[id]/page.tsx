import { Header } from "@/client/components/header";
import { HistoryContent } from "@/features/history/components/history-content";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Histories({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Header />
      <HistoryContent historySetId={id} />
    </>
  );
}
