import { Text, Image, Col, Card } from "@nextui-org/react";

import Section from "./components/section";
import ParallaxSection  from "./components/parallaxsection";
import Footer from "./components/footer";
import Nav from "./components/nav";

const HomePage = () => {
    return (
    
      <>
<Section title="Mentor Display/Journal/Article">
        <div className="flex">
          <div className="w-1/2">
            <div
              className="bg-white shadow-lg rounded-lg text-center mx-2 flex"
              style={{
                justifyContent: "flex-start",
                alignSelf: "flex-start",
              }}
            >
              <div className="w-1/4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Mentor Image 1"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-3/4 px-4 py-2">
                <h2 className="text-xl font-bold">Mentor Name 1</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada ante eget dui sodales, auctor
                  ullamcorper leo lacinia. Phasellus eu mi neque. Donec
                  sollicitudin lacus eget nunc egestas, quis venenatis odio
                  vestibulum
                </p>
              </div>
            </div>
            <div
              className="bg-white shadow-lg rounded-lg text-center mx-2 flex flex-col"
              style={{ width: "97.5%", marginTop: "2rem", height: "300px" }}
            >
              <h2 className="text-xl font-bold mb-2 py-2">Favorited Articles</h2>
              <div className="flex justify-center py-7">
                <div className="mx-2">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Article 1"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <p className="mt-1 font-bold">Article Title 1</p>
                </div>
                <div className="mx-2">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Article 2"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <p className="mt-1 font-bold">Article Title 2</p>
                </div>
                <div className="mx-2">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Article 3"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <p className="mt-1 font-bold">Article Title 3</p>
                </div>
                <div className="mx-2">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Article 4"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <p className="mt-1 font-bold">Article Title 4</p>
                </div>
                <div className="mx-2">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Article 5"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <p className="mt-1 font-bold">Article Title 5</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div
              className="bg-white shadow-lg rounded-lg text-center mx-2 flex "
              style={{ height: "500px" }}
            >
              <div className="flex-col justify-center w-full h-full py-2">
                <h2 className="text-xl font-bold">Journal</h2>
                <div
                  className="w-full h-full flex flex-col px-4"
                  style={{ height: "calc(97% - 2rem)" }}
                >
                  <textarea
                    className="w-full h-full border border-gray-400 p-2"
                    style={{ boxSizing: "border-box", resize: "none" }}
                    placeholder="Enter Text Here"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      </>
    );
};

export default HomePage;
