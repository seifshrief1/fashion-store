import React, { useState, useEffect } from "react";
import { useCrud } from "../../contexts/CrudContext";
import { toast } from "react-toastify";

const AddProductModal = ({ isOpen, onClose }) => {
  const { Add_New_Product, uploadImageToSupabase, loading } = useCrud();
  const [showModalContent, setShowModalContent] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowModalContent(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowModalContent(false);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("preview-img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;
    if (selectedImageFile) {
      imageUrl = await uploadImageToSupabase(selectedImageFile);
      if (!imageUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    const finalProductData = { ...productData, image: imageUrl };
    await Add_New_Product(finalProductData);
    onClose();
    toast.success("The product has been added successfully.");
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 transform transition-all duration-300 ease-out ${
          showModalContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          Add New Product 📦
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/50 transition duration-200 text-gray-800"
                  placeholder="e.g., Wireless Mouse"
                  required
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/50 transition duration-200 text-gray-800"
                  placeholder="e.g., Electronics"
                  required
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/50 transition duration-200 text-gray-800"
                  step="0.01"
                  placeholder="e.g., 49.99"
                  required
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/50 transition duration-200 text-gray-800"
                  placeholder="e.g., 150"
                  required
                  value={productData.stock}
                  onChange={(e) =>
                    setProductData({ ...productData, stock: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/50 transition duration-200 text-gray-800"
                placeholder="e.g., A sleek, ergonomic mouse designed for comfort and precision."
                required
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Product Image
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-black/50 transition duration-200 cursor-pointer">
                <input
                  id="image"
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="image"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    id="preview-img"
                    src="https://tse3.mm.bing.net/th/id/OIP.YbjJkPQmvm-LdJniAhJ78gHaG8?pid=Api&P=0&h=220"
                    className="w-32 h-32 object-cover rounded-full mb-3"
                    alt="Product Preview"
                  />
                </label>
                <span className="text-blue-600 font-medium">
                  {loading ? "Uploading..." : "Click to upload an image"}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-base font-semibold rounded-full border-2 border-gray-300 text-gray-700 transition duration-200 hover:bg-gray-100 hover:border-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-base font-semibold rounded-md bg-black/80 text-white transition duration-200 hover:bg-transparent hover:border border hover:border-black hover:text-black"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
