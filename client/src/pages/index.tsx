import { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import { Text, Image, Button } from "@nextui-org/react";


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
    <Text h1 weight="bold" css={{ textAlign: "center" }} color="primary" size={60}>
      {currentText}
    </Text>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="min-h-screen">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ overflowX: 'hidden' }}>
          <Typing texts={["Caring made easier.", "Navigating Together.", "Helping You Thrive.", "Finding Your Way."]} delay={1500} />
        </div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="flex items-center justify-between">
            <Button
              color="secondary"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight-90,
                  behavior: "smooth",
                })
              }
            >
              Learn More
            </Button>
            <Button 
              color="secondary"
              bordered
              className="ml-4"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
      <nav
        className="fixed top-0 left-0 w-full px-4 py-4 bg-green-900 bg-opacity-60 backdrop-filter backdrop-blur-lg z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <Text h2 weight="bold" 
            css={{
              textGradient: "45deg, $green900 -10%, $red800 50%",
            }}
            >Caring Guide</Text>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button auto color="secondary">Login</Button>
            <Button auto color="secondary">Sign Up</Button>
          </div>
          <div className="md:hidden cursor-pointer" onClick={handleToggle}>
            <svg
              className="h-6 w-6 fill-current text-black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.41 16.41L18 15l-6 6-6-6L4.59 16.41L12 23.83l7.41-7.42z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              )}
            </svg>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white px-6 py-4 flex flex-col items-center space-y-4">
            <Button auto >Login</Button>
            <Button auto >Sign Up</Button>
          </div>
        )}
      </nav>
    )
}

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
      <Section title="Section 1">
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
              <h3 className="text-xl font-bold mb-2">Our Verification Process</h3>
              <p className="text-gray-700 text-base">
              We take the safety and security of our users very seriously. That's why all of our guides go through a rigorous verification process before they are officially approved. This includes background checks, reference checks, and personal interviews. You can rest assured that you're in good hands with Caring Guide.
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
              <h3 className="text-xl font-bold mb-2">Personalized Guidebook of Resources</h3>
              <p className="text-gray-700 text-base">
              Our personalized guidebook covers a wide range of resource categories, including Physical, Emotional/Mental, Financial, Housing, Spiritual, End of Life, and General. This comprehensive approach ensures that caregivers have access to the support they need, when they need it. Plus, our mentorship program provides personalized guidance and support tailored to your unique situation.
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
              <h3 className="text-xl font-bold mb-2">Connect with a Personal Mentor</h3>
              <p className="text-gray-700 text-base">
              At Caring Guide, we understand that caregiving can be overwhelming and stressful. That's why we connect caregivers with a personal mentor who provides emotional and practical support throughout their caregiving journey.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Section 2">

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" alt="Modern building architecture"/>
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div>

 
</Section>
<Section title="Section 3">
<div className="flex flex-row ">
  <div className="bg-cover bg-center px-4 py-6  mx-auto bg-[url('../../public/images/caregiver-CreativeRFTerryVineGettyImages-56cd9ca53df78cfb37a3276b.jpeg')]">
    <h2 className="text-4xl font-bold mb-2 text-center text-white">Care Giving By the Numbers</h2>
    {/* <p className="text-sm">Fifth Box Content</p> */}
  </div>
  <div className="grid grid-cols-2 ">
  
    <div className="bg-caring px-4 py-6 flex-1">
    <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded ml-8 mb-4"/>
      <h2 className="text-2xl font-bold text-black">41.8 million Americans provided care to an adult over 50 in 2020</h2>
  
    </div>
    <div className="bg-caring px-4 py-6 flex-1">
    <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded ml-8 mb-4"/>
      <h2 className="text-2xl font-bold bg text-black">89% of caregivers provide care for a relative or other loved one</h2>

    </div>
    <div className="bg-caring px-4 py-6 flex-1">
    <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded ml-8 mb-4"/>
      <h2 className="text-2xl font-bold text-black ">16.6% of Americans provide care to adults with a disability or illness</h2>

    </div>
    <div className="bg-caring px-4 py-6 flex-1">
    <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded ml-8 mb-4"/>
      <h2 className="text-2xl font-bold text-black">23.7 hours per week on average spent providing care for loved ones not lived with</h2>

    </div>
  </div>
</div>
</Section>

    </>
    );
};

export default IndexPage;