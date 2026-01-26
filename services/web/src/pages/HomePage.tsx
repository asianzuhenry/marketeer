import { ProductCard } from "../Components/ProductCard";
// import { products } from "../data/products";
import { Services } from "../data/Services";
import type { Product } from "../types/basetypes";

export const HomePage = ({
  productsList,
  setCartItems,
  setProductIndex,
  cartItems,
}: {
  productsList: Product[];
  setCartItems:  (items: string[]) => void;
  setProductIndex: (index: number) => void
  cartItems: string[];
}) => {
  return (
    <div>
      <section
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/medium-shot-man-holding-vegetables_23-2148761604.jpg?semt=ais_hybrid&w=740&q=80')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-screen"
      >
        <div className="w-full h-full text-center flex flex-col justify-center items-center">
          {" "}
          {/* overlay */}
          <h2 className="text-4xl font-bold mb-4 text-white">
            Welcome to Marketeer!
          </h2>
          <p className="text-2xl mb-6 text-white">
            Discover our range of products that you can trust. From electronics
            to apparel, we have it all and more.
          </p>
          <button className="bg-green-700 hover:cursor-pointer text-white px-6 py-3 text-xl font-bold rounded hover:bg-green-600">
            Shop Now
          </button>
        </div>
      </section>
      <section 
      className="w-full h-full p-8 lg:px-60 rounded-lg shadow-md flex flex-col items-center bg-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Products</h2>
        <hr className="border-t border-gray-300 mb-4 py-12" />
        <div 
        className="w-full p-2 lg:w-full lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 flex sm:justify-center flex-col items-center">
          {productsList.map((product: Product, index: number) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                setProductIndex={setProductIndex}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            );
          })}
        </div>
      </section>
      <section 
      className="bg-gray-600 p-8 px-6 md:px-20 lg:px-60">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
        <hr className="border-t border-gray-300 mb-4 py-12" />
        <p className="text-lg text-white text-center">
          We offer a variety of marketing services to help your business grow.
        </p>
        <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Additional content about services can be added here */}
          {Services.map((service, index) => (
            <div
              key={index}
              className="mb-4 sm:w-full cursor-pointer bg-gray-200 p-4 rounded h-40 hover:bg-gray-300 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
