import { Text, Image, Col, Card } from "@nextui-org/react";

import Section from "./components/section";
import ParallaxSection  from "./components/parallaxsection";
import Footer from "./components/footer";
import Nav from "./components/nav1";

const IndexPage = () => {
  return (
  
    <>
      <Nav />
      <ParallaxSection />
      <Section title="Section 1" id="section-1">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/homeimgs/trust.png"
              alt="Section 1 Image"
              width={410}
              height={410}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Our Verification Process
              </h3>
              <p className="text-gray-700 text-base">
                We take the safety and security of our users very seriously.
                That&apos;s why all of our guides go through a rigorous verification
                process before they are officially approved. This includes
                background checks, reference checks, and personal interviews.
                You can rest assured that you&apos;re in good hands with Caring
                Guide.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/homeimgs/resources.png"
              alt="Section 2 Image"
              width={410}
              height={410}
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
              src="/homeimgs/connect.png"
              alt="Section 3 Image"
              width={410}
              height={410}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Connect with a Personal Mentor
              </h3>
              <p className="text-gray-700 text-base">
                At Caring Guide, we understand that caregiving can be
                overwhelming and stressful. That&apos;s why we connect caregivers
                with a personal mentor who provides emotional and practical
                support throughout their caregiving journey.
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
