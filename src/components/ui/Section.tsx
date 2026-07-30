type SectionProps = {
  children: React.ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <section className="py-20">
      {children}
    </section>
  );
}