import Image from "next/image";
import home1 from "../../public/images/Home1.png";
import faq1 from "../../public/images/faq1.png";
import faq2 from "../../public/images/faq2.png";
import faq3 from "../../public/images/faq3.png";
import Nav from "../components/nav";
import HomeStats from "../components/homeStats";
import people from "../../public/svgs/people.svg";
import care from "../../public/svgs/care.svg";
import crowd from "../../public/svgs/crowd.svg";
import time from "../../public/svgs/time.svg";
import handShake from "../../public/images/handShake.png";
import think from "../../public/images/think.png";
import doc from "../../public/images/doc.png";
import brains from "../../public/svgs/brain.svg";
import shield from "../../public/svgs/shield.svg";
import bookmark from "../../public/svgs/bookmark.svg";
import FAQComp from "../components/faqComp";
import { Grid } from "@nextui-org/react";
import { SocialIcon } from "react-social-icons";
import logo from "../../public/images/Caring-Guide-logo-horiz-color.png";

const Home = () => {
  const list = [
    {
      image: people,
      lText: "41.8",
      sText: "Million",
      para: "Americans provided care to an adult over 50 in 2020",
    },
    {
      image: care,
      lText: "16.6%",
      sText: null,
      para: "of Americans provide care to adults with a disability or illness",
    },
    {
      image: time,
      lText: "23.7",
      sText: "Hours Per Week",
      para: "on average spent providing care for loved ones not lived with",
    },
    {
      image: crowd,
      lText: "89%",
      sText: null,
      para: "of caregivers provide care for a relative or other loved one",
    },
  ];

  const info = [
    {
      src: handShake,
      heading: "Our Verification Process",
      para: `We take the safety and security of our users very seriously.
              That's why all of our guides go through a rigorous verification
              process before they are officially approved. This includes
              background checks, reference checks, and personal interviews. You
              can rest assured that you're in good hands with Caring Guide.`,
    },
    {
      src: think,
      heading: "Personalized Guidebook of Resources",
      para: `Our personalized guidebook covers a wide range of resource categories, including Physical, Emotional/Mental, Financial, Housing, Spiritual, End of Life, and General. This comprehensive approach ensures that caregivers have access to the support they need, when they need it. Plus, our mentorship program provides personalized guidance and support tailored to your unique situation.`,
    },
    {
      src: doc,
      heading: "Connect with a Personal Guide",
      para: `At Caring Guide, we understand that caregiving can be overwhelming and stressful. That's why we connect caregivers with a personal mentor who provides emotional and practical support throughout their caregiving journey.`,
    },
  ];

  const faqs = [
    {
      image: brains,
      question: "How do I find the best guide for me?",
    },
    {
      image: shield,
      question: "How are to guide verified?",
    },
    {
      image: bookmark,
      question: "How can I find more resources?",
    },
  ];
  return (
    <div className="bg-white">
      <Nav />
      <main>
        <div className="relative inline-block overflow-hidden w-full px-1 bg-white">
          <div>
            <Image src={home1} alt="Your Image" className="w-full" />
            <div className="absolute bottom-0 left-1 right-1 top-0 bg-black opacity-50 rounded-b-[16px] lg:rounded-b-[48px]"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 rounded-lg flex items-center w-[80%] lg:w-[70%] xl:w-[50%] p-10 lg:p-20">
            <div className="p-4 rounded-bl-lg rounded-br-lg">
              <p className="text-white font-poppins font-bold text-3xl lg:text-5xl xl:text-7xl tracking-normal text-left leading-[2rem] lg:leading-[4rem] xl:leading-[6rem]">
                Foster Connections Find Your Way
              </p>
              <p className="text-white font-poppins font-medium text-2xl lg:text-3xl tracking-normal text-left leading-[4rem]">
                Find a Guide Today
              </p>
              <button
                type="button"
                className="flex justify-between items-center bg-caring text-white px-4 py-2 lg:px-8 lg:py-6 mt-2 rounded-lg font-poppins font-medium text-3xl tracking-normal text-left w-80"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full p-16 flex justify-center items-center">
          {list && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-2">
              {list.map((item, index) => (
                <HomeStats
                  key={index}
                  image={item.image}
                  lText={item.lText}
                  sText={item.sText}
                  para={item.para}
                />
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 gap-y-20 p-16">
          {info.map((item, index) => (
            <>
              <div
                className={
                  "flex justify-center items-center" +
                  (index % 2 === 0 ? " hidden" : "")
                }
              >
                <Image
                  src={item.src}
                  alt=""
                  className="rounded-xl w-[60%] h-[400px] xl:w-[90%] xl:h-[450px]"
                />
              </div>
              <div key={index}>
                <div className="text-start font-poppins text-[35px] font-medium text-[#245B48]">
                  {item.heading}
                </div>
                <div className="text-black font-poppins text-[22px] font-normal">
                  {item.para}
                </div>
              </div>
              <div
                className={
                  "flex justify-center items-center" +
                  (index % 2 === 0 ? "" : " hidden")
                }
              >
                <Image
                  src={item.src}
                  alt=""
                  className="rounded-xl w-[60%] h-[400px] xl:w-[90%] xl:h-[450px]"
                />
              </div>
            </>
          ))}
        </div>
        <div>
          <div className="relative inline-block overflow-hidden w-full bg-white">
            <div>
              <div className="flex w-full">
                <Image src={faq1} alt="Your Image" className="w-[33%]" />
                <Image src={faq2} alt="Your Image" className="w-[34%]" />
                <Image src={faq3} alt="Your Image" className="w-[33%]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-50"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-0 rounded-lg flex flex-col items-center justify-center p-6 overflow-auto">
              <h1 className="text-white text-center font-poppins text-[30px] xl:text-[40px] mt-64 md:mt-20  lg:mt-0 font-semibold">
                Frequently Asked Questions
              </h1>
              {faqs.map((items, index) => (
                <FAQComp
                  key={index}
                  image={items.image}
                  question={items.question}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="text-gray-700 text-center font-poppins text-[40px] font-medium mb-4">
            Contact Us
          </div>
          <hr className="bg-[#ECEEED] border-[#ECEEED]" />
        </div>
        <div className="flex justify-center pl-12 pr-12">
          <Grid.Container gap={2} justify="center" css={{ p: "$1" }}>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white">
                <Image src={logo} alt="logo" />
                <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                  +1 (123)456-7890
                </p>
                <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                  help@caringguide.org
                </p>
              </div>
            </Grid>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white">
                <div className="flex flex-col">
                  <SocialIcon
                    url="https://twitter.com/caringguide"
                    style={{ height: 50, width: 50, marginBottom: 10 }}
                  />
                  <SocialIcon
                    url="https://www.facebook.com/profile.php?id=100090495821344"
                    style={{ height: 50, width: 50, marginBottom: 10 }}
                  />
                  <SocialIcon
                    url="https://www.instagram.com"
                    style={{ height: 50, width: 50, marginBottom: 10 }}
                  />
                  <SocialIcon
                    url="https://www.linkedin.com"
                    style={{ height: 50, width: 50, marginBottom: 10 }}
                  />
                </div>
              </div>
            </Grid>
            <Grid
              xs
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <div className="max-w-sm p-3 bg-white">
                <p className="mb-3 text-xl font-bold text-slate-600 dark:text-gray-800">
                  General
                </p>
                <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                  Privacy Policy
                </p>
                <p className="mb-3 text-xl font-medium text-slate-600 dark:text-gray-800">
                  Terms of Use
                </p>
              </div>
            </Grid>
          </Grid.Container>
        </div>
      </main>
    </div>
  );
};

export default Home;
