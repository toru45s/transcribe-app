"use client";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioStream } from "@/hooks/audio-stream";
import { useRef } from "react";
import { Text } from "@/components/text";

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
    <main>
      <Heading isItalic>Subtitles</Heading>

      <Tabs defaultValue="live" className="w-[400px]">
        <TabsList className="fixed bottom-2 right-0 left-0 m-auto">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="live">
          <div className="p-4 md:p-6">
            <Text>{transcript}</Text>
            <div ref={bottomRef} />
          </div>

          <Button onClick={handleToggleRecording}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <p>Recording Time: {formatTime(recordingTime)}</p>
          <p>Audio Blob: {audioBlob?.size}</p>
        </TabsContent>
        <TabsContent value="history">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
