import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useAudioStream } from "@/features/transcript/hooks/use-audio-stream";
import { useHandleWebSocket } from "@/features/transcript/hooks/use-handle-web-socket";
import { TAB_KEYS } from "@/features/transcript/constants/transcript-constants";

export const useTranscriptionTab = () => {
  const [tab, setTab] = useState(TAB_KEYS.LIVE);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useUserStore();

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

  const onStartTranscription = async () => {
    if (isAuthenticated) {
      // const title = `Subtitle of ${dayjs().format(DATE_FORMAT)}`;
    }

    await onStartWebSocket();
    startRecording();
  };

  const onStopTranscription = async () => {
    await onStopWebSocket();
    stopRecording();
  };

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
