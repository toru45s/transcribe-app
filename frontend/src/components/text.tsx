import { cn } from "@/lib/utils";

type Props = {
  isStrong?: boolean;
  isBold?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Text({ isStrong, isBold, className, children }: Props) {
  return (
    <p
      className={cn(
        isStrong ? "text-2xl font-semibold tracking-tight" : "leading-7",
        isBold && "font-bold",
        className
      )}
    >
      {children}
    </p>
  );
}
