"use client";

import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useRef } from "react";
import { Text } from "@/components/text";
import { Contents } from "@/components/contents";
import { SubtitleLog } from "@/components/subtitle-log";
import { useTranscriptStore } from "@/stores/use-transcript-store";

export default function Home() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { transcript, transcripts } = useTranscriptStore();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts]);

  return (
    <>
      <Header isAbleToTranscribe />
      <Tabs defaultValue="live" className="flex-1">
        <TabsList className="fixed bottom-4 right-0 left-0 m-auto">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent
          value="live"
          className="flex flex-col justify-center items-center"
        >
          <Text isStrong className="relative top-[-25px] md:w-1/2 ">
            {transcript}
          </Text>
        </TabsContent>
        <TabsContent value="history" className="flex flex-col">
          <Contents>
            {transcripts.length === 1 ? (
              <Text>{transcript}</Text>
            ) : (
              <>
                {transcripts.map((transcript, index) => (
                  <SubtitleLog
                    sentence={transcript}
                    key={index}
                    hasBackground={index % 2 === 0}
                  />
                ))}

                <div className="flex gap-2 py-4 pb-4 mt-4">
                  <Text>🗣️</Text>
                  <Text isBold>{transcript}</Text>
                </div>
              </>
            )}

            <div ref={bottomRef} />
          </Contents>
        </TabsContent>
      </Tabs>
    </>
  );
}
