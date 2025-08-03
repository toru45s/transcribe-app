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
