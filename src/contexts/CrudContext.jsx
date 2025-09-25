import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const Add_New_Product = async (productData) => {
    const { data, error } = await supabase
      .from("Products")
      .insert([productData])
      .select();

    if (error) {
      console.error("Error adding product:", error);
      return null;
    }

    return data;
  };

  const uploadImageToSupabase = async (file) => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      return null;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      setLoading(false);
      return null;
    }

    const { data: publicURLData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setLoading(false);
    return publicURLData.publicUrl;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    if (
      location.pathname === "/admin/products" ||
      location.pathname === "/" ||
      location.pathname === "/shop" ||
      location.pathname === "/admin/overview"
    ) {
      fetchProducts();
    }
  }, [location.pathname, products]);

  const handleDeleteProduct = async (product) => {
    try {
      const { error: dbError } = await supabase
        .from("Products")
        .delete()
        .eq("id", product.id);

      if (dbError) {
        toast.error(dbError.message);
        return;
      }

      if (product.image) {
        let filePath = product.image;

        if (filePath.includes("/object/public/")) {
          filePath = filePath.split("/object/public/products/")[1];
        }

        const { error: storageError } = await supabase.storage
          .from("products")
          .remove([filePath]);

        if (storageError) {
          toast.error(
            "Deleted from DB but failed to remove image: " +
              storageError.message
          );
        }
      }

      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CrudContext.Provider
      value={{
        products,
        setProducts,
        Add_New_Product,
        loading,
        uploadImageToSupabase,
        location,
        handleDeleteProduct,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

export const useCrud = () => useContext(CrudContext);
