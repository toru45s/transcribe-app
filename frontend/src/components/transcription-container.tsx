type TranscriptionContainerProps = {
  children: React.ReactNode;
};

export const TranscriptionContainer = ({
  children,
}: TranscriptionContainerProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
  );
};
