"use client";

import { Button } from "@/components/ui/button";
import { useTranscriptStore } from "@/stores/use-transcript-store";
import { useAudioStream } from "@/hooks/use-audio-stream";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const ButtonPlayAndPause = ({ className }: { className?: string }) => {
  const { handleToggleRecording } = useAudioStream();
  const { isRecording } = useTranscriptStore();
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className={cn("size-8 cursor-pointer", className)}
        onClick={handleToggleRecording}
      >
        {isRecording ? (
          <Pause className="size-4" />
        ) : (
          <Play className="size-4" />
        )}
      </Button>
    </div>
  );
};
