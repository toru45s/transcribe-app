import NextLink from "next/link";
import { cn } from "@/lib/client/utils";
import { KEY_COLOR_CLASS } from "@/constants/client/global";

type LinkProps = {
  href: string;
  isNoUnderline?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Link = ({
  href,
  isNoUnderline,
  disabled,
  children,
  onClick,
}: LinkProps) => {
  return (
    <NextLink
      className={cn(
        "text-primary font-medium ",
        KEY_COLOR_CLASS,
        !isNoUnderline && "underline underline-offset-4",
        disabled && "text-gray-500 cursor-not-allowed pointer-events-none"
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
};
