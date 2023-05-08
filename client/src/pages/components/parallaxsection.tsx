import { Parallax } from "react-parallax";
import { Button } from "@nextui-org/react";
import Typing from "./typing";

const ParallaxSection = () => {
  return (
    <Parallax bgImage="/images/whistler-hike.jpeg" strength={500}>
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
        <div className="bg-caring px-10 py-64 flex-1 ml-40 mt-96 mr-40" >
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="flex items-center justify-between">
            <button
              color="grey"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight - 90,
                  behavior: "smooth",
                })
              }
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Learn More
            </button>
            <button color="secondary"  className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Get Started
            </button>
          </div>
          
        </div>
        <hr className="w-96 h-1 mx-auto bg-gray-100 border-0 rounded ml-84 mb-4 mt-4"/>
        </div> 
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
