import React, { useState } from "react";
import { X, Building2, Check, MessageCircle, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const WholesaleModal = () => {
  const {
    isWholesaleModalOpen,
    closeWholesaleModal,
    wholesaleSelectedProduct,
    addWholesaleInquiry
  } = useShop();

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(
    wholesaleSelectedProduct ? wholesaleSelectedProduct.category : "Formal Shirts"
  );
  const [orderQuantity, setOrderQuantity] = useState("50 - 199 Pieces");
  const [notes, setNotes] = useState(
    wholesaleSelectedProduct ? `Enquiring for: ${wholesaleSelectedProduct.name}` : ""
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isWholesaleModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addWholesaleInquiry({
      company: companyName,
      contact: contactName,
      phone,
      email,
      city: city || "India",
      category,
      quantity: orderQuantity,
      notes
    });
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `*UNIQUE COLLECTIONS - WHOLESALE / BULK ENQUIRY*\n\n*Business Name:* ${companyName || "N/A"}\n*Contact Person:* ${contactName}\n*Phone:* ${phone}\n*City:* ${city}\n*Category / Product:* ${category}\n*Estimated Volume:* ${orderQuantity}\n*Notes:* ${notes || "None"}\n\nPlease share the official wholesale catalog and price slab.`
    );
    window.open(`https://wa.me/917598723245?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={closeWholesaleModal}
      />

      <div className="relative bg-[#FFF8ED] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#D6B77A] z-10 my-8">
        <button
          onClick={closeWholesaleModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2B211B] text-[#FFF8ED] flex items-center justify-center hover:bg-[#6F5142] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1B5E20] text-white flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#2B211B]">
              Wholesale Enquiry Submitted!
            </h3>

            <p className="text-xs sm:text-sm text-[#2B211B] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#2B211B]">{contactName}</strong>. Our B2B Key Accounts Manager will contact your firm within 2 business hours with official wholesale pricing, sample swatches, and GST billing terms.
            </p>

            <div className="pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Quotation Desk</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={closeWholesaleModal}
                className="text-xs text-[#2B211B] hover:text-[#2B211B] underline"
              >
                Return to Browsing
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D6B77A] mb-1">
              <Building2 className="w-4 h-4" />
              <span>B2B Institutional & Wholesale Portal</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#2B211B]">
              Request Bulk Pricing & Slabs
            </h3>

            <p className="text-xs text-[#2B211B] mt-1 mb-5">
              Access factory-direct pricing, custom batch tailoring, private labeling, and priority dispatch.
            </p>

            {wholesaleSelectedProduct && (
              <div className="mb-4 p-3 rounded-xl bg-[#FAF4E9] border border-[#D6B77A]/50 flex items-center gap-3">
                <img
                  src={wholesaleSelectedProduct.image}
                  alt={wholesaleSelectedProduct.name}
                  className="w-12 h-14 object-cover rounded-lg shrink-0"
                />
                <div className="text-xs">
                  <div className="text-[#2B211B] text-[10px] uppercase font-bold">Selected Item</div>
                  <div className="font-serif font-bold text-[#2B211B]">{wholesaleSelectedProduct.name}</div>
                  <div className="text-[#2B211B]">Wholesale Rate: ₹{wholesaleSelectedProduct.wholesalePrice}/pc (Min. {wholesaleSelectedProduct.minWholesaleQty} pcs)</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Store / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elegance Menswear Boutique"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surat, Gujarat"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Product Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A] cursor-pointer"
                  >
                    <option value="Formal Shirts">Formal Shirts (Giza & Poplin)</option>
                    <option value="Casual Shirts">Casual Shirts (Italian Linen)</option>
                    <option value="Tailored Trousers">Tailored Trousers (Pleated Wool)</option>
                    <option value="Chinos & Pants">Chinos & Casual Pants</option>
                    <option value="All Menswear Range">Full Menswear Catalog (Assorted)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                    Expected Order Quantity
                  </label>
                  <select
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A] cursor-pointer"
                  >
                    <option value="20 - 49 Pieces">20 - 49 Pieces (25% Discount)</option>
                    <option value="50 - 199 Pieces">50 - 199 Pieces (37% Discount)</option>
                    <option value="200+ Pieces">200+ Pieces (49% Discount)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B211B] mb-1">
                  Specific Specifications or Custom Labeling
                </label>
                <textarea
                  rows={2}
                  placeholder="Need custom brand packaging, specific sizing ratios, or sample swatches..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6B77A]/60 bg-[#FAF4E9] focus:outline-none focus:ring-2 focus:ring-[#D6B77A]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2B211B] hover:bg-[#3D2F27] text-[#FFF8ED] rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#D6B77A]" />
                  <span>Submit Wholesale Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1B5E20] border border-[#25D366]/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Instant Connect with Wholesale Lead on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[10px] text-[#2B211B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6B77A]" />
                <span>NDA & Confidential Wholesale Pricing Guaranteed</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
