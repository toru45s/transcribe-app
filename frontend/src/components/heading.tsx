import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  isItalic?: boolean;
  className?: string;
};

export function Heading({ children, isItalic = false, className }: Props) {
  return (
    <h1
      className={cn(
        "w-fit text-2xl md:text-4xl font-extrabold tracking-tight text-balance",
        isItalic && "italic",
        className
      )}
    >
      {children}
    </h1>
  );
}
