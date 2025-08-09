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
import { useEffect, useState } from "react";

type HistorySet = {
  id: string;
  title: string;
  created_at: string;
};

export const HistorySetTable = () => {
  const [historySetList, setHistorySetList] = useState<HistorySet[]>([]);

  const fetchHistorySetList = async () => {
    try {
      const response = await fetch(`/api/v1/history-set/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("response", response);

      const { data, error } = await response.json();
      console.log("data", data);
      console.log("error", error);
      setHistorySetList(data);
    } catch (error) {
      console.log("error", error);
      setHistorySetList([]);
    }
  };

  useEffect(() => {
    fetchHistorySetList();
  }, []);

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
                {dayjs(historySet?.created_at).format("YYYY-MM-DD HH:mm")}
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
