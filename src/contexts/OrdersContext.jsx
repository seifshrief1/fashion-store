import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";
import { useCrud } from "./CrudContext";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { location } = useCrud();

  const addOrder = async (orderData) => {
    try {
      const { data, error } = await supabase
        .from("Orders")
        .insert([orderData])
        .select();

      if (error) throw error;

      setOrders((prev) => [...prev, ...data]);
      return data;
    } catch (err) {
      console.error("Error adding order:", err.message);
      throw err;
    }
  };

  const handleGetOrders = async () => {
    try {
      const { data, error } = await supabase.from("Orders").select("*");

      if (error) {
        toast.error(error.message);
      }
      setOrders(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      location.pathname == "/admin/orders" ||
      location.pathname == "/admin/overview"
    ) {
      handleGetOrders();
    }
  }, [orders]);
  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
