import React, { useMemo, useState } from "react";
import { useCartContext } from "../../contexts/CartAndCheckoutContext";
import FormatCurrency from "../../utils/FormatCurrency";
import { governorates } from "../../utils/Governorates";
import { useOrder } from "../../contexts/OrdersContext";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cartProducts, clearCart } = useCartContext();
  const { addOrder } = useOrder();
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    governorate: "",
  });

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cartProducts.reduce(
      (sum, item) =>
        sum + (item?.product_data?.price || 0) * (item?.quantity || 1),
      0
    );
    const shipping = cartProducts.length > 0 ? 50 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [cartProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.phone || !formData.address) {
      alert("من فضلك ادخل كل البيانات المطلوبة");
      return;
    }

    const orderData = {
      user_id: user.id,
      order_info: {
        customer: formData,
        items: cartProducts,
        total,
        payment: "Cash on Delivery",
      },
      status: "Pending",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      governorate: formData.governorate,
    };

    try {
      await addOrder(orderData);
      clearCart();
      navigate("/");
      toast.success("The request was created successfully.");
    } catch (err) {
      alert("فشل في انشاء الطلب ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-20 py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-8 bg-white p-4 sm:p-6 rounded-xl shadow">
          {/* Billing Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Billing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-3 rounded w-full"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-3 rounded w-full"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-3 rounded w-full md:col-span-2"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-3 rounded w-full md:col-span-2"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="border p-3 rounded w-full md:col-span-2"
              />
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                className="border p-3 rounded w-full md:col-span-2"
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((gov, index) => (
                  <option key={index} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Payment Method
            </h3>
            <p className="border p-3 rounded w-full bg-gray-100 text-gray-700">
              Cash on Delivery
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow h-fit">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Order Summary
          </h3>

          {/* Cart Items */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {cartProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b pb-3"
              >
                <img
                  src={item?.product_data?.image}
                  alt={item?.product_data?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {item?.product_data?.name}
                  </p>
                  <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-sm">
                  {FormatCurrency(
                    (item?.product_data?.price || 0) * item?.quantity
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold pt-4 mt-4 text-base sm:text-lg">
            <span>Total</span>
            <span>{FormatCurrency(total)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="px-4 py-2 w-full mt-4 flex gap-2 cursor-pointer bg-black items-center justify-center rounded-md text-white transition hover:bg-transparent hover:border border hover:border-black hover:text-black"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
