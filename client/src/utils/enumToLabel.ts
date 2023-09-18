import { Disease, Category } from "@prisma/client";

export const diseaseLabels = [
  { value: Disease.ALS, label: "ALS" },
  { value: Disease.ALZHEIMER, label: "Alzheimer Disease" },
  { value: Disease.MYELOMA, label: "Multiple Myeloma" },
  { value: Disease.PARKINSON, label: "Parkinson Disease" },
  { value: Disease.STROKE, label: "Stroke" },
];

export const getDiseaseLabel = (disease: string | null) => {
  if (!disease) return null;
  const diseaseLabel = diseaseLabels.find((d) => d.value === disease);
  return diseaseLabel?.label || null;
};

export const categoryLabels = [
  { value: Category.GENERAL, label: "General", defaultImage: "/articleimgs/general_default.png" },
  { value: Category.PHYSICAL, label: "Physical", defaultImage: "/articleimgs/physical_default.png" },
  { value: Category.EMOTIONAL, label: "Emotional", defaultImage: "/articleimgs/emotional_default.jpg" },
  { value: Category.HOME_CARE, label: "Home Care", defaultImage: "/articleimgs/homecare_default.jpg" },
  { value: Category.FINANCIAL_LEGAL, label: "Financial/Legal", defaultImage: "/articleimgs/financial_legal_default.jpg" },
];


export const getCategoryLabel = (category: string) => {
  const categoryLabel = categoryLabels.find((c) => c.value === category);
  return categoryLabel?.label;
};

