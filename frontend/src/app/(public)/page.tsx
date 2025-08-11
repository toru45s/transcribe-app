import { Header } from "@/client/components/header";
import { TranscriptionTab } from "@/features/transcript/components/transcription-tab";

/**
 * Home page of the Live Transcription App.
 *
 * Renders the global header and the main transcription tab interface.
 *
 * @module pages/Home
 * @returns {JSX.Element} The rendered home page component.
 */
export default function Home() {
  return (
    <>
      <Header />
      <TranscriptionTab />
    </>
  );
}
