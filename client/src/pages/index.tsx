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
    <div style={{ minHeight: '50px', minWidth: '600px' }}>
      <Text weight="bold" color="primary" size={60}>
        {currentText}
      </Text>
    </div>
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="flex items-center justify-between">
        <Typing texts={["Caring made easier.", "Navigating Together.", "Helping You Thrive.", "Finding Your Way."]} delay={1500} />
        </div>
</div>
  {/* <h1 className="text-6xl font-bold text-black">
    Caring Guide
  </h1> */}
  <div className="flex items-center justify-between mt-4 flex space-x-4">
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
    >
      Get Started
    </Button>
  </div>
</div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10">
            <svg
              className="h-6 w-6 text-white cursor-pointer mb-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 18.707l-7.354-7.353 1.414-1.414L12 15.88l6.94-6.94 1.414 1.414L12 18.707z"
              />
            </svg>
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
            <Button auto color="black">Login</Button>
            <Button auto color="black">Sign Up</Button>
          </div>
        )}
      </nav>
    )
}

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
              quality={100}
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
              quality={100}
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
              quality={100}
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
        
        <div className="flex items-center justify-between">
          <Text>
          Whether you're an early-stage caregiver or an experienced veteran, we've got you covered. Our personalized guidebook and mentorship program are designed to meet the needs of caregivers at every stage of their journey. Plus, our user profiles allow you to connect with other caregivers who are at a similar stage, so you can learn from each other and grow together.
          </Text>
          </div>  
        
      </Section>
    </>
  );
};

export default IndexPage;