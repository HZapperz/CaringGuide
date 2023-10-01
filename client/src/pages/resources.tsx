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
import { useRouter } from "next/router";
import ArticlesCard from "@/components/articlesCard";

const Feedpage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [resources, setResources] = useState<Resources[]>([]);
  const handleErrors = useHandleErrors();

  const initialCategory = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category || "ALL";

  const [selectedCategory, setSelectedCategory] =
    useState<ICategory["value"]>(initialCategory);

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

  const handleReturnClick = () => {
    router.push("/dashboard");
  };

  return (
    <main className="h-full bg-white">
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-between w-full p-6 pb-0 bg-slate-50">
          <h1 className="mb-0 text-3xl text-center md:text-4xl md:text-left">
            {selectedCategory === "ALL"
              ? "Resource Categories"
              : categoryLabels.find(
                  (category) => category.value === selectedCategory,
                )?.label || selectedCategory}
          </h1>

          {selectedCategory !== "ALL" ? (
            <button
              onClick={handleReturnClick}
              className="px-4 py-2 text-sm text-white bg-red-600 border-2 border-red-600 rounded-xl h-fit hover:bg-red-500 button-hover"
            >
              Return
            </button>
          ) : (
            <button
              onClick={() => setSelectedCategory("ALL")}
              className="px-4 py-2 text-sm text-white bg-green-900 border-2 border-green-900 rounded-xl h-fit hover:bg-green-800"
            >
              Show All
            </button>
          )}
        </div>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6 overflow-x-auto no-scrollbar bg-slate-50">
          {categoryLabels.map((category) => (
            <CategoryCard
              key={category.label}
              {...category}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-4 overflow-auto min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 p-8 mx-auto">
          {resources
            .sort()
            .filter((resource) => {
              if (selectedCategory === "ALL") return true;
              return resource.category === selectedCategory;
            })
            .map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-center sm:w-full mx-4"
              >
                <ArticlesCard
                  key={`${resource.id}-${selectedCategory}`}
                  resource={resource}
                />
              </div>
            ))}
          ``
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
