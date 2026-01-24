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

type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  accountType: "buyer" | "seller" | "admin";
  phoneNumber?: string;
};

export type { Product, User };