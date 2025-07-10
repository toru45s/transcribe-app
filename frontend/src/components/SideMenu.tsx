import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSideMenuStore } from "@/stores/useSideMenuStore";
import { useRegisterDialogStore } from "@/stores/useRegisterDialogStore";
import { useLoginDialogStore } from "@/stores/useLoginDialogStore";
import { useLogoutAlertStore } from "@/stores/useLogoutAlertStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export const SideMenu = () => {
  const { isOpen, onClose } = useSideMenuStore();
  const { onOpen: onOpenRegisterDialog } = useRegisterDialogStore();

  const { onOpen: onOpenLoginDialog } = useLoginDialogStore();
  const { onOpen: onOpenLogoutAlert } = useLogoutAlertStore();

  const onClickOpenLoginDialog = () => {
    onOpenLoginDialog();
  };

  const onClickOpenRegisterDialog = () => {
    onOpenRegisterDialog();
  };

  const onClickLogout = () => {
    onOpenLogoutAlert();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Welcome to <span className="text-[#FF4F00] italic">Subtitles</span>
          </SheetTitle>
          <SheetDescription>
            Please login or register to continue if you want full access to the
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <ul>
            <li>
              <Link href="/">April 15, 2025</Link>
            </li>
            <li>
              <Link href="/">April 15, 2025</Link>
            </li>
          </ul>
        </div>

        <SheetFooter>
          <Button onClick={onClickOpenLoginDialog} variant="outline">
            Login
          </Button>
          <Button onClick={onClickOpenRegisterDialog} variant="outline">
            Register
          </Button>
          <Button onClick={onClickLogout} variant="outline">
            Logout
          </Button>
          <span className="text-sm text-gray-500 text-center">
            2025 Subtitles. (v0.1.0)
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
