import { cn } from "@/lib/client/utils";

type FlexProps = {
  as?: "div" | "nav" | "ul" | "ol" | "li";
  vertical?: boolean;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap";
  gap?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean;
};

export const Flex = ({
  children,
  className,
  vertical = false,
  justify = "start",
  align = "start",
  wrap = "nowrap",
  gap,
  as = "div",
  isFullWidth = false,
}: FlexProps) => {
  const Component = as;

  return (
    <Component
      className={cn("flex", className, {
        "flex-row": !vertical,
        "flex-col": vertical,
        "justify-start": justify === "start",
        "justify-end": justify === "end",
        "justify-center": justify === "center",
        "justify-between": justify === "between",
        "justify-around": justify === "around",
        "justify-evenly": justify === "evenly",
        "items-start": align === "start",
        "items-end": align === "end",
        "items-center": align === "center",
        "items-between": align === "between",
        "items-around": align === "around",
        "items-evenly": align === "evenly",
        "flex-wrap": wrap === "wrap",
        "flex-nowrap": wrap === "nowrap",
        "gap-2": gap === "small",
        "gap-4": gap === "medium",
        "gap-6": gap === "large",
        "w-full": isFullWidth,
      })}
    >
      {children}
    </Component>
  );
};
