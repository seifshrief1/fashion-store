import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useOrder } from "../../contexts/OrdersContext";
import { useCrud } from "../../contexts/CrudContext";

const AdminOverview = () => {
  const { orders } = useOrder();
  const { products } = useCrud();
  const summaryCards = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      trend: "up",
      icon: <BarChart2 className="w-6 h-6 text-gray-400" />,
      iconBg: "bg-green-50",
    },
    {
      title: "Orders",
      value: orders.length,
      change: "+18.01% from last month",
      trend: "up",
      icon: <ShoppingCart className="w-6 h-6 text-gray-400" />,
      iconBg: "bg-blue-50",
    },
    {
      title: "Products",
      value: products.length,
      change: "+19% from last month",
      trend: "up",
      icon: <Package className="w-6 h-6 text-gray-400" />,
      iconBg: "bg-purple-50",
    },
  ];

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Overview of your store's performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-gray-500">{card.title}</p>
                  <h2 className="text-xl font-bold">{card.value}</h2>
                </div>
                <div className={`p-2 rounded-full ${card.iconBg}`}>
                  {card.icon}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {getTrendIcon(card.trend)}
                <span>{card.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
