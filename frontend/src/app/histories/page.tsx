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
import { getHistories } from "@/actions/histories";
import { useUserStore } from "@/stores/use-user-store";
import { useEffect, useState } from "react";

export default function Home() {
  const breadcrumbItems = [{ label: "Subtitle Histories", href: "/histories" }];
  const { token } = useUserStore();
  const [histories, setHistories] = useState<[]>([]);

  useEffect(() => {
    const fetchHistories = async () => {
      if (!token) return;
      const histories = await getHistories(token);

      setHistories(histories?.data || []);
    };
    fetchHistories();
  }, [token]);
  console.log("token", token);
  console.log("histories", histories);
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
            {histories?.map((history) => (
              <TableRow key={history.id}>
                <TableCell>
                  <Link href={`/histories/${history.id}`}>{history.title}</Link>
                </TableCell>
                <TableCell>
                  <Flex gap="small" align="center" justify="end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <Pen className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <X className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
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
