import { cn } from "@/lib/client/utils";

type Props = {
  isStrong?: boolean;
  isBold?: boolean;
  isGray?: boolean;
  className?: string;
  children: React.ReactNode;
  destructive?: boolean;
};

export function Text({
  isStrong,
  isGray,
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
        isGray && "text-gray-500",
        destructive && "text-destructive",
        className
      )}
    >
      {children}
    </p>
  );
}
