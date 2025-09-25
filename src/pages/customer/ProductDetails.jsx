import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { supabase } from "../../../supabase";
import FormatCurrency from "../../utils/FormatCurrency";
import ProductCard from "../../components/ProductCard";
import { useCartContext } from "../../contexts/CartAndCheckoutContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useCartContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("Products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);

        if (data?.category) {
          const { data: related } = await supabase
            .from("Products")
            .select("*")
            .eq("category", data.category)
            .neq("id", id)
            .limit(4);

          setRelatedProducts(related || []);
        }
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-20 py-20 bg-white text-gray-800">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-8/12 h-8/12 object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg">Category: {product.category}</p>
          <p className="text-2xl font-semibold text-black">
            {FormatCurrency(product.price)}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Colors */}
          {product.colors && (
            <div>
              <h4 className="font-semibold mb-2">Color</h4>
              <div className="flex gap-3">
                {product.colors.split(",").map((color) => (
                  <div
                    key={color}
                    className="w-7 h-7 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => handleAddToCart(product)}
            className="px-6 py-3 flex gap-2 cursor-pointer bg-black items-center justify-center rounded-md text-white text-lg font-medium transition hover:bg-transparent hover:border border hover:border-black hover:text-black"
          >
            Add to Cart <CiShoppingCart size={22} />
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8 border-b pb-2">
          Related Products
        </h2>
        {relatedProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
