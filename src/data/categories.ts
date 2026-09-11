export type Category = {
  id: string;
  name: string;
  description: string;
  icon: "fridge" | "tv" | "washer" | "fan" | "cooking" | "small" | "home";
};
export const categories: Category[] = [
  {
    id: "refrigeration",
    name: "Refrigerators & freezers",
    description: "Fresh food storage, from compact fridges to family freezers.",
    icon: "fridge",
  },
  {
    id: "entertainment",
    name: "Televisions & entertainment",
    description: "Smart TVs, sound systems and home entertainment.",
    icon: "tv",
  },
  {
    id: "laundry",
    name: "Washing machines & laundry",
    description: "Washing machines and practical laundry essentials.",
    icon: "washer",
  },
  {
    id: "cooling",
    name: "Air conditioners & fans",
    description: "Cooling options to make your space more comfortable.",
    icon: "fan",
  },
  {
    id: "kitchen",
    name: "Kitchen appliances",
    description: "Cookers, microwaves and everyday kitchen companions.",
    icon: "cooking",
  },
  {
    id: "small-appliances",
    name: "Small appliances",
    description: "Blenders, kettles, irons and useful everyday helpers.",
    icon: "small",
  },
  {
    id: "accessories",
    name: "Home accessories",
    description: "The thoughtful extras that help your home work better.",
    icon: "home",
  },
];
export function getCategoryName(id: string) {
  return (
    categories.find((category) => category.id === id)?.name ?? "Other appliance"
  );
}
