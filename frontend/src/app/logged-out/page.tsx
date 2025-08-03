import { Contents } from "@/components/contents";
import { Header } from "@/components/global/header";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Text } from "@/components/text";

export default function Home() {
  return (
    <>
      <Header />
      <Contents>
        <Heading as="h2">You are logged out</Heading>
        <Text isGray>Thank you for using our service.</Text>

        <Link href="/">Back to transcription</Link>
      </Contents>
    </>
  );
}
