import { cn } from "@/client/lib/utils";
import { Skeleton } from "@/client/components/ui/skeleton";

type SubtitleLogProps = {
  sentence: string;
  hasBackground?: boolean;
  isLoading?: boolean;
};

export const SubtitleLog = ({
  sentence,
  hasBackground,
  isLoading,
}: SubtitleLogProps) => {
  return (
    <div className={cn("w-full px-4 py-2", hasBackground && "bg-gray-100")}>
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <span className="text-gray-500">{sentence}</span>
      )}
    </div>
  );
};
