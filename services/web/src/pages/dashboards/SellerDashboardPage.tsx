import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../../types/basetypes";
import { useNavigate } from "react-router-dom";

const environment = import.meta.env.VITE_ENVIRONMENT;

export const SellerDashboardPage = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch products only once when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem('token');
    
    if (!token) {
      setError("You must be logged in to view your products");
      setLoading(false);
      // navigate("/signin");
      return;
    }

    // Determine API URL based on environment
    const apiUrl =
      environment === "development"
        ? "http://localhost:3000/api/products/my/products"
        : "https://marketeer.onrender.com/api/products/my/products";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      console.log("Products fetched successfully:", data);
      
      // The backend returns { message, count, products }
      setProductsList(data.products || []);

    } catch (error) {
      console.error("Fetch products failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch products",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const token = localStorage.getItem('authToken');
    const apiUrl =
      environment === "development"
        ? `http://localhost:3000/api/products/${productId}`
        : `https://marketeer.onrender.com/api/products/${productId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      // Remove product from list
      setProductsList(prev => prev.filter(p => p._id !== productId));
      alert("Product deleted successfully");

    } catch (error) {
      console.error("Delete product failed:", error);
      alert(error instanceof Error ? error.message : "Failed to delete product");
    }
  };

  const handleEdit = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mt-10">Seller Dashboard</h1>
      <p className="text-center mt-4">
        Welcome to your seller dashboard. Here you can manage your products and
        view sales statistics.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 px-4">
        <div className="bg-white p-6 rounded shadow-md text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">
            {productsList.length}
          </strong>{" "}
          Products
        </div>
        <div className="bg-white p-6 rounded shadow-md text-3xl text-gray-600">
          <strong className="text-6xl text-black font-bold">0</strong> Orders
        </div>
        <div className="bg-white p-6 rounded shadow-md flex items-center justify-center">
          <Link to="/add-product">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-md m-4">
        <h2 className="text-2xl font-bold mb-4">Your Products</h2>
        <hr className="mb-4 border-gray-300 border-b-2" />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="w-full p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : productsList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-xl">No products yet</p>
            <p className="mt-2">Click "Add Product" to create your first product</p>
          </div>
        ) : (
          <div>
            {productsList.map((product) => (
              <div
                key={product._id}
                className="border-b hover:bg-gray-50 px-2 py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-black">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">UGX {product.price?.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(product._id!)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id!)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};