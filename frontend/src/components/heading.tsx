import { cn } from "@/lib/client/utils";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  isItalic?: boolean;
  className?: string;
};

export function Heading({
  children,
  isItalic = false,
  className,
  as = "h1",
}: Props) {
  const Heading = ({ children, className }: Props) => {
    switch (as) {
      case "h1":
        return <h1 className={cn(className, "")}>{children}</h1>;
      case "h2":
        return (
          <h2
            className={cn(
              className,
              "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
            )}
          >
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3
            className={cn(
              className,
              "scroll-m-20 text-2xl font-semibold tracking-tight"
            )}
          >
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4
            className={cn(
              className,
              "scroll-m-20 text-xl font-semibold tracking-tight"
            )}
          >
            {children}
          </h4>
        );
    }
  };

  return (
    <Heading
      className={cn(
        "w-fit text-xl md:text-2xl font-extrabold tracking-tight text-balance",
        isItalic && "italic",
        className
      )}
    >
      {children}
    </Heading>
  );
}
