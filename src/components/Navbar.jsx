import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart, CiSearch, CiUser } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useCartContext } from "../contexts/CartAndCheckoutContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartProducts } = useCartContext();

  return (
    <div className="flex justify-between items-center p-2 shadow-md sticky top-0 bg-white z-50">
      <ul className="hidden md:flex items-center gap-5">
        <li>
          <Link
            to="/"
            className="hover:bg-gray-200 duration-300 transition p-1 rounded"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="hover:bg-gray-200 duration-300 transition p-1 rounded"
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="hover:bg-gray-200 duration-300 transition p-1 rounded"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:bg-gray-200 duration-300 transition p-1 rounded"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Logo */}
      <Link to="/" className="flex justify-center">
        <img
          src="https://logos-world.net/wp-content/uploads/2023/01/Kalki-Fashion-Logo.png"
          className="w-32"
          alt="Logo"
        />
      </Link>

      {/* Right Icons */}
      <div className="flex items-center gap-5 md:gap-10">
        <Link to="/cart" className="relative">
          <CiShoppingCart size={22} />
          {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartProducts.length}
            </span>
          )}
        </Link>
        <SignedOut>
          <SignInButton mode="modal">
            <CiUser size={22} className="cursor-pointer" />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link to="/shop">
          <CiSearch size={22} />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-40">
          <ul className="flex flex-col items-center gap-5 py-5">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-gray-200 transition p-2 rounded block w-full text-center"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-gray-200 transition p-2 rounded block w-full text-center"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-gray-200 transition p-2 rounded block w-full text-center"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-gray-200 transition p-2 rounded block w-full text-center"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
