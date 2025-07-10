"use client";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioStream } from "@/hooks/audio-stream";
import { useEffect, useRef } from "react";
import { Text } from "@/components/text";
import { Play, Pause, AlignJustify } from "lucide-react";
import { SideMenu } from "@/components/SideMenu";
import { useSideMenuStore } from "@/stores/useSideMenuStore";
import { RegisterDialog } from "@/components/RegisterDialog";
import { LoginDialog } from "@/components/LoginDialog";
import { LogoutAlert } from "@/components/LogoutAlert";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const {
    transcript,
    transcripts,
    isRecording,
    handleToggleRecording,
    formatTime,
    audioBlob,
    recordingTime,
  } = useAudioStream();
  const { onOpen: onOpenSideMenu } = useSideMenuStore();

  const onClickOpenMenu = () => {
    onOpenSideMenu();
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts]);

  return (
    <>
      <main className="relative px-4 pb-16 md:px-6 min-h-screen flex flex-col">
        <div className="sticky top-0 flex justify-between items-center py-4">
          <Heading isItalic className="text-[#FF4F00]">
            Subtitles
          </Heading>

          <div className="flex items-center gap-2">
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
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={onClickOpenMenu}
            >
              <AlignJustify className="size-4" />
            </Button>
          </div>
        </div>
        <Tabs defaultValue="live" className="flex-1">
          <TabsList className="fixed bottom-4 right-0 left-0 m-auto">
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent
            value="live"
            className="flex flex-col justify-center items-center"
          >
            <Text
              isStrong
              className="relative top-[-25px] md:w-1/2 md:text-center"
            >
              {transcript}
            </Text>
          </TabsContent>
          <TabsContent value="history" className="flex flex-col">
            {transcripts.length === 1 ? (
              <Text>{transcript}</Text>
            ) : (
              <>
                {transcripts.map((transcript, index) => (
                  <Text key={index}>{transcript}</Text>
                ))}
                {/* <Separator /> */}

                <div className="flex gap-2 py-4 pb-4 mt-4">
                  <Text>🗣️</Text>
                  <Text>{transcript}</Text>
                </div>
              </>
            )}

            <div ref={bottomRef} />
          </TabsContent>
        </Tabs>
      </main>

      <SideMenu />
      <RegisterDialog />
      <LoginDialog />
      <LogoutAlert />
    </>
  );
}
