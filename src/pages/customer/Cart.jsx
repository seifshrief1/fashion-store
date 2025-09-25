import React from "react";
import FormatCurrency from "../../utils/FormatCurrency";
import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/CartAndCheckoutContext";
import { supabase } from "../../../supabase";

const Cart = () => {
  const { cartProducts, handleDeleteFromCart, setCartProducts } =
    useCartContext();

  const handleIncreaseQuantity = async (product) => {
    const newQuantity = product.quantity + 1;

    const { error } = await supabase
      .from("Cart")
      .update({ quantity: newQuantity })
      .eq("id", product.id);

    if (!error) {
      setCartProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleDecreaseQuantity = async (product) => {
    if (product.quantity <= 1) return;
    const newQuantity = product.quantity - 1;

    const { error } = await supabase
      .from("Cart")
      .update({ quantity: newQuantity })
      .eq("id", product.id);

    if (!error) {
      setCartProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-20 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Your Shopping Cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3 space-y-6">
          {cartProducts.length == 0 ? (
            <p className="text-xl font-bold">Your Cart Is Empty</p>
          ) : (
            cartProducts.map((product) => (
              <div
                key={product?.product_id}
                className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-xl shadow"
              >
                <img
                  src={product?.product_data.image}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded"
                />

                <div className="flex-1 w-full">
                  <h4 className="font-semibold text-lg">
                    {product?.product_data.name}
                  </h4>
                  <p className="text-gray-500">Size: M | Color: Black</p>
                  <p className="font-bold mt-1">
                    {FormatCurrency(product?.product_data.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleDecreaseQuantity(product)}
                      className="border px-3 py-1 rounded hover:bg-black hover:text-white"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(product)}
                      className="border px-3 py-1 rounded hover:bg-black hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteFromCart(product)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 p-6 bg-white rounded-xl shadow h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {(() => {
            const subtotal = cartProducts.reduce(
              (sum, item) =>
                sum + (item?.product_data?.price || 0) * (item?.quantity || 1),
              0
            );
            const shipping = cartProducts.length > 0 ? 50 : 0;
            const total = subtotal + shipping;

            return (
              <>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{FormatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>{FormatCurrency(shipping)}</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{FormatCurrency(total)}</span>
                </div>

                <Link to={cartProducts.length > 0 && "/checkout"}>
                  <button className="px-4 py-2 w-full mt-2 flex gap-2 cursor-pointer bg-black items-center justify-center rounded-md text-white transition hover:bg-transparent hover:border border hover:border-black hover:text-black">
                    Proceed to Checkout
                  </button>
                </Link>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Cart;
