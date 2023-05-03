import { Parallax } from "react-parallax";
import { Button } from "@nextui-org/react";
import Typing from "./typing";

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

export default ParallaxSection;
