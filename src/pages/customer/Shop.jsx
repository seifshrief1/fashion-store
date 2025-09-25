import React, { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import { FiSearch } from "react-icons/fi";
import { useCrud } from "../../contexts/CrudContext";

const Shop = () => {
  const { products } = useCrud();

  // State for search, sort, and category
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [category, setCategory] = useState("all");

  // Compute filtered + sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // 🔍 Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🏷️ Category filter
    if (category !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // ↕️ Sorting
    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return filtered;
  }, [products, searchTerm, sortOption, category]);

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-20 text-gray-800">
      <h2 className="text-3xl font-bold mb-12 text-center md:text-left">
        Shop Our Collection
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-gray-100 p-6 rounded-xl space-y-8 lg:sticky top-28 h-fit self-start shadow-sm">
          {/* Search */}
          <div>
            <label className="block text-lg font-semibold mb-2">Search</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-lg font-semibold mb-2">Sort By</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="default"
                  checked={sortOption === "default"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Default
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="low-to-high"
                  checked={sortOption === "low-to-high"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Price: Low to High
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="high-to-low"
                  checked={sortOption === "high-to-low"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Price: High to Low
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="newest"
                  checked={sortOption === "newest"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Newest
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-semibold mb-2">Category</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={category === "all"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                All
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="men"
                  checked={category === "men"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Men
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="women"
                  checked={category === "women"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Women
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="accessories"
                  checked={category === "accessories"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Accessories
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="shoes"
                  checked={category === "shoes"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Shoes
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
