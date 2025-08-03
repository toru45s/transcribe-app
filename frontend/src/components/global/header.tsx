"use client";

import { Heading } from "@/components/heading";
import { DESKTOP_BREAKPOINT, KEY_COLOR_CLASS } from "@/constants/global";
import { Link } from "@/components/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Flex } from "@/components/flex";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ButtonHandleSidemenu } from "@/components/global/button-handle-sidemenu";

type HeaderProps = {
  breadcrumbItems?: { label: string; href: string }[];
};

/**
 * Header component for the Live Transcription App.
 *
 * Renders the global header with a logo, breadcrumb navigation, and a button to handle the side menu.
 *
 * @module components/global/Header
 * @param {Object} props - The component props.
 * @param {Object[]} [props.breadcrumbItems] - The breadcrumb items to display.
 * @returns {JSX.Element} The rendered header component.
 */
export const Header = ({ breadcrumbItems }: HeaderProps) => {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  return (
    <div className="sticky top-0 flex justify-between items-center py-4">
      <Flex gap="small" align="center" justify="center">
        <Link href="/" isNoUnderline>
          <Heading as="h1" isItalic className={KEY_COLOR_CLASS}>
            Subtitles
          </Heading>
        </Link>

        {breadcrumbItems && isDesktop && <Breadcrumb items={breadcrumbItems} />}
      </Flex>

      <div className="flex items-center gap-2">
        <ButtonHandleSidemenu />
      </div>
    </div>
  );
};
