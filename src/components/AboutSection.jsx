import React from "react";
import { Award, Compass, HeartHandshake, CheckCircle2 } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#FFF8ED] border-t border-[#D6B77A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D6B77A]/50 aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80"
                  alt="Tailoring craft at UNIQUE Collections"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Heritage overlay card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#2B211B] text-[#FFF8ED] p-5 rounded-2xl shadow-xl border border-[#D6B77A] max-w-xs">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#D6B77A] mb-1">
                  Artisanal Standard
                </div>
                <div className="font-serif text-lg font-bold">
                  Precision in Every Seam
                </div>
                <div className="text-xs text-[#FFF8ED]/80 mt-1">
                  18 Stitches per Inch • Hand-turned Collars • European Mills
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E9] border border-[#D6B77A]/50 text-xs font-semibold text-[#2B211B] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Our Brand Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B211B] leading-tight">
              Crafted for the Man Who Appreciates Distinction.
            </h2>

            <p className="text-sm sm:text-base text-[#2B211B] leading-relaxed">
              Founded with an uncompromising devotion to menswear craftsmanship, <strong className="text-[#2B211B]">UNIQUE Collections</strong> bridges the gulf between high-end sartorial luxury and everyday accessibility.
            </p>

            <p className="text-sm text-[#2B211B] leading-relaxed">
              Whether you are an individual customer curating an impeccable wardrobe or a commercial retail enterprise ordering batch assortments, our vertically integrated manufacturing ensures rigorous quality controls, reliable deliveries, and wholesale margins that empower retailers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF4E9] border border-[#D6B77A]/30">
                <Award className="w-5 h-5 text-[#D6B77A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B211B]">
                    Retail Excellence
                  </h4>
                  <p className="text-xs text-[#2B211B] mt-0.5">
                    Individual single-piece ordering with express delivery, size charts, and easy exchanges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF4E9] border border-[#D6B77A]/30">
                <HeartHandshake className="w-5 h-5 text-[#D6B77A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B211B]">
                    Wholesale Leadership
                  </h4>
                  <p className="text-xs text-[#2B211B] mt-0.5">
                    Tiered pricing from 20 pieces upwards, private labeling, and dedicated account support.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6 text-xs font-semibold text-[#2B211B]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                Direct WhatsApp Hotline
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                Pan-India Express Dispatch
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
