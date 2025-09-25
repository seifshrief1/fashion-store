import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import image1 from "../assets/portrait-couple-with-skateboard-standing-white-backdrop.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="w-full h-[90vh] bg-center bg-cover flex items-center justify-center sm:justify-start px-4 relative"
      style={{
        backgroundImage: `url(${image1})`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute md:hidden block inset-0 bg-black/20"></div>

      <div className="relative max-w-2xl sm:pl-8 md:pl-20 text-center sm:text-left px-2">
        <h1 className="text-6xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
          REFLECT
        </h1>
        <h1 className="text-6xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight sm:ml-4">
          FASHION
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-gray-100 sm:text-gray-700">
          Discover the latest trends in fashion. Shop stylish, affordable
          outfits for every occasion – delivered right to your door.
        </p>

        <Link to="/shop">
          <button className="px-5 md:m-0 m-auto sm:px-6 md:px-8 py-2 sm:py-3 flex gap-2 cursor-pointer bg-black items-center justify-center font-semibold rounded-md text-white transition hover:bg-transparent hover:border hover:border-black hover:text-black text-sm sm:text-base">
            Start Shopping <CiShoppingCart size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
