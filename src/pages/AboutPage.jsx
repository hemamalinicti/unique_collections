import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const AboutPage = () => {
  const { openWholesaleModal } = useShop();

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D6B77A]/30">
          <Link to="/" className="hover:text-[#2B211B]">Home</Link>
          <span>/</span>
          <span className="text-[#2B211B] font-semibold">About Us</span>
        </div>

        {/* Hero Section of About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E9] border border-[#D6B77A]/50 text-xs font-semibold text-[#2B211B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Heritage & Vision</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B211B] leading-tight">
              Crafting Sartorial Distinction for the Modern Gentleman.
            </h1>

            <p className="text-base text-[#2B211B] leading-relaxed">
              <strong className="text-[#2B211B]">UNIQUE Collections</strong> is an elevated e-commerce menswear platform specializing in high-precision shirts, trousers, chinos, and pants. Designed to serve individual retail shoppers as well as high-volume commercial wholesale partners.
            </p>

            <p className="text-sm text-[#2B211B] leading-relaxed">
              Our core objective is to deliver an unmatched standard of fabric integrity, tailored fit, and seamless digital commerce. Powered by a modern architecture, we empower gentlemen to shop with certainty and empower retail businesses with profitable wholesale supply.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="px-6 py-3.5 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#D6B77A]" />
              </Link>
              <button
                onClick={() => openWholesaleModal()}
                className="px-6 py-3.5 bg-transparent border-2 border-[#2B211B] hover:bg-[#FAF4E9] text-[#2B211B] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Wholesale Portal
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D6B77A]/50 aspect-4/5">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="UNIQUE Collections Menswear"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars of Distinction with Real Shirts & Pants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1: Artisanal Tailoring (Formal Shirts & Trousers) */}
          <div className="rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
            <div className="relative aspect-4/3 overflow-hidden bg-[#2B211B]/10">
              <img
                src="/formals/deep-aubergine-executive-shirt.png"
                alt="Artisanal Tailored Shirts & Trousers"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-7 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2B211B]">
                  Artisanal Tailoring
                </h3>
                <p className="text-xs sm:text-sm text-[#2B211B] leading-relaxed mt-2">
                  Pioneering modern patterns that preserve traditional Italian and Savile Row tailoring while integrating contemporary ergonomic stretch fabrics for everyday Indian professional wear.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 2: Certified Textiles (Linen & Cotton Casual Shirts) */}
          <div className="rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
            <div className="relative aspect-4/3 overflow-hidden bg-[#2B211B]/10">
              <img
                src="/casuals/vintage-knit-striped-resort-shirt.png"
                alt="Certified Textiles & Casual Shirts"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-7 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2B211B]">
                  Certified Textiles
                </h3>
                <p className="text-xs sm:text-sm text-[#2B211B] leading-relaxed mt-2">
                  Sourced from certified natural European flax and compact combed cotton mills, creating ultra-breathable shirts and chinos engineered for all-season comfort across Indian climates.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 3: Modern Fit & Supply (Tailored Trousers & Pants) */}
          <div className="rounded-2xl bg-[#FAF4E9] border border-[#D6B77A]/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
            <div className="relative aspect-4/3 overflow-hidden bg-[#2B211B]/10">
              <img
                src="/trousers/slate-grey-tailored-trousers.png"
                alt="Modern Fit Tailored Trousers & Pants"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-7 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2B211B]">
                  Modern Fit & Supply
                </h3>
                <p className="text-xs sm:text-sm text-[#2B211B] leading-relaxed mt-2">
                  Precision-cut waistbands with internal shirt grips and sharp front creases. Instant WhatsApp ordering and reliable wholesale dispatch for boutiques across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Promise & Quality Standards Banner */}
        <div className="bg-[#1A1009] text-[#FFF8ED] rounded-3xl p-8 sm:p-12 border border-[#D6B77A]/40 shadow-2xl relative overflow-hidden">
          {/* Background Image: Trousers on Wooden Hangers */}
          <img
            src="/sartorial-banner-bg.png"
            alt="Sartorial Quality Standards Trousers"
            className="absolute inset-0 w-full h-full object-cover object-center sm:object-right transition-transform duration-700 hover:scale-105"
          />

          {/* Smooth Directional Gradient: Darker on text side for contrast, clear on right for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xs border border-[#D6B77A]/50 text-xs font-semibold text-[#D6B77A] uppercase tracking-wider mb-4 shadow-sm">
              Our Sartorial Standard
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8ED] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Uncompromising Quality in Every Single Stitch
            </h2>

            <p className="text-xs sm:text-sm text-[#FFF8ED]/90 leading-relaxed mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              From individual custom sizing to large-scale boutique deliveries, UNIQUE Collections adheres to international luxury standards. Every fabric undergoes rigorous tensile, color-fastness, and shrinkage testing before reaching the cutting table.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#FFF8ED]/90">
              <div className="p-4 bg-black/60 backdrop-blur-xs rounded-xl border border-[#D6B77A]/40 shadow-md">
                <span className="text-[#D6B77A] font-semibold block uppercase text-[10px]">Fabric Integrity</span>
                <span className="text-sm font-bold text-[#FFF8ED]">100% Certified Mills</span>
                <span className="block text-[#FFF8ED]/75 text-[11px]">Egyptian Giza & Pure Flax</span>
              </div>

              <div className="p-4 bg-black/60 backdrop-blur-xs rounded-xl border border-[#D6B77A]/40 shadow-md">
                <span className="text-[#D6B77A] font-semibold block uppercase text-[10px]">Fit Guarantee</span>
                <span className="text-sm font-bold text-[#FFF8ED]">7-Day Exchange</span>
                <span className="block text-[#FFF8ED]/75 text-[11px]">Hassle-free collar & waist adjustment</span>
              </div>

              <div className="p-4 bg-black/60 backdrop-blur-xs rounded-xl border border-[#D6B77A]/40 shadow-md">
                <span className="text-[#D6B77A] font-semibold block uppercase text-[10px]">Supply Chain</span>
                <span className="text-sm font-bold text-[#FFF8ED]">Direct-from-Maker</span>
                <span className="block text-[#FFF8ED]/75 text-[11px]">Zero Middleman Markups</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#FFF8ED] drop-shadow-sm font-medium">
              <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#D6B77A]/30">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                Direct WhatsApp Concierge
              </span>
              <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#D6B77A]/30">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                Pan-India Express Logistics
              </span>
              <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#D6B77A]/30">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                Institutional B2B Invoicing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
