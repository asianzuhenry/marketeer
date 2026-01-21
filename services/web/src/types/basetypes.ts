type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  status?: "Instock" | "Outofstock";
  otherImages?: string[];
};
export type { Product };
