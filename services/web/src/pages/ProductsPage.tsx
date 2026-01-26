import { useState, useEffect } from "react";
import { ProductCard } from "../Components/ProductCard";
import type { Product } from "./../types/basetypes";

const environment = import.meta.env.VITE_ENVIRONMENT;

export const ProductsPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productIndex, setProductIndex] = useState(0);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const images: string[] = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhFhqAvcPgBUPVqD_JkU5jvu8QJK6nRelUQ&s",
    "https://media.licdn.com/dms/image/v2/D4E12AQG2A9TYHZD6MQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684089599447?e=2147483647&v=beta&t=P1SeOr63xTRFLanvIzUqOV9PfX5XtqWjoCiXxgETnMk",
    "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg?semt=ais_hybrid&w=740&q=80",
    "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF894,1000_QL80_.jpg",
  ];

  console.log(productIndex);
  

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError("");

    // Determine API URL - use the public endpoint to get ALL products
    const apiUrl =
      environment === "development"
        ? "http://localhost:3000/api/products"
        : "https://marketeer.onrender.com/api/products";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  const searchProducts = (term: string) => {
    if (!term.trim()) {
      return productsList;
    }
    
    return productsList.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase()),
    );
  };

  const filteredProducts = searchProducts(searchTerm);

  return (
    <div>
      <section
        className="bg-white w-full h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${images[selectedImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#000000ac",
          }}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div className="bg-white w-[90%] md:w-[40%] bg-opacity-75 p-8 rounded shadow-md text-center">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-lg">
              Explore our wide range of products tailored to meet your needs.
            </p>
            <div className="mt-6 flex justify-center">
              <input
                type="text"
                placeholder="Search products..."
                className="p-3 border border-gray-300 rounded mr-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 px-6"
                onClick={() => {}}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-8 min-h-[40vh]">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

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
        ) : (
          <div className="gap-6 p-4 w-full md:grid grid-cols-4 flex flex-wrap align-middle justify-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id || index}
                  product={product}
                  index={index}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setProductIndex={setProductIndex}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">
                  {searchTerm 
                    ? `No products found matching "${searchTerm}"`
                    : "No products available at the moment."}
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};