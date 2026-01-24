import { Link } from "react-router-dom";
import { products } from "../../data/products";

export const SellerDashboardPage = () => {
  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mt-10">Seller Dashboard</h1>
      <p className="text-center mt-4">
        Welcome to your seller dashboard. Here you can manage your products and
        view sales statistics.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 px-4">
        <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">
            {products.length}
          </strong>{" "}
          Products
        </div>
        <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">4</strong> Orders
        </div>
        <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
          <Link to="/add-product">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Product
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow-md m-4 text-3xl text-gray-600">
        {/* seller products go here */}
        <h2 className="text-2xl font-bold mb-4">Your Products</h2>
        <hr className="mb-4 border-gray-300 border-b-2" />
        <div>
          {products.map((product, index) => (
            <div
              key={index}
              className="border-b hover:bg-gray-50 hover:cursor-pointer px-2 py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-black">
                  {product.name}
                </h3>
                <p className="text-gray-600">UGX: {product.price}</p>
              </div>
              <div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
