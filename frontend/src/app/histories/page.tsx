import { Contents } from "@/components/contents";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow as TableRowBase,
} from "@/components/ui/table";
import { Link } from "@/components/link";
import { Flex } from "@/components/flex";

import { getHistorySetList } from "@/actions/history-set";
import { ButtonEditHistorySet } from "@/components/histories/button-edit-history-set";
import { ButtonDeleteHistorySet } from "@/components/histories/button-delete-history-set";

export default async function Home() {
  const breadcrumbItems = [{ label: "Subtitle Histories", href: "/histories" }];

  const { data: historySetList } = await getHistorySetList();

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <Contents>
        <Heading as="h2">Subtitle Histories</Heading>
        <Table>
          <TableHeader>
            <TableRowBase>
              <TableHead>Subtitle data</TableHead>
              <TableHead></TableHead>
            </TableRowBase>
          </TableHeader>
          <TableBody>
            {historySetList ? (
              historySetList?.map(
                (historySet: { id: string; title: string }) => (
                  <TableRowBase key={historySet.id}>
                    <TableCell>
                      <Link href={`/histories/${historySet.id}`}>
                        {historySet.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Flex gap="small" align="center" justify="end">
                        <ButtonEditHistorySet historySet={historySet} />
                        <ButtonDeleteHistorySet historySet={historySet} />
                      </Flex>
                    </TableCell>
                  </TableRowBase>
                )
              )
            ) : (
              <div>Nothing</div>
            )}
          </TableBody>
        </Table>
      </Contents>
    </>
  );
}
