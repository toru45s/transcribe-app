"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useAudioStream } from "@/features/transcript/hooks/use-audio-stream";
import { useHandleWebSocket } from "@/features/transcript/hooks/use-handle-web-socket";
import { TAB_KEYS } from "@/features/transcript/constants/transcript-constants";
import { useHandleTranscriptData } from "@/features/transcript/hooks/use-handle-transcript-data";
import { toast } from "sonner";

export const useTranscriptionTab = () => {
  const [tab, setTab] = useState(TAB_KEYS.LIVE);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useUserStore();
  const { createHistorySet, initializeHistorySetId } =
    useHandleTranscriptData();

  const {
    transcript,
    transcripts,
    isRecording,
    onOpenWebSocket,
    onCloseWebSocket,
    onMessageWebSocket,
    onErrorWebSocket,
    startRecording,
    stopRecording,
    audioData,
    resetTranscription,
  } = useAudioStream();

  const {
    onStartWebSocket,
    onStopWebSocket,
    connectionStatus,
    readyState,
    sendMessage,
  } = useHandleWebSocket({
    onOpen: onOpenWebSocket,
    onClose: onCloseWebSocket,
    onMessage: onMessageWebSocket,
    onError: onErrorWebSocket,
  });

  const onStartTranscription = useCallback(async () => {
    if (isRecording) return;

    if (isAuthenticated) {
      await initializeHistorySetId();
      const historySetId = await createHistorySet();

      if (!historySetId) {
        toast.error("Failed to create history set");
        return;
      }
    }

    await onStartWebSocket();
    await startRecording();
  }, [
    onStartWebSocket,
    startRecording,
    isRecording,
    isAuthenticated,
    createHistorySet,
    initializeHistorySetId,
  ]);

  const onStopTranscription = useCallback(async () => {
    if (!isRecording) return;

    await onStopWebSocket();
    stopRecording();
  }, [onStopWebSocket, stopRecording, isRecording]);

  useEffect(() => {
    if (audioData) {
      console.log("audioData", audioData);
      sendMessage(audioData);
    }
  }, [audioData, sendMessage]);

  return {
    tab,
    setTab,
    bottomRef,
    isAuthenticated,
    transcript,
    transcripts,
    isRecording,
    onStartTranscription,
    onStopTranscription,
    readyState,
    connectionStatus,
    resetTranscription,
  };
};
