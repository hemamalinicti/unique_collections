import React from "react";
import { Building2, Layers, CheckCircle2, MessageCircle, FileText, ArrowRight } from "lucide-react";
import { WHOLESALE_TIERS } from "../data/products";
import { useShop } from "../context/ShopContext";

export const WholesaleBanner = () => {
  const { openWholesaleModal } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#2B211B] text-[#FFF8ED] relative overflow-hidden border-y border-[#6F5142]/50">
      {/* Background patterns */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D6B77A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6F5142]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Intro */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2F27] border border-[#D6B77A]/40 text-xs font-semibold text-[#D6B77A] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B & Wholesale Division</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FFF8ED] leading-tight">
              Direct-from-Source <span className="text-[#D6B77A] italic">Wholesale</span> & Bulk Solutions.
            </h2>

            <p className="text-sm sm:text-base text-[#FFF8ED]/80 leading-relaxed">
              Are you an apparel retailer, boutique proprietor, or corporate procurement officer? UNIQUE Collections supplies high-precision menswear at competitive wholesale margins with flexible batch quantities.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#FFF8ED]/90 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0" />
                <span>Transparent Wholesale Slabs starting from 20 pieces</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0" />
                <span>Custom Brand Labeling, Hangtags & Bespoke Packaging</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0" />
                <span>GST Compliant Invoicing & Express Pan-India Transport</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0" />
                <span>Direct WhatsApp Wholesale Concierge Support</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => openWholesaleModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D6B77A] hover:bg-[#E9D7AE] text-[#2B211B] px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request Wholesale Catalog & Slabs</span>
              </button>

              <a
                href="https://wa.me/917598723245?text=Hello%20UNIQUE%20Collections,%20I%20am%20interested%20in%20placing%20a%20B2B%20Wholesale%20Order."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#FFF8ED] border border-[#25D366]/40 px-5 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp Wholesale Desk</span>
              </a>
            </div>
          </div>

          {/* Right Tier Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WHOLESALE_TIERS.map((tier, idx) => (
                <div
                  key={tier.range}
                  className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 relative ${
                    idx === 1
                      ? "bg-[#3D2F27] border-[#D6B77A] shadow-xl sm:-translate-y-2"
                      : "bg-[#1D1510] border-[#6F5142]/60 hover:border-[#D6B77A]/50"
                  }`}
                >
                  {idx === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D6B77A] text-[#2B211B] text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B77A] mb-2">
                      <Layers className="w-4 h-4" />
                      <span>{tier.range}</span>
                    </div>

                    <div className="font-serif text-xl sm:text-2xl font-bold text-[#FFF8ED] mb-3">
                      {tier.discount}
                    </div>

                    <div className="text-xs text-[#FFF8ED]/70 space-y-1.5 pt-2 border-t border-[#6F5142]/40">
                      <div>
                        Dispatch: <span className="text-[#FFF8ED] font-medium">{tier.leadTime}</span>
                      </div>
                      <div>Sample swatch book provided</div>
                      <div>Assorted sizes & colors allowed</div>
                    </div>
                  </div>

                  <button
                    onClick={() => openWholesaleModal()}
                    className="mt-6 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border border-[#D6B77A]/40 text-[#D6B77A] hover:bg-[#D6B77A] hover:text-[#2B211B] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Enquire Tier</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Banner Footer Info */}
            <div className="mt-6 p-4 rounded-xl bg-[#1D1510]/80 border border-[#6F5142]/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF8ED]/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6B77A]" />
                Direct supply for Multi-Brand Outlets (MBOs) & Corporate Gifting
              </span>
              <span className="text-[#D6B77A] font-semibold">Minimum MOQ: 20 pcs assorted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
