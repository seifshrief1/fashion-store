import React from "react";
import { FaTruck, FaRedo, FaLock, FaTag } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: (
        <FaTruck
          className="text-3xl bg-gray-300 p-3 rounded-full text-gray-500"
          size={100}
        />
      ),
      title: "Fast & Free Shipping",
      description:
        "Get your fashion favorites delivered quickly and for free on all orders over $50.",
    },
    {
      icon: (
        <FaRedo
          className="text-3xl bg-gray-300 p-3 rounded-full text-gray-500"
          size={100}
        />
      ),
      title: "Easy Returns",
      description:
        "Hassle-free 14-day returns. If it doesn't fit, send it back easily.",
    },
    {
      icon: (
        <FaLock
          className="text-3xl bg-gray-300 p-3 rounded-full text-gray-500"
          size={100}
        />
      ),
      title: "Secure Payments",
      description: "Your information is safe with encrypted, secure checkout.",
    },
    {
      icon: (
        <FaTag
          className="text-3xl bg-gray-300 p-3 rounded-full text-gray-500"
          size={100}
        />
      ),
      title: "Best Price Guarantee",
      description: "Trendy fashion at the best prices – always.",
    },
  ];

  return (
    <div className="py-14 px-6 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 border-b-2 border-gray-300 pb-2 w-fit mx-auto mb-10">
        Why Choose Us
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center text-center p-6 transition duration-300 hover:bg-gray-100 rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="mb-4">{item.icon}</div>
            <div className="ml-4 flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
