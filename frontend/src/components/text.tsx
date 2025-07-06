type Props = {
  ref?: React.RefObject<HTMLParagraphElement | null>;
  children: React.ReactNode;
};

export function Text({ ref, children }: Props) {
  return (
    <p ref={ref} className="text-2xl font-semibold tracking-tight">
      {children}
    </p>
  );
}
