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
  { value: Category.GENERAL, label: "General" },
  { value: Category.PHYSICAL, label: "Physical" },
  { value: Category.EMOTIONAL, label: "Emotional" },
  { value: Category.HOME_CARE, label: "Home Care" },
  { value: Category.FINANCIAL_LEGAL, label: "Financial/Legal" },
  { value: Category.END_OF_LIFE, label: "End of Life" },
];

export const getCategoryLabel = (category: Category) => {
  const categoryLabel = categoryLabels.find((c) => c.value === category);
  return categoryLabel;
};
