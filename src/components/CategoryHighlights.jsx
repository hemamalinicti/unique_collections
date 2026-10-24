import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const CategoryHighlights = () => {
  const navigate = useNavigate();
  const { setActiveCategory } = useShop();

  const categories = [
    {
      id: "formal-shirts",
      name: "Formal Shirts",
      tagline: "Executive sateen, linen & raw slub weaves",
      image: "/formals/deep-aubergine-executive-shirt.png"
    },
    {
      id: "casual-shirts",
      name: "Casual Shirts",
      tagline: "Resort knits, brush prints & tartan twills",
      image: "/casuals/vintage-knit-striped-resort-shirt.png"
    },
    {
      id: "tailored-trousers",
      name: "Tailored Trousers",
      tagline: "Super 130s wool, cuffed hems & sharp pleats",
      image: "/trousers/ecru-stone-sartorial-trousers.png"
    },
    {
      id: "chinos-pants",
      name: "Chinos & Pants",
      tagline: "Stretch twill chinos, corduroys & utility cargos",
      image: "/chinos/classic-sand-khaki-chinos.jpg"
    }
  ];

  const handleSelect = (slug) => {
    setActiveCategory(slug);
    navigate("/shop");
  };

  return (
    <section className="py-14 sm:py-16 bg-[#F8F3EA]">
      <div className="w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#D8BD96]/40">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#2B211B] block">
              Curated Lines
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#28170F]">
              Shop By Category
            </h2>
          </div>
          <button
            onClick={() => handleSelect("all")}
            className="text-xs font-bold uppercase tracking-wider text-[#3B2418] hover:text-[#D8BD96] transition-colors cursor-pointer"
          >
            All Collections &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D6B77A]/30"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B211B] via-[#2B211B]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                <div className="self-end w-7 h-7 rounded-full bg-[#FFF8ED] text-[#2B211B] flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-[#D6B77A] transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFF8ED] group-hover:text-[#D6B77A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#FFF8ED]/80 mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
