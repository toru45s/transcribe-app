"use client";

import { Heading } from "./heading";
import { Button } from "./ui/button";
import { Pause, Play, AlignJustify } from "lucide-react";
import { useAudioStream } from "@/hooks/use-audio-stream";
import { useSideMenuStore } from "@/stores/use-side-menu-store";
import { DESKTOP_BREAKPOINT, KEY_COLOR_CLASS } from "@/constants";
import { Link } from "./link";
import { Breadcrumb } from "./breadcrumb";
import { Flex } from "./flex";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import { useTranscriptStore } from "@/stores/use-transcript-store";

type HeaderProps = {
  isAbleToTranscribe?: boolean;
  breadcrumbItems?: { label: string; href: string }[];
};

export const Header = ({
  isAbleToTranscribe,
  breadcrumbItems,
}: HeaderProps) => {
  const { handleToggleRecording } = useAudioStream();
  const { isRecording } = useTranscriptStore();
  const { onOpen: onClickOpenMenu } = useSideMenuStore();
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
        {isAbleToTranscribe && (
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={handleToggleRecording}
            >
              {isRecording ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>
            <div className="absolute bottom-[-100px] left-[-220px] w-[240px] h-[120px] md:bottom-[-130px] md:left-[-350px] md:w-[380px] md:h-[120px]">
              <Image
                src="/description.svg"
                alt="description"
                fill
                className="object-contain"
                unoptimized
                priority={true}
              />
            </div>
          </div>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 cursor-pointer"
          onClick={onClickOpenMenu}
        >
          <AlignJustify className="size-4" />
        </Button>
      </div>
    </div>
  );
};
