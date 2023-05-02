import { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import { Navbar, Text, Image, Button } from "@nextui-org/react";

type TypingProps = {
  texts: string[];
  delay?: number;
};

const Typing: React.FC<TypingProps> = ({ texts, delay = 1000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping) {
      // typing
      if (currentText.length < texts[currentTextIndex].length) {
        timer = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText + texts[currentTextIndex][prevText.length];
          });
        }, 50);
      }
      // delay before backspacing
      else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      // backspacing
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText((prevText) => {
            return prevText.slice(0, -1);
          });
        }, 50);
      }
      // switch to next text
      else {
        setIsTyping(true);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, delay, isTyping, texts]);

  return (
    <Text
      h1
      weight="bold"
      css={{ textAlign: "center" }}
      color="primary"
      size={60}
    >
      {currentText}
    </Text>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string; // add id property
}

const Section = ({ title, children, id }: SectionProps) => {
  return (
    <section id={id} className="min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mt-12 mb-6">{title}</h2>
        <div className="flex flex-wrap -mx-4">{children}</div>
      </div>
    </section>
  );
};

const ParallaxSection = () => {
  return (
    <Parallax bgImage="/images/parallax-image2.gif" strength={500}>
      <div className="h-screen flex items-center justify-center relative">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ overflowX: "hidden" }}
        >
          <Typing
            texts={[
              "Caring made easier.",
              "Navigating Together.",
              "Helping You Thrive.",
              "Finding Your Way.",
            ]}
            delay={1500}
          />
        </div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="flex items-center justify-between">
            <Button
              color="secondary"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight - 90,
                  behavior: "smooth",
                })
              }
            >
              Learn More
            </Button>
            <Button color="secondary" bordered className="ml-4">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

const Nav = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const section1 = document.getElementById("section-1");
      const section2 = document.getElementById("section-2");
      if (section1 && window.scrollY < section1.offsetTop - 100) {
        setActiveLink("");
      } else if (section2 && window.scrollY >= section2.offsetTop - 100) {
        setActiveLink("section-2");
      } else {
        setActiveLink("section-1");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection1 = () => {
    const section1 = document.getElementById("section-1");
    if (section1) {
      window.scrollTo({
        top: section1.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToSection2 = () => {
    const section2 = document.getElementById("section-2");
    if (section2) {
      window.scrollTo({
        top: section2.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <Navbar
      isBordered
      variant="sticky"
      maxWidth="fluid"
      css={{
        $$navbarBackgroundColor: "#FFFFFF80",
        $$navbarBlurBackgroundColor: "#FFFFFF80",
      }}
    >
      <Navbar.Brand>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <Text
          h2
          weight="bold"
          css={{
            textGradient: "45deg, $green900 -10%, $red800 50%",
          }}
        >
          Caring Guide
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link
          activeColor="secondary"
          isActive={activeLink === "section-1"}
          color="primary"
          onClick={handleScrollToSection1}
        >
          Section 1
        </Navbar.Link>
        <Navbar.Link
          activeColor="secondary"
          isActive={activeLink === "section-2"}
          color="primary"
          onClick={handleScrollToSection2}
        >
          Section 2
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="primary" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button flat color="secondary" auto href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

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

const IndexPage = () => {
  return (
    <>
      <Nav />
      <ParallaxSection />
      <Section title="Section 1" id="section-1">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/section-1-image.jpg"
              alt="Section 1 Image"
              width={400}
              height={400}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Our Verification Process
              </h3>
              <p className="text-gray-700 text-base">
                We take the safety and security of our users very seriously.
                That's why all of our guides go through a rigorous verification
                process before they are officially approved. This includes
                background checks, reference checks, and personal interviews.
                You can rest assured that you're in good hands with Caring
                Guide.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/section-2-image.jpg"
              alt="Section 2 Image"
              width={400}
              height={400}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Personalized Guidebook of Resources
              </h3>
              <p className="text-gray-700 text-base">
                Our personalized guidebook covers a wide range of resource
                categories, including Physical, Emotional/Mental, Financial,
                Housing, Spiritual, End of Life, and General. This comprehensive
                approach ensures that caregivers have access to the support they
                need, when they need it. Plus, our mentorship program provides
                personalized guidance and support tailored to your unique
                situation.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/section-3-image.jpg"
              alt="Section 3 Image"
              width={400}
              height={400}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Connect with a Personal Mentor
              </h3>
              <p className="text-gray-700 text-base">
                At Caring Guide, we understand that caregiving can be
                overwhelming and stressful. That's why we connect caregivers
                with a personal mentor who provides emotional and practical
                support throughout their caregiving journey.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Section 2" id="section-2">
        <div className="flex items-center justify-between">
          <Text>
            Whether you're an early-stage caregiver or an experienced veteran,
            we've got you covered. Our personalized guidebook and mentorship
            program are designed to meet the needs of caregivers at every stage
            of their journey. Plus, our user profiles allow you to connect with
            other caregivers who are at a similar stage, so you can learn from
            each other and grow together.
          </Text>
        </div>
      </Section>
    </>
  );
};

export default IndexPage;
