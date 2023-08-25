import { useState, useEffect } from "react";
import { Loading, Text } from "@nextui-org/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import FeedCard from "@/components/feed";
import { WithOnBoarding } from "@/components/WithOnboarding";
import useHandleErrors from "@/hooks/useHandleErrors";
import { Resources } from "@prisma/client";

const Feedpage = () => {
  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const [resources, setResources] = useState<Resources[]>([]);
  const [selected, setSelected] = useState<string[]>(["All"]);
  const handleErrors = useHandleErrors();

  const filters = [
    "All",
    "Scientific Journal",
    "Support Group",
    "Non-Profit",
    "Product",
    "Website",
    "Article",
  ];
  const handleButtonClick = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const getAllResources = async () => {
    setLoader(true);
    try {
      const response = await fetch("/api/resources", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResources(data);
    } catch (error) {
      handleErrors(error);
    }
    setLoader(false);
  };

  console.log(resources);

  useEffect(() => {
    getAllResources();
  }, []);

  if (loader)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );

  return (
    <main className="h-full bg-white">
      <div className="flex flex-col items-start justify-start lg:flex-row">
        <div className="w-full p-6 lg:w-fit">
          <Text className="text-center font-poppins text-[30px] font-[500]">
            FILTERS
          </Text>
          <hr />
          <div className="flex w-full gap-2 mt-4 overflow-x-auto lg:grid grid-col-6">
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
                <div className="w-5 ml-2">
                  {!selected.includes(label) ? <PlusIcon /> : <XMarkIcon />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-8 2xl:grid-cols-2">
          {resources.map((resource, index) => {
            if (
              selected.find(
                (s) => s.toLowerCase() === resource.category.toLowerCase()
              )
            ) {
              return <FeedCard key={index} data={resource} />;
            } else if (selected.includes("All")) {
              return <FeedCard key={index} data={resource} />;
            }

            return null;
          })}
        </div>
      </div>
    </main>
  );
};

export default function Page() {
  return (
    <WithOnBoarding>
      <Feedpage />
    </WithOnBoarding>
  );
}
