import { Heading } from "@/components/heading";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Heading>You are logged out</Heading>
        <Link href="/">Back to app</Link>
      </div>
    </>
  );
}
