import React, { useState, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES } from "../data/products";
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export const ShopPage = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setSearchQuery, openWholesaleModal } = useShop();

  const [selectedCategory, setSelectedCategory] = useState(activeCategory || "all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedFabric, setSelectedFabric] = useState("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync selectedCategory whenever activeCategory in context changes
  React.useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  const fabrics = ["all", "Cotton", "Linen", "Wool", "Denim"];

  // Compute live category counts based on current products state
  const dynamicCategories = useMemo(() => {
    return [
      { id: "all", name: "All Collections", count: products.length },
      {
        id: "formal-shirts",
        name: "Formal Shirts",
        count: products.filter(
          (p) => p.categorySlug === "formal-shirts" || (p.category && p.category.toLowerCase().includes("formal"))
        ).length
      },
      {
        id: "casual-shirts",
        name: "Casual Shirts",
        count: products.filter(
          (p) => p.categorySlug === "casual-shirts" || (p.category && p.category.toLowerCase().includes("casual"))
        ).length
      },
      {
        id: "tailored-trousers",
        name: "Tailored Trousers",
        count: products.filter(
          (p) => p.categorySlug === "tailored-trousers" || (p.category && p.category.toLowerCase().includes("trouser"))
        ).length
      },
      {
        id: "chinos-pants",
        name: "Chinos & Pants",
        count: products.filter(
          (p) => p.categorySlug === "chinos-pants" || (p.category && (p.category.toLowerCase().includes("chino") || p.category.toLowerCase().includes("pant")))
        ).length
      }
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all") {
          const cat = (product.category || "").toLowerCase();
          const matchesCat =
            product.categorySlug === selectedCategory ||
            (selectedCategory === "formal-shirts" && cat.includes("formal")) ||
            (selectedCategory === "casual-shirts" && cat.includes("casual")) ||
            (selectedCategory === "tailored-trousers" && cat.includes("trouser")) ||
            (selectedCategory === "chinos-pants" && (cat.includes("chino") || cat.includes("pant")));
          if (!matchesCat) return false;
        }
        // Price filter
        if (Number(product.price) > maxPrice) {
          return false;
        }
        // Fabric filter
        if (selectedFabric !== "all" && !(product.fabric || "").toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            (product.name || "").toLowerCase().includes(q) ||
            (product.category || "").toLowerCase().includes(q) ||
            (product.fabric || "").toLowerCase().includes(q) ||
            (product.tagline || "").toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [products, selectedCategory, maxPrice, selectedFabric, searchQuery, sortBy]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setActiveCategory(catId);
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setActiveCategory("all");
    setMaxPrice(1000);
    setSelectedFabric("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8 pb-6 border-b border-[#D6B77A]/30">
          <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-2">
            <Link to="/" className="hover:text-[#2B211B] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2B211B] font-semibold">Collections</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B211B]">
                The Menswear Catalog
              </h1>
              <p className="text-sm text-[#2B211B] mt-1.5 max-w-xl">
                Explore handcrafted formal shirts, pure linen casuals, pleated wool trousers, and chinos. Transparent retail and wholesale slab pricing.
              </p>
            </div>

            {/* Wholesale Quick Action */}
            <button
              onClick={() => openWholesaleModal()}
              className="inline-flex items-center gap-2 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] px-4 py-2.5 rounded-full text-xs font-semibold border border-[#D6B77A] shadow-sm cursor-pointer shrink-0"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Bulk / Wholesale Pricing</span>
            </button>
          </div>
        </div>

                {/* Mobile Horizontal Category Scroller */}
        <div className="lg:hidden mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {dynamicCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#2B211B] text-[#FFF8ED] shadow-sm"
                    : "bg-[#FAF4E9] text-[#2B211B] border border-[#D6B77A]/50 hover:bg-[#FFF8ED]"
                }`}
              >
                <span>{cat.name}</span>
                <span className="ml-1 text-[10px] opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#FAF4E9] p-5 rounded-2xl border border-[#D6B77A]/40 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-[#D6B77A]/30">
                <span className="font-serif font-bold text-sm text-[#2B211B] flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-[#D6B77A]" />
                  Filter Silhouettes
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#2B211B] hover:text-[#2B211B] underline cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B211B] mb-2.5">
                  Category
                </label>
                <div className="space-y-1.5">
                  {dynamicCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-[#2B211B] text-[#FFF8ED] font-semibold"
                          : "text-[#2B211B] hover:bg-[#FFF8ED]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-75">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-2 border-t border-[#D6B77A]/30">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-[#2B211B]">Max Price</span>
                  <span className="font-bold text-[#2B211B]">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2B211B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#2B211B] mt-1">
                  <span>₹500</span>
                  <span>₹1,000</span>
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="pt-2 border-t border-[#D6B77A]/30">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B211B] mb-2">
                  Textile Composition
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {fabrics.map((fab) => (
                    <button
                      key={fab}
                      onClick={() => setSelectedFabric(fab)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        selectedFabric === fab
                          ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B] font-semibold"
                          : "bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/50 hover:border-[#2B211B]"
                      }`}
                    >
                      {fab === "all" ? "All Textiles" : fab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wholesale Callout in Sidebar */}
              <div className="pt-4 border-t border-[#D6B77A]/30 p-3 bg-[#FFF8ED] rounded-xl border border-[#D6B77A]/50 text-xs text-[#2B211B]">
                <div className="font-bold text-[#2B211B] uppercase text-[10px] tracking-wider mb-1">
                  B2B Tier Available
                </div>
                <p className="text-[11px] text-[#2B211B] leading-tight">
                  All catalog items support bulk wholesale orders from 20 pieces with up to 49% off retail.
                </p>
                <button
                  onClick={() => openWholesaleModal()}
                  className="mt-2 text-xs font-bold text-[#D6B77A] hover:underline block"
                >
                  Request Price Sheet &rarr;
                </button>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Bar Controls */}
            <div className="bg-[#FAF4E9] p-3.5 sm:p-4 rounded-2xl border border-[#D6B77A]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#2B211B] text-[#FFF8ED] rounded-lg font-semibold"
                >
                  <Filter className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>Filters</span>
                </button>

                <span className="text-[#2B211B]">
                  Showing <strong className="text-[#2B211B]">{filteredProducts.length}</strong> styles
                </span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-[#FFF8ED] px-3 py-1.5 rounded-xl border border-[#D6B77A]/50 ml-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D6B77A]" />
                <label htmlFor="shop-sort" className="sr-only">Sort products</label>
                <select
                  id="shop-sort"
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

            {/* Active Filters Display */}
            {(selectedCategory !== "all" || selectedFabric !== "all" || searchQuery || maxPrice < 1000) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#2B211B]">Active:</span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-[#2B211B] text-[#FFF8ED] px-2.5 py-0.5 rounded-full text-[11px]">
                    {dynamicCategories.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => handleCategoryChange("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedFabric !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-[#2B211B] text-[#FFF8ED] px-2.5 py-0.5 rounded-full text-[11px]">
                    {selectedFabric}
                    <button onClick={() => setSelectedFabric("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-[#2B211B] text-[#FFF8ED] px-2.5 py-0.5 rounded-full text-[11px]">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button onClick={clearAllFilters} className="text-xs text-[#2B211B] hover:text-[#2B211B] underline ml-2">
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#FAF4E9] rounded-2xl border border-dashed border-[#D6B77A]">
                <SlidersHorizontal className="w-10 h-10 text-[#2B211B] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#2B211B]">No garments match criteria</h3>
                <p className="text-xs text-[#2B211B] mt-1 max-w-sm mx-auto">
                  Try adjusting the maximum price or selecting "All Collections".
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-5 py-2.5 bg-[#2B211B] text-[#FFF8ED] text-xs font-semibold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-[#FAF4E9] text-[#2B211B] h-full shadow-2xl flex flex-col p-5 z-10 overflow-y-auto border-l border-[#D6B77A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6B77A]/40">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#D6B77A]" />
                <span className="font-serif font-bold text-base text-[#2B211B]">
                  Filter Silhouettes
                </span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-[#2B211B] hover:text-[#D6B77A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Scrollable Body */}
            <div className="py-4 space-y-6 flex-1 overflow-y-auto">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B211B] mb-2">
                  Category
                </label>
                <div className="space-y-1.5">
                  {dynamicCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-[#2B211B] text-[#FFF8ED] font-semibold"
                          : "text-[#2B211B] hover:bg-[#FFF8ED]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-75">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-3 border-t border-[#D6B77A]/30">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-[#2B211B]">Max Price</span>
                  <span className="font-bold text-[#2B211B]">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2B211B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#2B211B] mt-1">
                  <span>₹500</span>
                  <span>₹1,000</span>
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="pt-3 border-t border-[#D6B77A]/30">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B211B] mb-2">
                  Textile Composition
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {fabrics.map((fab) => (
                    <button
                      key={fab}
                      onClick={() => setSelectedFabric(fab)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        selectedFabric === fab
                          ? "bg-[#2B211B] text-[#FFF8ED] border-[#2B211B] font-semibold"
                          : "bg-[#FFF8ED] text-[#2B211B] border-[#D6B77A]/50"
                      }`}
                    >
                      {fab === "all" ? "All Textiles" : fab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#D6B77A]/40 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="px-3.5 py-2.5 border border-[#D6B77A] text-[#2B211B] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#2B211B] text-[#FFF8ED] rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer hover:bg-[#3D2F27]"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
