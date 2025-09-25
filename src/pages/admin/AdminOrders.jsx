import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { FiSearch } from "react-icons/fi";
import { FaEllipsisV } from "react-icons/fa";
import FormatCurrency from "../../utils/FormatCurrency";
import AdminOrderDetails from "../../components/AdminOrderDetails";
import { useOrder } from "../../contexts/OrdersContext";
import OrdersTable from "../../components/OrdersTable";

const AdminOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { orders } = useOrder();

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 50); // Trigger animation after mount
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedOrder(null);
    }, 300); // Match the transition duration
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
            Orders
          </h1>
          <p className="text-gray-600 text-sm">Manage customer orders</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-1/2">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">All Orders</span>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">All Orders</h2>
            <p className="text-gray-500 text-sm">
              Showing {orders.length} orders
            </p>
          </div>

          <OrdersTable
            orders={orders}
            openOrderDetails={openOrderDetails}
            getStatusColor={getStatusColor}
          />
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{order.id}</h3>
                <button
                  onClick={() => openOrderDetails(order)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaEllipsisV />
                </button>
              </div>
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-xs text-gray-500">{order.email}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p>{FormatCurrency(order.order_info.total)}</p>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-xs text-gray-500">{order.date}</div>
            </div>
          ))}
        </div>
      </div>

      <AdminOrderDetails
        isModalOpen={isModalOpen}
        selectedOrder={selectedOrder}
        closeModal={closeModal}
        isAnimating={isAnimating}
        setSelectedOrder={setSelectedOrder}
      />
    </AdminLayout>
  );
};

export default AdminOrders;
