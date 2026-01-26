import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/basetypes";

const environment = import.meta.env.VITE_ENVIRONMENT;

export const AddProduct = () => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
    otherImages: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Get auth token from localStorage (adjust this based on where you store it)
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError("You must be logged in to add a product");
      setLoading(false);
      return;
    }

    // Determine API URL based on environment
    const apiUrl = environment === "development" 
      ? "http://localhost:3000/api/products"
      : "https://marketeer.onrender.com/api/products";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          image: formData.image,
          price: parseFloat(formData.price) || 0,
          category: formData.category,
          otherImages: formData.otherImages 
            ? (typeof formData.otherImages === 'string' 
                ? formData.otherImages.split(',').map(url => url.trim()) 
                : formData.otherImages)
            : [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      console.log("Product added successfully:", data.message);
      
      // Navigate to products page or dashboard
      navigate("/products");
      
    } catch (error) {
      console.error("Add product failed:", error);
      setError(error instanceof Error ? error.message : "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mt-10">Add Product</h1>
      <p className="text-center mt-4">
        Fill in the details below to add a new product.
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 w-full lg:w-[80%]">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow-md m-4 w-full lg:w-[80%]">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price (UGX) *
            </label>
            <input
              type="number"
              id="price"
              required
              min="0"
              step="0.01"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter price in UGX"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category *
            </label>
            <input
              type="text"
              id="category"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product category eg. Electronics, Clothing, etc."
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="otherimages"
              className="block text-gray-700 font-bold mb-2"
            >
              Other Images (Optional)
            </label>
            <input
              type="text"
              id="otherimages"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter other image URLs (comma separated)"
              value={formData.otherImages}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  otherImages: e.target.value,
                }))
              }
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};