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

  return (
    <main className="h-full bg-white">
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-between w-full p-6 pb-0 bg-slate-50">
          <h1 className="mb-0 text-3xl text-center md:text-4xl md:text-left">
            {selectedCategory === "ALL"
              ? "Resources Categories"
              : selectedCategory}
          </h1>

          {selectedCategory !== "ALL" ? (
            <button
              onClick={() => setSelectedCategory("ALL")}
              className="px-4 py-2 text-sm text-white bg-red-600 border-2 border-red-600 rounded-xl h-fit hover:bg-red-500"
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

        {selectedCategory === "ALL" && (
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6 overflow-x-auto no-scrollbar bg-slate-50">
            {categoryLabels.map((category) => (
              <CategoryCard
                key={category.label}
                {...category}
                setSelectedCategory={setSelectedCategory}
              />
            ))}
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-4 p-8 mx-auto ${
            selectedCategory !== "ALL"
              ? "max-w-full"
              : "lg:grid-cols-2 max-w-7xl"
          }`}
        >
          {resources
            .sort()
            .filter((resource) => {
              if (selectedCategory === "ALL") return true;
              return resource.category === selectedCategory;
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
