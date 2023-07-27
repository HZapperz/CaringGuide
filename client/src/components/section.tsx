interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string; // add id property
  style?: React.CSSProperties;
}

const Section = ({ title, children, id, style }: SectionProps) => {
  return (
    <section id={id} style={style} className="min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mt-12 mb-6">{title}</h2>
        <div className="flex flex-wrap -mx-4">{children}</div>
      </div>
    </section>
  );
};

export default Section;
