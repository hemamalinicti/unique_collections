import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "../components/ProductCard";
import { Heart, ArrowRight, ShoppingBag, ChevronRight } from "lucide-react";

export const WishlistPage = () => {
  const { wishlist, products } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F3EA] min-h-screen py-10 sm:py-16">
      <div className="w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D8BD96]/40">
          <Link to="/" className="hover:text-[#28170F] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D8BD96]" />
          <span className="text-[#28170F] font-semibold">Wishlist ({wishlistedProducts.length})</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#D8BD96]/40">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#2B211B] block mb-1">
              Personal Curations
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#28170F]">
              Your Saved Wishlist
            </h1>
          </div>
          {wishlistedProducts.length > 0 && (
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3B2418] hover:text-[#D8BD96] transition-colors"
            >
              <span>Continue Exploring</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D8BD96]" />
            </Link>
          )}
        </div>

        {/* Wishlist Grid or Empty State */}
        {wishlistedProducts.length > 0 ? (
          <div>
            <p className="text-xs text-[#2B211B] mb-6">
              Showing {wishlistedProducts.length} curated luxury {wishlistedProducts.length === 1 ? "piece" : "pieces"} saved to your account.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#EFE3D2]/40 border border-[#D8BD96]/40 p-12 sm:p-16 text-center max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#EFE3D2] border border-[#D8BD96]/60 flex items-center justify-center mx-auto mb-6 text-[#3B2418]">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#28170F] mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="font-serif text-sm sm:text-base text-[#2B211B] max-w-md mx-auto mb-8 leading-relaxed">
              You haven't saved any luxury menswear pieces yet. Explore our handcrafted Oxford shirts, linen shirts, and tailored trousers.
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center gap-3 bg-[#3B2418] hover:bg-[#4A2E20] text-[#F8F3EA] hover:text-[#FFFFFF] px-9 py-4 font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-md transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8BD96]" />
              <span>Explore Collections</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
