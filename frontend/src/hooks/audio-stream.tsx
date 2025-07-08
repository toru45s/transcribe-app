"use client";
import { useState, useEffect, useRef } from "react";

export const useAudioStream = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [transcript, setTranscript] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws/transcribe/");
    socketRef.current.binaryType = "arraybuffer";

    if (socketRef.current) {
      socketRef.current.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socketRef.current.onmessage = (event) => {
        console.log(event.data);
        setTranscript(event.data);
      };
    }

    return () => {
      console.log("Closing WebSocket connection");
      stopRecording(); // Ensure everything is cleaned up
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!audioStream) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream: MediaStream) => {
          setAudioStream(stream);
          const mediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(mediaRecorder);
          const audio: BlobPart[] = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              console.log(socketRef.current?.readyState);
              console.log(WebSocket.OPEN);
              if (socketRef.current?.readyState === WebSocket.OPEN) {
                console.log("Here4");
                socketRef.current.send(event.data);
              } else {
                console.log("Here5");
                console.warn("WebSocket is not open.");
              }
            }
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

  const handleToggleRecording = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioContext = new AudioContext({ sampleRate: 16000 }); // AWS expects 16kHz
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0); // Float32 [-1.0, 1.0]
      const int16 = float32ToInt16(input); // Int16 PCM
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(int16.buffer); // Send raw PCM
      }
    };

    source.connect(processor);
    processor.connect(audioContext.destination); // Required for Safari

    audioContextRef.current = audioContext;
    processorRef.current = processor;
    sourceRef.current = source;

    setIsRecording(true);

    // if (mediaRecorder && mediaRecorder.state === "inactive") {
    //   mediaRecorder.start(500); // every 500ms
    //   setIsRecording(true);
    //   setRecordingTime(0);
    //   setAudioBlob(null);

    //   timerRef.current = setInterval(() => {
    //     setRecordingTime((prevTime) => {
    //       if (prevTime >= RECORDING_MAX_DURATION - 1) {
    //         stopRecording();
    //         return RECORDING_MAX_DURATION;
    //       }
    //       return prevTime + 1;
    //     });
    //   }, 1000);
    // }
  };

  const float32ToInt16 = (buffer: Float32Array): Int16Array => {
    const output = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output;
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  return {
    transcript,
    isRecording,
    handleToggleRecording,
    formatTime,
    audioBlob,
    recordingTime,
  };
};
