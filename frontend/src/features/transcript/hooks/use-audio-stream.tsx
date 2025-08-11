"use client";

import { useState, useRef, useCallback } from "react";
import { convertFloat32ToInt16 } from "@/features/transcript/lib/util";
import { useHandleTranscriptData } from "@/features/transcript/hooks/use-handle-transcript-data";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";

export const DATA_TYPE = {
  TRANSCRIPTION: "transcription",
  SYSTEM: "system",
};

export const useAudioStream = () => {
  const { isAuthenticated } = useUserStore();
  const { createHistory, initializeHistorySetId } = useHandleTranscriptData();

  const [transcript, setTranscript] = useState<string>("");
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [audioData, setAudioData] = useState<ArrayBuffer | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const onOpenWebSocket = (event: WebSocketEventMap["open"]) => {
    console.log("WebSocket connection opened", event);
  };

  const onCloseWebSocket = (event: WebSocketEventMap["close"]) => {
    console.log("WebSocket connection closed", event);
  };

  const onMessageWebSocket = useCallback(
    (event: WebSocketEventMap["message"]) => {
      const { data, error } = JSON.parse(event?.data);

      if (!data) return;

      if (error) {
        setTranscript(`Error: ${error.content}`);
      }

      switch (data.type) {
        case DATA_TYPE.TRANSCRIPTION:
          setTranscript(data.content);

          if (!data.is_partial) {
            setTranscripts((prev) => [...prev, data.content]);

            if (isAuthenticated) {
              createHistory(data.content);
            }
          }
          break;

        case DATA_TYPE.SYSTEM:
          setTranscript(`System: ${data.content}`);

          break;
      }
    },
    [isAuthenticated, createHistory]
  );

  const onErrorWebSocket = (event: WebSocketEventMap["error"]) => {
    console.log("WebSocket error", event);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioContext = new AudioContext({ sampleRate: 16000 }); // AWS expects 16kHz
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0); // Float32 [-1.0, 1.0]
      const int16 = convertFloat32ToInt16(input); // Int16 PCM

      setAudioData(int16.buffer);
    };

    source.connect(processor);
    processor.connect(audioContext.destination); // Required for Safari

    audioContextRef.current = audioContext;
    processorRef.current = processor;
    sourceRef.current = source;

    setIsRecording(true);
  };

  const stopRecording = () => {
    setTranscripts((prev) => [...prev, transcript]);

    if (isAuthenticated) {
      createHistory(transcript);
    }

    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();

    processorRef.current = null;
    sourceRef.current = null;
    audioContextRef.current = null;

    setIsRecording(false);
    initializeHistorySetId();
  };

  const resetTranscription = () => {
    setTranscript("");
    setTranscripts([]);
  };

  return {
    audioData,
    transcript,
    transcripts,
    isRecording,
    onOpenWebSocket,
    onCloseWebSocket,
    onMessageWebSocket,
    onErrorWebSocket,
    startRecording,
    stopRecording,
    resetTranscription,
  };
};
