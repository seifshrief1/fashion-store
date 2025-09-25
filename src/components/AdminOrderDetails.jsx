import React, { useState } from "react";
import FormatCurrency from "../utils/FormatCurrency";
import { toast } from "react-toastify";
import { supabase } from "../../supabase";

const AdminOrderDetails = ({
  isModalOpen,
  selectedOrder,
  closeModal,
  isAnimating,
  setSelectedOrder,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("Orders")
        .update({
          status: selectedOrder.status,
        })
        .eq("id", selectedOrder.id)
        .select();

      if (error) throw error;

      toast.success("Order status updated successfully");
      closeModal();
    } catch (err) {
      console.error(err.message);
      toast.error("An error occurred while updating the request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div
            className={`bg-white rounded-lg w-full max-w-2xl p-6 relative transform transition-all duration-300 ease-out ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Order Details - {selectedOrder.id}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Detailed information about the order
            </p>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Customer Information
                </h3>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {selectedOrder.first_name}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedOrder.phone}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedOrder.email}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-1">
                Shipping Address
              </h3>
              <p>{selectedOrder.address}</p>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Items
              </h3>
              <div className="w-full">
                {selectedOrder.order_info.items.map((p, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-200"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={p.product_data.image}
                        className="w-12 h-12 rounded object-cover"
                        alt={p.product_data.name}
                      />
                      <div>
                        <p className="font-medium">{p.product_data.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {p.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {FormatCurrency(p.product_data.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-lg">Total:</p>
              <p className="font-semibold text-lg">
                {FormatCurrency(selectedOrder.order_info.total)}
              </p>
            </div>

            {/* Update Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Status
              </label>
              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, status: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2"
              >
                <option>Completed</option>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Cancelled</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <button
                disabled={loading}
                onClick={handleUpdateOrder}
                className="px-4 w-full py-2 flex gap-2 cursor-pointer bg-black items-center justify-center rounded-md text-white transition hover:bg-transparent hover:border border hover:border-black hover:text-black disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderDetails;
