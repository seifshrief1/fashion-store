import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../supabase";
import { useUser } from "@clerk/clerk-react";
import { useCrud } from "./CrudContext";

const CartAndCheckoutContext = createContext();

export const CartAndCheckoutProvider = ({ children }) => {
  const { user } = useUser();
  const [cartProducts, setCartProducts] = useState([]);
  const { location } = useCrud();

  const handleAddToCart = async (product) => {
    try {
      let rowData = {
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
        product_data: {
          name: product.name,
          price: product.price,
          image: product.image,
        },
      };
      const { data, error } = await supabase
        .from("Cart")
        .insert([rowData])
        .select();

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("The Product Added To Cart Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFetchCartProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("Cart")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        toast.error(error.message);
      } else {
        setCartProducts(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/cart" ||
      location.pathname === "/" ||
      location.pathname.startsWith("/product") ||
      (location.pathname === "/checkout" && user?.id)
    ) {
      handleFetchCartProducts();
    }
  }, [location.pathname, user, cartProducts]);

  const handleDeleteFromCart = async (product) => {
    try {
      const { error } = await supabase
        .from("Cart")
        .delete()
        .eq("id", product.id);

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartAndCheckoutContext.Provider
      value={{
        handleAddToCart,
        cartProducts,
        handleDeleteFromCart,
        setCartProducts,
        clearCart,
        user,
      }}
    >
      {children}
    </CartAndCheckoutContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartAndCheckoutContext);
};
