import { cn } from "@/client/lib/utils";

type SubtitleLogProps = {
  sentence: string;
  hasBackground?: boolean;
};

export const SubtitleLog = ({ sentence, hasBackground }: SubtitleLogProps) => {
  return (
    <p className={cn("w-full px-4 py-2", hasBackground && "bg-gray-100")}>
      <span className="text-gray-500">{sentence}</span>
    </p>
  );
};
