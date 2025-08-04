import { Contents } from "@/components/contents";
import { Flex } from "@/components/flex";
import { Header } from "@/components/global/header";
import { Heading } from "@/components/heading";
import { SubtitleLog } from "@/components/subtitle-log";
import { getHistories } from "@/actions/histories";
import { getHistorySet } from "@/actions/history-set";
import { ButtonEditHistorySet } from "@/components/histories/button-edit-history-set";
import { ButtonDeleteHistorySet } from "@/components/histories/button-delete-history-set";
import { Text } from "@/components/text";

type Props = {
  params: Promise<{ id: string }>;
};

type History = {
  id: string;
  content: string;
  history_set: string;
  created_at: string;
};

export default async function Histories({ params }: Props) {
  const { id } = await params;

  // const { data: historySet } = await getHistorySet({ historySetId: id });
  // const { data: histories } = await getHistories({ historySetId: id });

  const historySet: { id: string; title: string } = { id: "", title: "" };
  const histories: History[] = [];

  const breadcrumbItems = [
    { label: "Subtitle Histories", href: "/histories" },
    { label: historySet?.title, href: `/histories/${id}` },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />
      <Contents>
        <Flex gap="small" align="center" justify="between" isFullWidth>
          <Heading as="h2">{historySet.title}</Heading>
          <Flex gap="small" align="center">
            <ButtonEditHistorySet historySet={historySet} />
            <ButtonDeleteHistorySet historySet={historySet} />
          </Flex>
        </Flex>
        <Flex vertical isFullWidth>
          {histories?.length > 0 ? (
            histories?.map((history: History, index: number) => (
              <SubtitleLog
                sentence={history.content}
                key={index}
                hasBackground={index % 2 === 0}
              />
            ))
          ) : (
            <Text destructive>No histories</Text>
          )}
        </Flex>
      </Contents>
    </>
  );
}
