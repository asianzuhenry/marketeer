import { products } from "../data/products"

export const ProductDetailPage = ({ productIndex }: { productIndex: number }) => {
  const product = products[productIndex]; // Example: Get the first product
  console.log(productIndex);
  return (
    <>
    <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full m-4">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="mt-4 flex space-x-8">
        {/* DetailsCard content would go here */}
        <img 
        src={product.image} 
        alt={product.name} 
        className="w-2/4"/>
        <div>
          <h3 className="text-2xl mb-2 font-semibold">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold mt-2 ">${product.price}</p>
          <div>
            <button className="mt-4 bg-blue-500 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <div 
    className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full m-4">
      {/* Reviews section would go here */}
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
    </div>
    </>
  )
}
