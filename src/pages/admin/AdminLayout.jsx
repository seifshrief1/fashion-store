import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import {
  FiGrid,
  FiBox,
  FiShoppingCart,
  FiLayers,
  FiBarChart2,
  FiLogOut,
  FiArrowLeftCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar (Responsive) */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50 flex flex-col justify-between py-8 px-6`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-black rounded-full"></div>
            <h2 className="text-xl font-bold">Fashion Admin</h2>
          </div>

          {/* Management Title */}
          <p className="uppercase text-sm text-gray-400 mb-6">Management</p>

          {/* Nav Links */}
          <nav className="space-y-2">
            <Link
              to={"/admin/overview"}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 bg-gray-100"
            >
              <FiGrid /> Overview
            </Link>
            <Link
              to={"/admin/products"}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-black"
            >
              <FiBox /> Products
            </Link>
            <Link
              to={"/admin/orders"}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-black"
            >
              <FiShoppingCart /> Orders
            </Link>
            <Link
              to={"/admin/analytics"}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-black"
            >
              <FiBarChart2 /> Analytics
            </Link>
          </nav>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu (Mobile Only) */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
