import { Link } from "react-router-dom";
import type { Product } from "../types/basetypes";

export const ProductCard = ({ product, setProductIndex, index }: { product: Product, setProductIndex: (index: number) => void, index: number }) => {

  const setIndex = () => {
    setProductIndex(index);
  };
  return (
    <div className="bg-white hover:bg-gray-100 hover:cursor-pointer hover:scale-105 transition-transform duration-300 p-4 rounded shadow-md shadow-blue-500 w-96 m-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-md mb-2"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold">UGX: {product.price}</p>
      <p className="text-gray-700 mb-2">Category: {product.category}</p>
      <div className="flex justify-center gap-12">
        <button className="mt-4 hover:cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
        <Link to="/productdetails" state={{ productIndex: index }} onClick={() => setIndex()}>
          <button className="mt-4 ml-2 cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
