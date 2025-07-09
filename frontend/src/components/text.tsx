import { cn } from "@/lib/utils";

type Props = {
  isStrong?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Text({ isStrong, className, children }: Props) {
  return (
    <p
      className={cn(
        isStrong
          ? "text-2xl font-semibold tracking-tight"
          : "leading-7",
        className
      )}
    >
      {children}
    </p>
  );
}
