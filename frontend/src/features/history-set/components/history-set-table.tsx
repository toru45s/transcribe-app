"use client";

import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { Link } from "@/client/components/link";
import { Flex } from "@/client/components/flex";

import { ButtonEditHistorySet } from "@/features/history-set/components/button-edit-history-set";
import { ButtonDeleteHistorySet } from "@/features/history-set/components/button-delete-history-set";
import { Text } from "@/client/components/text";
import { useHistorySetTable } from "@/features/history-set/hooks/use-history-set-table";
import { DATE_FORMAT } from "@/features/history-set/constants/history-set-constants";

export const HistorySetTable = () => {
  const { historySetList } = useHistorySetTable();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subtitle</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>
            <Flex gap="small" align="center" justify="end">
              Edit / Delete
            </Flex>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historySetList?.length > 0 ? (
          historySetList?.map((historySet) => (
            <TableRow key={historySet.id}>
              <TableCell>
                <Link href={`/histories/${historySet.id}`}>
                  {historySet?.title}
                </Link>
              </TableCell>
              <TableCell>
                {dayjs(historySet?.created_at).format(DATE_FORMAT)}
              </TableCell>
              <TableCell>
                <Flex gap="small" align="center" justify="end">
                  <ButtonEditHistorySet historySet={historySet} />
                  <ButtonDeleteHistorySet historySet={historySet} />
                </Flex>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>
              <Text isGray>No histories found</Text>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
