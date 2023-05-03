import { Text, Image, Col, Card } from "@nextui-org/react";

import Section from "./components/section";
import ParallaxSection  from "./components/parallaxsection";
import Footer from "./components/footer";
import Nav from "./components/nav";

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
      <Section title="Section 2" id="section-2" style={{margin: '0 10%'}}>
        <div className="flex items-center justify-between">
          <Text style={{textAlign: 'center'}}>
            Whether you&apos;re an early-stage caregiver or an experienced veteran,
            we&apos;ve got you covered. Our personalized guidebook and mentorship
            program are designed to meet the needs of caregivers at every stage
            of their journey. Plus, our user profiles allow you to connect with
            other caregivers who are at a similar stage, so you can learn from
            each other and grow together.
          </Text>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default IndexPage;
