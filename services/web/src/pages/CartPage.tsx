import { products } from "../data/products";
// import { getLocalCartItems } from "../utils/localCartStorage";

type QuantityProps = {
  [key: number]: number;
}


export const CartPage = (
    { cartItems }: { cartItems: number[] }
) => {

  const quantityMap: QuantityProps = {};

  cartItems.forEach((itemId) => {
    if (quantityMap[itemId]) {
      quantityMap[itemId] += 1;
    } else {
      quantityMap[itemId] = 1;
    }
  });


  return (
    <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full sm:w-[90%] m-4">
      <h2 className="text-2xl text-center">CartPage</h2>
      <div
        className="mt-4 flex flex-col space-y-4"
      >
        {quantityMap && Object.keys(quantityMap).length > 0 ? (
            Object.keys(quantityMap).map((itemId) => {
            const product = products.find((prod) => prod.id === Number(itemId));
            return (
              <div 
              key={itemId} 
              className="border-b border-gray-300 py-4 hover:bg-gray-200 p-2 rounded transition-colors duration-300 cursor-pointer flex items-center gap-4">
                <img 
                src={product?.image} 
                alt={product?.name} 
                className="w-24 h-24 object-cover rounded" />
                <div
                className="mt-2 flex flex-col">
                <h3 className="text-xl font-semibold">{product?.name}</h3>
                <p className="text-gray-600">Price: UGX {product?.price}</p>
                </div>
                <div>
                  <p className="text-gray-600">Product ID: {itemId}</p>
                  <div>
                    <p>quantity: {quantityMap[Number(itemId)]}</p>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};
