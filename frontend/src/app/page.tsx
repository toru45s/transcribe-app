"use client";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioStream } from "@/hooks/audio-stream";
import { useRef } from "react";
import { Text } from "@/components/text";
import { Play, Pause } from "lucide-react";

export default function Home() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    isRecording,
    handleToggleRecording,
    formatTime,
    audioBlob,
    recordingTime,
  } = useAudioStream();

  return (
    <main className="relative p-4 md:p-6 h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 m-auto flex justify-between items-center pt-4 px-4">
        <Heading isItalic className="text-[#FF4F00]">
          Subtitles
        </Heading>

        <Button
          variant="outline"
          size="icon"
          className="size-8 cursor-pointer"
          onClick={handleToggleRecording}
        >
          {isRecording ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
      </div>
      <Tabs defaultValue="live" className="mt-4 flex-1">
        <TabsList className="fixed bottom-2 right-0 left-0 m-auto">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="live">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col items-center justify-center h-[80vh] overflow-y-auto">
              <Text>{transcript}</Text>
              <div ref={bottomRef} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">TODO: History</TabsContent>
      </Tabs>
    </main>
  );
}
