import React from "react";
import FormatCurrency from "../utils/FormatCurrency";
import { FaEllipsisV } from "react-icons/fa";

const OrdersTable = ({ orders, openOrderDetails, getStatusColor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-gray-600">Customer</th>
              <th className="px-6 py-3 text-gray-600">Products</th>
              <th className="px-6 py-3 text-gray-600">Total</th>
              <th className="px-6 py-3 text-gray-600">Address</th>
              <th className="px-6 py-3 text-gray-600">Phone</th>
              <th className="px-6 py-3 text-gray-600">Date</th>
              <th className="px-6 py-3 text-gray-600">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                {/* Customer */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">
                    {order.first_name} {order.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{order.email}</p>
                </td>

                {/* Products */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-3">
                    {order.order_info.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                      >
                        <img
                          src={item.product_data?.image}
                          alt={item.product_data?.name}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {item.product_data?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Total */}
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {FormatCurrency(order.order_info.total)}
                </td>

                {/* Address */}
                <td className="px-6 py-4 text-gray-600">
                  <p className="text-sm">{order.address}</p>
                  <p className="text-xs text-gray-400">{order.governorate}</p>
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-gray-600">{order.phone}</td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-600">
                  {new Date(order.created_at).toLocaleDateString("ar-EG")}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => openOrderDetails(order)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <FaEllipsisV className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
