import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_ROOT } from "@/config";

const WS_URL = `${WS_ROOT}/ws/transcribe/`;

type UseHandleWebSocketProps = {
  onOpen: (event: WebSocketEventMap["open"]) => void;
  onClose: (event: WebSocketEventMap["close"]) => void;
  onMessage: (event: WebSocketEventMap["message"]) => void;
  onError: (event: WebSocketEventMap["error"]) => void;
};

export const useHandleWebSocket = ({
  onOpen,
  onClose,
  onMessage,
  onError,
}: UseHandleWebSocketProps) => {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen,
    onClose,
    onMessage,
    onError,
    shouldReconnect: (closeEvent) => true,
  });

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
    sendMessage,
  };
};
