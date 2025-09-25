import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import FormatCurrency from "../utils/FormatCurrency";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartAndCheckoutContext";

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useCartContext();
  return (
    <div className="w-full max-w-sm bg-gray-100 flex flex-col h-full">
      <Link to={`/product/${product?.id}`} className="block">
        <img
          src={product?.image}
          alt={product?.name}
          className="p-2 cursor-pointer hover:scale-95 transition-transform duration-300 w-full h-80 object-contain"
        />
      </Link>
      <div className="bg-white p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold mt-2">{product?.name}</h3>
          <p className="text-gray-600 text-sm">{product?.description}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600 text-lg font-bold">
            {FormatCurrency(product?.price)}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="px-4 py-2 flex gap-2 cursor-pointer bg-black items-center justify-center rounded-md text-white transition hover:bg-transparent hover:border border hover:border-black hover:text-black"
          >
            Add to Cart <CiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
