import { Text } from "@nextui-org/react";

type ContentSectionProps = {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
};

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  children,
  bgColor = "white",
}) => {
  return (
    <section
      className={`flex flex-col justify-center items-center py-10 ${
        bgColor === "white" ? "bg-white" : "bg-gray-100"
      }`}
    >
      <Text size={36} weight="bold" color="primary" className="mb-8">
        {title}
      </Text>
      <div className="flex flex-wrap justify-center w-full max-w-6xl">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
