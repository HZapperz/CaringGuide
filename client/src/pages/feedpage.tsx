import * as React from "react";
import { useState } from "react";
import { Navbar, Text, Image, Button, Input } from "@nextui-org/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import links from "../assets/links";
import FeedCard from "@/components/feed";

const Feedpage = () => {
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const a11yProps = (index: number) => {
    return {
      "id": `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };
  const filters = [
    "All",
    "Scientific Journal",
    "Support Group",
    "Non-Profit",
    "Product",
    "Website",
    "Article",
  ];
  const tabLabels = [
    "general",
    "finances",
    "eol",
    "informal",
    "physical",
    "emotion",
  ];

  const handleButtonClick = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="flex lg:flex-row flex-col justify-start items-start">
        <div className="lg:w-fit w-full p-6">
          <Text className="text-center font-poppins text-[30px] font-[500]">
            FILTERS
          </Text>
          <hr />
          <div className="lg:grid grid-col-6 gap-2 flex w-full overflow-x-auto mt-4">
            {filters.map((label) => (
              <button
                type="button"
                key={label}
                className={`flex justify-center items-center px-4 py-2 mb-0 mr-2 lg:mb-2 lg:mr-0 border min-w-fit w-48 border-gray-300 rounded-full transition bg-transparent cursor-pointer relative ${
                  selected.includes(label) ? " border-2 border-[#114d38]" : ""
                }`}
                onClick={() => handleButtonClick(label)}
              >
                {label}
                <div className="ml-2 w-5">
                  {!selected.includes(label) ? <PlusIcon /> : <XMarkIcon />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-screen-5xl grid grid-cols-1 2xl:grid-cols-2 gap-4 p-8">
          {links.map((item, index) => {
            if (
              selected.includes(item.sub) &&
              item.category === tabLabels[value]
            ) {
              return <FeedCard key={index} data={item} />;
            } else if (selected.includes("All")) {
              return <FeedCard key={index} data={item} />;
            }
            return null;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feedpage;
