import { create } from "zustand";

type TranscriptStore = {
  transcript: string;
  transcripts: string[];
  isRecording: boolean;
  historyId: string | null;
  setTranscript: (transcript: string) => void;
  setTranscripts: (transcripts: string[]) => void;
  setIsRecording: (isRecording: boolean) => void;
  setHistoryId: (historyId: string | null) => void;
};

export const useTranscriptStore = create<TranscriptStore>((set) => ({
  transcript: "",
  transcripts: [],
  isRecording: false,
  historyId: null,
  setTranscript: (transcript) => set({ transcript }),
  setTranscripts: (transcripts) => set({ transcripts }),
  setIsRecording: (isRecording) => set({ isRecording }),
  setHistoryId: (historyId) => set({ historyId }),
}));
