import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Layers, CheckCircle2, FileText, MessageCircle, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { WHOLESALE_TIERS } from "../data/products";

export const WholesalePage = () => {
  const { openWholesaleModal } = useShop();

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("All Menswear Range");
  const [quantity, setQuantity] = useState("50 - 199 Pieces");
  const { addWholesaleInquiry } = useShop();
  const [customNotes, setCustomNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addWholesaleInquiry({
      company: companyName,
      contact: contactName,
      phone,
      email,
      city: city || "India",
      category,
      quantity,
      notes: customNotes
    });
    setSubmitted(true);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `*UNIQUE COLLECTIONS - WHOLESALE / BULK REQUEST*\n\n*Business:* ${companyName || "N/A"}\n*Contact:* ${contactName}\n*Phone:* ${phone}\n*Category:* ${category}\n*Quantity Range:* ${quantity}\n*Notes:* ${customNotes || "None"}\n\nPlease share the official wholesale price list and fabric swatch kit.`
    );
    window.open(`https://wa.me/917598723245?text=${text}`, "_blank");
  };

  return (
    <div className="bg-[#FFF8ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#2B211B] mb-8 pb-4 border-b border-[#D6B77A]/30">
          <Link to="/" className="hover:text-[#2B211B]">Home</Link>
          <span>/</span>
          <span className="text-[#2B211B] font-semibold">Wholesale & Bulk Orders</span>
        </div>

        {/* Hero Banner for Wholesale with Transparent Text Background */}
        <div className="relative rounded-3xl p-8 sm:p-14 border border-[#D6B77A]/40 shadow-2xl mb-16 overflow-hidden min-h-[420px] flex items-center bg-[#1A1009]">
          {/* Background Image: Hanging Shirts on Wooden Hangers */}
          <img
            src="/wholesale-hero-bg.png"
            alt="Wholesale Menswear Collection"
            className="absolute inset-0 w-full h-full object-cover object-right sm:object-center transition-transform duration-700 hover:scale-105"
          />

          {/* Smooth Directional Gradient: Darker on text side for contrast, completely clear on right for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />

          {/* Fully Transparent Text Container */}
          <div className="max-w-3xl space-y-4 relative z-10 bg-transparent">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#D6B77A]/70 text-xs font-semibold text-[#D6B77A] uppercase tracking-wider shadow-sm backdrop-blur-xs">
              <Building2 className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>B2B Institutional Supply Division</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FFF8ED] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Manufacturer-Direct Menswear for Retail Merchants & Corporations.
            </h1>

            <p className="text-sm sm:text-base text-[#FFF8ED]/95 leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              Expand your boutique's margins with UNIQUE Collections. Certified Egyptian Giza cotton shirts, European linen casuals, and Milanese pleated trousers supplied at factory wholesale slabs.
            </p>

            <div className="flex flex-wrap gap-3 pt-3 text-xs">
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#D6B77A]/50 text-[#FFF8ED] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                <span className="font-medium">Starting from 20 Pieces Assorted</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#D6B77A]/50 text-[#FFF8ED] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                <span className="font-medium">Up to 49% Off Retail Rates</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#D6B77A]/50 text-[#FFF8ED] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D6B77A]" />
                <span className="font-medium">Custom Private Labeling Available</span>
              </span>
            </div>
          </div>
        </div>

        {/* Wholesale Tiers Grid */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs uppercase font-bold tracking-widest text-[#2B211B] mb-1">
              Transparent Price Tiers
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2B211B]">
              Standard Wholesale Discount Slabs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHOLESALE_TIERS.map((tier, idx) => (
              <div
                key={tier.range}
                className={`p-8 rounded-3xl border transition-all ${
                  idx === 1
                    ? "bg-[#2B211B] text-[#FFF8ED] border-[#D6B77A] shadow-xl md:-translate-y-2"
                    : "bg-[#FAF4E9] text-[#2B211B] border-[#D6B77A]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D6B77A]">
                    {tier.badge}
                  </span>
                  <Layers className="w-4 h-4 text-[#D6B77A]" />
                </div>

                <h3 className="font-serif text-2xl font-bold mb-1">{tier.range}</h3>
                <div className="text-lg font-bold text-[#D6B77A] mb-4">{tier.discount}</div>

                <div className={`space-y-2 text-xs pt-4 border-t ${idx === 1 ? "border-[#6F5142]/60 text-[#FFF8ED]/80" : "border-[#D6B77A]/30 text-[#2B211B]"}`}>
                  <div>Standard Dispatch: <strong>{tier.leadTime}</strong></div>
                  <div>Sample swatch book provided on deposit</div>
                  <div>GST compliant commercial tax invoice</div>
                  <div>Flexible size curves (38 to 46)</div>
                </div>

                <button
                  onClick={() => openWholesaleModal()}
                  className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    idx === 1
                      ? "bg-[#D6B77A] hover:bg-[#E9D7AE] text-[#2B211B]"
                      : "bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED]"
                  }`}
                >
                  Select Tier & Enquire
                </button>
              </div>
            ))}
          </div>
        </div>

                {/* Dedicated Wholesale Order Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 bg-[#FAF4E9] p-6 sm:p-10 rounded-3xl border border-[#D6B77A]/50 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6B77A] mb-1">
              <FileText className="w-4 h-4" />
              <span>Official B2B Inquiry Application</span>
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#2B211B] mb-2">
              Request Your Custom Wholesale Quotation
            </h3>

            <p className="text-xs text-[#2B211B] mb-6">
              Complete this form to receive a detailed line-item proposal, fabric swatches, and dispatch schedule.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#1B5E20]/10 border border-[#1B5E20]/30 rounded-2xl text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1B5E20] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#1B5E20]">
                  Application Received!
                </h4>
                <p className="text-xs text-[#2B211B] max-w-sm mx-auto">
                  Our B2B Institutional Accounts Lead will review your quantities and reach out on WhatsApp/phone within 2 hours.
                </p>
                <button
                  onClick={handleWhatsAppQuote}
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Connect with Accounts Lead on WhatsApp</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imperial Menswear Hub"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Parekh"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                      Expected Order Volume
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A] cursor-pointer"
                    >
                      <option value="20 - 49 Pieces">20 - 49 Pieces (25% Discount)</option>
                      <option value="50 - 199 Pieces">50 - 199 Pieces (37% Discount)</option>
                      <option value="200+ Pieces">200+ Pieces (49% Discount)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Special Packaging or Private Labeling Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about custom labels, desired delivery timelines, or specific size distribution..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D6B77A]/60 bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-[#D6B77A]" />
                    <span>Generate & Submit B2B Quotation</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-[#2B211B] text-[#FFF8ED] space-y-4 border border-[#6F5142]">
              <h3 className="font-serif font-bold text-xl text-[#D6B77A]">
                The UNIQUE B2B Advantage
              </h3>
              <div className="space-y-3 text-xs text-[#FFF8ED]/85">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0 mt-0.5" />
                  <span><strong>Consistent Sizing:</strong> Standardized European sizing curves ensure zero fitting disputes with your end-consumers.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0 mt-0.5" />
                  <span><strong>Low MOQ Flexibility:</strong> Test new colorways and styles with low minimums starting at 20 units.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B77A] shrink-0 mt-0.5" />
                  <span><strong>Rapid Replenishment:</strong> Standard catalog lines re-dispatched within 48 to 72 hours.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E20]">
                Immediate Response
              </span>
              <h4 className="font-serif font-bold text-base text-[#1B5E20]">
                Speak Directly with Institutional Sales
              </h4>
              <p className="text-xs text-[#1B5E20]/90">
                Need quotation within 15 minutes? Message directly on WhatsApp:
              </p>
              <a
                href="https://wa.me/917598723245?text=Hello%20UNIQUE%20Collections,%20I%20am%20interested%20in%20a%20B2B%20Wholesale%20partnership."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-xs text-[#1B5E20] underline underline-offset-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Now: +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
