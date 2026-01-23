import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../Components/ProductCard";

export const ProductsPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productIndex, setProductIndex] = useState(0);

  const images: string[] = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhFhqAvcPgBUPVqD_JkU5jvu8QJK6nRelUQ&s",
    "https://media.licdn.com/dms/image/v2/D4E12AQG2A9TYHZD6MQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684089599447?e=2147483647&v=beta&t=P1SeOr63xTRFLanvIzUqOV9PfX5XtqWjoCiXxgETnMk",
    "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg?semt=ais_hybrid&w=740&q=80",
    "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UF894,1000_QL80_.jpg",
  ];

  const selectNextImage = () => {
    if (selectedImageIndex + 1 < images.length) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else {
      setSelectedImageIndex(0);
    }
  };
  setTimeout(selectNextImage, 5000);

  const searchProducts = (term: string) => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase()),
    );
  };

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
          {/* Overlay for better text visibility */}
          <div className="bg-white bg-opacity-75 p-8 rounded shadow-md text-center">
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
              <input
                type="button"
                value="Search"
                className="p-3 bg-blue-500 text-white rounded"
                onClick={() => searchProducts(searchTerm)}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchProducts(searchTerm).length > 0 ? (
            searchProducts(searchTerm).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setProductIndex={setProductIndex}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
};
