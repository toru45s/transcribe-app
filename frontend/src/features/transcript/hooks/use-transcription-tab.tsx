"use client";

import dayjs from "dayjs";
import { DATE_FORMAT } from "@/client/constants/global";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useAudioStream } from "@/features/transcript/hooks/use-audio-stream";
import { useHandleWebSocket } from "@/features/transcript/hooks/use-handle-web-socket";
import { TAB_KEYS } from "@/features/transcript/constants/transcript-constants";
import { createHistorySetService } from "@/features/history-set/services/history-set-services";
import { toast } from "sonner";
import { createHistoryService } from "@/features/history/services/history-services";

export const useTranscriptionTab = () => {
  const [tab, setTab] = useState(TAB_KEYS.LIVE);
  const [historySetId, setHistorySetId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useUserStore();

  const {
    transcript,
    transcripts,
    isRecording,
    onOpenWebSocket,
    onCloseWebSocket,
    onMessageWebSocket: _onMessageWebSocket,
    onErrorWebSocket,
    startRecording,
    stopRecording,
    audioData,
  } = useAudioStream();

  const onMessageWebSocket = useCallback(
    async (event: WebSocketEventMap["message"]) => {
      _onMessageWebSocket(event);
      console.log("event", event);
      console.log("event.data", event.data);
      // if (historySetId && event.data) {
      //   try {
      //     const { data, error } = await createHistoryService({
      //       id: historySetId,
      //       content: event.data,
      //     });

      //     if (error) {
      //       console.error("error", error);
      //       toast.error("Failed to update history set");
      //     }

      //     if (data) {
      //       console.log("data", data);
      //     }
      //   } catch (error) {
      //     console.error("error", error);
      //   }
      // }
    },
    [historySetId, _onMessageWebSocket]
  );

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
      try {
        const title = `Subtitle of ${dayjs().format(DATE_FORMAT)}`;
        const { data, error } = await createHistorySetService({ title });

        if (error) {
          console.error("error", error);
          toast.error("Failed to create history set");
        }

        if (data) {
          setHistorySetId(data.id);
        }
      } catch (error) {
        console.error("error", error);
      }
    }

    await onStartWebSocket();
    startRecording();
  }, [isAuthenticated, isRecording, onStartWebSocket, startRecording]);

  const onStopTranscription = useCallback(async () => {
    setHistorySetId(null);
    await onStopWebSocket();
    stopRecording();
  }, [onStopWebSocket, stopRecording]);

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
  };
};
