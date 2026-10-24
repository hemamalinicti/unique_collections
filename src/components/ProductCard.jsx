import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M";
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : { name: "Standard", hex: "#3B2418" };
    addToCart(product, defaultSize, defaultColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#FFFFFF] rounded-none border border-[#D8BD96]/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image + Wishlist Button */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#EFE3D2]/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs flex items-center justify-center text-[#28170F] hover:text-[#D8BD96] transition-all shadow-sm z-10 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-[#3B2418] text-[#3B2418]" : "stroke-[1.75]"
            }`}
          />
        </button>

        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-[#B71C1C] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-md z-10">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Information: ONLY Name, Price, and Add to Cart Button */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-serif font-bold text-xs sm:text-base text-[#28170F] hover:text-[#3B2418] transition-colors block line-clamp-2 leading-snug sm:leading-normal"
          >
            {product.name}
          </Link>

          {/* Product Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-sm sm:text-xl font-bold text-[#28170F]">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#2B211B]/60 line-through">
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-[#D8BD96]/30">
          <button
            onClick={product.inStock ? handleAddToCart : (e) => e.stopPropagation()}
            disabled={!product.inStock}
            className={`w-full py-2 sm:py-3 px-2 sm:px-4 font-bold text-[10px] sm:text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all duration-300 shadow-sm rounded-none ${
              !product.inStock
                ? "bg-[#D8BD96]/30 text-[#28170F]/50 cursor-not-allowed border border-[#D8BD96]/30"
                : isAdded
                ? "bg-[#2E7D32] text-white cursor-pointer"
                : "bg-[#3B2418] hover:bg-[#4A2E20] text-[#F8F3EA] hover:text-[#FFFFFF] cursor-pointer"
            }`}
          >
            {!product.inStock ? (
              <span>Out of Stock</span>
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4 text-[#FFFFFF]" />
                <span className="hidden sm:inline">Added to Bag!</span><span className="sm:hidden">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#D8BD96]" />
                <span className="hidden sm:inline">Add to Shopping Bag</span><span className="sm:hidden">Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
