"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonPlayAndPauseProps = {
  className?: string;
  onClick: () => void;
  isRecording: boolean;
};

export const ButtonPlayAndPause = ({
  className,
  onClick,
  isRecording,
}: ButtonPlayAndPauseProps) => {
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className={cn("size-8 cursor-pointer", className)}
        onClick={onClick}
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
