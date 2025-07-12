import { Header } from "@/components/header";
import { Transcription } from "@/components/transcription/transcription";

export default function Home() {
  return (
    <>
      <Header isAbleToTranscribe />
      <Transcription />
    </>
  );
}
