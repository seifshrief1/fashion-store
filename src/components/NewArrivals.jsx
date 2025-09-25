import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useCrud } from "../contexts/CrudContext";
import { supabase } from "../../supabase";

const NewArrivals = () => {
  const [newestProducts, setNewestProducts] = useState([]);
  const { location } = useCrud();

  const fetchNewestProducts = async () => {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setNewestProducts(data);
    }
  };

  useEffect(() => {
    if (location.pathname == "/") {
      fetchNewestProducts();
    }
  }, [location.pathname, newestProducts]);

  return (
    <div>
      <h2 className="md:text-4xl text-3xl font-bold text-center mt-8 border-b max-w-10/12 border-gray-300 mx-auto pb-2">
        New Arrivals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {newestProducts.slice(0, 4).map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
