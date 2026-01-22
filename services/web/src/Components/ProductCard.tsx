import { Link } from "react-router-dom";
import type { Product } from "../types/basetypes";

interface ProductCardProps {
  product: Product;
  setProductIndex: (index: number) => void;
  index: number;
  cartItems: number[]; // Assuming product IDs are numbers; adjust type as needed
  setCartItems: (items: number[]) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setProductIndex,
  index,
  cartItems,
  setCartItems,
}) => {
  const setIndex = () => {
    setProductIndex(index);
  };
  return (
    <div className="bg-white hover:bg-gray-100 hover:cursor-pointer hover:scale-105 transition-transform duration-300 p-4 rounded shadow-md shadow-blue-500 w-96 m-4 sm:m-0">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-md mb-2"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold">UGX: {product.price}</p>
      <div className="flex flex-col">
        <p className="text-gray-700 mb-2">Category: {product.category}</p>
        {product.status === "Instock" ? (
          <p className="text-green-700">{product.status}</p>
        ) : (
          <p className="text-red-700">{product.status}</p>
        )}
      </div>
      <div className="flex justify-center gap-12">
        {product.status === "Instock" ? (
          <button
            className="mt-4 hover:cursor-pointer bg-blue-700 text-white min-h-12 min-w-12 px-6 py-3 text-base rounded hover:bg-blue-600"
            onClick={() => setCartItems([...cartItems, product.id])}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="mt-4 cursor-not-allowed bg-gray-400 text-white min-w-12 px-6 py-3 text-base rounded"
            disabled
          >
            Out of Stock
          </button>
        )}
        <Link
          to="/productdetails"
          state={{ productIndex: index }}
          onClick={() => setIndex()}
        >
          <button className="mt-4 ml-2 cursor-pointer bg-green-700 inline-flex items-center justify-center text-white min-h-12 min-w-12 px-6 py-3 text-base rounded hover:bg-green-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
