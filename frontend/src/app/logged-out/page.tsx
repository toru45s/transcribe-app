import { Contents } from "@/components/contents";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";

export default function Home() {
  return (
    <>
      <Header />
      <Contents>
        <Heading as="h2">You are logged out</Heading>
        <Link href="/">Back to transcription</Link>
      </Contents>
    </>
  );
}
