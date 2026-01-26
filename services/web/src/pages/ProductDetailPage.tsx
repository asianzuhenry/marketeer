import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types/basetypes";

const environment = import.meta.env.VITE_ENVIRONMENT;

export const ProductDetailPage = ({
  cartItems,
  setCartItems,
}: {
  cartItems: string[];
  setCartItems: (items: string[]) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  const getProduct = async (productId: string) => {
    setLoading(true);
    setError("");

    const apiUrl =
      environment === "development"
        ? `http://localhost:3000/api/products/${productId}`
        : `https://marketeer.onrender.com/api/products/${productId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product");
      }

      console.log("Product fetched successfully:", data);
      setProduct(data.product);
    } catch (error) {
      console.error("Fetch product failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch product",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product?._id) {
      // Store product ID in cart
      setCartItems([...cartItems, product._id]);
      alert("Product added to cart!");
    }
  };

  // Get images array for carousel
  const getProductImages = () => {
    if (!product) return [];
    
    const images = [product.image];
    if (product.otherImages && Array.isArray(product.otherImages)) {
      images.push(...product.otherImages);
    }
    return images.filter(Boolean);
  };

  const productImages = getProductImages();

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-[90%] m-4">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="mt-4 flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/2">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl border-4 border-blue-500"
            />
            
            {productImages.length > 1 && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">Other Images</h4>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {productImages.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`${product.name} - ${idx + 1}`}
                      className={`w-24 h-24 object-cover rounded cursor-pointer transition-all ${
                        idx === selectedImage
                          ? "border-4 border-blue-500"
                          : "border-2 border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2 mt-4 md:mt-0">
            <h3 className="text-3xl mb-2 font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="text-2xl font-bold text-blue-600">
                UGX {typeof product.price === 'number' 
                  ? product.price + ""
                  : product.price}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="text-lg font-medium">{product.category}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              {product.status === "Instock" ? (
                <p className="text-green-700 font-semibold text-lg">In Stock</p>
              ) : (
                <p className="text-red-700 font-semibold text-lg">Out of Stock</p>
              )}
            </div>

            <div className="mt-6">
              {product.status === "Instock" ? (
                <button
                  className="w-full md:w-auto bg-blue-700 hover:cursor-pointer text-white px-8 py-3 text-lg rounded hover:bg-blue-600 transition-colors"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  className="w-full md:w-auto cursor-not-allowed bg-gray-400 text-white px-8 py-3 text-lg rounded"
                  disabled
                >
                  Out of Stock
                </button>
              )}
            </div>

            {product.seller && (
              <div className="mt-6 p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-500 mb-1">Sold by</p>
                <p className="text-lg font-medium">
                  {typeof product.seller === 'object' && 'name' in product.seller 
                    ? product.seller
                    : 'Seller'}
                </p>
                {typeof product.seller === 'object' && 'phoneNumber' in product.seller && (
                  <p className="text-sm text-gray-600 mt-1">
                    Contact: {/* product.seller.phoneNumber */}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-[90%] m-4">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
      </div>
    </div>
  );
};