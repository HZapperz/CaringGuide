import { Disease, Category } from "@prisma/client";

export const diseaseLabels = [
  { value: Disease.ALS, label: "Als" },
  { value: Disease.ALZHEIMER, label: "Alzheimer Disease" },
  { value: Disease.MYELOMA, label: "Multiple Myeloma" },
  { value: Disease.PARKINSON, label: "Parkinson Disease" },
  { value: Disease.STROKE, label: "Stroke" },
];

export const getDiseaseLabel = (disease: Disease) => {
  const diseaseLabel = diseaseLabels.find((d) => d.value === disease);
  return diseaseLabel;
};

export const categoryLabels = [
  { value: Category.SCIENTIFIC_JOURNAL, label: "Scientific Journal" },
  { value: Category.SUPPORT_GROUP, label: "Support Group" },
  { value: Category.NON_PROFIT, label: "Non Profit" },
  { value: Category.PRODUCT, label: "Product" },
  { value: Category.WEBSITE, label: "Website" },
  { value: Category.ARTICLE, label: "Article" },
];

export const getCategoryLabel = (category: Category) => {
  const categoryLabel = categoryLabels.find((c) => c.value === category);
  return categoryLabel;
};
