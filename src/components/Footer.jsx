import { BrandLogo } from "./BrandLogo";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck, Shield, X, FileText } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const Footer = () => {
  const { setActiveCategory } = useShop();
  const [legalModal, setLegalModal] = useState(null); // "privacy" | "terms" | null

  return (
    <>
      <footer className="bg-[#28170F] text-[#F8F3EA] pt-14 pb-8 border-t border-[#3B2418]">
        <div className="w-full max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Symmetrical 4-Column Footer Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-5 gap-y-8 sm:gap-8 lg:gap-10 pb-12 border-b border-[#3B2418] text-xs">
            {/* Col 1: Brand Info (4 cols) */}
            <div className="col-span-2 lg:col-span-4 space-y-4">
              <BrandLogo variant="footer" />

              <p className="text-xs text-[#F8F3EA]/80 leading-relaxed max-w-sm">
                Dedicated to impeccable craftsmanship, certified Egyptian long-staple cotton, European flax linen, and tailored pleated trousers for individual gentlemen and institutional wholesale partners.
              </p>

              <div className="pt-1 flex items-center gap-2 text-[11px] text-[#D8BD96]">
                <ShieldCheck className="w-4 h-4 text-[#D8BD96]" />
                <span>100% Certified Mills • Zero Synthetics</span>
              </div>
            </div>

            {/* Col 2: Menswear Collections (2 cols) */}
            <div className="col-span-1 lg:col-span-3 space-y-3.5">
              <h4 className="font-serif text-sm font-bold text-[#D8BD96] uppercase tracking-wider">
                Collections
              </h4>
              <ul className="space-y-2.5 text-[#FFF8ED]/80">
                <li>
                  <Link
                    to="/shop"
                    onClick={() => setActiveCategory("formal-shirts")}
                    className="hover:text-[#D6B77A] transition-colors"
                  >
                    Formal Oxford Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    onClick={() => setActiveCategory("casual-shirts")}
                    className="hover:text-[#D6B77A] transition-colors"
                  >
                    Pure Italian Linen Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    onClick={() => setActiveCategory("tailored-trousers")}
                    className="hover:text-[#D6B77A] transition-colors"
                  >
                    Pleated Sartorial Trousers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    onClick={() => setActiveCategory("chinos-pants")}
                    className="hover:text-[#D6B77A] transition-colors"
                  >
                    Stretch Chinos & Denim
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    onClick={() => setActiveCategory("all")}
                    className="hover:text-[#D6B77A] transition-colors font-semibold text-[#FFF8ED] inline-flex items-center gap-1"
                  >
                    <span>View Entire Catalog</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Client Care & Policies (2.5 cols) */}
            <div className="col-span-1 lg:col-span-2 space-y-3.5">
              <h4 className="font-serif text-sm font-bold text-[#D6B77A] uppercase tracking-wider">
                Client Care
              </h4>
              <ul className="space-y-2.5 text-[#FFF8ED]/80">
                <li>
                  <Link
                    to="/wholesale"
                    className="hover:text-[#D6B77A] transition-colors flex items-center gap-1.5"
                  >
                    <span>Wholesale Slabs</span>
                    <span className="bg-[#D6B77A] text-[#2B211B] text-[9px] font-bold px-1.5 py-0.2 rounded">B2B</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#D6B77A] transition-colors">
                    About Our Craft
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#D6B77A] transition-colors">
                    Size Guidance & FAQ
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModal("privacy")}
                    className="hover:text-[#D6B77A] transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModal("terms")}
                    className="hover:text-[#D6B77A] transition-colors text-left cursor-pointer"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-[#D6B77A] transition-colors inline-flex items-center gap-1 text-[#D6B77A]"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Studio Contact & Support (3.5 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-serif text-sm font-bold text-[#D6B77A] uppercase tracking-wider">
                Concierge & Studio
              </h4>
              <div className="space-y-2.5 text-[#FFF8ED]/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D6B77A] shrink-0 mt-0.5" />
                  <span>UNIQUE Collections Flagship Studio & Garment Manufacturing Hub, Tirupur, Tamil Nadu — 641604</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D6B77A] shrink-0" />
                  <a href="mailto:concierge@uniquecollections.com" className="hover:text-[#D6B77A]">
                    concierge@uniquecollections.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D6B77A] shrink-0" />
                  <a href="https://wa.me/917598723245" target="_blank" rel="noreferrer" className="hover:text-[#D6B77A]">
                    +91 98765 43210 (WhatsApp Hotline)
                  </a>
                </div>
                <div className="pt-1.5 flex items-center gap-2 text-[10px] text-[#D6B77A]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit Encrypted SSL Checkout Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Cleanly Aligned with Privacy Policy & Terms */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#FFF8ED]/75">
            <div>
              © 2026 UNIQUE Collections. All rights reserved.
            </div>

            {/* Privacy Policy & Terms and Conditions links */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-[#FFF8ED]/80">
              <button
                onClick={() => setLegalModal("privacy")}
                className="hover:text-[#D6B77A] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-[#2B211B]">|</span>
              <button
                onClick={() => setLegalModal("terms")}
                className="hover:text-[#D6B77A] transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal for Privacy Policy & Terms */}
      {legalModal && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setLegalModal(null)}
          />

          <div className="relative bg-[#FFF8ED] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D6B77A] z-10 my-8 text-[#2B211B] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2B211B] text-[#FFF8ED] flex items-center justify-center hover:bg-[#6F5142] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {legalModal === "privacy" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6B77A]">
                  <FileText className="w-4 h-4" />
                  <span>Legal & Confidentiality</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B211B]">
                  Privacy Policy
                </h3>
                <p className="text-xs text-[#2B211B]">
                  Last Updated: October 2026 • UNIQUE Collections
                </p>

                <div className="space-y-3 text-xs text-[#2B211B]/90 leading-relaxed pt-2 border-t border-[#D6B77A]/30">
                  <h4 className="font-bold text-sm text-[#2B211B]">1. Information Collection</h4>
                  <p>
                    We collect personal information necessary to fulfill your retail garment orders and institutional wholesale inquiries, including your name, contact phone number, shipping address, and email.
                  </p>

                  <h4 className="font-bold text-sm text-[#2B211B]">2. Use of Your Data</h4>
                  <p>
                    Your data is solely used to dispatch orders, calculate delivery times, provide WhatsApp order updates, and coordinate wholesale price quotations. We never sell, rent, or trade your personal information to third-party advertisers.
                  </p>

                  <h4 className="font-bold text-sm text-[#2B211B]">3. Payment Security</h4>
                  <p>
                    All digital transactions are encrypted via industry-standard SSL encryption. We do not store sensitive credit card or UPI credentials on our servers.
                  </p>

                  <h4 className="font-bold text-sm text-[#2B211B]">4. WhatsApp Communication</h4>
                  <p>
                    By engaging our WhatsApp concierge hotline, you consent to receive order status updates, size recommendations, and wholesale quotations directly on your registered WhatsApp account.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6B77A]/30 text-right">
                  <button
                    onClick={() => setLegalModal(null)}
                    className="px-5 py-2.5 bg-[#2B211B] text-[#FFF8ED] text-xs font-bold rounded-xl"
                  >
                    Close Policy
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6B77A]">
                  <FileText className="w-4 h-4" />
                  <span>Commercial & Operating Agreement</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B211B]">
                  Terms & Conditions
                </h3>
                <p className="text-xs text-[#2B211B]">
                  Last Updated: October 2026 • UNIQUE Collections
                </p>

                <div className="space-y-3 text-xs text-[#2B211B]/90 leading-relaxed pt-2 border-t border-[#D6B77A]/30">
                  <h4 className="font-bold text-sm text-[#2B211B]">1. Retail Orders & Delivery</h4>
                  <p>
                    Orders are processed upon verification. Complimentary domestic express delivery applies to all orders valued at ₹1,999 or above. Orders below this amount are subject to a flat fee of ₹149.
                  </p>

                  <h4 className="font-bold text-sm text-[#2B211B]">2. Sizing & 7-Day Fit Guarantee</h4>
                  <p>
                    If a collar, sleeve length, or trouser waist size does not fit comfortably, customers are entitled to a one-time complimentary size exchange within 7 calendar days of receipt, provided tags and original condition are maintained.
                  </p>

                  <h4 className="font-bold text-sm text-[#2B211B]">3. Wholesale & B2B Purchase Terms</h4>
                  <p>
                    Wholesale pricing tiers require minimum order quantities (starting from 20 pieces). B2B batch production schedules and custom branding orders are governed by mutually agreed quotation slabs and GST invoicing.
                  </p>

                  <h4 className="font-bold text-sm text-[#2B211B]">4. Textile Natural Attributes</h4>
                  <p>
                    Natural fibers (Egyptian Giza cotton, pure flax linen, and raw wool) possess unique weave characteristics. Minor slubs in pure linen reflect genuine artisanal weaving rather than manufacturing defects.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6B77A]/30 text-right">
                  <button
                    onClick={() => setLegalModal(null)}
                    className="px-5 py-2.5 bg-[#2B211B] text-[#FFF8ED] text-xs font-bold rounded-xl"
                  >
                    Accept & Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
