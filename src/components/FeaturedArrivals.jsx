import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";

export const FeaturedArrivals = () => {
  const { products } = useShop();
  // Display only 4 top signature pieces on the Home Page
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-14 sm:py-18 bg-[#F8F3EA] border-t border-[#D8BD96]/40">
      <div className="w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#D8BD96]/40">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#2B211B] block">
              Handpicked Essentials
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#28170F]">
              Featured Menswear
            </h2>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3B2418] hover:text-[#D8BD96] transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
