import { Contents } from "@/components/contents";
import { Flex } from "@/components/flex";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { SubtitleLog } from "@/components/subtitle-log";
import { Button } from "@/components/ui/button";
import { Check, Pen, Trash2 } from "lucide-react";

export default function Home() {
  const breadcrumbItems = [
    { label: "Subtitle Histories", href: "/histories" },
    { label: "History 1", href: "/histories/1" },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <Contents>
        <Flex gap="small" align="center" justify="between" isFullWidth>
          <Heading as="h2">History 1</Heading>
          <Flex gap="small" align="center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
            >
              <Pen className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
            >
              <Check className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
            >
              <Trash2 className="size-4" />
            </Button>
          </Flex>
        </Flex>
        <Flex vertical>
          <SubtitleLog sentence="Okay, so thank you for applying our position. " />
          <SubtitleLog sentence="Sure, thanks. " hasBackground />
          <SubtitleLog sentence="Sure, thanks. " />
          <SubtitleLog
            sentence=" Yeah. So first of all, tell me about yourself. "
            hasBackground
          />
          <SubtitleLog sentence="All of a sudden you asked me about myself. " />
          <SubtitleLog
            sentence="Yes, I know, yeah, sir, just a quick one. Right, yeah. "
            hasBackground
          />
          <SubtitleLog sentence="So I've been a software developer over five years and I'm basically based in Vancouver, Canada and I've been doing lots of like, you know, I've been working in the lot of startup companies and I'm more particularly familiar with the stand up phase of the startup companies which means whatever the company needs to establish some patterns in the company, I'm there. And yeah, I've been enjoying so much with these particular processes in there and I have lots of experience with that. And yeah, this time around like I've been looking for opportunity to grow myself to expand my career into more grown companies field to apply what I've been Learned in past 5 years of experience in my career. So thank you very much for having me today. " />
          <SubtitleLog
            sentence="That's great. Thank you for coming. And also, so you have said I have done a lot of study lab projects. Like how many projects have you been involved in total? In total in your five years? "
            hasBackground
          />
          <SubtitleLog sentence="Well, I would say like five to six projects. And yeah, obviously I'm a front end software engineer so I've been involved into like quite a few front end particular projects. But I'm also taking care, I've been also taking care of those back and forth front end stuff which is a little server behind the front end side to you know, consume the request for the application and stuff. And yeah, those projects like I've been doing lots of colleagues particularly in setting up the conventions and seeing bombing and stuff. " />
          <SubtitleLog
            sentence="Oh, okay. So you have interaction with other department people as well as. "
            hasBackground
          />
          <SubtitleLog sentence="Absolutely, yeah. " />
          <SubtitleLog
            sentence="Okay, sounds like, I assume you have a lot of conflict with the team. "
            hasBackground
          />
          <SubtitleLog sentence="Well, here and there, yeah. " />
          <SubtitleLog
            sentence="So yeah. Like can you tell me what is your biggest achievement? "
            hasBackground
          />
          <SubtitleLog sentence="Well, the biggest achievement I've done in my career so far is to establish the design system of the company or the product in the collaboration with the designers and project managers. And the project was quite a big that after finishing the project we started using that design system everywhere. Not particularly in the web project, but also applied to the mobile project and other products as well. So yeah, that project was quite huge and I spent like six months or so and the outcome is great, I would say. " />
          <SubtitleLog
            sentence="You have made it innovation I assume, right? "
            hasBackground
          />
          <SubtitleLog sentence="Pretty much, yeah. " />
          <SubtitleLog sentence="Wow, that's great. " hasBackground />
          <SubtitleLog sentence="That's great. Okay. " />
          <SubtitleLog
            sentence="Let me just ask you also like what do you value most in your workplace culture? "
            hasBackground
          />
          <SubtitleLog sentence="Well, in short term, I try not to be an asshole. " />
          <SubtitleLog sentence="Okay. " hasBackground />
          <SubtitleLog sentence="I mean that's like Everyone don't want to. I mean that's the most variably, you know, like that's the most valuable skill you gotta have as a professional actually. Because, you know, if you bring like a lot of ego into your workplaces, then you know, you definitely have like unnecessary conflicts with your colleagues and like DMs and stuff. But, well, the less friction, the better. Right. So what I've been trying to do or what I've been varying the most is that when choose the battle is one scheme of my philosophy of work design, that is whenever I need to bring my ego or diesel. But when the situation is not the right moment to make the better or smooth processes of the development. I get that. And choosing this kind of battle has been such an important skill that I discovering the most. " />
          <SubtitleLog
            sentence="And in short term. Don't be an asshole. "
            hasBackground
          />
          <SubtitleLog sentence="Don't be an asshole. That's good. That's good. Yeah. There's a lot of asses in there all the time. You will see all of them all the time. " />
          <SubtitleLog sentence="Absolutely. " hasBackground />
          <SubtitleLog sentence="Okay, thank you. K. Okay. So looking forward to meet you in our company. " />
          <SubtitleLog sentence="Likewise. " hasBackground />
          <SubtitleLog sentence="Yeah, likewise guests. So please keep in touch with us and we're going to notice you soon. " />
          <SubtitleLog sentence="Thank you. " hasBackground />
          <SubtitleLog sentence="Thank you for coming. Thank you for the time. " />
          <SubtitleLog sentence="Okay. " hasBackground />
          <SubtitleLog sentence="Hi. " />
          <SubtitleLog sentence="Hi. " />
          <SubtitleLog sentence="Hi. " />
        </Flex>
      </Contents>
    </>
  );
}
