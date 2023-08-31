import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import welcomeBG from "../../public/images/greenhike.jpg";

type Props = {};

const WelcomePage = (props: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white text-black font-poppins flex flex-grow">
      <div className="w-1/2 bg-white flex flex-col justify-center px-8 py-16">
        <div className="text-left ml-8 mr-4">
          <div className="flex items-center">
            <h1 className="text-red-600 text-8xl md:text-7xl font-bold mb-5">
              CaringGuide
            </h1>
            <Image
              src={logo}
              alt="Your Image"
              width={60}  // Adjust as per your requirement
              height={60} // Adjust as per your requirement
              className="ml-4"
            />
          </div>
          <p className="text-4xl md:text-5xl mb-5 font-poppins">
            Find Your Greatness
          </p>
          <div className="mx-auto max-w-3/4">
            <hr className="mb-4 bg-black h-1.5 mr-8 w-1/4" />
          </div>
          <div className="mr-8 font-poppins text-[22px]">
            <p>
              An app created by caregivers, for caregivers, to provide 1-on-1
              mentorship and a personalized handbook of resources to guide you
              through your caregiving journey.
            </p>
          </div>
          <div className="mt-8 mr-8">
            <button
              onClick={() => router.push("/onboarding")}
              className="bg-[#245B48] hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg font-poppins"
            >
              Continue to onboarding
            </button>
          </div>
        </div>
      </div>
      <div className="w-2/3 h-full bg-[url('../../public/images/dirthike.jpg')] bg-no-repeat bg-cover bg-bottom"></div>
    </div>
  );
};

export default WelcomePage;
