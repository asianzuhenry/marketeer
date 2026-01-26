
type Product = {
  _id?: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  status?: "Instock" | "Outofstock";
  otherImages?: string[] | string;
  seller?: string
};

type User = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  accountType: "buyer" | "seller" | "admin";
  phoneNumber?: string;
};

export type { Product, User };