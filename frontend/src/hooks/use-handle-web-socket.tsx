import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_ROOT } from "@/config";

const WS_URL = `${WS_ROOT}/ws/transcribe/`;

export const useHandleWebSocket = () => {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const onStartWebSocket = () => {
    console.log("Starting WebSocket");
    setSocketUrl(WS_URL);
  };

  const onStopWebSocket = () => {
    console.log("Stopping WebSocket");
    setSocketUrl(null);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "WebSocket Connected",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "WebSocket Closed",
    [ReadyState.UNINSTANTIATED]: "Welcome to the live transcription app.",
  }[readyState];

  return {
    onStartWebSocket,
    onStopWebSocket,
    connectionStatus,
    readyState,
    lastMessage,
  };
};
