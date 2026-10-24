import React from "react";
import { Gem, Scissors, Percent, Award } from "lucide-react";

export const ValueProps = () => {
  const pillars = [
    {
      icon: Gem,
      title: "Imperial Quality Fibers",
      description:
        "From certified 120s two-ply Egyptian Giza cotton to Belgian linen and Japanese shuttle loom selvedge denim, our textiles deliver supreme breathability and drape."
    },
    {
      icon: Scissors,
      title: "Master Sartorial Craft",
      description:
        "Every seam features 18 stitches per inch, reinforced split-yokes, natural mother-of-pearl buttons, and hand-finished trouser hems built for longevity."
    },
    {
      icon: Percent,
      title: "Direct-from-Maker Rates",
      description:
        "By eliminating superfluous middlemen, we provide premium European-grade menswear at honest retail prices and unmatched wholesale profit margins."
    },
    {
      icon: Award,
      title: "Fit & Satisfaction Promise",
      description:
        "Tailored for modern body types with true-to-size dimensions. Complimentary exchanges and personal styling support via our WhatsApp concierge."
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF4E9] border-b border-[#D6B77A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-widest text-[#2B211B] mb-1">
            The Unique Distinction
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B211B]">
            Why Modern Gentlemen Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFF8ED] rounded-2xl p-6 border border-[#D6B77A]/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2B211B] text-[#D6B77A] flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#2B211B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B211B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D6B77A]/20 text-[11px] font-bold text-[#D6B77A] uppercase tracking-wider">
                  0{idx + 1} / Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
