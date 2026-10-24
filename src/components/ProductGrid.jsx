import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { CATEGORIES } from "../data/products";
import { useShop } from "../context/ShopContext";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

export const ProductGrid = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useShop();
  const [sortBy, setSortBy] = useState("featured");

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== "all") {
      list = list.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        return (
          p.categorySlug === activeCategory ||
          (activeCategory === "formal-shirts" && cat.includes("formal")) ||
          (activeCategory === "casual-shirts" && cat.includes("casual")) ||
          (activeCategory === "tailored-trousers" && cat.includes("trouser")) ||
          (activeCategory === "chinos-pants" && (cat.includes("chino") || cat.includes("pant")))
        );
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          (p.fabric || "").toLowerCase().includes(q) ||
          (p.tagline || "").toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="featured-collections" className="py-14 sm:py-20 bg-[#FFF8ED] border-t border-[#D6B77A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E9] border border-[#D6B77A]/50 text-xs font-semibold text-[#2B211B] uppercase tracking-wider mb-2">
            The Autumn / Winter Catalog
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211B]">
            Signature Menswear Collection
          </h2>
          <p className="text-sm text-[#2B211B] mt-2">
            Discover tailored shirts, pleated trousers, and premium casual staples with transparent retail and wholesale pricing.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#FAF4E9] p-3 sm:p-4 rounded-2xl border border-[#D6B77A]/30">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#2B211B] text-[#FFF8ED] shadow-sm font-semibold"
                    : "text-[#2B211B] hover:bg-[#FFF8ED] hover:text-[#2B211B]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Count Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-[#2B211B]">
            <span className="font-medium">
              Showing <strong className="text-[#2B211B]">{filteredAndSortedProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-1.5 bg-[#FFF8ED] px-2.5 py-1.5 rounded-lg border border-[#D6B77A]/40">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D6B77A]" />
              <label htmlFor="sort-select" className="sr-only">Sort products</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#2B211B] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Search Filter Badge if present */}
        {searchQuery && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[#2B211B]">Active search filter:</span>
            <div className="inline-flex items-center gap-1.5 bg-[#2B211B] text-[#FFF8ED] px-3 py-1 rounded-full text-xs">
              <span>"{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery("")}
                className="hover:text-[#D6B77A] ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-7">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF4E9] rounded-2xl border border-dashed border-[#D6B77A]">
            <div className="w-12 h-12 rounded-full bg-[#FFF8ED] mx-auto flex items-center justify-center text-[#2B211B] mb-3">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B211B]">
              No garments found
            </h3>
            <p className="text-xs text-[#2B211B] mt-1 max-w-sm mx-auto">
              We couldn't find any products matching your selected filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-[#2B211B] text-[#FFF8ED] text-xs font-semibold rounded-lg hover:bg-[#3D2F27] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
