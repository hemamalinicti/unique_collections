import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "../components/ProductCard";
import { Search, ChevronRight, X, Sparkles } from "lucide-react";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  
  const { products, searchQuery, setSearchQuery } = useShop();
  const [localQuery, setLocalQuery] = useState(urlQuery || searchQuery || "");

  useEffect(() => {
    if (urlQuery) {
      setLocalQuery(urlQuery);
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(localQuery.trim() ? { q: localQuery.trim() } : {});
    setSearchQuery(localQuery.trim());
  };

  const handleTagClick = (tag) => {
    setLocalQuery(tag);
    setSearchQuery(tag);
    setSearchParams({ q: tag });
  };

  const currentQuery = (localQuery || searchQuery).trim().toLowerCase();

  const filteredProducts = currentQuery
    ? products.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(currentQuery) ||
          (p.category || "").toLowerCase().includes(currentQuery) ||
          (p.tagline || "").toLowerCase().includes(currentQuery) ||
          (p.fabric || "").toLowerCase().includes(currentQuery)
      )
    : [];

  const popularTags = [
    "Oxford Shirt",
    "Italian Linen",
    "Tailored Trousers",
    "Chinos",
    "Giza Cotton",
    "Formal",
    "Casual"
  ];

  return (
    <div className="bg-[#F8F3EA] min-h-screen py-10 sm:py-16">
      <div className="w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D8BD96]/40">
          <Link to="/" className="hover:text-[#28170F] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D8BD96]" />
          <span className="text-[#28170F] font-semibold">Search Collection</span>
        </div>

        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#2B211B] block mb-2">
            Instant Catalog Search
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#28170F] mb-6">
            Find Your Signature Style
          </h1>

          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg">
            <Search className="absolute left-4.5 w-5 h-5 text-[#2B211B]" />
            <input
              type="text"
              placeholder="Search by garment, fabric, fit, or style (e.g. Linen, Oxford, Pleated)..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                setSearchQuery(e.target.value);
              }}
              autoFocus
              className="w-full bg-[#FFFFFF] border-2 border-[#D8BD96] text-[#28170F] placeholder-[#2B211B]/50 pl-12 pr-28 py-4 text-sm sm:text-base rounded-none focus:outline-none focus:border-[#3B2418] transition-colors"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalQuery("");
                  setSearchQuery("");
                  setSearchParams({});
                }}
                className="absolute right-20 text-xs text-[#2B211B] hover:text-[#28170F] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-6 bg-[#3B2418] hover:bg-[#4A2E20] text-[#F8F3EA] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Search
            </button>
          </form>

          {/* Popular Search Suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[#2B211B] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D8BD96]" /> Popular:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-none border text-[11px] font-medium transition-all cursor-pointer ${
                  currentQuery === tag.toLowerCase()
                    ? "bg-[#3B2418] text-[#F8F3EA] border-[#3B2418]"
                    : "bg-[#EFE3D2]/60 hover:bg-[#EFE3D2] text-[#28170F] border-[#D8BD96]/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {currentQuery ? (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D8BD96]/40">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#28170F]">
                Search Results for <span className="italic text-[#3B2418]">"{currentQuery}"</span>
              </h2>
              <span className="text-xs font-semibold text-[#2B211B]">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Product Found" : "Products Found"}
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-[#EFE3D2]/40 border border-[#D8BD96]/40 p-12 text-center max-w-xl mx-auto my-8">
                <p className="font-serif text-xl font-bold text-[#28170F] mb-2">
                  No styles matched your search
                </p>
                <p className="font-serif text-xs sm:text-sm text-[#2B211B] mb-6">
                  Try searching for general terms like "cotton", "linen", "shirt", or "trousers".
                </p>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 bg-[#3B2418] text-[#F8F3EA] px-6 py-3 font-sans font-bold text-xs uppercase tracking-wider rounded-none hover:bg-[#4A2E20] transition-colors"
                >
                  <span>Browse All Collections</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-3 border-b border-[#D8BD96]/40">
              <h2 className="font-serif text-xl font-bold text-[#28170F]">
                Recommended Menswear Essentials
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
