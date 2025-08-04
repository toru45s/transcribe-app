"use client";
import { useState, useEffect, useRef } from "react";
import { convertFloat32ToInt16 } from "@/service/transcriptService";

export const DATA_TYPE = {
  TRANSCRIPTION: "transcription",
  SYSTEM: "system",
};

export const useAudioStream = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [audioData, setAudioData] = useState<ArrayBuffer | null>(null);

  const [isPause, setIsPause] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const onOpenWebSocket = (event: WebSocketEventMap["open"]) => {
    console.log("WebSocket connection opened", event);
  };

  const onCloseWebSocket = (event: WebSocketEventMap["close"]) => {
    console.log("WebSocket connection closed", event);
  };

  const onMessageWebSocket = (event: WebSocketEventMap["message"]) => {
    const { data, error } = JSON.parse(event.data);
    console.log("data", data);
    console.log("error", error);
    // if (error) {
    //   setTranscripts((prev) => [...prev, `System: ${error.content}`]);
    // }

    switch (data.type) {
      case DATA_TYPE.TRANSCRIPTION:
        setTranscript(data.content);
        break;
      case DATA_TYPE.SYSTEM:
        setTranscript(data.content);
        break;
    }
  };

  const onErrorWebSocket = (event: WebSocketEventMap["error"]) => {
    console.log("WebSocket error", event);
  };

  useEffect(() => {
    if (!audioStream) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream: MediaStream) => {
          setAudioStream(stream);
          const mediaRecorder = new MediaRecorder(stream);
          const audio: BlobPart[] = [];

          mediaRecorder.ondataavailable = (event) => {
            console.log("event", event.data);
            // if (event.data.size > 0) {
            //   if (socketRef.current?.readyState === WebSocket.OPEN) {
            //     socketRef.current.send(event.data);
            //   } else {
            //     console.warn("WebSocket is not open.");
            //   }
            // }
          };

          mediaRecorder.onstop = () => {
            const b = new Blob(audio, { type: "audio/wav" });
            setAudioBlob(b as Blob);
            console.log("audioBlob", b);
          };
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [audioStream]);

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
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();

    processorRef.current = null;
    sourceRef.current = null;
    audioContextRef.current = null;

    setIsRecording(false);
    // mediaRecorder?.stop();
    // setIsRecording(false);
    // if (timerRef.current) {
    //   clearInterval(timerRef.current);
    // }
  };

  return {
    audioData,
    transcript,
    transcripts,
    isPause,
    isRecording,
    onOpenWebSocket,
    onCloseWebSocket,
    onMessageWebSocket,
    onErrorWebSocket,
    startRecording,
    stopRecording,
  };
};
