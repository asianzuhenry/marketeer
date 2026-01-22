// import { Link } from "react-router";
import { products } from "../data/products";
// import { getLocalCartItems } from "../utils/localCartStorage";

type QuantityProps = {
  [key: number]: number;
};

export const CartPage = ({
  cartItems,
  setCartItems,
}: {
  cartItems: number[];
  setCartItems: (items: number[]) => void;
}) => {
  const increaseQuantity = (itemId: number) => {
    setCartItems([...cartItems, itemId]);
  };

  const decreaseQuantity = (itemId: number) => {
    const index = cartItems.indexOf(itemId);
    if (index !== -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  const quantityMap: QuantityProps = {};
  cartItems.forEach((itemId) => {
    if (quantityMap[itemId]) {
      quantityMap[itemId] += 1;
    } else {
      quantityMap[itemId] = 1;
    }
  });

  const expense = Object.keys(quantityMap).reduce((total, itemId) => {
    const product = products.find((prod) => prod.id === Number(itemId));
    return total + (product?.price || 0) * quantityMap[Number(itemId)];
  }, 0);

  return (
    <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full sm:w-[90%] m-4">
      <h2 className="text-2xl text-center font-bold">CartPage</h2> {/* Cart Items List bold text */}
      <hr className="my-4 border-gray-700 border-b-2" />
      <div className="mt-4 flex justify-between items-center">
        <p>
          Total Cost: UGX{" "}
          {expense}
        </p>
        <button
          className="p-2 bg-red-700 rounded-2xl text-white text-xl cursor-pointer hover:bg-red-600"
          onClick={() => setCartItems([])}
        >
          Clear Cart
        </button>
      </div>
      <div className="mt-4 flex flex-col space-y-4">
        {quantityMap && Object.keys(quantityMap).length > 0 ? (
          Object.keys(quantityMap).map((itemId) => {
            const product = products.find((prod) => prod.id === Number(itemId));
            return (
              // <Link to="/productdetails" state={{ productIndex: product?.id }} onClick={() => setIndex?.(product?.id || 0)}>
              <div
                key={itemId}
                className="border-b border-gray-300 py-4 hover:bg-gray-200 p-2 rounded transition-colors duration-300 cursor-pointer flex items-center gap-4"
              >
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="mt-2 flex flex-col">
                  <h3 className="text-xl font-semibold">{product?.name}</h3>
                  <p className="text-gray-700">Price: UGX {product?.price}</p>
                </div>
                <div className="mt-2 flex flex-col ml-auto items-end">
                  <p className="text-gray-700">Product ID: {itemId}</p>
                  <div className="mt-2 flex items-center gap-2 p-2 rounded w-72 justify-left align-middle">
                    <p className="flex align-middle justify-left w-full gap-4">
                      Quantity:
                      <button
                        className="bg-blue-700 text-white text-2xl font-bold px-8 py-2 rounded hover:bg-blue-600"
                        onClick={() => {
                          decreaseQuantity(Number(itemId));
                        }}
                      >
                        -
                      </button>{" "}
                      {/** decrease quantity */}
                      {quantityMap[Number(itemId)]}
                      <button
                        className="bg-blue-700 text-white text-2xl font-bold px-8 py-2 rounded hover:bg-blue-600"
                        onClick={() => {
                          increaseQuantity(Number(itemId));
                        }}
                      >
                        +
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              // </Link>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};
