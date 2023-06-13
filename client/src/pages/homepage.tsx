import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Text, Image, Col, Card } from "@nextui-org/react";

import Section from "./components/section";
import ParallaxSection from "./components/parallaxsection";
import Footer from "./components/footer";
import Nav from "./components/nav";
import pfp from "./tempimages/profile-picture.jpg";
import articles from "./api/articlesData";
import journal from "./api/journalData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";


const HomePage = () => {
  const router = useRouter();
  const [preclickedButton, setPreclickedButton] = useState(false);

  const handleNewEntryClick = () => {
    router.push({
      pathname: "/journalpage",
      query: { preclickedButton: true },
    });
  };

  return (
    <>
      {/*Full Page Div*/}
      <div className="w-max-11/12 flex m-8" style={{ height: "755px" }}>
        {/* Account/Mentor Div */}
        <div className="w-[25%] h-full">
          {/* Account Rectangle */}
          <div className="border border-gray-300 border-2 rounded-xl flex items-center m-1 p-1 mb-5">
            {/* User Profile Picture */}
            <div className="w-1/3 flex items-center justify-center m-1">
              <div
                className="rounded-full h-20 w-20 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/dashimgs/placeholder.png')`,
                }}
              ></div>
            </div>
            {/* Name/View Profile */}
            <div className="w-2/3 flex flex-col justify-center ">
              <h2 className="text-2xl ">MENTEE NAME</h2>
              <a href="/profile" className="text-gray-500 mt-[-0.75rem]">
                view my profile
              </a>
            </div>
          </div>

          {/* Mentor Profile */}
          <div className="h-5/6 border border-gray-300 border-2 rounded-xl m-1 p-4 pr-2 flex flex-col">
            <div className="text-2xl font-bold mb-4">My Mentor</div>
            {/* Mentor Profile Picture and Name/Detail */}
            <div className="flex items-center mt-[-0.5rem]">
              {/* Mentor Profile Picture */}
              <div className="w-1/3 flex m-1">
                <div
                  className="rounded-full h-20 w-20 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/dashimgs/placeholder.png')`,
                  }}
                ></div>
              </div>
              {/* Mentor Name/Detail */}
              <div className="w-2/3 flex flex-col justify-center">
                <div>
                  <h1 className="text-xl inline">MENTOR NAME</h1>
                  <p className="text-gray-400 text-xs inline ml-2">pronoun</p>
                </div>
                <div className="flex text-sm">
                  <p className="text-gray-500 text-xs mr-2">AGE</p>
                  <p className="text-xs mr-2">&middot;</p>
                  <p className="text-gray-500 text-xs">DISEASE</p>
                </div>
              </div>
            </div>
            {/* Mentor About Section */}
            <div className="mt-4">
              <h1 className="text-lg">About</h1>
              <p className="text-xs text-gray-500 mt-[-0.25rem] mr-2">
                Lorem ipsum dolor sit amet, ea mundi altera vim, eu mel munere
                legendos, vim ne eligendi repudiare consequat. Fugit molestie
                expetendis id has, vix eu malorum impedit honestatis. Te sed
                augue ubique populo, sit diceret numquam eu. Iuvaret dignissim
                sed cu, eu altera periculis eos. Duo ut aperiri epicurei, vim ne
                hinc offendit molestiae.
              </p>
            </div>
            {/* Mentor Contact Section */}
            <div className="mt-4">
              <h1 className="text-lg">Contact Information</h1>
            </div>
            {/* Contact Rectangle */}
            <div className="bg-gray-200 mt-[-.25rem] mr-2 p-2 rounded-xl">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span
                    style={{ fontSize: "0.5rem" }}
                    className="text-gray-600"
                  >
                    PHONE NUMBER
                  </span>
                </div>
                <div className="flex items-center text-sm mt-[-0.1rem]">
                  <span>INSERT-PHONE-NUMBER</span>
                </div>
                <div className="flex items-center mt-1">
                  <span
                    style={{ fontSize: "0.5rem" }}
                    className="text-gray-600"
                  >
                    EMAIL
                  </span>
                </div>
                <div className="flex items-center text-sm mt-[-0.1rem]">
                  <span>INSERT@EMAIL.COM</span>
                </div>
              </div>
            </div>
            {/* Experience Section */}
            <div className="mt-4">
              <h1 className="text-lg">Caregiving Experience</h1>
            </div>
            <div className="bg-gray-200 mt-[-.25rem] mr-2 p-2 rounded-xl text-sm">
              INSERT YEARS
            </div>
            {/* Open Profile Section */}
            <div className="mt-6 mr-2">
              <button className="w-full text-gray-600 border border-gray-300 border-2 rounded-lg py-2 px-4">
                Open Profile
              </button>
            </div>
          </div>
        </div>

        {/* Article List */}
        <div className="w-[50%] h-full w-1/4 border border-gray-300 border-2 rounded-xl m-2 mr-6 ml-6 p-4 pr-0">
          <div className="text-2xl font-bold mb-4">Favorite Articles</div>
          <div
            className="flex flex-wrap overflow-y-auto"
            style={{ maxHeight: "687px" }}
          >
            {articles.map((article, index) => (
              <div className="w-48 h-48 rounded-xl mr-5 mb-5" key={index}>
                {/* Article Image */}
                <div
                  className="h-36 w-48 bg-cover bg-center rounded-t-xl"
                  style={{
                    backgroundImage: `url(${article.image})`,
                  }}
                ></div>
                <div className="bg-gray-200 p-2 rounded-b-xl w-48 relative">
                  {/* Article Title */}
                  <h3 className="text-xs font-bold mb-1 truncate">
                    {article.title}
                  </h3>
                  {/* Article Author */}
                  <p className="text-gray-600 text-xs">{article.author}</p>
                  <div className="absolute bottom-2 right-2">
                    <FavoriteIcon style={{ fontSize: "1rem" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journal List */}
        <div className="w-[24%] h-full border border-gray-300 border-2 rounded-xl m-2 p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">Journal</div>
            <button className="text-gray-500" onClick={handleNewEntryClick}>
              <AddIcon />
            </button>
          </div>
          <div
            className="grid grid-cols-1 gap-4 overflow-y-auto"
            style={{ maxHeight: "690px" }}
          >
            {journal.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-xl"
                style={{ minHeight: "100px" }} // Adjust the height as needed
              >
                <div className="flex">
                  <h3 className="text-sm font-bold mr-2">{item.title}</h3>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <p className="text-xs mt-1 line-clamp-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
