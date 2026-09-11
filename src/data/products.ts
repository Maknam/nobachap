export type Product = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  alt: string;
  specifications: string[];
  estimatedPrice?: number;
  delivery?: string;
  deposit?: string;
  availability: string;
  demo: boolean;
};
// Illustrative request ideas, not confirmed inventory or manufacturer specifications.
export const products: Product[] = [
  {
    slug: "family-fridge-freezer",
    name: "Family fridge freezer",
    category: "refrigeration",
    brand: "Brand to be confirmed",
    image: "/images/products/fridge.svg",
    alt: "Illustration of a silver two-door fridge freezer",
    specifications: [
      "Two-door design",
      "Separate freezer",
      "Capacity to suit your household",
    ],
    availability: "Sourced on request",
    demo: true,
  },
  {
    slug: "smart-television",
    name: "Living-room smart TV",
    category: "entertainment",
    brand: "Brand to be confirmed",
    image: "/images/products/television.svg",
    alt: "Illustration of a slim television on a warm cream background",
    specifications: [
      "Smart TV options",
      "Screen size of your choice",
      "Connectivity confirmed with your quote",
    ],
    availability: "Sourced on request",
    demo: true,
  },
  {
    slug: "front-load-washer",
    name: "Front-load washing machine",
    category: "laundry",
    brand: "Brand to be confirmed",
    image: "/images/products/washer.svg",
    alt: "Illustration of a white front-load washing machine",
    specifications: [
      "Front-loading design",
      "Capacity matched to your needs",
      "Wash programmes confirmed with your quote",
    ],
    availability: "Sourced on request",
    demo: true,
  },
];
