import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppFloating = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-2 max-w-xs bg-[#2B211B] text-[#FFF8ED] p-3 rounded-2xl shadow-2xl border border-[#D6B77A]/50 text-xs animate-fadeIn relative">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss WhatsApp Tooltip"
            className="absolute top-2 right-2 text-[#D6B77A] hover:text-[#FFF8ED] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-[#D6B77A] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>Menswear Concierge Online</span>
          </div>
          <p className="text-[11px] text-[#FFF8ED]/85 mt-1 leading-snug">
            Need help selecting your collar size, fabric drape, or wholesale price slab? Chat with our team now!
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/917598723245?text=Hello%20UNIQUE%20Collections,%20I%20would%20like%20to%20know%20more%20about%20your%20menswear%20collection."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Menswear Concierge on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D6B77A] rounded-full border-2 border-[#2B211B]" />
      </a>
    </div>
  );
};
