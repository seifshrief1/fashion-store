import React from "react";
import AdminLayout from "./AdminLayout";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminAnalytics = () => {
  // Sample Data
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "Jul", sales: 3490 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 2400 },
    { name: "Feb", revenue: 1398 },
    { name: "Mar", revenue: 9800 },
    { name: "Apr", revenue: 3908 },
    { name: "May", revenue: 4800 },
    { name: "Jun", revenue: 3800 },
    { name: "Jul", revenue: 4300 },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: "+12%",
      icon: <FiDollarSign size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Sales",
      value: "1,248",
      change: "+8%",
      icon: <FiShoppingCart size={24} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "New Customers",
      value: "342",
      change: "+15%",
      icon: <FiUsers size={24} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.4%",
      icon: <FiTrendingUp size={24} />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const mostSoldProducts = [
    { name: "Premium Cotton T-Shirt", sold: 320 },
    { name: "Elegant Summer Dress", sold: 280 },
    { name: "Classic Denim Jeans", sold: 230 },
    { name: "Kids Colorful Hoodie", sold: 210 },
  ];

  const lowStockProducts = [
    { name: "Classic Denim Jeans", stock: 4 },
    { name: "Elegant Summer Dress", stock: 6 },
    { name: "Leather Handbag", stock: 3 },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Track your store performance and key metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-xl md:text-2xl font-bold mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend Chart */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Sales Trend
            </h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Revenue Overview
            </h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Most Sold & Low Stock Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Sold Products */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Most Sold Products
            </h2>
            <ul className="divide-y divide-gray-200">
              {mostSoldProducts.map((product, idx) => (
                <li key={idx} className="py-3 flex justify-between">
                  <span className="text-gray-700 font-medium">
                    {product.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {product.sold} sold
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Low Stock Products */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Low Stock Products
            </h2>
            <ul className="divide-y divide-gray-200">
              {lowStockProducts.map((product, idx) => (
                <li key={idx} className="py-3 flex justify-between">
                  <span className="text-gray-700 font-medium">
                    {product.name}
                  </span>
                  <span className="text-red-600 text-sm">
                    {product.stock} left
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
