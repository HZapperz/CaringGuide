import { useState, useEffect } from "react";
import { Loading, Text } from "@nextui-org/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import FeedCard from "@/components/feed";
import { WithOnBoarding } from "@/components/WithOnboarding";
import useHandleErrors from "@/hooks/useHandleErrors";
import { Resources } from "@prisma/client";
import { categoryLabels } from "@/utils/enumToLabel";
import { ICategory } from "@/types/category";
import CategoryCard from "@/components/category/category-card";

const Feedpage = () => {
  const [loader, setLoader] = useState(false);
  const [resources, setResources] = useState<Resources[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategory["value"]>("ALL");
  const handleErrors = useHandleErrors();

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
  console.log(selectedCategory);

  return (
    <main className="h-full bg-white">
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-between w-full p-6 pb-0 bg-slate-50">
          <h1 className="mb-0 text-3xl text-center md:text-4xl md:text-left">
            Resources Categories
          </h1>
          <button
            onClick={() => setSelectedCategory("ALL")}
            className="px-4 py-2 text-sm text-white bg-green-900 border-2 border-green-900 rounded-xl h-fit hover:bg-green-800"
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6 overflow-x-auto no-scrollbar bg-slate-50">
          {categoryLabels.map((category) => (
            <CategoryCard
              key={category.label}
              {...category}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 p-8 mx-auto lg:grid-cols-2 max-w-7xl">
          {resources
            .sort((a: any, b: any) => {
              const netLikesA = a.favoritedBy.reduce(
                (count: number, obj: any) => {
                  return (
                    count + (obj.isLiked ? 1 : 0) - (obj.isDisliked ? 1 : 0)
                  );
                },
                0
              );

              const netLikesB = b.favoritedBy.reduce(
                (count: number, obj: any) => {
                  return (
                    count + (obj.isLiked ? 1 : 0) - (obj.isDisliked ? 1 : 0)
                  );
                },
                0
              );

              return netLikesB - netLikesA;
            })
            .filter((resources) => {
              if (selectedCategory === "ALL") return true;
              return resources.category === selectedCategory;
            })
            .map((resource, index) => (
              <FeedCard key={index} data={resource} />
            ))}
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
