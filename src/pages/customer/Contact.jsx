import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 md:px-24 py-20">
      {/* Page Title */}
      <h2 className="text-4xl font-bold mb-12 text-center border-b md:w-1/6 border-gray-300 mx-auto pb-2">
        Get In Touch
      </h2>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Tell us how we can help you..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              required
            ></textarea>
          </div>
          <button className="px-4 py-2 flex gap-2 cursor-pointer bg-black items-center justify-center rounded-md text-white transition hover:bg-transparent hover:border border hover:border-black hover:text-black">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Our Store</h3>
            <p className="text-gray-600">123 Fashion Avenue, New York, NY</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-gray-600">support@fashionbrand.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Working Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9 AM – 6 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
