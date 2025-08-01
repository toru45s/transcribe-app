import { cn } from "@/lib/utils";

type Props = {
  isStrong?: boolean;
  isBold?: boolean;
  className?: string;
  children: React.ReactNode;
  destructive?: boolean;
};

export function Text({
  isStrong,
  isBold,
  className,
  children,
  destructive,
}: Props) {
  return (
    <p
      className={cn(
        isStrong ? "text-2xl font-semibold tracking-tight" : "leading-7",
        isBold && "font-bold",
        destructive && "text-destructive",
        className
      )}
    >
      {children}
    </p>
  );
}
