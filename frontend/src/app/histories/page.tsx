"use client";

import { Contents } from "@/components/contents";
import { Flex } from "@/components/flex";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Check, Pen, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHistorySets } from "@/actions/histories";
import { useUserStore } from "@/stores/use-user-store";
import { useEffect, useState } from "react";
import { useAlertDeleteHistorySetStore } from "@/stores/use-alert-delete-history-set-store";
import { useDialogEditHistoryStore } from "@/stores/use-dialog-edit-history-store";

export default function Home() {
  const breadcrumbItems = [{ label: "Subtitle Histories", href: "/histories" }];
  const { token } = useUserStore();
  const { onOpen: onOpenDeleteHistorySetAlert } =
    useAlertDeleteHistorySetStore();
  const { onOpen: onOpenEditHistorySet } = useDialogEditHistoryStore();
  const [historySets, setHistorySets] = useState<
    {
      id: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchHistories = async () => {
      if (!token) return;
      const historySets = await getHistorySets(token);

      setHistorySets(historySets?.data || []);
    };
    fetchHistories();
  }, [token]);

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
            {historySets?.map((historySet) => (
              <TableRow key={historySet.id}>
                <TableCell>
                  <Link href={`/histories/${historySet.id}`}>
                    {historySet.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Flex gap="small" align="center" justify="end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                      onClick={onOpenEditHistorySet}
                    >
                      <Pen className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                      onClick={onOpenDeleteHistorySetAlert}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Contents>
    </>
  );
}
