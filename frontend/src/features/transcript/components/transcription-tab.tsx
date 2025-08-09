"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";

import { Text } from "@/client/components/text";
import { Contents } from "@/client/components/contents";

import { TAB_KEYS } from "@/features/transcript/constants/transcript-constants";
import { ReadyState } from "react-use-websocket";
import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { cn } from "@/client/lib/utils";
import { GREEN_COLOR_CLASS, RED_COLOR_CLASS } from "@/client/constants/global";
import { SubtitleLog } from "@/client/components/subtitle-log";

import { useTranscriptionTab } from "@/features/transcript/hooks/use-transcription-tab";

export const TranscriptionTab = () => {
  const {
    tab,
    setTab,
    bottomRef,
    transcript,
    transcripts,
    isRecording,
    onStartTranscription,
    onStopTranscription,
    readyState,
    connectionStatus,
  } = useTranscriptionTab();

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex-1">
      <TabsList className="fixed bottom-6 right-0 left-0 m-auto">
        <TabsTrigger value={TAB_KEYS.LIVE}>Live</TabsTrigger>
        <TabsTrigger value={TAB_KEYS.HISTORY}>History</TabsTrigger>
      </TabsList>
      <div className="fixed flex gap-2 right-4 bottom-6 md:right-6">
        <Button
          variant="outline"
          size="icon"
          className={cn("size-8 cursor-pointer", {
            "bg-accent": isRecording,
          })}
          onClick={onStartTranscription}
        >
          {readyState === ReadyState.OPEN ? (
            <Pause className={cn("size-4", GREEN_COLOR_CLASS)} />
          ) : (
            <Play className={cn("size-4", GREEN_COLOR_CLASS)} />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn("size-8 cursor-pointer")}
          onClick={onStopTranscription}
        >
          <Square className={cn("size-4", RED_COLOR_CLASS)} />
        </Button>
      </div>
      <TabsContent
        value={TAB_KEYS.LIVE}
        className="flex flex-col justify-center items-center"
      >
        <Text isStrong className="relative top-[-25px] max-w-1/2 ">
          {isRecording ? transcript : connectionStatus}
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
