import { Contents } from "@/components/contents";
import { Header } from "@/components/global/header";
import { Heading } from "@/components/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/components/link";
import { Flex } from "@/components/flex";

import { getHistorySetList } from "@/actions/history-set";
import { ButtonEditHistorySet } from "@/components/histories/button-edit-history-set";
import { ButtonDeleteHistorySet } from "@/components/histories/button-delete-history-set";
import { Text } from "@/components/text";

export default async function Histories() {
  const breadcrumbItems = [{ label: "Subtitle Histories", href: "/histories" }];
  const { data: historySetList } = await getHistorySetList();

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <Contents>
        <Heading as="h2">Subtitle Histories</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subtitle data</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historySetList ? (
              historySetList?.map(
                (historySet: { id: string; title: string }) => (
                  <TableRow key={historySet.id}>
                    <TableCell>
                      <Link href={`/histories/${historySet.id}`}>
                        {historySet?.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Flex gap="small" align="center" justify="end">
                        <ButtonEditHistorySet historySet={historySet} />
                        <ButtonDeleteHistorySet historySet={historySet} />
                      </Flex>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <Text isGray>Nothing</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Contents>
    </>
  );
}
