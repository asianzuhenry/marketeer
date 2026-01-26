import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/basetypes";

const environment = import.meta.env.VITE_ENVIRONMENT;

type QuantityProps = {
  [key: string]: number;
};

export const CartPage = ({
  cartItems,
  setCartItems,
}: {
  cartItems: string[];
  setCartItems: (items: string[]) => void;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchCartProducts();
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  const fetchCartProducts = async () => {
    setLoading(true);
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

      // Filter only products that are in cart
      const uniqueCartIds = [...new Set(cartItems)];
      const cartProducts = data.products.filter((product: Product) =>
        uniqueCartIds.includes(product._id!)
      );
      
      setProducts(cartProducts);
    } catch (error) {
      console.error("Fetch cart products failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems([...cartItems, itemId]);
  };

  const decreaseQuantity = (itemId: string) => {
    const index = cartItems.indexOf(itemId);
    if (index !== -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((id) => id !== itemId));
  };

  // Calculate quantity for each product
  const quantityMap: QuantityProps = {};
  cartItems.forEach((itemId) => {
    if (quantityMap[itemId]) {
      quantityMap[itemId] += 1;
    } else {
      quantityMap[itemId] = 1;
    }
  });

  // Calculate total expense
  const expense = Object.keys(quantityMap).reduce((total, itemId) => {
    const product = products.find((prod) => prod._id === itemId);
    const price = typeof product?.price === 'number' ? product.price : parseFloat(product?.price || '0');
    return total + price * quantityMap[itemId];
  }, 0);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full max-w-4xl m-4">
        <h2 className="text-2xl text-center font-bold">Shopping Cart</h2>
        <hr className="my-4 border-gray-700 border-b-2" />
        
        <div className="mt-4 flex flex-col md:flex-row items-start gap-2 justify-between md:items-center">
          <p className="md:text-xl font-semibold">
            Total Cost: UGX {expense.toLocaleString()}
          </p>
          {cartItems.length > 0 && (
            <div className="flex gap-2">
              <button
                className="p-2 bg-green-600 rounded text-white min-w-12 px-6 py-3 text-base cursor-pointer hover:bg-green-700"
                onClick={() => {
                  alert("Checkout functionality coming soon!");
                }}
              >
                Checkout
              </button>
              <button
                className="p-2 bg-red-700 rounded text-white min-w-12 px-6 py-3 text-base cursor-pointer hover:bg-red-600"
                onClick={() => setCartItems([])}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col space-y-4">
          {Object.keys(quantityMap).length > 0 ? (
            Object.keys(quantityMap).map((itemId) => {
              const product = products.find((prod) => prod._id === itemId);
              
              if (!product) return null;

              const price = typeof product.price === 'number' 
                ? product.price 
                : parseFloat(product.price || '0');
              const quantity = quantityMap[itemId];
              const subtotal = price * quantity;

              return (
                <div
                  key={itemId}
                  className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300 flex flex-col md:flex-row items-center gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  />
                  
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-semibold cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/productdetails/${product._id}`)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                      <p className="text-gray-700 mt-2">
                        Price: UGX {price.toLocaleString()}
                      </p>
                      <p className="text-gray-900 font-semibold mt-1">
                        Subtotal: UGX {subtotal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                        <button
                          className="bg-blue-700 text-white text-xl font-bold w-10 h-10 rounded hover:bg-blue-600 transition-colors"
                          onClick={() => decreaseQuantity(itemId)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          className="bg-blue-700 text-white text-xl font-bold w-10 h-10 rounded hover:bg-blue-600 transition-colors"
                          onClick={() => increaseQuantity(itemId)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                        onClick={() => removeFromCart(itemId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                UGX {expense.toLocaleString()}
              </span>
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded text-lg"
              onClick={() => {
                alert("Checkout functionality coming soon!");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};