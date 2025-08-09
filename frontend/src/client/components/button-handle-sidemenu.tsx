"use client";

import { useSideMenuStore } from "@/client/stores/use-side-menu-store";
import { Button } from "@/client/components/ui/button";
import { AlignJustify } from "lucide-react";

/**
 * Button component for handling the side menu.
 *
 * Renders a button that opens the side menu when clicked.
 *
 * @module components/global/ButtonHandleSidemenu
 * @returns {JSX.Element} The rendered button component.
 */
export const ButtonHandleSidemenu = () => {
  const { onOpen: onClickOpenMenu } = useSideMenuStore();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-8 cursor-pointer"
      onClick={onClickOpenMenu}
    >
      <AlignJustify className="size-4" />
    </Button>
  );
};
