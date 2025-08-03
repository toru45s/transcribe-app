"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/text";
import { Contents } from "@/components/contents";
import { SubtitleLog } from "@/components/subtitle-log";
import { useAudioStream } from "@/hooks/use-audio-stream";
import { ButtonPlayAndPause } from "@/components/transcribe/button-play-and-pause";
import { TAB_KEYS } from "@/constants/transcription";

export const TranscriptionTab = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { transcript, transcripts } = useAudioStream();
  const [tab, setTab] = useState(TAB_KEYS.LIVE);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts]);

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex-1">
      <TabsList className="fixed bottom-6 right-0 left-0 m-auto">
        <TabsTrigger value={TAB_KEYS.LIVE}>Live</TabsTrigger>
        <TabsTrigger value={TAB_KEYS.HISTORY}>History</TabsTrigger>
      </TabsList>
      <ButtonPlayAndPause className="fixed right-4 bottom-6 md:right-6" />
      <TabsContent
        value={TAB_KEYS.LIVE}
        className="flex flex-col justify-center items-center"
      >
        <Text isStrong className="relative top-[-25px] max-w-1/2 ">
          Welcome to the live transcription app.
          {transcript}
        </Text>
      </TabsContent>
      <TabsContent value={TAB_KEYS.HISTORY} className="flex flex-col">
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
  );
};
