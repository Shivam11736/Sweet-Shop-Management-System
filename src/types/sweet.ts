export interface Sweet {
  id: string;
  name: string;
  category: SweetCategory;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

export type SweetCategory = 
  | "chocolate"
  | "gummy"
  | "lollipop"
  | "caramel"
  | "mint"
  | "fruit"
  | "other";

export const CATEGORY_COLORS: Record<SweetCategory, string> = {
  chocolate: "chocolate",
  gummy: "strawberry",
  lollipop: "blueberry",
  caramel: "caramel",
  mint: "mint",
  fruit: "lemon",
  other: "secondary",
} as const;

export const CATEGORY_LABELS: Record<SweetCategory, string> = {
  chocolate: "Chocolate",
  gummy: "Gummy",
  lollipop: "Lollipop",
  caramel: "Caramel",
  mint: "Mint",
  fruit: "Fruit",
  other: "Other",
};
