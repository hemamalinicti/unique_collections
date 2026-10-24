import React from "react";
import { Link } from "react-router-dom";
import { Building2, ArrowRight, MessageCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const WholesaleTeaser = () => {
  const { openWholesaleModal } = useShop();

  return (
    <section className="py-12 sm:py-16 bg-[#2B211B] text-[#FFF8ED] border-y border-[#6F5142]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3D2F27] rounded-3xl p-6 sm:p-10 border border-[#D6B77A]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D6B77A]">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Institutional & Wholesale Portal</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8ED]">
              Direct Factory Wholesale Slabs
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF8ED]/80 max-w-xl">
              Competitive bulk margins starting from 20 pieces. Custom branding, private labeling, and pan-India express transport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/wholesale"
              className="w-full sm:w-auto px-6 py-3 bg-[#D6B77A] hover:bg-[#E9D7AE] text-[#2B211B] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>View Wholesale Slabs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://wa.me/917598723245?text=Hello%20UNIQUE%20Collections,%20I%20have%20a%20B2B%20wholesale%20enquiry."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#FFF8ED] border border-[#25D366]/40 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
