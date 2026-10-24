import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const LookbookSection = () => {
  const { setActiveCategory } = useShop();
  const [activeTab, setActiveTab] = useState(0);

  const looks = [
    {
      title: "The Executive Boardroom",
      subtitle: "Sharp, authoritative, and commanding for marathon conference days.",
      shirt: "Sovereign Royal Aubergine Executive Shirt (Royal Aubergine)",
      trousers: "Mayfair Slate Grey Modern Tailored Trousers (Slate Grey)",
      vibe: "Power Professional",
      image: "/formals/deep-aubergine-executive-shirt.png",
      categoryTarget: "formal-shirts"
    },
    {
      title: "The Mediterranean Riviera",
      subtitle: "Effortless coastal sophistication with retro textured knit drape.",
      shirt: "Capri Textured Knit Striped Cuban Shirt (Sand & Navy)",
      trousers: "Classic Sand Khaki Stretch Cotton Chinos (Desert Sand)",
      vibe: "Smart Casual Elegance",
      image: "/casuals/vintage-knit-striped-resort-shirt.png",
      categoryTarget: "casual-shirts"
    },
    {
      title: "The Gala & Evening Soiree",
      subtitle: "Understated black-tie glamour with high-rise Hollywood waistband drape.",
      shirt: "Cannes Textured Raw Ivory Slub Dress Shirt (Raw Ecru Ivory)",
      trousers: "Sovereign Noir Black High-Rise Dress Trousers (Noir Black)",
      vibe: "Formal Black Tie",
      image: "/trousers/noir-black-high-rise-trousers.png",
      categoryTarget: "tailored-trousers"
    }
  ];

  const currentLook = looks[activeTab];

  const handleShopLook = (target) => {
    setActiveCategory(target);
    const element = document.getElementById("featured-collections");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF8ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#D6B77A]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#2B211B] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Sartorial Lookbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211B]">
              The Art of Ensemble Dressing
            </h2>
          </div>

          {/* Lookbook Tabs */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 overflow-x-auto pb-1">
            {looks.map((look, idx) => (
              <button
                key={look.title}
                onClick={() => setActiveTab(idx)}
                className={`text-xs px-4 py-2 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#2B211B] text-[#FFF8ED]"
                    : "bg-[#FAF4E9] text-[#2B211B] hover:bg-[#D6B77A]/20"
                }`}
              >
                {look.vibe}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Ensemble View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF4E9] rounded-3xl p-6 sm:p-10 border border-[#D6B77A]/40 shadow-lg">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6B77A] bg-[#2B211B] px-3 py-1 rounded-full">
              {currentLook.vibe}
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B211B]">
              {currentLook.title}
            </h3>

            <p className="text-sm sm:text-base text-[#2B211B] leading-relaxed">
              {currentLook.subtitle}
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-[#FFF8ED] rounded-xl border border-[#D6B77A]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#2B211B] block">
                    Upper Garment
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#2B211B]">
                    {currentLook.shirt}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#D6B77A]">Curated</span>
              </div>

              <div className="p-3.5 bg-[#FFF8ED] rounded-xl border border-[#D6B77A]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#2B211B] block">
                    Trouser Pairing
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#2B211B]">
                    {currentLook.trousers}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#D6B77A]">Curated</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleShopLook(currentLook.categoryTarget)}
                className="inline-flex items-center gap-2 bg-[#2B211B] hover:bg-[#6F5142] text-[#FFF8ED] px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>Shop This Silhouette</span>
                <ArrowRight className="w-4 h-4 text-[#D6B77A]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-2xl border-2 border-[#D6B77A]/50">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
