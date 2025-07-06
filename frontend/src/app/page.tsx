"use client";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [text, setText] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const ws = new WebSocket("ws://localhost:8000/ws");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  ws.onmessage = (event) => {
    console.log(event);
    setText((prev) => [...prev, event.data]);
  };

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const context = new AudioContext({ sampleRate: 16000 }); // Amazon requires 16kHz
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(4096, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      const input = e.inputBuffer.getChannelData(0); // Float32 [-1.0, 1.0]
      const pcm = new Int16Array(input.length);

      for (let i = 0; i < input.length; i++) {
        let s = Math.max(-1, Math.min(1, input[i]));
        pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(pcm.buffer); // send as binary
      }
    };
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <main>
      <Heading isItalic>Subtitles in person</Heading>

      <Tabs defaultValue="live" className="w-[400px]">
        <TabsList className="fixed bottom-2 right-0 left-0 m-auto">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="p-4 md:p-6">
            {text.map((t, i) => {
              return (
                <>
                  <Text key={i}>{t}</Text>
                  {i === text.length - 1 && <div ref={bottomRef} />}
                </>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
