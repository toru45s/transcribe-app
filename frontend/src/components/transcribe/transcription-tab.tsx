"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Text } from "@/components/text";
import { Contents } from "@/components/contents";

import { ButtonPlayAndPause } from "@/components/transcribe/button-play-and-pause";
import { TAB_KEYS } from "@/constants/transcription";
import React, { useState } from "react";
import { useHandleWebSocket } from "@/hooks/use-handle-web-socket";
import { ReadyState } from "react-use-websocket";
import { useAudioStream } from "@/hooks/use-audio-stream";
import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GREEN_COLOR_CLASS, RED_COLOR_CLASS } from "@/constants/global";

export const TranscriptionTab = () => {
  const [tab, setTab] = useState(TAB_KEYS.LIVE);
  const { onStartWebSocket, onStopWebSocket, connectionStatus, readyState } =
    useHandleWebSocket();

  const { transcript, transcripts, isPause } = useAudioStream();

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
            "bg-accent": isPause,
          })}
          onClick={onStartWebSocket}
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
          onClick={onStopWebSocket}
        >
          <Square className={cn("size-4", RED_COLOR_CLASS)} />
        </Button>
      </div>
      <TabsContent
        value={TAB_KEYS.LIVE}
        className="flex flex-col justify-center items-center"
      >
        <Text isStrong className="relative top-[-25px] max-w-1/2 ">
          {connectionStatus}
          {/* {transcript} */}
        </Text>
      </TabsContent>
      <TabsContent value={TAB_KEYS.HISTORY} className="flex flex-col">
        <Contents>
          {/* {transcripts.length === 1 ? (
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

          <div ref={bottomRef} /> */}
        </Contents>
      </TabsContent>
    </Tabs>
  );
};
