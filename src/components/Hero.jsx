import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full bg-[#F8F3EA] text-[#28170F] overflow-hidden border-b border-[#D8BD96]/40">
      {/* Background warm ambiance */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_left,rgba(239,227,210,0.65),transparent_75%)]" />
        <div className="absolute bottom-0 left-1/3 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom,rgba(216,189,150,0.18),transparent_70%)]" />
      </div>

      {/* Desktop Right Half: Full-bleed Luxury Fashion Image */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden bg-[#EFE3D2] z-0">
        <img
          src="/hero-luxury-model.jpg"
          alt="UNIQUE COLLECTIONS - Male model in tailored espresso blazer, ivory knit sweater, champagne trousers inside luxury boutique"
          className="w-full h-full object-cover object-[center_12%] xl:object-[center_14%] transform transition-transform duration-700 hover:scale-[1.02]"
          loading="eager"
        />
        {/* Soft edge fade into ivory left half for seamless alignment */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8F3EA] via-[#F8F3EA]/60 to-transparent pointer-events-none" />
        {/* Subtle bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#28170F]/20 to-transparent pointer-events-none" />
      </div>

      {/* Main Aligned Container (Matches Navbar & Site Grid) */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12 min-h-[480px] lg:h-[680px] xl:h-[720px] flex flex-col lg:flex-row items-center">
        
        {/* Left Column: Editorial Typography & Actions */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-0 pr-0 lg:pr-8 xl:pr-12">
          <div className="max-w-xl">
            {/* Eyebrow Label with thin horizontal champagne line */}
            <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#2B211B] font-sans">
                MEN'S CLOTHING STORE
              </span>
              <div className="w-12 sm:w-16 h-px bg-[#D8BD96]" />
            </div>

            {/* Main Heading in large, elegant serif typography (two-line layout) */}
            <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-7xl xl:text-8xl text-[#28170F] leading-[0.96] tracking-tight uppercase mb-5 sm:mb-6">
              UNIQUE<br />
              COLLECTIONS
            </h1>

            {/* Tagline: Uppercase sans-serif with generous letter spacing */}
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#2B211B] mb-4 sm:mb-5">
              TIMELESS STYLE / MODERN YOU
            </p>

            {/* Supporting Description: Approx two lines on desktop */}
            <p className="font-serif text-[#2B211B] text-base sm:text-lg leading-relaxed mb-8 sm:mb-9 max-w-lg">
              Premium men's clothing for every occasion — crafted for comfort, designed for confidence.
            </p>

            {/* Rectangular "SHOP NOW" Button with right-facing arrow */}
            <div>
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center gap-3 bg-[#3B2418] hover:bg-[#4A2E20] text-[#F8F3EA] hover:text-[#FFFFFF] px-9 sm:px-10 py-4 sm:py-4.5 rounded-none font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg shadow-[#3B2418]/15 hover:shadow-xl transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#D8BD96]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Image (< lg) */}
        <div className="block lg:hidden w-full relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-[#EFE3D2] border border-[#D8BD96]/40 shadow-md mb-8">
          <img
            src="/hero-luxury-model.jpg"
            alt="UNIQUE COLLECTIONS - Male model in tailored espresso blazer, ivory knit sweater, champagne trousers inside luxury boutique"
            className="w-full h-full object-cover object-[center_12%]"
          />
        </div>

      </div>
    </section>
  );
};



