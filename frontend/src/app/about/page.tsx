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
        <Heading as="h2">About</Heading>
        <Text isGray>
          This is a transcription service that allows you to transcribe audio
          files.
        </Text>
        <Text isGray>
          This is a transcription service that allows you to transcribe audio
          files.
        </Text>
        <Text isGray>
          This is a transcription service that allows you to transcribe audio
          files.
        </Text>

        <Link href="https://github.com/jason-yoon/transcription-service">
          Github
        </Link>

        <Link href="https://www.linkedin.com/in/jason-yoon-dev/">LinkedIn</Link>

        <Link href="/">Back to transcription</Link>
      </Contents>
    </>
  );
}
