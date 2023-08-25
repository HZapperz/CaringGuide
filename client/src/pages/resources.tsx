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

  const categories: ICategory[] = [
    {
      value: "ALL",
      label: "All",
    },
    ...categoryLabels,
  ];

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

  // if (loader)
  //   return (
  //     <div className="flex items-center justify-center w-full h-full">
  //       <Loading />
  //     </div>
  //   );

  return (
    <main className="h-full bg-white">
      <div className="flex flex-col items-start justify-start">
        <h1 className="w-full p-6 pb-0 mb-0 text-4xl text-center bg-slate-50 md:text-left">
          Resources Categories
        </h1>

        <div className="flex w-full gap-4 p-6 overflow-x-scroll no-scrollbar bg-slate-50">
          {categories.map((category) => (
            <CategoryCard
              key={category.label}
              {...category}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 p-8 mx-auto md:grid-cols-2 max-w-7xl">
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
