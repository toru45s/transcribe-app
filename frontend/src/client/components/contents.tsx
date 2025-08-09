import { Flex } from "./flex";

type ContentsProps = {
  children: React.ReactNode;
};

export const Contents = ({ children }: ContentsProps) => {
  return (
    <Flex vertical gap="small" className="w-full max-w-2xl mx-auto">
      {children}
    </Flex>
  );
};
