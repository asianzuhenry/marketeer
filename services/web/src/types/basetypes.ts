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
  id: number;
  username: string;
  email: string;
  password?: string;
  accountType: "buyer" | "seller";
  phoneNumber?: string;
};

export type { Product, User };