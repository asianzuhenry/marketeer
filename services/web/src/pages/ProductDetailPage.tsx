import { useState } from "react";
import { products } from "../data/products";

export const ProductDetailPage = ({
  productIndex,
}: {
  productIndex: number;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const product = products[productIndex]; // Example: Get the first product

  const autoSetNextImage = () => {
    if (product.otherImages && product.otherImages.length > 1) {
      setTimeout(() => {
        setSelectedImage((prevIndex) => {
          if (prevIndex + 1 < product.otherImages!.length) {
            console.log(prevIndex);
            return prevIndex + 1;
          } else {
            console.log(prevIndex);
            return 0;
          }
        });
      }, 5000); // Change image every 5 seconds
    }
  };

  autoSetNextImage();
  return (
    <>
      <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full m-4">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="mt-4 flex space-x-8">
          {/* DetailsCard content would go here */}
          <img
            src={product.otherImages?.[selectedImage]}
            alt={product.name}
            className="w-2/4 h-4/6 object-cover"
          />
          <div>
            <h3 className="text-2xl mb-2 font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mt-2 ">${product.price}</p>
            {product.status === "Instock" ? (
              <p className="text-green-600 mb-2">{product.status}</p>
            ) : (
              <p className="text-red-600 mb-2">{product.status}</p>
            )}
            <div>
              <button className="mt-4 bg-blue-500 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
            {product.otherImages && product.otherImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">Other Images</h4>
                <div className="flex space-x-4 overflow-x-auto">
                  {product.otherImages.map((imgUrl, idx) =>
                    idx === selectedImage ? (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-32 h-32 object-cover rounded-2xl border-4 border-blue-500"
                        onClick={() => setSelectedImage(idx)}
                      />
                    ) : (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-32 h-32 object-cover rounded"
                        onClick={() => setSelectedImage(idx)}
                      />
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow-md shadow-blue-500 w-full m-4">
        {/* Reviews section would go here */}
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      </div>
    </>
  );
};
