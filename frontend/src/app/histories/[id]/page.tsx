"use client";

import { Contents } from "@/components/contents";
import { Flex } from "@/components/flex";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { SubtitleLog } from "@/components/subtitle-log";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";
import { useUserStore } from "@/stores/use-user-store";
import React, { useEffect, useMemo, useState, use } from "react";
import { getHistory, getHistorySet } from "@/actions/histories";
import { useAlertDeleteHistorySetStore } from "@/stores/use-alert-delete-history-set-store";
import { useDialogEditHistoryStore } from "@/stores/use-dialog-edit-history-store";

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { token } = useUserStore();
  const [histories, setHistories] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const { onOpen: onOpenDeleteHistorySetAlert } =
    useAlertDeleteHistorySetStore();
  const { onOpen: onOpenEditHistorySet } = useDialogEditHistoryStore();
  const breadcrumbItems = useMemo(
    () => [
      { label: "Subtitle Histories", href: "/histories" },
      { label: title, href: `/histories/${id}` },
    ],
    [id, title]
  );

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;
      const { data, error } = await getHistory({ token, historySetId: id });
      if (error) {
        console.error(error);
        throw error;
      }
      if (data) {
        setHistories(data);
      }
    };
    fetchHistory();

    const fetchHistorySet = async () => {
      if (!token) return;
      const { data, error } = await getHistorySet({ token, historySetId: id });
      if (error) {
        console.error(error);

        throw error;
      }
      if (data) {
        setTitle(data.title);
      }
    };
    fetchHistorySet();
  }, [id, token]);

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <Contents>
        <Flex gap="small" align="center" justify="between" isFullWidth>
          <Heading as="h2">{title}</Heading>
          <Flex gap="small" align="center">
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
        </Flex>
        <Flex vertical>
          {histories?.length > 0 ? (
            histories?.map((history, index) => (
              <SubtitleLog
                sentence={history}
                key={index}
                hasBackground={index % 2 === 0}
              />
            ))
          ) : (
            <SubtitleLog sentence="No histories" />
          )}
        </Flex>
      </Contents>
    </>
  );
}
