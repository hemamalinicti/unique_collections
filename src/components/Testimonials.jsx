import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/products";

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF4E9] border-t border-[#D6B77A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-widest text-[#2B211B] mb-1">
            Gentlemen's Endorsements
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211B]">
            Client & Wholesale Reviews
          </h2>
          <p className="text-sm text-[#2B211B] mt-2">
            Trusted by individual menswear connoisseurs and multi-store retail merchants across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFF8ED] rounded-2xl p-6 sm:p-7 border border-[#D6B77A]/40 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D6B77A]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6B77A]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#2B211B]/20" />
                </div>

                <p className="text-sm text-[#2B211B] leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#D6B77A]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2B211B]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#2B211B]">{t.role}</p>
                  </div>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[11px] text-[#2B211B]">
                  Order: <span className="font-medium text-[#2B211B]">{t.itemPurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
