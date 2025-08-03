"use client"; // Error boundaries must be Client Components

import { Contents } from "@/components/contents";
import { Header } from "@/components/global/header";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <Contents>
        <Heading as="h2">Something went wrong!</Heading>
        <Link
          onClick={() => {
            reset();
          }}
          href="/"
        >
          Back to transcription
        </Link>
      </Contents>
    </>
  );
}
