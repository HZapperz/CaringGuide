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
  { 
    value: Category.GENERAL, 
    label: "General", 
    defaultImage: "/articleimgs/general_default.png",
    description: "General resources for a variety of needs and situations."
  },
  { 
    value: Category.PHYSICAL, 
    label: "Physical", 
    defaultImage: "/articleimgs/physical_default.png",
    description: "Resources focused on physical health and well-being."
  },
  { 
    value: Category.EMOTIONAL, 
    label: "Emotional", 
    defaultImage: "/articleimgs/emotional_default.jpg",
    description: "Support for emotional health and building mental resilience."
  },
  { 
    value: Category.HOME_CARE, 
    label: "Home Care", 
    defaultImage: "/articleimgs/homecare_default.jpg",
    description: "Home care resources for maintaining a safe and supportive environment."
  },
  { 
    value: Category.FINANCIAL_LEGAL, 
    label: "Financial/Legal", 
    defaultImage: "/articleimgs/financial_legal_default.jpg",
    description: "Financial and legal guidance for navigating challenges and planning for the future."
  },
];


export const getCategoryLabel = (category: string) => {
  const categoryLabel = categoryLabels.find((c) => c.value === category);
  return categoryLabel?.label;
};

