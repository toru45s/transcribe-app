import { Contents } from "@/client/components/contents";
import { Header } from "@/client/components/header";
import { Heading } from "@/client/components/heading";
import { Link } from "@/client/components/link";
import { Text } from "@/client/components/text";

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
