import { create } from "zustand";

type TranscriptStore = {
  transcript: string;
  transcripts: string[];
  isRecording: boolean;
  setTranscript: (transcript: string) => void;
  setTranscripts: (transcripts: string[]) => void;
  setIsRecording: (isRecording: boolean) => void;
};

export const useTranscriptStore = create<TranscriptStore>((set) => ({
  transcript: "",
  transcripts: [],
  isRecording: false,
  setTranscript: (transcript) => set({ transcript }),
  setTranscripts: (transcripts) => set({ transcripts }),
  setIsRecording: (isRecording) => set({ isRecording }),
}));
